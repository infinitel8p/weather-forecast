async function fetchCurrentWeather() {
	let response = await fetch('http://127.0.0.1:8000/current_weather');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		document.getElementById('city').textContent = data.city;
		document.getElementById('temperature').textContent =
			'Temperatur: ' + data.temperature + '°C';
		document.getElementById('temperatur_feels_like').textContent =
			'Gefühlt: ' + data.temperatur_feels_like + '°C';
		document.getElementById('weather_description').textContent =
			data.weather_description;
		document.getElementById('humidity').textContent =
			'Luftfeuchtigkeit: ' + data.humidity + '%';
		document.getElementById('cloudy').textContent =
			'Wolken: ' + data.cloudy + '%';
		document.getElementById('last_update').textContent = ' ' + data.last_update;
		document.getElementById('sunrise').textContent = ' ' + data.sunrise;
		document.getElementById('sunset').textContent = ' ' + data.sunset;
		document.getElementById('icon_current').src = data.icon;
		document.getElementById('current_weather').textContent =
			data.weather_description;

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
	let response = await fetch('http://127.0.0.1:8000/additional_weather');

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
	let response = await fetch('http://127.0.0.1:8000/forecast_weather_week');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		document.getElementById('day_pred_1').textContent = data.day1.day;
		document.getElementById('temp_min_1').textContent = data.day1.temp;
		document.getElementById('temp_max_1').textContent = data.day1.condition;
		document.getElementById('icon_1').outerHTML = data.day1.svg;

		document.getElementById('day_pred_2').textContent = data.day2.day;
		document.getElementById('temp_min_2').textContent = data.day2.temp;
		document.getElementById('temp_max_2').textContent = data.day2.condition;
		document.getElementById('icon_2').outerHTML = data.day2.svg;

		document.getElementById('day_pred_3').textContent = data.day3.day;
		document.getElementById('temp_min_3').textContent = data.day3.temp;
		document.getElementById('temp_max_3').textContent = data.day3.condition;
		document.getElementById('icon_3').outerHTML = data.day3.svg;

		document.getElementById('day_pred_4').textContent = data.day4.day;
		document.getElementById('temp_min_4').textContent = data.day4.temp;
		document.getElementById('temp_max_4').textContent = data.day4.condition;
		document.getElementById('icon_4').outerHTML = data.day4.svg;

		document.getElementById('day_pred_5').textContent = data.day5.day;
		document.getElementById('temp_min_5').textContent = data.day5.temp;
		document.getElementById('temp_max_5').textContent = data.day5.condition;
		document.getElementById('icon_5').outerHTML = data.day5.svg;
	}
}
fetchCurrentWeather();
fetchUv();
fetchForecastWeatherWeek();
