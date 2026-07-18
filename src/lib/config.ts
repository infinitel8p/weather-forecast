// Shared dashboard configuration, persisted as cookies (like the location).
import type { AstroCookies } from "astro";

export const DEFAULT_TIMEZONE = "Europe/Berlin";
export const DEFAULT_NIGHT_START = 22;
export const DEFAULT_NIGHT_END = 6;

export interface DashboardConfig {
    // "schedule" = fixed hours, "sun" = follow sunrise/sunset
    themeMode: "schedule" | "sun";
    // Hour (0-23) at which night mode starts in schedule mode
    nightStart: number;
    // Hour (0-23) at which night mode ends in schedule mode
    nightEnd: number;
    // High-contrast day theme
    hc: boolean;
    // IANA timezone used for all date/time formatting
    tz: string;
    // Language override ("de" | "en"), falls back to env LANGUAGE
    lang?: string;
}

export function clampHour(value: string | undefined | number, fallback: number): number {
    const n = Number(value);
    return Number.isInteger(n) && n >= 0 && n <= 23 ? n : fallback;
}

export function isValidTimezone(tz: string | undefined): tz is string {
    if (!tz) return false;
    try {
        new Intl.DateTimeFormat("en", { timeZone: tz });
        return true;
    } catch {
        return false;
    }
}

export function resolveServerTheme(
    cfg: DashboardConfig,
    sun?: { sunrise?: number; sunset?: number }
): "day" | "day-hc" | "night" {
    let isDay: boolean;
    if (cfg.themeMode === "sun" && sun?.sunrise && sun?.sunset) {
        const now = Date.now() / 1000;
        isDay = now >= sun.sunrise && now < sun.sunset;
    } else {
        const hour = Number(
            new Intl.DateTimeFormat("en-GB", {
                timeZone: cfg.tz,
                hour: "2-digit",
                hourCycle: "h23",
            }).format(new Date())
        );
        if (cfg.nightEnd === cfg.nightStart) {
            isDay = true;
        } else if (cfg.nightEnd < cfg.nightStart) {
            isDay = hour >= cfg.nightEnd && hour < cfg.nightStart;
        } else {
            isDay = hour >= cfg.nightEnd || hour < cfg.nightStart;
        }
    }
    return isDay ? (cfg.hc ? "day-hc" : "day") : "night";
}

export function cacheSunTimes(cookies: AstroCookies, sunrise?: number, sunset?: number): void {
    if (!sunrise || !sunset) return;
    const opts = { path: "/", maxAge: 60 * 60 * 36 } as const;
    cookies.set("sunrise", String(sunrise), opts);
    cookies.set("sunset", String(sunset), opts);
}

export function getCachedSun(cookies: AstroCookies): { sunrise?: number; sunset?: number } {
    const sunrise = Number(cookies.get("sunrise")?.value);
    const sunset = Number(cookies.get("sunset")?.value);
    return sunrise > 0 && sunset > 0 ? { sunrise, sunset } : {};
}

export function getConfig(cookies: AstroCookies): DashboardConfig {
    const tzCookie = cookies.get("tz")?.value;
    const lang = cookies.get("lang")?.value;
    return {
        themeMode: cookies.get("theme_mode")?.value === "sun" ? "sun" : "schedule",
        nightStart: clampHour(cookies.get("night_start")?.value, DEFAULT_NIGHT_START),
        nightEnd: clampHour(cookies.get("night_end")?.value, DEFAULT_NIGHT_END),
        hc: cookies.get("hc")?.value === "1",
        tz: isValidTimezone(tzCookie) ? tzCookie : DEFAULT_TIMEZONE,
        lang: lang === "de" || lang === "en" ? lang : undefined,
    };
}
