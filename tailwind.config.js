/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: ["./src/**/*.{tsx,css}"],
	theme: {
		extend: {
			gridTemplateRows: {
				'10': 'repeat(10, minmax(0, 1fr))',
			},
			colors: {
				'obsidian': {
					'base': {
						'00': 'var(--color-base-00)',
						'05': 'var(--color-base-05)',
						'10': 'var(--color-base-10)',
						'20': 'var(--color-base-20)',
						'25': 'var(--color-base-25)',
						'30': 'var(--color-base-30)',
						'35': 'var(--color-base-35)',
						'40': 'var(--color-base-40)',
						'50': 'var(--color-base-50)',
						'60': 'var(--color-base-60)',
						'70': 'var(--color-base-70)',
						'100': 'var(--color-base-100)',
					},
					'primary': 'var(--interactive-accent)'
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
	],
	corePlugins: {
		preflight: false,
	}
};
