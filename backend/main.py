import traceback
import time
import os
import json
import requests

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

api_key_1 = os.environ['API_KEY1']
api_key_2 = os.environ['API_KEY2']

# Remove environment variables
os.environ.pop('API_KEY1', None)
os.environ.pop('API_KEY2', None)

# CURRENT WEATHER DATA //&lang=de


class WeatherData:
    def __init__(self, lat, lon):
        self.data = {}

        #
        # FORECAST WEATHER DATA CURRENT

        api_endpoint_1 = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key_1}&units=metric"

        self.fetch_api = requests.get(api_endpoint_1)
        self.parsed_fetch = json.loads(self.fetch_api.text)

        self.update_time = time.strftime('%H:%M',
                                         time.localtime(self.parsed_fetch["dt"]))

        # general information
        self.city_name = self.parsed_fetch["name"]
        self.city_id = self.parsed_fetch["id"]
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
        self.weather_icon_current_link = f"https://openweathermap.org/img/wn/{self.weather_icon_current}@4x.png"

        self.data["current"] = {"city": self.city_name,
                                "temperature": self.temp_current,
                                "temperatur_feels_like": self.temp_current_feel,
                                "weather_description": self.weather_current,
                                "humidity": self.humidity_current,
                                "clouds": self.clouds_current,
                                "last_update": self.update_time,
                                "sunrise": self.city_sunrise,
                                "sunset": self.city_sunset,
                                "icon": self.weather_icon_current_link
                                }

        #
        # FORECAST WEATHER DATA DAY

        api_endpoint_2 = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key_1}&units=metric&cnt=8"

        self.fetch_api_2 = requests.get(api_endpoint_2)
        self.parsed_fetch_2 = json.loads(self.fetch_api_2.text)
        self.forecast_data_day = []
        for item in self.parsed_fetch_2["list"]:
            data = []
            data.append(f"{item['dt_txt'].split(' ')[0].split('-')[2]}.{item['dt_txt'].split(' ')[0].split('-')[1]} - {item['dt_txt'].split(' ')[1].split(':')[0]}:{item['dt_txt'].split(' ')[1].split(':')[1]}")
            data.append(int(item["main"]["temp"]))
            data.append(item["main"]["humidity"])
            data.append(item["clouds"]["all"])
            data.append(1337)
            data.append(item["weather"][0]["description"])
            icon_link = item["weather"][0]["icon"]
            # old link https://openweathermap.org/img/w/{icon_link}.png
            data.append(
                f"https://openweathermap.org/img/wn/{icon_link}@4x.png")
            self.forecast_data_day.append(data)

        forecast_weather_day = {}
        for i in range(1, 9):
            forecast_weather_day[f"forecast{i}"] = {}
            forecast_weather_day[f"forecast{i}"]["time"] = self.forecast_data_day[i-1][0]
            forecast_weather_day[f"forecast{i}"]["temp"] = self.forecast_data_day[i-1][1]
            forecast_weather_day[f"forecast{i}"]["humidity"] = self.forecast_data_day[i-1][2]
            forecast_weather_day[f"forecast{i}"]["clouds"] = self.forecast_data_day[i-1][3]
            forecast_weather_day[f"forecast{i}"]["rain"] = self.forecast_data_day[i-1][4]
            forecast_weather_day[f"forecast{i}"]["description"] = self.forecast_data_day[i-1][5]
            forecast_weather_day[f"forecast{i}"]["icon"] = self.forecast_data_day[i-1][6]

        self.data["day"] = forecast_weather_day

        #
        # FORECAST WEATHER DATA WEEK

        api_endpoint_3 = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto"

        self.fetch_api_3 = requests.get(api_endpoint_3)
        self.parsed_fetch = json.loads(self.fetch_api_3.text)
        self.forecast_data_week = []
        self.wmo_codes = {
            0: ["Clear sky", "01d"],
            1: ["Mainly clear", "02d"],
            2: ["Partly cloudy", "03d"],
            3: ["Overcast", "04d"],
            45: ["Fog", "50d"],
            48: ["Depositing rime fog", "50d"],
            51: ["Light drizzle", "09d"],
            53: ["Moderate drizzle", "09d"],
            55: ["Dense drizzle", "09d"],
            56: ["Light freezing drizzle", "01d"],
            57: ["Dense freezing drizzle", "01d"],
            61: ["Slight rain", "10d"],
            63: ["Moderate rain", "10d"],
            65: ["Heavy rain", "10d"],
            66: ["Light freezing rain", "13d"],
            67: ["Heavy freezing rain", "13d"],
            71: ["Slight snow", "13d"],
            73: ["Moderate snow", "13d"],
            75: ["Heavy snow", "13d"],
            77: ["Snow grains", "13d"],
            80: ["Slight rain showers", "09d"],
            81: ["Moderate rain showers", "09d"],
            82: ["Violent rain showers", "09d"],
            85: ["Slight snow showers", "13d"],
            86: ["Heavy snow showers", "13d"],
            95: ["Slight thunderstorm", "01d"],
            96: ["Thunderstorm with slight hail", "11d"],
            99: ["Thunderstorm with heavy hail", "11d"],
        }
        for i in range(0, 5):
            data = []
            data.append(self.parsed_fetch["daily"]["time"][i])
            data.append(self.parsed_fetch["daily"]["weathercode"][i])
            data.append(
                f'{self.parsed_fetch["daily"]["temperature_2m_min"][i]} / {self.parsed_fetch["daily"]["temperature_2m_max"][i]}°C')
            data.append(
                self.wmo_codes[self.parsed_fetch["daily"]["weathercode"][i]][0])
            data.append(
                f'https://openweathermap.org/img/wn/{self.wmo_codes[self.parsed_fetch["daily"]["weathercode"][i]][1]}@4x.png')
            self.forecast_data_week.append(data)

            self.data["week"] = self.forecast_data_week

            #
            # ADDITIONAL DATA

            api_endpoint_4 = f"http://api.weatherapi.com/v1/forecast.json?key={api_key_2}&q={self.city_name}&days=2&aqi=no&alerts=yes"

            self.fetch_api_4 = requests.get(api_endpoint_4)
            self.parsed_fetch_4 = json.loads(self.fetch_api_4.text)
            self.uv_current = int(self.parsed_fetch_4["current"]["uv"])
            self.rain_forecast_1 = self.parsed_fetch_4["forecast"]["forecastday"][0]["hour"]
            self.rain_forecast_2 = self.parsed_fetch_4["forecast"]["forecastday"][1]["hour"]

            # go through items of rain api
            for i in self.rain_forecast_1:
                # for every item of rain api check the items of the forecast
                for i2 in self.forecast_data_day:
                    # check if the day is in the current item of the forecast
                    if i["time"].split(" ")[0].split("-")[2] + "." + i["time"].split(" ")[0].split("-")[1] in i2[0]:
                        # if the day was in the forecast check if time of the current rain forecast item is in the current forecast
                        if i["time"].split(" ")[1] in i2[0]:
                            # set value 1337 of rain in forecast to rain api value
                            i2[4] = i["chance_of_rain"]
            for i in self.rain_forecast_2:
                for i2 in self.forecast_data_day:
                    if i["time"].split(" ")[0].split("-")[2] + "." + i["time"].split(" ")[0].split("-")[1] in i2[0]:
                        if i["time"].split(" ")[1] in i2[0]:
                            i2[4] = i["chance_of_rain"]

            self.data["uv"] = self.uv_current


app = FastAPI()

origins = ["*",
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


async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        err = traceback.format_exception(type(e), e, e.__traceback__)
        return JSONResponse(content={"traceback": err}, status_code=500)

app.middleware('http')(catch_exceptions_middleware)


@app.post("/get_location")
async def get_location(request: Request):
    position = await request.json()
    lat = position['latitude']
    lon = position['longitude']
    current_weather = WeatherData(lat, lon)
    return JSONResponse(media_type="application/json", content=current_weather.data)
