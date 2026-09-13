"""Base exception types shared across services."""


class FluxoraError(Exception):
    """Root of every deliberate, expected error a service raises."""

    status_code = 500
    error = "Internal Server Error"


class NotFoundError(FluxoraError):
    status_code = 404
    error = "Not Found"


class UnauthorizedError(FluxoraError):
    status_code = 401
    error = "Unauthorized"


class ForbiddenError(FluxoraError):
    status_code = 403
    error = "Forbidden"


class ConflictError(FluxoraError):
    status_code = 409
    error = "Conflict"


class RateLimitedError(FluxoraError):
    status_code = 429
    error = "Too Many Requests"
