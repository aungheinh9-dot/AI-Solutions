# Quick Start Script - Double-click to run
# This script will start the server immediately

# Change to script directory
Set-Location $PSScriptRoot

# Check if Node.js is available
try {
    $null = Get-Command node -ErrorAction Stop
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Create .env if needed
if (-not (Test-Path ".env") -and (Test-Path "env.example")) {
    Copy-Item "env.example" ".env"
}

# Start server
Write-Host ""
Write-Host "🚀 Starting server..." -ForegroundColor Green
Write-Host ""
node server.js

Read-Host "Press Enter to exit"

