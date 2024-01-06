/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			white: 'var(--white-color)',
			gray: 'var(--gray-color)',
			yellow: 'var(--btn-color)',
			blue: 'var(--blue-color)',
			bgColor: 'var(--bg-color)',
			btnHover: 'var(--btn-hover)',
			textColor: 'var(--text-color)',
			redColor: 'var(--red-color)',
		},
	},
	plugins: [],
}
