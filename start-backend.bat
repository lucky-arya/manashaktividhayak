@echo off
echo ========================================
echo Fest Yuva Nirman Backend - Quick Start
echo ========================================
echo.

cd backend

echo [1/3] Checking if node_modules exists...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo [2/3] Checking MongoDB connection...
echo Please ensure MongoDB is running on your system.
echo You can start it with: net start MongoDB
echo.

echo [3/3] Starting the server...
echo.
call npm run dev
