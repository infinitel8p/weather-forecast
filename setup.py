import os
import platform
import threading
import webbrowser
import subprocess


def install_requirements():
    os.system("pip3 install -r requirements.txt")
    if platform.system() == "Linux" and platform.machine() == "armv7l":
        os.system("sudo apt-get install chromium-chromedriver")


def open_browser():
    if platform.system() == "Linux" and platform.machine() == "armv7l":
        path = subprocess.getoutput('pwd')+"/frontend/index.html"
    else:
        path = subprocess.getoutput('cd')+"\\frontend\\index.html"
    webbrowser.open("http://127.0.0.1:8000", new=0, autoraise=True)
    webbrowser.open(path, new=0, autoraise=True)


if __name__ == "__main__":
    # creating threads
    t1 = threading.Thread(target=install_requirements)
    t2 = threading.Thread(target=open_browser)

    # starting thread 1 & 2
    t1.start()
    t2.start()

    # wait until thread 1 & 2 is completely executed
    t1.join()
    t2.join()

    if platform.system() == "Linux" and platform.machine() == "armv7l" or platform.system() == "Darwin":
        os.system("python3 -m uvicorn backend.main:app --reload")
    else:
        os.system("python -m uvicorn backend.main:app --reload")
