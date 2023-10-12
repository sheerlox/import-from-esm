/** @type {import('jest').Config} */
const config = {
	transform: {},
	projects: [
		{
			displayName: {
				name: 'Jazzer.js',
				color: 'cyan',
			},
			testMatch: ['<rootDir>/tests/fuzzing/*.test.js'],
			testRunner: '@jazzer.js/jest-runner',
		},
	],
};

export default config;
