#!/usr/bin/env bash
# Start Oracle XE and wait until the listener accepts connections.
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required. Install Docker Desktop / docker.io, then re-run." >&2
  exit 1
fi

docker compose up -d

echo "Waiting for Oracle to become healthy..."
for i in $(seq 1 60); do
  status="$(docker inspect -f '{{.State.Health.Status}}' oracle-xe 2>/dev/null || echo missing)"
  if [[ "$status" == "healthy" ]]; then
    echo
    echo "Oracle is ready."
    echo "SQL Developer: Host=localhost  Port=1521  Service Name=XEPDB1"
    echo "  system / OraclePass123   or   appuser / AppPass123"
    docker exec oracle-xe lsnrctl status | sed -n '/Listening Endpoints/,/The command completed/p'
    exit 0
  fi
  printf '.'
  sleep 5
done

echo
echo "Oracle did not become healthy in time. Logs:" >&2
docker compose logs --tail 80
exit 1
