describe('Admin - AuthPage', () => {
	it('should show login page and Google login button', () => {
		cy.visit('/admin-panel/auth');

		cy.contains('Who are you? Identify yourself!').should('be.visible');
		cy.contains('Only the chosen one can enter this place.').should(
			'be.visible'
		);

		cy.get('button').contains('Time to show my credentials!');
	});

	describe('Admin - Panel Pages', () => {
		beforeEach(() => {
			cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
				statusCode: 200,
				body: true
			}).as('VERIFY_ADMIN_ACCESS');

			cy.signInWithGoogle();
		});

		it('should verify admin access after successful login and redirect to admin panel', () => {
			cy.visit('/admin-panel');

			cy.wait('@VERIFY_ADMIN_ACCESS');
		});

		it('should display all elements in the admin panel home page', () => {
			cy.visit('/admin-panel');

			cy.wait('@VERIFY_ADMIN_ACCESS');

			cy.get('h1').should('contain.text', 'Hi Pablo!');

			cy.get('[data-test="admin-CTACard"]')
				.should('be.visible')
				.and('have.length', 2);

			cy.get('[data-test="admin-CTACard"]')
				.first()
				.should('contain', 'Add a project');
			cy.get('[data-test="admin-CTACard"]')
				.last()
				.should('contain', 'Add a partner');
		});

		it('should successfully sign out and redirect to login page', () => {
			cy.intercept('POST', 'api/admin/auth/revoke-token', {
				statusCode: 200
			}).as('REVOKE_TOKEN');

			cy.visit('/admin-panel/portfolio');

			cy.get('button').contains('Logout').click();
		});
	});
});
