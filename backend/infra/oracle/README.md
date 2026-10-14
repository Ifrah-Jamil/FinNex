# Oracle XE (local)

Standalone Oracle Database Express Edition with a live listener on port **1521**.

This fixes **ORA-12541** (`No listener at host … port 1521`) by starting Oracle so SQL Developer has something to connect to.

## Start

Requires Docker.

```bash
cd backend/infra/oracle
docker compose up -d
docker compose ps   # wait until healthy (first boot ~1–2 min)
```

Stop:

```bash
docker compose down
```

## SQL Developer settings

Use these values (your old `SID=orcl` target was wrong for XE and had no listener):

| Field | Value |
|---|---|
| Connection Name | `orcl` (any name) |
| Username | `system` or `appuser` |
| Password | `OraclePass123` (system) / `AppPass123` (appuser) |
| Connection Type | Basic |
| Hostname | `localhost` if SQL Developer is on the same machine as Docker; otherwise that machine’s LAN IP (e.g. `172.20.10.114`) |
| Port | `1521` |
| **Service Name** (preferred) | `XEPDB1` |
| SID (alternative) | `XE` |

Important:

1. Prefer **Service Name = `XEPDB1`**, not SID `orcl`.
2. Hostname must be the machine that is running this Compose stack.
3. If you still see ORA-12541, Oracle is not running on that host — run `docker compose up -d` there and confirm `docker compose ps` shows healthy.

## Quick listener check

```bash
docker exec oracle-xe lsnrctl status
# Expect: PROTOCOL=tcp HOST=0.0.0.0 PORT=1521 and service xepdb1 / XE READY
```

## Credentials

| User | Password | Notes |
|---|---|---|
| `system` | `OraclePass123` | DBA |
| `appuser` | `AppPass123` | App schema in `XEPDB1` |

Change `ORACLE_PASSWORD` / `APP_USER_PASSWORD` in `docker-compose.yml` before the first start (or wipe the volume to re-init).
