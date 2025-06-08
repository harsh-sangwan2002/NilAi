// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // this is critical
    ],
    theme: {
        extend: {
            animation: {
                fadeInOut: "fadeInOut 3s ease-in-out infinite",
            },
            keyframes: {
                fadeInOut: {
                    "0%, 100%": { opacity: "0" },
                    "50%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};
