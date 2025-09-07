@echo off
echo Starting SECRM-EIGA AI Customer Service Solution...
echo.

cd /d "%~dp0"

echo Installing/updating dependencies...
py -m pip install -r backend/requirements.txt -q

echo.
echo Starting backend server...
start "SECRM-EIGA Backend" cmd /k "cd backend && py app.py"

echo.
echo Waiting for server to start...
timeout /t 3 /nobreak >nul

echo.
echo Opening browser...
start http://localhost:5000

echo.
echo SECRM-EIGA is now running!
echo Backend: http://localhost:5000
echo Press any key to exit this window...
pause >nul
