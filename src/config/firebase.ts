import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import {
	connectAuthEmulator,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	User as FirebaseUser
} from 'firebase/auth';

const getFirebaseConfig = (): FirebaseOptions => {
	if (
		process.env.NODE_ENV === 'development' ||
		process.env.NODE_ENV === 'test'
	) {
		return {
			apiKey: 'demo-key',
			authDomain: 'demo-auth-domain',
			projectId: 'demo-project'
		};
	} else {
		return {
			apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
			authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
			appId: process.env.REACT_APP_FIREBASE_APP_ID
		};
	}
};

const config = getFirebaseConfig();

const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(config);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
	const authEmulatorUrl = process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_URL;

	if (!authEmulatorUrl) {
		throw new Error('Firebase Auth Emulator URL is not defined.');
	}

	connectAuthEmulator(auth, authEmulatorUrl, {
		disableWarnings: true
	});
}

export { auth, provider, signInWithPopup };
export type { FirebaseUser };
