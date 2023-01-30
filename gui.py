import contextlib
import uvicorn
import time
import threading
import json
import requests
import re
import customtkinter
import os
import subprocess
import webbrowser
import logging


# Create a handler to display log messages in the GUI

class TkinterHandler(logging.Handler):
    def __init__(self, text_widget):
        logging.Handler.__init__(self)
        self.text_widget = text_widget
        self.text_widget.configure(state='disabled')
        self.log_format = logging.Formatter('%(message)s\n')

    def emit(self, record):
        self.text_widget.configure(state='normal')
        self.text_widget.insert(
            customtkinter.END, self.log_format.format(record))
        self.text_widget.see(customtkinter.END)
        self.text_widget.configure(state='disabled')
        self.text_widget.update_idletasks()  # Refresh the widget


class Server(uvicorn.Server):

    @contextlib.contextmanager
    def run_in_thread(self):
        thread = threading.Thread(target=self.run)
        thread.start()
        try:
            while not self.started:
                time.sleep(1e-3)
            yield
        finally:
            self.should_exit = True
            thread.join()


class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()

        self.path = os.path.join(os.path.join(os.path.dirname(
            os.path.abspath(__file__)), "frontend"), "index.html")

        # Create the GUI
        self.title('Weather Forecast')
        customtkinter.set_appearance_mode("dark")

        # Set up the log output widget
        self.log_output = customtkinter.CTkTextbox(self)
        self.log_output.pack(side=customtkinter.BOTTOM,
                             fill=customtkinter.BOTH, expand=True, padx=5, pady=5)

        self.handler = TkinterHandler(self.log_output)
        # Set up the logger
        self.logger = logging.getLogger()
        # Add the TkinterHandler to the logger
        self.logger.addHandler(self.handler)
        # Set logging level for logger
        self.logger.setLevel(logging.INFO)

        # add a frame for input and download button
        self.grid_1 = customtkinter.CTkFrame(self, fg_color="transparent")
        self.grid_1.pack(padx=50, pady=(10, 10))

        # add title label
        self.label_1 = customtkinter.CTkLabel(
            self.grid_1, text="Api Key 1:")
        self.label_1.grid(row=0, column=0, padx=(
            0, 2.5), sticky="w")

        # Set up the api input widget
        self.api_input_1 = customtkinter.CTkEntry(
            self.grid_1, width=250, font=("Arial", 10), placeholder_text="Insert OpenWeatherMap Api Key")
        self.api_input_1.grid(row=0, column=1, padx=(2.5, 2.5))

        # Set up the download button
        self.check_button_1 = customtkinter.CTkButton(
            self.grid_1, text='Check', width=50, command=self.check_api1)
        self.check_button_1.grid(
            row=0, column=2, padx=(2.5, 0))

        # add a frame for download options
        self.grid_2 = customtkinter.CTkFrame(self, fg_color="transparent")
        self.grid_2.pack(padx=50, pady=(10, 10))

        # add title label
        self.label_2 = customtkinter.CTkLabel(
            self.grid_2, text="Api Key 2:")
        self.label_2.grid(row=0, column=0, padx=(
            0, 2.5), sticky="w")

        # Set up the api input widget
        self.api_input_2 = customtkinter.CTkEntry(
            self.grid_2, width=250, font=("Arial", 10), placeholder_text="Insert WeatherApi Api Key")
        self.api_input_2.grid(row=0, column=1, padx=(2.5, 2.5))

        # Set up the download button
        self.check_button_2 = customtkinter.CTkButton(
            self.grid_2, text='Check', width=50, command=self.check_api2)
        self.check_button_2.grid(
            row=0, column=2, padx=(2.5, 0))

    def install_requirements(self):
        """Installs missing packages from `requirements.txt`
        """
        self.logger.info("Checking requirements...\n")
        result = subprocess.Popen(
            ["pip", "install", "-r", "requirements.txt"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        out, err = result.communicate()

        # Use regular expression to match lines that contain package name and its status
        pattern = re.compile(
            r"^(Collecting|Requirement already satisfied): (.*) in .*$")

        # Iterate through each line of the output
        for line in out.decode().split("\n"):
            match = pattern.match(line)
            if match:
                package_status = match.group(1)
                package_name = match.group(2)
                self.logger.info("{}: {}".format(package_status, package_name))
            else:
                self.logger.info(line)

        for line in err.decode().split("\n"):
            self.logger.error(line)

        self.logger.info("Checked/Installed requirements.")

    def check_api1(self):
        self.api_key1 = self.api_input_1.get().strip()
        api1 = f"https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid={self.api_key1}"
        if self.api_key1 == "":
            return

        check_api1 = requests.get(api1)
        result = json.loads(check_api1.text)
        if check_api1.ok:
            self.check_button_1.configure(state="disabled", command=None)
            self.label_1.configure(text_color="green")
            self.api_input_1.configure(state="disabled")
        else:
            self.logger.info(result["message"])
        self.check_status()

    def check_api2(self):
        self.api_key2 = self.api_input_2.get().strip()
        api2 = f"http://api.weatherapi.com/v1/current.json?key={self.api_key2}&q=London&aqi=no"
        if self.api_key2 == "":
            return

        check_api2 = requests.get(api2)
        result = json.loads(check_api2.text)
        if check_api2.ok:
            self.check_button_2.configure(state="disabled", command=None)
            self.label_2.configure(text_color="green")
            self.api_input_2.configure(state="disabled")
        else:
            self.logger.info(result["error"]["message"])
        self.check_status()

    def check_status(self):
        if self.check_button_1.cget('state') == "disabled" and self.check_button_2.cget('state') == "disabled":
            self.logger.info("Login successful! Starting webservices...")
            self.open_browser()

    def open_browser(self):
        """Opens `index.html` in webbrowser and starts uvicorn
        """

        webbrowser.open(self.path, new=0, autoraise=True)

        # temporarily set environment variables
        os.environ['API_KEY1'] = self.api_key1
        os.environ['API_KEY2'] = self.api_key2

        config = uvicorn.Config("backend.main:app", host="127.0.0.1",
                                port=8000, log_level="info")
        server = Server(config=config)

        with server.run_in_thread():
            # Server is started.
            self.mainloop_running = True
            while self.mainloop_running:
                self.after(1000, self.logger.info(
                    "Running Server on 127.0.0.1:8000"))
            # Server stopped.


if __name__ == "__main__":
    root = App()
    root.mainloop_running = False
    root.after(500, root.install_requirements)
    root.mainloop()
    root.mainloop_running = False
    root.protocol("WM_DELETE_WINDOW", root.destroy())

#! FIX MULTITHREADING TO AVOID RUNNING SERVER IN BACKGROUND AFTER CLOSING GUI
"""
import contextlib
import time
import threading
import uvicorn
class Server(uvicorn.Server):
    def install_signal_handlers(self):
        pass
    @contextlib.contextmanager
    def run_in_thread(self):
        thread = threading.Thread(target=self.run)
        thread.start()
        try:
            while not self.started:
                time.sleep(1e-3)
            yield
        finally:
            self.should_exit = True
            thread.join()
config = Config("example:app", host="127.0.0.1", port=5000, log_level="info")
server = Server(config=config)
with server.run_in_thread():
    # Server started.
    ...
# Server stopped.
# conftest.py
import pytest
@pytest.fixture(scope="session")
def server():
    server = ...
    with server.run_in_thread():
        yield
"""
