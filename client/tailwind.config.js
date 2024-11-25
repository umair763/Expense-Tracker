/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"caros-light": ['"Caros Light"', "sans-serif"],
			},
		},
		screens: {
			sm: "640px", // Mobile
			md: "768px", // Tablet
			lg: "1024px", // Desktop
			xl: "1280px",
		},
	},
	plugins: [],
};
