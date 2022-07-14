import requests
import json

test_call = requests.get('http://127.0.0.1:8000/')
test_call_parsed = json.loads(test_call.text)
print(test_call_parsed)

test_call = requests.get('http://127.0.0.1:8000/test')
test_call_parsed = json.loads(test_call.text)
print(test_call_parsed)
