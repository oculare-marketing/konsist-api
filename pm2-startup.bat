@echo off
:: Wait for network connection
timeout /t 10 /nobreak >nul

:: Start PM2 and resurrect previous processes
pm2 resurrect