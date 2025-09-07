# SECRM-EIGA Startup Script
Write-Host "Starting SECRM-EIGA AI Customer Service Solution..." -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Install/update dependencies
Write-Host "Installing/updating dependencies..." -ForegroundColor Yellow
py -m pip install -r backend/requirements.txt -q

Write-Host ""
Write-Host "Starting backend server..." -ForegroundColor Green

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; py app.py" -WindowStyle Normal

# Wait for server to start
Write-Host ""
Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Open browser
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:5000"

Write-Host ""
Write-Host "SECRM-EIGA is now running!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
