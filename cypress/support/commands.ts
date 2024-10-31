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

Cypress.Commands.add('dragAndDrop', (subject: string, target) => {
	Cypress.log({
		name: 'DRAGNDROP',
		message: `Dragging element "${subject}" to the position of element "${target}"`,
		consoleProps: () => {
			return {
				subject: subject,
				target: target
			};
		}
	});

	const BUTTON_INDEX = 0;
	const SLOPPY_CLICK_THRESHOLD = 10;

	cy.get(target)
		.first()
		.then($target => {
			const coordsDrop = $target[0].getBoundingClientRect();
			cy.get(subject)
				.first()
				.then(subject => {
					const coordsDrag = subject[0].getBoundingClientRect();
					cy.wrap(subject)
						.trigger('mousedown', {
							button: BUTTON_INDEX,
							clientX: coordsDrag.x,
							clientY: coordsDrag.y,
							force: true
						})
						.trigger('mousemove', {
							button: BUTTON_INDEX,
							clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
							clientY: coordsDrag.y,
							force: true
						});
					cy.get('body')
						.trigger('mousemove', {
							button: BUTTON_INDEX,
							clientX: coordsDrop.x,
							clientY: coordsDrop.y,
							force: true
						})
						.trigger('mouseup');
				});
		});
});
