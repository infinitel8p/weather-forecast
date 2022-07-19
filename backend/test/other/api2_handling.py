# imports only so linter doesnt show errors
import time
import json
import locale
import requests
import fastapi
from fastapi.responses import JSONResponse
api_key_2 = 0
target = 0

# FORECAST WEATHER DATA DAY
api_endpoint_3 = f"http://api.weatherapi.com/v1/forecast.json?key={api_key_2}&q={target}&days=3&aqi=no&alerts=yes"


class ForecastDataWeek:
    def __init__(self):
        self.fetch_api_3 = requests.get(api_endpoint_3)
        self.parsed_fetch_3 = json.loads(self.fetch_api_3.text)
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


app = fastapi.FastAPI


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
