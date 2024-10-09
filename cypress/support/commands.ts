import { auth } from './e2e';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

Cypress.Commands.add('signInWithGoogle', async () => {
	const mockToken = JSON.stringify({
		sub: 'abc123',
		email: 'foo@example.com',
		email_verified: true
	});
	const credential = GoogleAuthProvider.credential(mockToken);

	return await signInWithCredential(auth, credential)
		.then(userCredential => userCredential.user)
		.catch(err => {
			console.error('Unexpected error: ', err);
		});
});
