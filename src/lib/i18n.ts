const translations = {
	de: {
		// index.astro - weather details
		feelsLike: "Gefühlt",
		sunrise: "Aufgang",
		sunset: "Untergang",
		wind: "Wind",
		humidity: "Feuchte",
		pressure: "Druck",
		uv: "UV",
		visibility: "Sicht",
		clouds: "Wolken",
		weatherUnavailable: "Wetterdaten nicht verfügbar",
		autoReload: "Die Seite wird automatisch neu geladen.",
		// setup.astro
		dopplerRadar: "DOPPLER RADAR",
		configuration: "Konfiguration",
		location: "Standort",
		or: "oder",
		cityZip: "Stadt / PLZ",
		country: "Land",
		search: "Suchen...",
		start: "Starten",
		locationNotFound: "Standort nicht gefunden",
		saveError: "Fehler beim Speichern der Position",
		// chart
		tempLabel: "Temp °C",
		rainLabel: "Regen mm",
		uvLabel: "UV",
		// locale settings
		locale: "de-DE",
		owmLang: "DE",
	},
	en: {
		feelsLike: "Feels like",
		sunrise: "Sunrise",
		sunset: "Sunset",
		wind: "Wind",
		humidity: "Humidity",
		pressure: "Pressure",
		uv: "UV",
		visibility: "Visibility",
		clouds: "Clouds",
		weatherUnavailable: "Weather data unavailable",
		autoReload: "The page will reload automatically.",
		dopplerRadar: "DOPPLER RADAR",
		configuration: "Configuration",
		location: "Location",
		or: "or",
		cityZip: "City / ZIP",
		country: "Country",
		search: "Search...",
		start: "Start",
		locationNotFound: "Location not found",
		saveError: "Failed to save location",
		tempLabel: "Temp °C",
		rainLabel: "Rain mm",
		uvLabel: "UV",
		locale: "en-US",
		owmLang: "EN",
	},
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["de"];

export function getTranslations(lang?: string) {
	const key = (lang && lang in translations ? lang : "en") as Language;
	return translations[key];
}
