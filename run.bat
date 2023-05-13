@echo off

REM Activate the virtual environment for the back-end
call back\.venv\Scripts\activate

REM Start the back-end
start "Back" cmd /c "cd back && pip install -r requirements.txt && python main.py"

REM Start the front-end
start "Front" cmd /c "cd front && npm i && npm run dev"
