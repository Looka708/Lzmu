/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                'lime-brand': '#B9FF66',
            },
            borderRadius: {
                '4xl': '2.5rem',
            },
            boxShadow: {
                'card': '0 5px 0 0 #191A23',
            },
        },
    },
    plugins: [],
}
