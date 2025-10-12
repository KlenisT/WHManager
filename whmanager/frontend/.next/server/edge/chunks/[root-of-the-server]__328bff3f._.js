(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__328bff3f._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/whmanager/frontend/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// middleware.ts
// Purpose: Enforce authentication on protected routes and redirect unauthenticated users to /login.
__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$whmanager$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/whmanager/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$whmanager$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/whmanager/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
async function middleware(req) {
    const { pathname } = req.nextUrl;
    // Allow NextAuth routes and the login page
    if (pathname.startsWith('/api/auth') || pathname.startsWith('/login')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$whmanager$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Infer authentication by presence of NextAuth session cookies
    // In development: "next-auth.session-token"
    // In production (secure): "__Secure-next-auth.session-token"
    const devSession = req.cookies.get('next-auth.session-token')?.value;
    const prodSession = req.cookies.get('__Secure-next-auth.session-token')?.value;
    const isAuthenticated = Boolean(devSession || prodSession);
    // Handle root path: send authenticated users to dashboard, others to login
    if (pathname === '/') {
        const url = req.nextUrl.clone();
        url.pathname = isAuthenticated ? '/dashboard' : '/login';
        return __TURBOPACK__imported__module__$5b$project$5d2f$whmanager$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    // Protect dashboard and other matched routes
    if (!isAuthenticated) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return __TURBOPACK__imported__module__$5b$project$5d2f$whmanager$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$whmanager$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        '/',
        '/dashboard/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__328bff3f._.js.map