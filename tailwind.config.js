/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                cursive: ["'Great Vibes'", 'cursive'],
                romantic: ["'Dancing Script'", 'cursive'],
                body: ["'Quicksand'", 'sans-serif'],
            },
            colors: {
                pink: {
                    50: '#fff5f5',
                    100: '#ffe0e0',
                },
            },
        },
    },
    plugins: [],
};