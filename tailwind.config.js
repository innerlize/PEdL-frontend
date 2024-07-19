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
				neutral: '#121212'
			}
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif']
		}
	},
	plugins: []
};
