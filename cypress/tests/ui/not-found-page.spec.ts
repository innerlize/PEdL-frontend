describe('Not Found Page', () => {
	beforeEach(() => {
		cy.visit('/random-page');
	});

	it('should display the 404 page', () => {
		cy.get('div').contains('Page Not Found').should('be.visible');

		cy.get('p')
			.contains(
				'Damn... I think you’re lost, because this page doesn’t exist or is currently unavailable.'
			)
			.should('be.visible');

		cy.get('button').contains('Take me home!').should('be.visible').click();

		cy.url().should('eq', 'http://localhost:3000/');
	});
});
