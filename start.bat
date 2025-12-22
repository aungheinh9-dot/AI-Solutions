@echo off
chcp 65001 >nul
title AI Solutions Server
color 0A

echo ========================================
echo    AI Solutions Company Website
echo    Server Auto-Start
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Node.js is installed
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js OK
node --version
echo.

REM Check if package.json exists
echo [2/5] Checking project files...
if not exist package.json (
    echo ❌ ERROR: package.json not found
    pause
    exit /b 1
)
echo ✅ Project files OK
echo.

REM Install dependencies if needed
echo [3/5] Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies OK
)
echo.

REM Check/create .env file
echo [4/5] Checking configuration...
if not exist .env (
    if exist env.example (
        echo Creating .env from template...
        copy env.example .env >nul
        echo ✅ .env created
    )
) else (
    echo ✅ Configuration OK
)
echo.

REM Start the server
echo [5/5] Starting server...
echo.
echo ========================================
echo    Server Starting...
echo ========================================
echo.
echo 🌐 Website: http://localhost:3000
echo 🔐 Admin: http://localhost:3000/admin/login
echo.
echo 📝 Login:
echo    Email: admin@aisolutions.com
echo    Password: Ai2025
echo.
echo ⚠️  Press Ctrl+C to stop
echo.
echo ========================================
echo.

REM Start the server
node server.js

echo.
echo Server stopped.
pause
