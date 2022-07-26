async function fetchCurrentWeather() {
  let response = await fetch("http://127.0.0.1:8000/current_weather")

  console.log(response.status, response.statusText) // 200 OK

  if (response.status === 200) {
    var data = await response.text()
    // handle data
    // convert var data to json object
    data = JSON.parse(data)
    console.log(data)
    document.getElementById("city").textContent = data.city
    document.getElementById("temperature").textContent =
      "Temperatur: " + data.temperature + "°C"
    document.getElementById("temperatur_feels_like").textContent =
      "Gefühlt: " + data.temperatur_feels_like + "°C"
    document.getElementById("weather_description").textContent =
      data.weather_description
    document.getElementById("humidity").textContent =
      "Luftfeuchtigkeit: " + data.humidity + "%"
    document.getElementById("clouds").textContent =
      "Wolken: " + data.clouds + "%"
    document.getElementById("last_update").textContent = " " + data.last_update
    document.getElementById("sunrise").textContent = " " + data.sunrise
    document.getElementById("sunset").textContent = " " + data.sunset
    document.getElementById("icon_current").src = data.icon
    document.getElementById("current_weather").textContent =
      data.weather_description

    var img = document.createElement("img")
    img.src = "styles/icons/sync.png"
    var div = document.getElementById("last_update")
    div.prepend(img)
    img.style.height = "15px"
    img.style.width = "auto"
    img.alt = ""

    var img = document.createElement("img")
    img.src = "styles/icons/sunrise.png"
    var div = document.getElementById("sunrise")
    div.prepend(img)
    img.style.height = "auto"
    img.style.width = "20px"
    img.alt = ""

    var img = document.createElement("img")
    img.src = "styles/icons/sunset.png"
    var div = document.getElementById("sunset")
    div.prepend(img)
    img.style.height = "auto"
    img.style.width = "20px"
    img.alt = ""
  }
}
async function fetchUv() {
  let response = await fetch("http://127.0.0.1:8000/additional_weather")

  console.log(response.status, response.statusText) // 200 OK

  if (response.status === 200) {
    var data = await response.text()
    // handle data
    // convert var data to json object
    data = JSON.parse(data)
    console.log(data)
    document.getElementById("uv").textContent = "UV Index: " + data.uv
  }
}

async function fetchForecastWeatherWeek() {
  let response = await fetch("http://127.0.0.1:8000/forecast_weather_week")

  console.log(response.status, response.statusText) // 200 OK

  if (response.status === 200) {
    var data = await response.text()
    // handle data
    // convert var data to json object
    data = JSON.parse(data)
    console.log(data)
    for (let i = 1; i < 6; i++) {
      document.getElementById("day_pred_" + i).textContent = data[`day${i}`].day
      document.getElementById("temp_min_" + i).textContent =
        data[`day${i}`].temp
      document.getElementById("temp_max_" + i).textContent =
        data[`day${i}`].condition
    }

    const iconWrappers = document.querySelectorAll(".icon-wrapper")
    iconWrappers.forEach((iconWrapper, i) => {
      iconWrapper.innerHTML = data[`day${i + 1}`].svg
      const icon = iconWrapper.querySelector("svg")
      icon.setAttribute("height", "150")
      icon.setAttribute("width", "150")
      icon.removeAttribute("data-v-5ed3171e")
    })
  }
}

async function fetchForecastWeatherDay() {
  let response = await fetch("http://127.0.0.1:8000/forecast_weather_day")

  console.log(response.status, response.statusText) // 200 OK

  if (response.status === 200) {
    var data = await response.text()
    // handle data
    // convert var data to json object
    data = JSON.parse(data)
    console.log(data)
    for (let i = 1; i < 9; i++) {
      document.getElementById("time_" + i).textContent =
        data[`forecast${i}`].time
      document.getElementById("icon_hrs_" + i).src = data[`forecast${i}`].icon
      document.getElementById("icon_hrs_" + i).setAttribute("height", "125px")
      document.getElementById("icon_hrs_" + i).setAttribute("width", "125px")
      document.getElementById("weather_description_" + i).textContent =
        data[`forecast${i}`].description
      document.getElementById("temp_" + i).textContent =
        "temp:" + data[`forecast${i}`].temp
      document.getElementById("humidity_" + i).textContent =
        "humi:" + data[`forecast${i}`].humidity
      document.getElementById("rain_" + i).textContent =
        "rain:" + data[`forecast${i}`].rain
      document.getElementById("clouds_" + i).textContent =
        "cloud:" + data[`forecast${i}`].clouds
    }
  }
}

fetchCurrentWeather()
fetchUv()
fetchForecastWeatherWeek()
fetchForecastWeatherDay()
