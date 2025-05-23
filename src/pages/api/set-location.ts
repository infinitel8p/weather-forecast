// src/pages/api/set-location.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const { lat, lon, other } = await request.json();
    const env = import.meta.env;

    if (lat && lon) {
        cookies.set("lat", lat.toString(), { path: "/" });
        cookies.set("lon", lon.toString(), { path: "/" });
    }
    if (other) {
        let request = await fetch(
            `https://api.openweathermap.org/data/2.5/find?q=${other}&appid=${env.OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const geoCode = await request.json();

        cookies.set("lat", geoCode.list[0].coord.lat.toString(), { path: "/" });
        cookies.set("lon", geoCode.list[0].coord.lon.toString(), { path: "/" });
        cookies.set("city", `${geoCode.list[0].name}, ${geoCode.list[0].sys.country}`, { path: "/" });
    }
    else {
        return new Response("No location provided", { status: 400 });
    }

    return new Response("OK");
};
