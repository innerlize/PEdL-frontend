describe('template spec', () => {
	it('passes', () => {
		cy.visit('/');

		cy.get('div').contains('Hello!');
	});
});
