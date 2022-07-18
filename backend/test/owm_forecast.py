from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from fake_useragent import UserAgent


omw = "https://openweathermap.org/city/2909230"
ua = UserAgent()

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument(f"user-agent={ua.random}")
browser = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=chrome_options)
browser.implicitly_wait(10)

browser.get(omw)

# get <ul>
ul = browser.find_element(By.CLASS_NAME, "day-list")
# get <span> in <ul>
span = ul.find_elements(By.TAG_NAME, "span")
# get all text in <span>
span_text = []
for text in span:
    if text.text != '':
        span_text.append(text.text)

# get <svg> in <ul>
svg_html = []
svg = ul.find_elements(By.CLASS_NAME, "owm-weather-icon")
for objects in svg:
    svg_html.append(objects.get_attribute('outerHTML'))
