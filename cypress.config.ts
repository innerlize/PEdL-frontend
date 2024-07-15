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
	}
});
