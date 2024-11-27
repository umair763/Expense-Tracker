/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"Hammersmith One": ["Hammersmith One", "sans-serif"],
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
