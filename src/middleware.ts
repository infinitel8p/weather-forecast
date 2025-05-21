// src/middleware.ts
import type { MiddlewareHandler } from "astro";

const middleware: MiddlewareHandler = async (context, next) => {
    const { pathname } = context.url;

    if (pathname.startsWith("/setup") || pathname.startsWith("/api")) {
        return next();
    }

    const lat = context.cookies.get("lat");
    const lon = context.cookies.get("lon");

    if (!lat || !lon) {
        return context.redirect("/setup");
    }

    return next();
};

export const onRequest = middleware;
