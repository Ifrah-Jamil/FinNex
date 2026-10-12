@echo off
setlocal EnableExtensions
cd /d "%~dp0"

if not exist ".env" (
  copy /Y ".env.example" ".env" >nul
  echo Created .env from .env.example.
)

where docker >nul 2>&1
if errorlevel 1 (
  echo Docker was not found. Install Docker Desktop, then run this file again.
  pause
  exit /b 1
)

where bun >nul 2>&1
if errorlevel 1 (
  echo bun was not found. Install it from https://bun.sh and run this file again.
  pause
  exit /b 1
)

echo Starting the Fluxora backend...
pushd "%~dp0backend\infra"
docker compose up -d
if errorlevel 1 (
  echo The backend did not start.
  popd
  pause
  exit /b 1
)
popd

echo Waiting for the API gateway on http://127.0.0.1:8000 ...
set /a TRIES=0
:wait_gateway
set /a TRIES+=1
curl -fsS http://127.0.0.1:8000/health >nul 2>&1
if not errorlevel 1 goto gateway_ready
if %TRIES% GEQ 60 (
  echo The gateway did not become ready. Check Docker Desktop.
  pause
  exit /b 1
)
timeout /t 2 /nobreak >nul
goto wait_gateway

:gateway_ready
echo API gateway is up.
echo Opening http://127.0.0.1:43123
start "" "http://127.0.0.1:43123"

pushd "%~dp0frontend"
if not exist "node_modules\" call bun install
bun run dev -- --host 127.0.0.1 --port 43123
set EXITCODE=%ERRORLEVEL%
popd
exit /b %EXITCODE%
