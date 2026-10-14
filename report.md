# Oracle connection failure — diagnosis and fix

## Error

```
ORA-12541: Cannot connect. No listener at host 172.20.10.114 port 1521
```

## Root cause

No Oracle listener was accepting TCP connections on `172.20.10.114:1521`. SQL Developer never reached a database; username/password/SID were not the failing step yet.

Secondary issue in the connection dialog: **SID `orcl`** is not valid for Oracle XE. XE uses **Service Name `XEPDB1`** (or SID `XE`).

## Fix applied

Added a runnable Oracle XE stack at `backend/infra/oracle/`:

```bash
cd backend/infra/oracle
./start-oracle.sh
# or: docker compose up -d
```

Verified locally:

- Listener on `0.0.0.0:1521` — READY
- Services: `XE`, `xepdb1` / `XEPDB1`
- Logins work: `system` / `OraclePass123`, `appuser` / `AppPass123`

## SQL Developer (working settings)

| Field | Value |
|---|---|
| Hostname | `localhost` (same machine as Docker) or the LAN IP of the host running Compose |
| Port | `1521` |
| Service Name | `XEPDB1` |
| User / password | `system` / `OraclePass123` |

If you keep Hostname `172.20.10.114`, run this Compose stack **on that machine** so the listener exists there.
