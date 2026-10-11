"""Find-or-create against Vendors Service. The HTTP client is faked so
these tests assert the lookup rules, not that the other service is up."""
import uuid
from types import SimpleNamespace

import httpx
import pytest

from app.services.vendors_service_client import VendorsServiceError, find_or_create_vendor

COMPANY_ID = uuid.uuid4()
EXISTING_ID = uuid.uuid4()
CREATED_ID = uuid.uuid4()


def _settings():
    return SimpleNamespace(
        vendors_service_url="http://vendors-service:8006",
        vendors_service_timeout_seconds=5.0,
        jwt_secret_key="test-secret",
    )


class _ScriptedClient:
    def __init__(self, responses):
        self._responses = list(responses)
        self.calls = []

    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        return False

    def _next(self, method, url, **kwargs):
        self.calls.append((method, url, kwargs))
        status, body = self._responses.pop(0)
        return httpx.Response(status, json=body)

    async def get(self, url, **kwargs):
        return self._next("GET", url, **kwargs)

    async def post(self, url, **kwargs):
        return self._next("POST", url, **kwargs)


def _patch_client(monkeypatch, responses):
    client = _ScriptedClient(responses)

    def _factory(*_args, **_kwargs):
        return client

    monkeypatch.setattr("app.services.vendors_service_client.httpx.AsyncClient", _factory)
    return client


@pytest.mark.asyncio
async def test_an_exact_name_is_reused(monkeypatch) -> None:
    client = _patch_client(monkeypatch, [
        (200, {"vendors": [
            {"id": str(uuid.uuid4()), "name": "muhammad haroon traders"},
            {"id": str(EXISTING_ID), "name": "Muhammad Haroon"},
        ]}),
    ])

    found = await find_or_create_vendor(_settings(), company_id=COMPANY_ID, name="  muhammad haroon ")

    assert found == EXISTING_ID
    assert len(client.calls) == 1
    assert client.calls[0][0] == "GET"


@pytest.mark.asyncio
async def test_a_missing_name_is_created(monkeypatch) -> None:
    _patch_client(monkeypatch, [
        (200, {"vendors": []}),
        (201, {"id": str(CREATED_ID), "name": "muhammad haroon"}),
    ])

    found = await find_or_create_vendor(_settings(), company_id=COMPANY_ID, name="muhammad haroon")

    assert found == CREATED_ID


@pytest.mark.asyncio
async def test_a_duplicate_create_falls_back_to_the_existing_row(monkeypatch) -> None:
    client = _patch_client(monkeypatch, [
        (200, {"vendors": []}),
        (409, {"detail": 'A vendor named "muhammad haroon" already exists'}),
        (200, {"vendors": [{"id": str(EXISTING_ID), "name": "muhammad haroon"}]}),
    ])

    found = await find_or_create_vendor(_settings(), company_id=COMPANY_ID, name="muhammad haroon")

    assert found == EXISTING_ID
    assert [call[0] for call in client.calls] == ["GET", "POST", "GET"]


@pytest.mark.asyncio
async def test_a_partial_name_match_is_not_reused(monkeypatch) -> None:
    _patch_client(monkeypatch, [
        (200, {"vendors": [{"id": str(EXISTING_ID), "name": "muhammad haroon traders"}]}),
        (201, {"id": str(CREATED_ID), "name": "muhammad haroon"}),
    ])

    found = await find_or_create_vendor(_settings(), company_id=COMPANY_ID, name="muhammad haroon")

    assert found == CREATED_ID


@pytest.mark.asyncio
async def test_a_blank_name_is_refused() -> None:
    with pytest.raises(VendorsServiceError):
        await find_or_create_vendor(_settings(), company_id=COMPANY_ID, name="   ")


@pytest.mark.asyncio
async def test_an_unreachable_directory_is_reported(monkeypatch) -> None:
    class _Down:
        async def __aenter__(self):
            raise httpx.ConnectError("refused")

        async def __aexit__(self, *_args):
            return False

    monkeypatch.setattr("app.services.vendors_service_client.httpx.AsyncClient", lambda *_a, **_k: _Down())

    with pytest.raises(VendorsServiceError, match="Could not reach Vendors Service"):
        await find_or_create_vendor(_settings(), company_id=COMPANY_ID, name="muhammad haroon")
