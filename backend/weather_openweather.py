import time
import requests
import json
import weather_weatherapi

api_key = "ede202ebf917a17f6173ccc6cc226c7d"
lon = 7.1911567
lat = 51.4018117

# 5 day / 3 hour forecast data
# https://openweathermap.org/forecast5#limit
# current data
# https://openweathermap.org/current


# CURRENT WEATHER DATA
api_endpoint_1 = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&lang=de&units=metric"


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

    def gather_general_data(self):
        return self.city_name, self.city_sunrise, self.city_sunset

    def gather_temperature_data(self):
        return self.temp_current, self.temp_current_feel, self.temp_min, self.temp_max

    def gather_additional_data(self):
        return self.humidity_current, self.clouds_current, self.weather_current, self.weather_icon_current_link


# FORECAST WEATHER DATA
api_endpoint_2 = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&lang=de&units=metric&cnt=7"
forecast_data = []


def gather_forecast_data():
    fetch_api_2 = requests.get(api_endpoint_2)
    parsed_fetch_2 = json.loads(fetch_api_2.text)

    i = 0
    for items in parsed_fetch_2["list"]:
        data = []
        data.append(time.strftime('%H:%M',
                                  time.localtime(parsed_fetch_2["list"][i]["dt"])))
        data.append(int(parsed_fetch_2["list"][i]["main"]["temp"]))
        data.append(parsed_fetch_2["list"][i]["main"]["humidity"])
        data.append(parsed_fetch_2["list"][i]["clouds"]["all"])
        data.append(parsed_fetch_2["list"][i]["weather"][0]["description"])
        icon_link = parsed_fetch_2["list"][i]["weather"][0]["icon"]
        data.append(f"http://openweathermap.org/img/w/{icon_link}.png")
        forecast_data.append(data)
        i += 1

    for items in forecast_data:
        print(items)


if __name__ == "__main__":
    do_i_want_a_infinite_loop = True
    i_want_a_infinite_loop = do_i_want_a_infinite_loop
    gather_forecast_data()
    print(weather_weatherapi.forecast_uv)

    while i_want_a_infinite_loop:
        current_weather = WeatherData()
        if current_weather.parsed_fetch['cod'] != 200:
            raise Exception(current_weather.parsed_fetch['message'])

        print(
            f"Current temperature: {current_weather.gather_temperature_data()[0]} - Last Updated:", current_weather.last_update())

        for i in range(99, 0, -1):
            time.sleep(1)
