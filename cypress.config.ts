import { defineConfig } from 'cypress';
import registerCodeCoverageTasks from '@cypress/code-coverage/task';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	video: false,
	screenshotOnRunFailure: false,
	port: process.env.CYPRESS_HOST_PORT ? +process.env.CYPRESS_HOST_PORT : 3001,
	component: {
		devServer: {
			framework: 'create-react-app',
			bundler: 'webpack'
		}
	},
	e2e: {
		setupNodeEvents(on, config) {
			registerCodeCoverageTasks(on, config);
			return config;
		},
		baseUrl: process.env.CYPRESS_BASE_URL_PREFIX,
		specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}'
	},
	env: {
		FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		FIREBASE_EMULATOR_HUB_HOST:
			process.env.REACT_APP_FIREBASE_EMULATOR_HUB_HOST,
		FIREBASE_AUTH_EMULATOR_URL: process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_URL
	},
	chromeWebSecurity: false
});
