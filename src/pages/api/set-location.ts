// src/pages/api/set-location.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const data = await request.formData();
    const lat = data.get("lat");
    const lon = data.get("lon");

    if (!lat || !lon) {
        return new Response("Missing lat/lon", { status: 400 });
    }

    // Save cookies (optional: set maxAge and secure flags)
    cookies.set("lat", String(lat), { path: "/", httpOnly: true });
    cookies.set("lon", String(lon), { path: "/", httpOnly: true });

    // Redirect after saving
    return redirect("/");
};
