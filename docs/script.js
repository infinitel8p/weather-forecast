async function fetchCurrentWeather() {
	let response = await fetch('https://aexgj5.deta.dev/current_weather');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		document.getElementById('city').textContent = data.city;
		document.getElementById('temperature').textContent = 'Temperatur: ' + data.temperature + '°C';
		document.getElementById('temperatur_feels_like').textContent =
			'Gefühlt: ' + data.temperatur_feels_like + '°C';
		document.getElementById('weather_description').textContent = data.weather_description;
		document.getElementById('humidity').textContent = 'Luftfeuchtigkeit: ' + data.humidity + '%';
		document.getElementById('clouds').textContent = 'Wolken: ' + data.clouds + '%';
		document.getElementById('last_update').textContent = ' ' + data.last_update;
		document.getElementById('sunrise').textContent = ' ' + data.sunrise;
		document.getElementById('sunset').textContent = ' ' + data.sunset;
		document.getElementById('icon_current').src = data.icon;
		document.getElementById('current_weather').textContent = data.weather_description;

		var img = document.createElement('img');
		img.src = 'styles/icons/sync.png';
		var div = document.getElementById('last_update');
		div.prepend(img);
		img.style.height = '15px';
		img.style.width = 'auto';
		img.alt = '';

		var img = document.createElement('img');
		img.src = 'styles/icons/sunrise.png';
		var div = document.getElementById('sunrise');
		div.prepend(img);
		img.style.height = 'auto';
		img.style.width = '20px';
		img.alt = '';

		var img = document.createElement('img');
		img.src = 'styles/icons/sunset.png';
		var div = document.getElementById('sunset');
		div.prepend(img);
		img.style.height = 'auto';
		img.style.width = '20px';
		img.alt = '';
	}
}

async function fetchUv() {
	let response = await fetch('https://aexgj5.deta.dev/additional_weather');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		document.getElementById('uv').textContent = 'UV Index: ' + data.uv;
	}
}

async function fetchForecastWeatherWeek() {
	let response = await fetch('https://aexgj5.deta.dev/forecast_weather_week');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		for (let i = 1; i < 6; i++) {
			document.getElementById('day_pred_' + i).textContent = data[`day${i}`].day;
			document.getElementById('temp_min_' + i).textContent = data[`day${i}`].temp;
			document.getElementById('temp_max_' + i).textContent = data[`day${i}`].condition;
			document.getElementById('icon_' + i).src = data[`day${i}`].icon;
		}
	}
}

async function fetchForecastWeatherDay() {
	let response = await fetch('https://aexgj5.deta.dev/forecast_weather_day');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		for (let i = 1; i < 9; i++) {
			document.getElementById('time_' + i).textContent = data[`forecast${i}`].time;
			document.getElementById('icon_hrs_' + i).src = data[`forecast${i}`].icon;
			document.getElementById('icon_hrs_' + i).setAttribute('height', '100px');
			document.getElementById('icon_hrs_' + i).setAttribute('width', '100px');
			document.getElementById('weather_description_' + i).textContent =
				data[`forecast${i}`].description;
			document.getElementById('temp_' + i).textContent = 'temp:' + data[`forecast${i}`].temp;
			document.getElementById('humidity_' + i).textContent =
				'humi:' + data[`forecast${i}`].humidity;
			document.getElementById('rain_' + i).textContent = 'rain:' + data[`forecast${i}`].rain;
			document.getElementById('clouds_' + i).textContent = 'cloud:' + data[`forecast${i}`].clouds;
		}
	}
}

async function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async function (position) {
			const data = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			};
			const response = await fetch('https://aexgj5.deta.dev/get_location', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.status === 200) {
				await sleep(500);
				fetchCurrentWeather();
				await sleep(500);
				fetchForecastWeatherDay();
				await sleep(500);
				fetchForecastWeatherWeek();
				await sleep(500);
				fetchUv();
			}
		});
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

getLocation();

setInterval(fetchCurrentWeather, 600000);
setInterval(fetchForecastWeatherDay, 600000);
setInterval(fetchForecastWeatherWeek, 600000);
setInterval(fetchUv, 600000);
