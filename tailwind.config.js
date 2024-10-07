/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#00C896',
				secondary: '#00BCFF',
				accent: '#3C3C3C',
				neutral: '#121212',
				warning: '#CC3333'
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif']
			},
			textShadow: {
				sm: '0 0 2px rgba(0, 0, 0, 1)',
				md: '0 0 6px rgba(0, 0, 0, 1)',
				lg: '0 0 10px rgba(0, 0, 0, 1)',
				none: 'none'
			}
		}
	},
	plugins: [require('tailwindcss-textshadow')]
};
