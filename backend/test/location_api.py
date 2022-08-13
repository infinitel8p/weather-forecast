import requests
import json
target = input("Which city?\n")
link = f"https://openweathermap.org/data/2.5/find?q={target}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric"

get_data = requests.get(link)
parsed_data = json.loads(get_data.text)

print(parsed_data)
