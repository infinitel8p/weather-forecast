/**
 * Client-side theme resolution shared by all pages.
 *
 * Reads the config passed from the server via data attributes on the page's
 * main element and applies the resulting theme as `data-theme`:
 *
 *   data-theme-mode   "schedule" | "sun"
 *   data-night-start  hour 0-23 (schedule mode)
 *   data-night-end    hour 0-23 (schedule mode)
 *   data-hc           "1" to enable high-contrast day theme
 *   data-tz           IANA timezone for the schedule hours
 *   data-sunrise      unix seconds (sun mode, optional)
 *   data-sunset       unix seconds (sun mode, optional)
 *
 * Appending ?hc to the URL still forces high contrast, overriding the cookie.
 */
export function resolveTheme(el: HTMLElement): { isDay: boolean; hc: boolean; theme: string } {
	const d = el.dataset;
	const hc = d.hc === "1" || new URLSearchParams(window.location.search).has("hc");

	let isDay: boolean;
	const sunrise = Number(d.sunrise);
	const sunset = Number(d.sunset);

	if (d.themeMode === "sun" && sunrise > 0 && sunset > 0) {
		const now = Date.now() / 1000;
		isDay = now >= sunrise && now < sunset;
	} else {
		const nightStart = parseHour(d.nightStart, 22);
		const nightEnd = parseHour(d.nightEnd, 6);
		let hour: number;
		try {
			hour = Number(
				new Intl.DateTimeFormat("en-GB", {
					timeZone: d.tz || "Europe/Berlin",
					hour: "2-digit",
					hourCycle: "h23",
				}).format(new Date())
			);
		} catch {
			hour = new Date().getHours();
		}
		if (nightEnd === nightStart) {
			isDay = true;
		} else if (nightEnd < nightStart) {
			isDay = hour >= nightEnd && hour < nightStart;
		} else {
			isDay = hour >= nightEnd || hour < nightStart;
		}
	}

	const theme = isDay ? (hc ? "day-hc" : "day") : "night";
	el.setAttribute("data-theme", theme);
	return { isDay, hc, theme };
}

function parseHour(value: string | undefined, fallback: number): number {
	const n = Number(value);
	return Number.isInteger(n) && n >= 0 && n <= 23 ? n : fallback;
}
