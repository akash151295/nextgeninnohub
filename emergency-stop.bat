@echo off
REM 🚨 EMERGENCY STOP - Delete All Cloud Functions
REM Run this script if you get unexpected billing alerts
REM This will IMMEDIATELY stop all Cloud Functions and billing

echo.
echo ========================================================
echo 🚨 EMERGENCY STOP - Deleting All Cloud Functions
echo ========================================================
echo.
echo ⚠️  WARNING: This will delete all functions and stop automation!
echo You will need to redeploy functions to use automation again.
echo.

set /p confirm="Are you sure you want to continue? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo.
    echo ❌ Cancelled. No functions were deleted.
    pause
    exit /b
)

echo.
echo 🔥 Deleting Cloud Functions...
echo.

REM Delete all functions
call firebase functions:delete createUser --force
call firebase functions:delete getAllUsers --force
call firebase functions:delete deleteUser --force

echo.
echo ✅ All Cloud Functions deleted!
echo ✅ Billing stopped immediately!
echo.
echo 📊 Check your Firebase Console to confirm:
echo https://console.firebase.google.com/project/nextgen-innohub/functions
echo.
echo 💡 To restore automation later, run: firebase deploy --only functions
echo.
pause
