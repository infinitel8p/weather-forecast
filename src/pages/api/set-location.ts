// src/pages/api/set-location.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const { lat, lon } = await request.json();

    if (!lat || !lon) {
        return new Response("Bad Request", { status: 400 });
    }

    cookies.set("lat", lat.toString(), { path: "/" });
    cookies.set("lon", lon.toString(), { path: "/" });

    return new Response("OK");
};
