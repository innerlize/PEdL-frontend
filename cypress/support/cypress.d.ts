declare namespace Cypress {
	interface Chainable {
		signInWithGoogle: () => void;
		dragAndDrop: (subject: string, target: string) => Chainable<Element>;
	}
}
