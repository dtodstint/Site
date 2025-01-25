import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    // Use `mode` to check if the environment is production
    const isProduction = mode === "production";

    return {
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
                    privacy_policy: resolve(
                        __dirname,
                        "privacy_and_policy.html"
                    ),
                },
            },
        },
        plugins: [
            {
                name: "html-transform",
                transformIndexHtml(html, { filename }) {
                    // Check if the file being processed is index.html
                    if (filename.endsWith("index.html") && isProduction) {
                        // Add Google Tag Manager script in production
                        return html.replace(
                            "</head>",
                            `<script async src="https://www.googletagmanager.com/gtag/js?id=G-HJ478NSXPV"></script>
                            <script>
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-HJ478NSXPV');
                            </script>
                            </head>`
                        );
                    }
                    return html; // No changes for other HTML files
                },
            },
        ],
    };
});
