import os
import platform
import threading
import subprocess
import webbrowser


def install_requirements():
    """Installs missing packages from `requirements.txt`
    """

    try:
        subprocess.check_call(["pip", "install", "-r", "requirements.txt"])
    except subprocess.CalledProcessError as e:
        print("Error: ", e)

    if platform.system() == "Linux" and platform.machine() == "armv7l":
        os.system("sudo apt-get install chromium-chromedriver")


def open_browser():
    """Opens `localhost` and `index.html` in webbrowser
    """

    webbrowser.open("http://127.0.0.1:8000", new=0, autoraise=True)

    path = os.path.join(os.path.join(os.path.dirname(
        os.path.abspath(__file__)), "frontend"), "index.html")
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
