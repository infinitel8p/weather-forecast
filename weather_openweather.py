import time
import requests
import json

api_key = "ede202ebf917a17f6173ccc6cc226c7d"
lon = 7.1911567
lat = 51.4018117

# 5 day / 3 hour forecast data
# https://openweathermap.org/forecast5#limit
# current data
# https://openweathermap.org/current


# Temperature in Kelvin (273.15)
# Time in Unix-Epoch Timeformat

# CURRENT WEATHER DATA
api_endpoint_1 = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&lang=de&units=metric"
fetch_api = requests.get(api_endpoint_1)
parsed_fetch = json.loads(fetch_api.text)

last_update = time.strftime('%H:%M:%S',
                            time.localtime(parsed_fetch["dt"]))

# general information
city_name = parsed_fetch["name"]
city_sunrise = time.strftime('%H:%M',
                             time.localtime(parsed_fetch["sys"]["sunrise"]))
city_sunset = time.strftime('%H:%M',
                            time.localtime(parsed_fetch["sys"]["sunset"]))

# temperature information
temp_current = int(parsed_fetch["main"]["temp"])
temp_current_feel = int(parsed_fetch["main"]["feels_like"])
temp_min = int(parsed_fetch["main"]["temp_min"])
temp_max = int(parsed_fetch["main"]["temp_max"])

# additional information
humidity_current = parsed_fetch["main"]["humidity"]
clouds_current = parsed_fetch["clouds"]["all"]
weather_current = parsed_fetch["weather"][0]["description"]
weather_icon_current = parsed_fetch["weather"][0]["icon"]
weather_icon_current_link = f"http://openweathermap.org/img/w/{weather_icon_current}.png"

# FORECAST WEATHER DATA
api_endpoint_2 = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&lang=de&units=metric&cnt=5"
fetch_api_2 = requests.get(api_endpoint_2)
parsed_fetch_2 = json.loads(fetch_api_2.text)

i = 0
forecast_data = []
for items in parsed_fetch_2["list"]:
    data = []
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
