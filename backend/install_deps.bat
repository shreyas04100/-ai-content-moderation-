@echo off
echo Installing Flask dependencies...
cd /d "%~dp0"
python -m pip install flask flask-cors python-dotenv
echo.
echo Installation complete!
pause
