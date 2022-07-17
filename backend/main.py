import os
import json
import requests
import time
import locale
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


# CURRENT WEATHER DATA
api_endpoint_1 = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_1}&lang=de&units=metric"


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


# FORECAST WEATHER DATA DAY
api_endpoint_2 = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key_1}&lang=de&units=metric&cnt=8"
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


# FORECAST WEATHER DATA DAY
api_endpoint_3 = f"http://api.weatherapi.com/v1/forecast.json?key={api_key_2}&q={target}&days=3&aqi=no&alerts=yes"


class ForecastDataWeek:
    def __init__(self):
        self.fetch_api_3 = requests.get(api_endpoint_3)
        self.parsed_fetch_3 = json.loads(self.fetch_api_3.text)
        # todo add name of day
        locale.setlocale(locale.LC_ALL, "german")
        # Day1
        self.date_1 = self.parsed_fetch_3["forecast"]["forecastday"][0]["date"]
        self.day_1 = time.strftime('%A', time.localtime(
            self.parsed_fetch_3["forecast"]["forecastday"][0]["date_epoch"]))
        self.icon_1 = "https:" + \
            self.parsed_fetch_3["forecast"]["forecastday"][0]["day"]["condition"]["icon"]
        self.mintemp_c_1 = self.parsed_fetch_3["forecast"]["forecastday"][0]["day"]["mintemp_c"]
        self.maxtemp_c_1 = self.parsed_fetch_3["forecast"]["forecastday"][0]["day"]["maxtemp_c"]
        # Day2
        self.date_2 = self.parsed_fetch_3["forecast"]["forecastday"][1]["date"]
        self.day_2 = time.strftime('%A', time.localtime(
            self.parsed_fetch_3["forecast"]["forecastday"][1]["date_epoch"]))
        self.icon_2 = "https:" + \
            self.parsed_fetch_3["forecast"]["forecastday"][1]["day"]["condition"]["icon"]
        self.mintemp_c_2 = self.parsed_fetch_3["forecast"]["forecastday"][1]["day"]["mintemp_c"]
        self.maxtemp_c_2 = self.parsed_fetch_3["forecast"]["forecastday"][1]["day"]["maxtemp_c"]
        # Day3
        self.date_3 = self.parsed_fetch_3["forecast"]["forecastday"][2]["date"]
        self.day_3 = time.strftime('%A', time.localtime(
            self.parsed_fetch_3["forecast"]["forecastday"][2]["date_epoch"]))
        self.icon_3 = "https:" + \
            self.parsed_fetch_3["forecast"]["forecastday"][2]["day"]["condition"]["icon"]
        self.mintemp_c_3 = self.parsed_fetch_3["forecast"]["forecastday"][2]["day"]["mintemp_c"]
        self.maxtemp_c_3 = self.parsed_fetch_3["forecast"]["forecastday"][2]["day"]["maxtemp_c"]


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

forecast_weather_week = ForecastDataWeek()


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
    additional_weather = AdditionalData()
    return JSONResponse(media_type="application/json", content={"forecast1": {"time": forecast_weather.forecast_data[0][0],
                                                                              "temp": forecast_weather.forecast_data[0][1],
                                                                              "humidity": forecast_weather.forecast_data[0][2],
                                                                              "clouds": forecast_weather.forecast_data[0][3],
                                                                              "rain": forecast_weather.forecast_data[0][4],
                                                                              "icon": forecast_weather.forecast_data[0][6]},
                                                                "forecast2": {"time": forecast_weather.forecast_data[1][0],
                                                                              "temp": forecast_weather.forecast_data[1][1],
                                                                              "humidity": forecast_weather.forecast_data[1][2],
                                                                              "clouds": forecast_weather.forecast_data[1][3],
                                                                              "rain": forecast_weather.forecast_data[1][4],
                                                                              "icon": forecast_weather.forecast_data[1][6]},
                                                                "forecast3": {"time": forecast_weather.forecast_data[2][0],
                                                                              "temp": forecast_weather.forecast_data[2][1],
                                                                              "humidity": forecast_weather.forecast_data[2][2],
                                                                              "clouds": forecast_weather.forecast_data[2][3],
                                                                              "rain": forecast_weather.forecast_data[2][4],
                                                                              "icon": forecast_weather.forecast_data[2][6]},
                                                                "forecast4": {"time": forecast_weather.forecast_data[3][0],
                                                                              "temp": forecast_weather.forecast_data[3][3],
                                                                              "humidity": forecast_weather.forecast_data[3][2],
                                                                              "clouds": forecast_weather.forecast_data[3][1],
                                                                              "rain": forecast_weather.forecast_data[3][4],
                                                                              "icon": forecast_weather.forecast_data[3][6]},
                                                                "forecast5": {"time": forecast_weather.forecast_data[4][0],
                                                                              "temp": forecast_weather.forecast_data[4][1],
                                                                              "humidity": forecast_weather.forecast_data[4][2],
                                                                              "clouds": forecast_weather.forecast_data[4][3],
                                                                              "rain": forecast_weather.forecast_data[4][4],
                                                                              "icon": forecast_weather.forecast_data[4][6]},
                                                                "forecast6": {"time": forecast_weather.forecast_data[5][0],
                                                                              "temp": forecast_weather.forecast_data[5][1],
                                                                              "humidity": forecast_weather.forecast_data[5][2],
                                                                              "clouds": forecast_weather.forecast_data[5][3],
                                                                              "rain": forecast_weather.forecast_data[5][4],
                                                                              "icon": forecast_weather.forecast_data[5][6]},
                                                                "forecast7": {"time": forecast_weather.forecast_data[6][0],
                                                                              "temp": forecast_weather.forecast_data[6][1],
                                                                              "humidity": forecast_weather.forecast_data[6][2],
                                                                              "clouds": forecast_weather.forecast_data[6][3],
                                                                              "rain": forecast_weather.forecast_data[6][4],
                                                                              "icon": forecast_weather.forecast_data[6][6]},
                                                                "forecast8": {"time": forecast_weather.forecast_data[7][0],
                                                                              "temp": forecast_weather.forecast_data[7][1],
                                                                              "humidity": forecast_weather.forecast_data[7][2],
                                                                              "clouds": forecast_weather.forecast_data[7][3],
                                                                              "rain": forecast_weather.forecast_data[7][4],
                                                                              "icon": forecast_weather.forecast_data[7][6]}})


@app.get("/forecast_weather_week")
async def root():
    forecast_weather_week = ForecastDataWeek()
    return JSONResponse(media_type="application/json", content={"day1": {"date": forecast_weather_week.date_1,
                                                                         "day": forecast_weather_week.day_1,
                                                                         "icon": forecast_weather_week.icon_1,
                                                                         "temp_min": forecast_weather_week.mintemp_c_1,
                                                                         "temp_max": forecast_weather_week.maxtemp_c_1},
                                                                "day2": {"date": forecast_weather_week.date_2,
                                                                         "day": forecast_weather_week.day_2,
                                                                         "icon": forecast_weather_week.icon_2,
                                                                         "temp_min": forecast_weather_week.mintemp_c_2,
                                                                         "temp_max": forecast_weather_week.maxtemp_c_2},
                                                                "day3": {"date": forecast_weather_week.date_3,
                                                                         "day": forecast_weather_week.day_3,
                                                                         "icon": forecast_weather_week.icon_3,
                                                                         "temp_min": forecast_weather_week.mintemp_c_3,
                                                                         "temp_max": forecast_weather_week.maxtemp_c_3}})


@app.get("/additional_weather")
async def root():
    additional_weather = AdditionalData()
    return JSONResponse(media_type="application/json", content={"uv": additional_weather.uv_current})


# python -m uvicorn backend.main:app --reload
