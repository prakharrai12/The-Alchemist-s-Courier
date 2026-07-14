@echo off
echo ====================================================================
echo 🗝️ WYRMVAULT - STARTING BACKEND AND FRONTEND SERVERS
echo ====================================================================

echo Starting Backend Server on port 5000...
start "Wyrmvault Backend (Port 5000)" /D "%~dp0backend" cmd /k "node server.js"

powershell -command "Start-Sleep -Seconds 2"

echo Starting Frontend Vite Server on port 5173...
start "Wyrmvault Frontend (Port 5173)" /D "%~dp0ancient-letters" cmd /k "npm run dev -- --host"

echo ====================================================================
echo ✅ Both servers launched in separate windows!
echo 🌐 Open your browser to: http://localhost:5173/
echo ====================================================================
