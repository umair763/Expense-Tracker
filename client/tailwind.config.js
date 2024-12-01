/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // Enables class-based dark mode
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
// sans: ['Poppins', 'sans-serif'], 
// "Hammersmith One": ["Hammersmith One", "sans-serif"],
