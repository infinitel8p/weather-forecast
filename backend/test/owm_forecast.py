from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from fake_useragent import UserAgent
import time


omw = "https://openweathermap.org/city/2909230"
ua = UserAgent()

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument(f"user-agent={ua.random}")
browser = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=chrome_options)

browser.get(omw)
time.sleep(10)

# get <ul>
ul = browser.find_element(
    By.CLASS_NAME, "day-list")
# get <span> in <ul>
span = ul.find_elements(By.TAG_NAME, "span")
# get all <span> in <li>
span_text = []
for text in span:
    if text.text != '':
        span_text.append(text.text)
