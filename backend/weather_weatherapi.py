import requests
import json

api_key = "9a5bd158b6e74039aeb121921221007"
api_endpoint = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q=Hattingen&days=1&aqi=no&alerts=yes"


fetch_api = requests.get(api_endpoint)
parsed_fetch = json.loads(fetch_api.text)

location_name = parsed_fetch["location"]["name"]
location_time = parsed_fetch["location"]["localtime"]
location_current_temp = parsed_fetch["current"]["temp_c"]
location_current_condition = parsed_fetch["current"]["condition"]["text"]
location_cloudyness = parsed_fetch["current"]["cloud"]
location_humidity = parsed_fetch["current"]["humidity"]

forecast = parsed_fetch["forecast"]["forecastday"][0]
sun_rise = forecast["astro"]["sunrise"]
sun_set = forecast["astro"]["sunset"]

forecast_avg_temp = forecast["day"]["avgtemp_c"]
forecast_min_temp = forecast["day"]["mintemp_c"]
forecast_max_temp = forecast["day"]["maxtemp_c"]
forecast_uv = forecast["day"]["uv"]
forecast_rain = forecast["day"]["daily_will_it_rain"]
forecast_rain_chance = forecast["day"]["daily_chance_of_rain"]
forecast_snow = forecast["day"]["daily_will_it_snow"]
forecast_snow_chance = forecast["day"]["daily_chance_of_snow"]

print(f"""Weather in {location_name} at {location_time}:

Temperature: {location_current_temp}°C
It currently is '{location_current_condition}', with {location_cloudyness}% cloudiness and {location_humidity}% humidity.

DAILY FORECAST:
Average temperature: {forecast_avg_temp}°C ({forecast_min_temp}°C - {forecast_max_temp}°C)
The daily chance of rain today is {forecast_rain_chance}%.
The uv-level throughout the day from sunrise at {sun_rise} to sunset at {sun_set} is {forecast_uv}.""")
