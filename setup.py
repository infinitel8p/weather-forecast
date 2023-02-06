import os
import platform
import subprocess


def install_requirements():
    """Installs missing packages from `requirements.txt` and updates available packages
    """

    try:
        subprocess.check_call(
            ["pip", "install", "--upgrade", "-r", "requirements.txt"])
    except subprocess.CalledProcessError as e:
        print("Error: ", e)

    if platform.system() == "Linux" and platform.machine() == "armv7l":
        os.system("sudo apt-get install chromium-chromedriver")


if __name__ == "__main__":
    # Install requirements
    install_requirements()

    from backend.gui import App
    root = App()
    root.mainloop_running = False
    root.mainloop()
    root.mainloop_running = False
    root.protocol("WM_DELETE_WINDOW", root.destroy())
