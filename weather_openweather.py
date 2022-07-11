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

# forecast 1
time_1 = time.strftime('%H:%M',
                       time.localtime(parsed_fetch_2["list"][0]["dt"]))
temp_1 = int(parsed_fetch_2["list"][0]["main"]["temp"])
humidity_1 = parsed_fetch_2["list"][0]["main"]["humidity"]
clouds_1 = parsed_fetch_2["list"][0]["clouds"]["all"]
weather_1 = parsed_fetch_2["list"][0]["weather"]["description"]
weather_icon_1 = parsed_fetch_2["list"][0]["weather"]["icon"]
weather_icon_1_link = f"http://openweathermap.org/img/w/{weather_icon_1}.png"

# forecast 2
time_2 = time.strftime('%H:%M',
                       time.localtime(parsed_fetch_2["list"][1]["dt"]))
temp_2 = int(parsed_fetch_2["list"][1]["main"]["temp"])
humidity_2 = parsed_fetch_2["list"][1]["main"]["humidity"]
clouds_2 = parsed_fetch_2["list"][1]["clouds"]["all"]
weather_2 = parsed_fetch_2["list"][1]["weather"]["description"]
weather_icon_2 = parsed_fetch_2["list"][1]["weather"]["icon"]
weather_icon_2_link = f"http://openweathermap.org/img/w/{weather_icon_2}.png"

# forecast 3
time_3 = time.strftime('%H:%M',
                       time.localtime(parsed_fetch_2["list"][2]["dt"]))
temp_3 = int(parsed_fetch_2["list"][2]["main"]["temp"])
humidity_3 = parsed_fetch_2["list"][2]["main"]["humidity"]
clouds_3 = parsed_fetch_2["list"][2]["clouds"]["all"]
weather_3 = parsed_fetch_2["list"][2]["weather"]["description"]
weather_icon_3 = parsed_fetch_2["list"][2]["weather"]["icon"]
weather_icon_3_link = f"http://openweathermap.org/img/w/{weather_icon_3}.png"

# forecast 4
time_4 = time.strftime('%H:%M',
                       time.localtime(parsed_fetch_2["list"][3]["dt"]))
temp_4 = int(parsed_fetch_2["list"][3]["main"]["temp"])
humidity_4 = parsed_fetch_2["list"][3]["main"]["humidity"]
clouds_4 = parsed_fetch_2["list"][3]["clouds"]["all"]
weather_4 = parsed_fetch_2["list"][3]["weather"]["description"]
weather_icon_4 = parsed_fetch_2["list"][3]["weather"]["icon"]
weather_icon_4_link = f"http://openweathermap.org/img/w/{weather_icon_4}.png"

# forecast 5
time_5 = time.strftime('%H:%M',
                       time.localtime(parsed_fetch_2["list"][4]["dt"]))
temp_5 = int(parsed_fetch_2["list"][4]["main"]["temp"])
humidity_5 = parsed_fetch_2["list"][4]["main"]["humidity"]
clouds_5 = parsed_fetch_2["list"][4]["clouds"]["all"]
weather_5 = parsed_fetch_2["list"][4]["weather"]["description"]
weather_icon_5 = parsed_fetch_2["list"][4]["weather"]["icon"]
weather_icon_5_link = f"http://openweathermap.org/img/w/{weather_icon_5}.png"
