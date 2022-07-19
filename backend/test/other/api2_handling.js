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

fetchForecastWeatherWeek();
