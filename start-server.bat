@echo off
chcp 65001 >nul
title AI Solutions Server
color 0A

echo ========================================
echo    AI Solutions Company Website
echo    Server Auto-Start Script
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Node.js is installed
echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js is installed
node --version
echo.

REM Check if package.json exists
echo [2/5] Checking project files...
if not exist package.json (
    echo ❌ ERROR: package.json not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)
echo ✅ Project files found
echo.

REM Install dependencies if needed
echo [3/5] Checking dependencies...
if not exist node_modules (
    echo Installing dependencies (this may take a few minutes)...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ❌ ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)
echo.

REM Check/create .env file
echo [4/5] Checking configuration...
if not exist .env (
    echo ⚠️  WARNING: .env file not found
    if exist env.example (
        echo Creating .env from template...
        copy env.example .env >nul
        echo ✅ .env file created
        echo.
        echo ⚠️  Please edit .env file with your Firebase credentials if needed
    ) else (
        echo ⚠️  env.example not found - continuing without .env
    )
) else (
    echo ✅ Configuration file found
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
echo 🔐 Admin Login: http://localhost:3000/admin/login
echo.
echo 📝 Login Credentials:
echo    Email: admin@aisolutions.com
echo    Password: Ai2025
echo.
echo ⚠️  Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Start the server
node server.js

REM If server exits, show message
echo.
echo ========================================
echo Server stopped.
echo ========================================
pause

