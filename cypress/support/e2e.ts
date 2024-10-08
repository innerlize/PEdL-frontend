import '@cypress/code-coverage/support';
import './commands';

import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import * as http from 'http';

const checkEmulatorHub = async (): Promise<boolean> => {
	const emulatorHubHost = Cypress.env('FIREBASE_EMULATOR_HUB_HOST');

	return new Promise(resolve => {
		http
			.get(`${emulatorHubHost}/emulators`, res => {
				resolve(res.statusCode === 200);
			})
			.on('error', () => resolve(false));
	});
};

const fbConfig: FirebaseOptions = {
	apiKey: 'demo-key',
	projectId: 'demo-project'
};

const app = initializeApp(fbConfig);
const auth = getAuth(app);

const connectToEmulator = async () => {
	const emulatorHubRunning = await checkEmulatorHub();

	if (!emulatorHubRunning) {
		throw new Error('Cypress needs to connect to a Firebase Emulator');
	}

	const authEmulatorUrl =
		Cypress.env('FIREBASE_AUTH_EMULATOR_URL') || 'http://localhost:9099';

	connectAuthEmulator(auth, authEmulatorUrl);
};

connectToEmulator();

export { auth };
