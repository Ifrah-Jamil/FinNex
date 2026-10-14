@echo off
setlocal EnableExtensions
title FinNex
cd /d "%~dp0"

echo FinNex
echo.

if not exist ".env" (
  if exist ".env.example" (
    copy /Y ".env.example" ".env" >nul
    echo Created .env from .env.example.
  )
)

where bun >nul 2>&1
if errorlevel 1 (
  echo bun was not found. Install it from https://bun.sh, then run this file again.
  pause
  exit /b 1
)

where docker >nul 2>&1
if errorlevel 1 (
  echo Docker was not found. FinNex will open without the API.
  goto start_frontend
)

docker info >nul 2>&1
if not errorlevel 1 goto compose_up

echo Docker Desktop is not running. Starting it...
set "DOCKER_EXE="
if exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" set "DOCKER_EXE=%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
if not defined DOCKER_EXE if exist "%ProgramFiles(x86)%\Docker\Docker\Docker Desktop.exe" set "DOCKER_EXE=%ProgramFiles(x86)%\Docker\Docker\Docker Desktop.exe"
if not defined DOCKER_EXE if exist "%LocalAppData%\Docker\Docker Desktop.exe" set "DOCKER_EXE=%LocalAppData%\Docker\Docker Desktop.exe"
if not defined DOCKER_EXE if exist "%LocalAppData%\Programs\Docker\Docker\Docker Desktop.exe" set "DOCKER_EXE=%LocalAppData%\Programs\Docker\Docker\Docker Desktop.exe"
if not defined DOCKER_EXE goto docker_missing
start "" "%DOCKER_EXE%"
goto wait_docker_banner
:docker_missing
echo Docker Desktop could not be started. FinNex will open without the API.
goto start_frontend
:wait_docker_banner

echo Waiting for Docker Desktop...
set /a TRIES=0
:wait_docker
set /a TRIES+=1
docker info >nul 2>&1
if not errorlevel 1 goto compose_up
if %TRIES% GEQ 45 (
  echo Docker Desktop did not become ready. FinNex will open without the API.
  goto start_frontend
)
timeout /t 2 /nobreak >nul
goto wait_docker

:compose_up
echo Starting the FinNex backend...
pushd "%~dp0backend\infra"
docker compose up -d
if errorlevel 1 (
  echo The backend did not start. FinNex will open without the API.
  popd
  goto start_frontend
)
popd

echo Waiting for the API gateway on http://127.0.0.1:8000 ...
set /a TRIES=0
:wait_gateway
set /a TRIES+=1
curl -fsS http://127.0.0.1:8000/health >nul 2>&1
if not errorlevel 1 (
  echo API gateway is up.
  goto start_frontend
)
if %TRIES% GEQ 30 (
  echo The gateway is not ready yet. Opening FinNex anyway.
  goto start_frontend
)
timeout /t 2 /nobreak >nul
goto wait_gateway

:start_frontend
echo Starting FinNex...
pushd "%~dp0frontend"
if not exist "package.json" (
  echo package.json was not found in "%~dp0frontend".
  echo Put run.cmd in the FinNex folder that contains the frontend and backend folders.
  popd
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Installing frontend packages...
  call bun install
  if errorlevel 1 (
    echo bun install failed.
    popd
    pause
    exit /b 1
  )
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Vite is not installed in "%~dp0frontend".
  popd
  pause
  exit /b 1
)
popd
set "LAUNCH=%TEMP%\finnex-dev.cmd"
> "%LAUNCH%" echo @echo off
>> "%LAUNCH%" echo title FinNex
>> "%LAUNCH%" echo cd /d "%~dp0frontend"
>> "%LAUNCH%" echo echo Starting FinNex at http://127.0.0.1:43123
>> "%LAUNCH%" echo echo.
>> "%LAUNCH%" echo call bun .\node_modules\vite\bin\vite.js dev --host 127.0.0.1 --port 43123 --strictPort
>> "%LAUNCH%" echo echo.
>> "%LAUNCH%" echo echo FinNex stopped. Read the message above.
>> "%LAUNCH%" echo pause
start "FinNex" "%LAUNCH%"
echo Leave the FinNex window open. Waiting for http://127.0.0.1:43123 ...
set /a TRIES=0
:wait_web
set /a TRIES+=1
curl -s --connect-timeout 2 --max-time 5 http://127.0.0.1:43123/ >nul 2>&1
if not errorlevel 1 goto open_browser
if %TRIES% GEQ 45 (
  echo FinNex did not start. Read the FinNex window.
  echo If the folder is in OneDrive, right-click FinNex, choose Always keep on this device, then run this file again.
  pause
  exit /b 1
)
timeout /t 2 /nobreak >nul
goto wait_web
:open_browser
echo Opening http://127.0.0.1:43123
start "" "http://127.0.0.1:43123"
exit /b 0
