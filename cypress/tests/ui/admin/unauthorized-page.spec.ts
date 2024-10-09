describe('Admin - UnauthorizedPage', () => {
	beforeEach(() => cy.visit('/admin-panel'));

	it('should display all elements correctly', () => {
		cy.get('h1').contains('401').should('be.visible');
		cy.get('h2').contains('Unauthorized Access').should('be.visible');

		cy.get('p').contains('Well... this is awkward').should('be.visible');

		cy.get('button').contains('Let me identify myself').should('be.visible');
	});

	it('should redirect the user to the authentication panel when clicking the button', () => {
		cy.get('button').contains('Let me identify myself').click();

		cy.url().should('include', '/admin-panel/auth');
	});
});
