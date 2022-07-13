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

        self.i = 0
        for items in self.parsed_fetch_2["list"]:
            data = []
            # data.append(time.strftime('%H:%M',time.localtime(self.parsed_fetch_2["list"][self.i]["dt"])))
            data.append(self.parsed_fetch_2["list"][self.i]["dt_txt"])
            data.append(
                int(self.parsed_fetch_2["list"][self.i]["main"]["temp"]))
            data.append(self.parsed_fetch_2["list"]
                        [self.i]["main"]["humidity"])
            data.append(self.parsed_fetch_2["list"][self.i]["clouds"]["all"])
            data.append(self.parsed_fetch_2["list"]
                        [self.i]["weather"][0]["description"])
            icon_link = self.parsed_fetch_2["list"][self.i]["weather"][0]["icon"]
            data.append(f"http://openweathermap.org/img/w/{icon_link}.png")
            forecast_data.append(data)
            self.i += 1

    def test_function(self):
        for i in forecast_data:
            print(i)


# ADDITIONAL DATA
api_endpoint_3 = f"http://api.weatherapi.com/v1/forecast.json?key={api_key_2}&q={target}&days=2&aqi=no&alerts=yes"


class AdditionalData:
    def __init__(self):
        self.fetch_api_3 = requests.get(api_endpoint_3)
        self.parsed_fetch_3 = json.loads(self.fetch_api_3.text)

        self.uv_current = int(self.parsed_fetch_3["current"]["uv"])

        # todo add hourly chance of rain
        self.rain_forecast_1 = self.parsed_fetch_3["forecast"]["forecastday"][0]["hour"]
        self.rain_forecast_2 = self.parsed_fetch_3["forecast"]["forecastday"][1]["hour"]

    def test_function(self):
        print("\nDaily Chance of rain",
              self.parsed_fetch_3["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"], "\n")


if __name__ == "__main__":
    current_weather = WeatherData()
    """if current_weather.parsed_fetch['cod'] != 200:
        raise Exception(current_weather.parsed_fetch['message'])"""

    forecast_weather = ForecastData()
    forecast_weather.test_function()

    additional_weather = AdditionalData()
    additional_weather.test_function()

    for i in additional_weather.rain_forecast_1:
        for i2 in forecast_data:
            if i["time"] in str(i2[0]):
                print(i["time"], i["chance_of_rain"])
    for i in additional_weather.rain_forecast_2:
        for i2 in forecast_data:
            if i["time"] in str(i2[0]):
                print(i["time"], i["chance_of_rain"])
