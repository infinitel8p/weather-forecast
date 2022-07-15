from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI
from fastapi.responses import JSONResponse, PlainTextResponse
import time
import requests
import json

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

        self.update_time = time.strftime('%H:%M:%S',
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
        self.weather_icon_current_link = f"http://openweathermap.org/img/w/{self.weather_icon_current}.png"

    def last_update(self):
        return self.update_time


# FORECAST WEATHER DATA
api_endpoint_2 = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key_1}&lang=de&units=metric&cnt=8"
forecast_data = []


class ForecastData:
    def __init__(self):
        self.fetch_api_2 = requests.get(api_endpoint_2)
        self.parsed_fetch_2 = json.loads(self.fetch_api_2.text)

        for item in self.parsed_fetch_2["list"]:
            data = []
            # data.append(time.strftime('%H:%M',time.localtime(self.parsed_fetch_2["list"][self.i]["dt"])))
            data.append(item["dt_txt"])
            data.append(int(item["main"]["temp"]))
            data.append(item["main"]["humidity"])
            data.append(item["clouds"]["all"])
            data.append(item["weather"][0]["description"])
            icon_link = item["weather"][0]["icon"]
            # old link http://openweathermap.org/img/w/{icon_link}.png
            data.append(f"http://openweathermap.org/img/wn/{icon_link}@4x.png")
            forecast_data.append(data)


# ADDITIONAL DATA
api_endpoint_3 = f"http://api.weatherapi.com/v1/forecast.json?key={api_key_2}&q={target}&days=2&aqi=no&alerts=yes"


class AdditionalData:
    def __init__(self):
        self.fetch_api_3 = requests.get(api_endpoint_3)
        self.parsed_fetch_3 = json.loads(self.fetch_api_3.text)
        self.uv_current = int(self.parsed_fetch_3["current"]["uv"])
        self.rain_forecast_1 = self.parsed_fetch_3["forecast"]["forecastday"][0]["hour"]
        self.rain_forecast_2 = self.parsed_fetch_3["forecast"]["forecastday"][1]["hour"]

        for i in self.rain_forecast_1:
            for i2 in forecast_data:
                if i["time"] in str(i2[0]):
                    i2.insert(4, i["chance_of_rain"])
        for i in self.rain_forecast_2:
            for i2 in forecast_data:
                if i["time"] in str(i2[0]):
                    i2.insert(4, i["chance_of_rain"])

    def test_function(self):
        print("\nDaily Chance of rain",
              self.parsed_fetch_3["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"], "\n")


class TestUpdates:
    def __init__(self):
        self.fetch_time = requests.get(
            'http://worldtimeapi.org/api/timezone/Europe/London')
        self.parsed_time = json.loads(self.fetch_time.text)['datetime']

    def get_time(self):
        return self.parsed_time


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500",
    "null"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

forecast_weather = ForecastData()


@app.get("/")
async def root():
    current_weather = WeatherData()
    test_time = TestUpdates()
    return {"last_update": f"{current_weather.last_update()}", "current_time": test_time.get_time()}


@app.get("/test")
async def root():
    additional_weather = AdditionalData()
    current_weather = WeatherData()
    return JSONResponse(media_type="application/json", content={"city": current_weather.city_name,
                                                                "temperature": current_weather.temp_current,
                                                                "temperatur_feels_like": current_weather.temp_current_feel,
                                                                "weather_description": current_weather.weather_current,
                                                                "humidity": current_weather.humidity_current,
                                                                "cloudy": current_weather.clouds_current,
                                                                "uv": additional_weather.uv_current,
                                                                "last_update": current_weather.update_time,
                                                                "sunrise": current_weather.city_sunrise,
                                                                "sunset": current_weather.city_sunset
                                                                })

# python -m uvicorn backend.test.api_test:app --reload
# http://127.0.0.1:8000/docs
# http://127.0.0.1:8000/redoc
# https://fastapi.tiangolo.com/
