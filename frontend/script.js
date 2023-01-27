async function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async function (position) {
			// set location coordinates
			const location = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			};
			// send post request with coordinates to api
			let response = await fetch("http://127.0.0.1:8000/get_location", {
				method: "POST",
				body: JSON.stringify(location),
				headers: { "Content-Type": "application/json" },
			});

			if (response.status === 200) {
				var data = await response.text();
				// handle data
				// convert var data to json object
				data = JSON.parse(data);
				console.log(data);

				// Data for current weather
				document.getElementById("city").textContent = data["current"].city;
				document.getElementById("temperature").textContent =
					"Temperatur: " + data["current"].temperature + "°C";
				document.getElementById("temperatur_feels_like").textContent =
					"Gefühlt: " + data["current"].temperatur_feels_like + "°C";
				document.getElementById("weather_description").textContent =
					data["current"].weather_description;
				document.getElementById("humidity").textContent =
					"Luftfeuchtigkeit: " + data["current"].humidity + "%";
				document.getElementById("clouds").textContent = "Wolken: " + data["current"].clouds + "%";
				document.getElementById("last_update").textContent = " " + data["current"].last_update;
				document.getElementById("sunrise").textContent = " " + data["current"].sunrise;
				document.getElementById("sunset").textContent = " " + data["current"].sunset;
				document.getElementById("icon_current").src = data["current"].icon;
				document.getElementById("current_weather").textContent =
					data["current"].weather_description;
				document.getElementById("uv").textContent = "UV Index: " + data.uv;

				var img_sync = document.createElement("img");
				img_sync.src = "styles/icons/sync.png";
				var div_sync = document.getElementById("last_update");
				div_sync.prepend(img_sync);
				img_sync.style.height = "15px";
				img_sync.style.width = "auto";
				img_sync.alt = "";

				var img_sunrise = document.createElement("img");
				img_sunrise.src = "styles/icons/sunrise.png";
				var div_sunrise = document.getElementById("sunrise");
				div_sunrise.prepend(img_sunrise);
				img_sunrise.style.height = "auto";
				img_sunrise.style.width = "20px";
				img_sunrise.alt = "";

				var img_sunset = document.createElement("img");
				img_sunset.src = "styles/icons/sunset.png";
				var div_sunset = document.getElementById("sunset");
				div_sunset.prepend(img_sunset);
				img_sunset.style.height = "auto";
				img_sunset.style.width = "20px";
				img_sunset.alt = "";

				// Data for the day
				for (let i = 1; i < 9; i++) {
					document.getElementById("time_" + i).textContent = data["day"][`forecast${i}`].time;
					document.getElementById("icon_hrs_" + i).src = data["day"][`forecast${i}`].icon;
					document.getElementById("icon_hrs_" + i).setAttribute("height", "100px");
					document.getElementById("icon_hrs_" + i).setAttribute("width", "100px");
					document.getElementById("weather_description_" + i).textContent =
						data["day"][`forecast${i}`].description;
					document.getElementById("temp_" + i).textContent =
						"temp: " + data["day"][`forecast${i}`].temp + "°C";
					document.getElementById("humidity_" + i).textContent =
						"humi: " + data["day"][`forecast${i}`].humidity;
					document.getElementById("rain_" + i).textContent =
						"rain: " + data["day"][`forecast${i}`].rain;
					document.getElementById("clouds_" + i).textContent =
						"cloud: " + data["day"][`forecast${i}`].clouds;
				}

				// Data for the week
				for (let i = 1; i < 6; i++) {
					document.getElementById("day_pred_" + i).textContent = data["week"][i - 1][0];
					document.getElementById("temp_min_" + i).textContent = data["week"][i - 1][2];
					document.getElementById("temp_max_" + i).textContent = data["week"][i - 1][3];
					document.getElementById("icon_" + i).src = data["week"][i - 1][4];
				}
			}
		});
	}
}

getLocation();

setInterval(getLocation, 600000);
