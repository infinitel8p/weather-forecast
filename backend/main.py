import os
import json
import requests
import time
from selenium import webdriver
from fake_useragent import UserAgent
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import JSONResponse, HTMLResponse

api_key_1 = "ede202ebf917a17f6173ccc6cc226c7d"
api_key_2 = "9a5bd158b6e74039aeb121921221007"
target = "Hattingen"
lon = 7.1911567
lat = 51.4018117

# 5 day / 3 hour forecast data
# https://openweathermap.org/forecast5#limit
# current data
# https://openweathermap.org/current


# CURRENT WEATHER DATA //&lang=de
api_endpoint_1 = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_1}&units=metric"


class WeatherData:
    def __init__(self):
        self.fetch_api = requests.get(api_endpoint_1)
        self.parsed_fetch = json.loads(self.fetch_api.text)

        self.update_time = time.strftime('%H:%M',
                                         time.localtime(self.parsed_fetch["dt"]))

        # general information
        self.city_name = self.parsed_fetch["name"]
        self.city_sunrise = time.strftime('%H:%M',
                                          time.localtime(self.parsed_fetch["sys"]["sunrise"]))
        self.city_sunset = time.strftime('%H:%M',
                                         time.localtime(self.parsed_fetch["sys"]["sunset"]))

        # temperature information
        self.temp_current = int(self.parsed_fetch["main"]["temp"])
        self.temp_current_feel = int(self.parsed_fetch["main"]["feels_like"])
        self.temp_min = int(self.parsed_fetch["main"]["temp_min"])
        self.temp_max = int(self.parsed_fetch["main"]["temp_max"])

        # additional information
        self.humidity_current = self.parsed_fetch["main"]["humidity"]
        self.clouds_current = self.parsed_fetch["clouds"]["all"]
        self.weather_current = self.parsed_fetch["weather"][0]["description"]
        self.weather_icon_current = self.parsed_fetch["weather"][0]["icon"]
        self.weather_icon_current_link = f"http://openweathermap.org/img/wn/{self.weather_icon_current}@4x.png"

    def last_update(self):
        return self.update_time


# FORECAST WEATHER DATA DAY //lang=de
api_endpoint_2 = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key_1}&units=metric&cnt=8"
forecast_data = []


class ForecastDataDay():
    def __init__(self):
        self.fetch_api_2 = requests.get(api_endpoint_2)
        self.parsed_fetch_2 = json.loads(self.fetch_api_2.text)
        self.forecast_data = []
        for item in self.parsed_fetch_2["list"]:
            data = []
            # data.append(time.strftime('%H:%M',time.localtime(self.parsed_fetch_2["list"][self.i]["dt"])))
            data.append(item["dt_txt"])
            data.append(int(item["main"]["temp"]))
            data.append(item["main"]["humidity"])
            data.append(item["clouds"]["all"])
            data.append(1337)
            data.append(item["weather"][0]["description"])
            icon_link = item["weather"][0]["icon"]
            # old link http://openweathermap.org/img/w/{icon_link}.png
            data.append(f"http://openweathermap.org/img/wn/{icon_link}@4x.png")
            self.forecast_data.append(data)

        global forecast_data
        forecast_data = self.forecast_data


# ADDITIONAL DATA
api_endpoint_4 = f"http://api.weatherapi.com/v1/forecast.json?key={api_key_2}&q={target}&days=2&aqi=no&alerts=yes"


class AdditionalData:
    def __init__(self):
        self.fetch_api_3 = requests.get(api_endpoint_4)
        self.parsed_fetch_3 = json.loads(self.fetch_api_3.text)
        self.uv_current = int(self.parsed_fetch_3["current"]["uv"])
        self.rain_forecast_1 = self.parsed_fetch_3["forecast"]["forecastday"][0]["hour"]
        self.rain_forecast_2 = self.parsed_fetch_3["forecast"]["forecastday"][1]["hour"]

        for i in self.rain_forecast_1:
            for i2 in forecast_data:
                if i["time"] in str(i2[0]):
                    i2[4] = i["chance_of_rain"]
        for i in self.rain_forecast_2:
            for i2 in forecast_data:
                if i["time"] in str(i2[0]):
                    i2[4] = i["chance_of_rain"]


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500",
    "null",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_class=HTMLResponse)
async def root():
    landingpage = open(os.path.dirname(__file__) + "/.."
                       "/frontend/test/fastapi_landingpage.html", "r", encoding='utf-8').read()
    return landingpage


@app.get("/index.html", response_class=HTMLResponse)
async def root():
    landingpage = open(os.path.dirname(__file__) + "/.."
                       "/frontend/test/index.html", "r", encoding='utf-8').read()
    return landingpage


@app.get("/current_weather")
async def root():
    current_weather = WeatherData()
    return JSONResponse(media_type="application/json", content={"city": current_weather.city_name,
                                                                "temperature": current_weather.temp_current,
                                                                "temperatur_feels_like": current_weather.temp_current_feel,
                                                                "weather_description": current_weather.weather_current,
                                                                "humidity": current_weather.humidity_current,
                                                                "cloudy": current_weather.clouds_current,
                                                                "last_update": current_weather.update_time,
                                                                "sunrise": current_weather.city_sunrise,
                                                                "sunset": current_weather.city_sunset,
                                                                "icon": current_weather.weather_icon_current_link
                                                                })


@app.get("/forecast_weather_day")
async def root():
    forecast_weather = ForecastDataDay()
    # ! additional_weather has to be left in since it provides rain percentage
    additional_weather = AdditionalData()

    # create output
    forecast_weather_day = {}

    for i in range(1, 9):
        forecast_weather_day[f"forecast{i}"] = {}
        forecast_weather_day[f"forecast{i}"]["time"] = forecast_weather.forecast_data[i-1][0]
        forecast_weather_day[f"forecast{i}"]["temp"] = forecast_weather.forecast_data[i-1][1]
        forecast_weather_day[f"forecast{i}"]["humidity"] = forecast_weather.forecast_data[i-1][2]
        forecast_weather_day[f"forecast{i}"]["clouds"] = forecast_weather.forecast_data[i-1][3]
        forecast_weather_day[f"forecast{i}"]["rain"] = forecast_weather.forecast_data[i-1][4]
        forecast_weather_day[f"forecast{i}"]["icon"] = forecast_weather.forecast_data[i-1][6]

    return JSONResponse(media_type="application/json", content=forecast_weather_day)


@ app.get("/forecast_weather_week", response_class=HTMLResponse)
async def root():

    omw = "https://openweathermap.org/city/2909230"
    ua = UserAgent()

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument(f"user-agent={ua.random}")
    browser = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=chrome_options)
    browser.implicitly_wait(10)

    browser.get(omw)

    # get <ul>
    ul = browser.find_element(By.CLASS_NAME, "day-list")
    # get <span> in <ul>
    span = ul.find_elements(By.TAG_NAME, "span")
    # get all text in <span>
    span_text = []
    for text in span:
        if text.text != '':
            span_text.append(text.text)

    # get <svg> in <ul>
    svg_html = []
    svg = ul.find_elements(By.CLASS_NAME, "owm-weather-icon")
    for objects in svg:
        svg_html.append(objects.get_attribute('outerHTML'))

    # create output
    forecast_weather_week = {}
    index = 0

    for i in range(1, 9):
        forecast_weather_week[f"day{i}"] = {}
        forecast_weather_week[f"day{i}"]["day"] = span_text[index]
        forecast_weather_week[f"day{i}"]["temp"] = span_text[index+1]
        forecast_weather_week[f"day{i}"]["condition"] = span_text[index+2]
        forecast_weather_week[f"day{i}"]["svg"] = svg_html[i-1]
        index += 3

    return JSONResponse(media_type="application/json", content=forecast_weather_week)


@ app.get("/additional_weather")
async def root():
    additional_weather = AdditionalData()
    return JSONResponse(media_type="application/json", content={"uv": additional_weather.uv_current})
