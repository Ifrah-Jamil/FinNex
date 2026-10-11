"""Finds or creates the vendor a purchase invoice belongs to, on
send-to-accounting.

Spend on the dashboard is derived from invoices that carry a vendor_id.
A scanned invoice only has the free-text vendor_name OCR read, so without
this call Top Vendors stays empty even after the expense is booked.

Best-effort, same reasoning as transactions_service_client.py: no queue
exists yet, so a plain HTTP call degrades on failure rather than blocking
the accountant's status flip. A failure here is logged by the caller and
the invoice is still sent; it just will not appear under a vendor until
someone links it from reconciliation.
"""
import logging
from uuid import UUID

import httpx
from shared.auth import internal_service_headers

from app.core.config import Settings

logger = logging.getLogger(__name__)


class VendorsServiceError(Exception):
    """Vendors Service could not be reached or returned an error."""


def _headers(settings: Settings, company_id: UUID) -> dict[str, str]:
    try:
        return internal_service_headers(
            secret_key=settings.jwt_secret_key, company_id=company_id, service_name="invoice-service",
        )
    except ValueError as exc:
        raise VendorsServiceError(str(exc)) from exc


def _exact_match(vendors: list[dict], name: str) -> UUID | None:
    """The list endpoint matches a substring. Only an exact name (ignoring
    case and surrounding space) is the same vendor — a partial hit must not
    attach this invoice's spend to a different supplier."""
    wanted = name.strip().casefold()
    for vendor in vendors:
        if str(vendor.get("name", "")).strip().casefold() == wanted:
            return UUID(str(vendor["id"]))
    return None


async def _search(client: httpx.AsyncClient, settings: Settings, headers: dict[str, str], name: str) -> UUID | None:
    url = f"{settings.vendors_service_url.rstrip('/')}/api/v1/vendors/"
    response = await client.get(url, params={"search": name.strip(), "limit": 200}, headers=headers)
    if response.status_code >= 400:
        logger.error("Vendors Service returned %s while looking up %r: %s", response.status_code, name, response.text)
        raise VendorsServiceError(f"Vendors Service returned an unexpected error ({response.status_code})")
    return _exact_match(response.json().get("vendors") or [], name)


async def find_or_create_vendor(settings: Settings, *, company_id: UUID, name: str) -> UUID:
    """Return the vendor id for this name, creating the directory row when
    the company does not have one yet.

    A 409 on create means another request inserted the same name between
    the lookup and the insert. The unique name is looked up again rather
    than treated as a failure — the vendor exists, which is all this call
    needed.
    """
    cleaned = name.strip()
    if not cleaned:
        raise VendorsServiceError("A vendor name is required")

    headers = _headers(settings, company_id)
    url = f"{settings.vendors_service_url.rstrip('/')}/api/v1/vendors/"
    try:
        async with httpx.AsyncClient(timeout=settings.vendors_service_timeout_seconds) as client:
            existing = await _search(client, settings, headers, cleaned)
            if existing is not None:
                return existing

            response = await client.post(url, json={"name": cleaned}, headers=headers)
            if response.status_code == 409:
                existing = await _search(client, settings, headers, cleaned)
                if existing is not None:
                    return existing
                raise VendorsServiceError(f'A vendor named "{cleaned}" already exists but could not be loaded')
            if response.status_code >= 400:
                logger.error(
                    "Vendors Service returned %s while creating %r: %s", response.status_code, cleaned, response.text,
                )
                raise VendorsServiceError(f"Vendors Service returned an unexpected error ({response.status_code})")
            return UUID(str(response.json()["id"]))
    except httpx.TimeoutException as exc:
        raise VendorsServiceError("Vendors Service did not respond in time") from exc
    except httpx.RequestError as exc:
        raise VendorsServiceError(f"Could not reach Vendors Service at {url}") from exc
