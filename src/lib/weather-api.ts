/**
 * Fetches weather data from OpenWeatherMap and normalizes it to the OneCall format.
 * Supports both OneCall 3.0 (paid) and the free 2.5 Weather/Forecast endpoints.
 */

interface NormalizedWeather {
	current: {
		temp: number;
		feels_like: number;
		humidity: number;
		pressure: number;
		wind_speed: number;
		visibility: number;
		clouds: number;
		uvi: number;
		sunrise: number;
		sunset: number;
		weather: { icon: string; description: string }[];
	};
	hourly: {
		dt: number;
		temp: number;
		rain?: { "1h"?: number };
		uvi: number;
	}[];
	daily: {
		dt: number;
		temp: { min: number; max: number; day: number };
		weather: { icon: string; description: string }[];
	}[];
}

export async function fetchWeather(
	lat: string,
	lon: string,
	apiKey: string,
	apiVersion: string
): Promise<{ data: NormalizedWeather | null; error: string | null }> {
	if (apiVersion === "free") {
		return fetchFreeApi(lat, lon, apiKey);
	}
	return fetchOneCall(lat, lon, apiKey, apiVersion);
}

async function fetchOneCall(
	lat: string,
	lon: string,
	apiKey: string,
	version: string
): Promise<{ data: NormalizedWeather | null; error: string | null }> {
	const v = version === "2.5" ? "2.5" : "3.0";
	const res = await fetch(
		`https://api.openweathermap.org/data/${v}/onecall?lat=${lat}&lon=${lon}&lang=DE&units=metric&exclude=minutely,alerts&appid=${apiKey}`
	);
	const json = await res.json();
	if (!res.ok) {
		return { data: null, error: json.message || `API error ${res.status}` };
	}
	return { data: json, error: null };
}

async function fetchFreeApi(
	lat: string,
	lon: string,
	apiKey: string
): Promise<{ data: NormalizedWeather | null; error: string | null }> {
	const [weatherRes, forecastRes] = await Promise.all([
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=DE&units=metric&appid=${apiKey}`
		),
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=DE&units=metric&appid=${apiKey}`
		),
	]);

	const weather = await weatherRes.json();
	const forecast = await forecastRes.json();

	if (!weatherRes.ok) {
		return { data: null, error: weather.message || `API error ${weatherRes.status}` };
	}
	if (!forecastRes.ok) {
		return { data: null, error: forecast.message || `API error ${forecastRes.status}` };
	}

	// Normalize current weather
	const current = {
		temp: weather.main.temp,
		feels_like: weather.main.feels_like,
		humidity: weather.main.humidity,
		pressure: weather.main.pressure,
		wind_speed: weather.wind.speed,
		visibility: weather.visibility,
		clouds: weather.clouds.all,
		uvi: 0, // not available in free API
		sunrise: weather.sys.sunrise,
		sunset: weather.sys.sunset,
		weather: weather.weather,
	};

	// Normalize hourly from 3-hour forecast intervals (cap to ~48h = 16 entries)
	const hourly = forecast.list.slice(0, 16).map((item: any) => ({
		dt: item.dt,
		temp: item.main.temp,
		rain: item.rain ? { "1h": Math.round(((item.rain["3h"] ?? 0) / 3) * 100) / 100 } : undefined,
		uvi: 0, // not available in free API
	}));

	// Aggregate daily forecasts
	const dailyMap = new Map<string, any[]>();
	for (const item of forecast.list) {
		const date = new Date(item.dt * 1000).toISOString().slice(0, 10);
		if (!dailyMap.has(date)) dailyMap.set(date, []);
		dailyMap.get(date)!.push(item);
	}

	// Include today using current weather data for min/max
	const todayKey = new Date().toISOString().slice(0, 10);
	const daily: NormalizedWeather["daily"] = [];

	for (const [date, items] of dailyMap) {
		const temps = items.map((i: any) => i.main.temp);
		const minTemps = items.map((i: any) => i.main.temp_min);
		const maxTemps = items.map((i: any) => i.main.temp_max);

		// Pick the icon from the midday entry, or the middle entry
		const middayItem =
			items.find((i: any) => {
				const h = new Date(i.dt * 1000).getUTCHours();
				return h >= 11 && h <= 14;
			}) ?? items[Math.floor(items.length / 2)];

		daily.push({
			dt: items[0].dt,
			temp: {
				min: Math.min(...minTemps),
				max: Math.max(...maxTemps),
				day: middayItem.main.temp,
			},
			weather: middayItem.weather,
		});
	}

	// If today is missing from forecast (can happen), prepend it from current weather
	if (daily.length === 0 || new Date(daily[0].dt * 1000).toISOString().slice(0, 10) !== todayKey) {
		daily.unshift({
			dt: Math.floor(Date.now() / 1000),
			temp: {
				min: weather.main.temp_min,
				max: weather.main.temp_max,
				day: weather.main.temp,
			},
			weather: weather.weather,
		});
	}

	return { data: { current, hourly, daily }, error: null };
}
