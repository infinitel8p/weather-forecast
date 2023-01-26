async function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async function (position) {
			// set location coordinates
			const location = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			};
			// send post request with coordinates to api
			let response = await fetch("https://aexgj5.deta.dev/get_location", {
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

				var img = document.createElement("img");
				img.src = "styles/icons/sync.png";
				var div = document.getElementById("last_update");
				div.prepend(img);
				img.style.height = "15px";
				img.style.width = "auto";
				img.alt = "";

				var img = document.createElement("img");
				img.src = "styles/icons/sunrise.png";
				var div = document.getElementById("sunrise");
				div.prepend(img);
				img.style.height = "auto";
				img.style.width = "20px";
				img.alt = "";

				var img = document.createElement("img");
				img.src = "styles/icons/sunset.png";
				var div = document.getElementById("sunset");
				div.prepend(img);
				img.style.height = "auto";
				img.style.width = "20px";
				img.alt = "";

				// Data for the day
				for (let i = 1; i < 9; i++) {
					document.getElementById("time_" + i).textContent = data["day"][`forecast${i}`].time;
					document.getElementById("icon_hrs_" + i).src = data["day"][`forecast${i}`].icon;
					document.getElementById("icon_hrs_" + i).setAttribute("height", "100px");
					document.getElementById("icon_hrs_" + i).setAttribute("width", "100px");
					document.getElementById("weather_description_" + i).textContent =
						data["day"][`forecast${i}`].description;
					document.getElementById("temp_" + i).textContent =
						"temp:" + data["day"][`forecast${i}`].temp;
					document.getElementById("humidity_" + i).textContent =
						"humi:" + data["day"][`forecast${i}`].humidity;
					document.getElementById("rain_" + i).textContent =
						"rain:" + data["day"][`forecast${i}`].rain;
					document.getElementById("clouds_" + i).textContent =
						"cloud:" + data["day"][`forecast${i}`].clouds;
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

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

getLocation();

setInterval(getLocation, 600000);
