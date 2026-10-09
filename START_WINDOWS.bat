@echo off
cd /d "%~dp0"
echo Starting BC Food Delivery. Open the Local URL printed below.
call npm install
if errorlevel 1 (
 echo Installation failed. Check that Node.js 22.12 or newer is installed.
 pause
 exit /b 1
)
call npm run dev
pause
