/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: ["./src/**/*.{tsx,css}"],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	}
};
