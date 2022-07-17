import os
import threading
import webbrowser


def install_requirements():
    os.system("pip install -r requirements.txt")


def open_browser():
    webbrowser.open("http://127.0.0.1:8000", new=0, autoraise=True)

    webbrowser.open(os.path.dirname(__file__) +
                    "/frontend/test/index.html", new=0, autoraise=True)


if __name__ == "__main__":
    # creating thread
    t1 = threading.Thread(target=install_requirements)
    t2 = threading.Thread(target=open_browser)

    # starting thread 1 & 2
    t1.start()
    t2.start()

    # wait until thread 1 & 2 is completely executed
    t1.join()
    t2.join()

    os.system("python -m uvicorn backend.main:app --reload")
