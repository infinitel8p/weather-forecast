import os
import webbrowser

os.system("pip install -r requirements.txt")
webbrowser.open("http://127.0.0.1:8000", new=0, autoraise=True)
webbrowser.open(os.path.dirname(__file__) +
                "/frontend/test/index.html", new=0, autoraise=True)
os.system("python -m uvicorn backend.main:app --reload")
