import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "about.html"),
                booking: resolve(__dirname, "booking.html"),
                services: resolve(__dirname, "services.html"),
                delhincr: resolve(__dirname, "script/delhincr.js"),
                register: resolve(__dirname, "register.html"),
                flat: resolve(__dirname, "flat/flat.html"),
                script: resolve(__dirname, "script/script.js"),
                privacy_policy: resolve(__dirname, "privacy_and_policy.html"),
            },
        },
    },
});
