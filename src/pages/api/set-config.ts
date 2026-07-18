// src/pages/api/set-config.ts
import type { APIRoute } from "astro";
import { clampHour, isValidTimezone, DEFAULT_NIGHT_START, DEFAULT_NIGHT_END, DEFAULT_TIMEZONE } from "@/lib/config";

const COOKIE_OPTS = { path: "/", maxAge: 60 * 60 * 24 * 365 } as const;

export const POST: APIRoute = async ({ request, cookies }) => {
    const { themeMode, nightStart, nightEnd, hc, tz, lang } = await request.json();

    cookies.set("theme_mode", themeMode === "sun" ? "sun" : "schedule", COOKIE_OPTS);
    cookies.set("night_start", String(clampHour(nightStart, DEFAULT_NIGHT_START)), COOKIE_OPTS);
    cookies.set("night_end", String(clampHour(nightEnd, DEFAULT_NIGHT_END)), COOKIE_OPTS);
    cookies.set("hc", hc ? "1" : "0", COOKIE_OPTS);
    cookies.set("tz", isValidTimezone(tz) ? tz : DEFAULT_TIMEZONE, COOKIE_OPTS);

    if (lang === "de" || lang === "en") {
        cookies.set("lang", lang, COOKIE_OPTS);
    } else {
        cookies.delete("lang", { path: "/" });
    }

    return new Response("OK");
};
