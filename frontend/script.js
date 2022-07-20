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
		document.getElementById('clouds').textContent =
			'Wolken: ' + data.clouds + '%';
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

		var svg = document.querySelectorAll('svg');
		for (const element of svg) {
			element.setAttribute('height', '75px');
			element.setAttribute('width', '75px');
		}
	}
}

async function fetchForecastWeatherDay() {
	let response = await fetch('http://127.0.0.1:8000/forecast_weather_day');

	console.log(response.status, response.statusText); // 200 OK

	if (response.status === 200) {
		var data = await response.text();
		// handle data
		// convert var data to json object
		data = JSON.parse(data);
		console.log(data);
		document.getElementById('time_1').textContent = data.forecast1.time;
		document.getElementById('icon_hrs_1').src = data.forecast1.icon;
		document.getElementById('weather_description_1').textContent =
			data.forecast1.description;
		document.getElementById('temp_1').textContent = data.forecast1.temp;
		document.getElementById('humidity_1').textContent = data.forecast1.humidity;
		document.getElementById('rain_1').textContent = data.forecast1.rain;
		document.getElementById('clouds_1').textContent = data.forecast1.clouds;

		document.getElementById('time_2').textContent = data.forecast2.time;
		document.getElementById('icon_hrs_2').src = data.forecast2.icon;
		document.getElementById('weather_description_2').textContent =
			data.forecast2.description;
		document.getElementById('temp_2').textContent = data.forecast2.temp;
		document.getElementById('humidity_2').textContent = data.forecast2.humidity;
		document.getElementById('rain_2').textContent = data.forecast2.rain;
		document.getElementById('clouds_2').textContent = data.forecast2.clouds;

		document.getElementById('time_3').textContent = data.forecast3.time;
		document.getElementById('icon_hrs_3').src = data.forecast3.icon;
		document.getElementById('weather_description_3').textContent =
			data.forecast3.description;
		document.getElementById('temp_3').textContent = data.forecast3.temp;
		document.getElementById('humidity_3').textContent = data.forecast3.humidity;
		document.getElementById('rain_3').textContent = data.forecast3.rain;
		document.getElementById('clouds_3').textContent = data.forecast3.clouds;

		document.getElementById('time_4').textContent = data.forecast4.time;
		document.getElementById('icon_hrs_4').src = data.forecast4.icon;
		document.getElementById('weather_description_4').textContent =
			data.forecast4.description;
		document.getElementById('temp_4').textContent = data.forecast4.temp;
		document.getElementById('humidity_4').textContent = data.forecast4.humidity;
		document.getElementById('rain_4').textContent = data.forecast4.rain;
		document.getElementById('clouds_4').textContent = data.forecast4.clouds;

		document.getElementById('time_5').textContent = data.forecast5.time;
		document.getElementById('icon_hrs_5').src = data.forecast5.icon;
		document.getElementById('weather_description_5').textContent =
			data.forecast5.description;
		document.getElementById('temp_5').textContent = data.forecast5.temp;
		document.getElementById('humidity_5').textContent = data.forecast5.humidity;
		document.getElementById('rain_5').textContent = data.forecast5.rain;
		document.getElementById('clouds_5').textContent = data.forecast5.clouds;

		document.getElementById('time_6').textContent = data.forecast6.time;
		document.getElementById('icon_hrs_6').src = data.forecast6.icon;
		document.getElementById('weather_description_6').textContent =
			data.forecast6.description;
		document.getElementById('temp_6').textContent = data.forecast6.temp;
		document.getElementById('humidity_6').textContent = data.forecast6.humidity;
		document.getElementById('rain_6').textContent = data.forecast6.rain;
		document.getElementById('clouds_6').textContent = data.forecast6.clouds;

		document.getElementById('time_7').textContent = data.forecast7.time;
		document.getElementById('icon_hrs_7').src = data.forecast7.icon;
		document.getElementById('weather_description_7').textContent =
			data.forecast7.description;
		document.getElementById('temp_7').textContent = data.forecast7.temp;
		document.getElementById('humidity_7').textContent = data.forecast7.humidity;
		document.getElementById('rain_7').textContent = data.forecast7.rain;
		document.getElementById('clouds_7').textContent = data.forecast7.clouds;

		document.getElementById('time_8').textContent = data.forecast8.time;
		document.getElementById('icon_hrs_8').src = data.forecast8.icon;
		document.getElementById('weather_description_8').textContent =
			data.forecast8.description;
		document.getElementById('temp_8').textContent = data.forecast8.temp;
		document.getElementById('humidity_8').textContent = data.forecast8.humidity;
		document.getElementById('rain_8').textContent = data.forecast8.rain;
		document.getElementById('clouds_8').textContent = data.forecast8.clouds;
	}
}

fetchCurrentWeather();
fetchUv();
fetchForecastWeatherWeek();
fetchForecastWeatherDay();
