// src/pages/api/set-location.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const { lat, lon, other, country } = await request.json();
    const env = import.meta.env;
    const countryCode = country || "DE";

    if (other) {
        const key = env.OPENWEATHERMAPONECALL_API_KEY;

        // Try city name lookup first
        let geoRes = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(other)},${countryCode}&limit=1&appid=${key}`
        );
        let geoCode = await geoRes.json();

        // Fall back to zip code lookup
        if (!geoCode.length) {
            geoRes = await fetch(
                `https://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(other)},${countryCode}&appid=${key}`
            );
            geoCode = geoRes.ok ? [await geoRes.json()] : [];
        }

        if (!geoCode.length) {
            return new Response("Location not found", { status: 404 });
        }

        cookies.set("lat", geoCode[0].lat.toString(), { path: "/" });
        cookies.set("lon", geoCode[0].lon.toString(), { path: "/" });
        cookies.set("city", `${geoCode[0].name}, ${geoCode[0].country}`, { path: "/" });
    } else if (lat && lon) {
        cookies.set("lat", lat.toString(), { path: "/" });
        cookies.set("lon", lon.toString(), { path: "/" });
    } else {
        return new Response("No location provided", { status: 400 });
    }

    return new Response("OK");
};
