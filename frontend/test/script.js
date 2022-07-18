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
		console.log(data.icon);
		document.getElementById('icon_current').src = data.icon;
		document.getElementById('current_weather').textContent =
			data.weather_description;

		var img = document.createElement('img');
		img.src = 'styles/icons/sync.png';
		var div = document.getElementById('last_update');
		div.prepend(img);
		img.style.height = '15px';
		img.style.width = 'auto';

		var img = document.createElement('img');
		img.src = 'styles/icons/sunrise.png';
		var div = document.getElementById('sunrise');
		div.prepend(img);
		img.style.height = 'auto';
		img.style.width = '20px';

		var img = document.createElement('img');
		img.src = 'styles/icons/sunset.png';
		var div = document.getElementById('sunset');
		div.prepend(img);
		img.style.height = 'auto';
		img.style.width = '20px';
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
		document.getElementById('date_1').textContent = data.day1.date;
		document.getElementById('icon_1').src = data.day1.icon;
		document.getElementById('temp_min_1').textContent = data.day1.temp_min;
		document.getElementById('temp_max_1').textContent = data.day1.temp_max;

		document.getElementById('day_pred_2').textContent = data.day2.day;
		document.getElementById('date_2').textContent = data.day2.date;
		document.getElementById('icon_2').src = data.day2.icon;
		document.getElementById('temp_min_2').textContent = data.day2.temp_min;
		document.getElementById('temp_max_2').textContent = data.day2.temp_max;

		document.getElementById('day_pred_3').textContent = data.day3.day;
		document.getElementById('date_3').textContent = data.day3.date;
		document.getElementById('icon_3').src = data.day3.icon;
		document.getElementById('temp_min_3').textContent = data.day3.temp_min;
		document.getElementById('temp_max_3').textContent = data.day3.temp_max;
	}
}
async function fetchForecastWeatherWeek2() {
	let response = await fetch('http://127.0.0.1:8000/test');

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

		document.getElementById('day_pred_2').textContent = data.day2.day;
		document.getElementById('temp_min_2').textContent = data.day2.temp;
		document.getElementById('temp_max_2').textContent = data.day2.condition;

		document.getElementById('day_pred_3').textContent = data.day3.day;
		document.getElementById('temp_min_3').textContent = data.day3.temp;
		document.getElementById('temp_max_3').textContent = data.day3.condition;
	}
}
fetchCurrentWeather();
fetchUv();
fetchForecastWeatherWeek();
fetchForecastWeatherWeek2();
