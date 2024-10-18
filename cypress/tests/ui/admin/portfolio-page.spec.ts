describe('Admin - PortfolioPage', () => {
	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/portfolio');

		cy.wait('@VERIFY_ADMIN_ACCESS');
	});

	it('should display all projects in the carousel', () => {
		cy.get('.swiper-slide').should('have.length', 4);

		cy.get('[data-test="project-card-1"] img').should('be.visible');
		cy.get('[data-test="project-card-2"] img').should('be.visible');
		cy.get('[data-test="project-card-3"] img').should('be.visible');
		cy.get('[data-test="project-card-4"] img').should('exist');
	});

	it('should navigate to the admin home page when a project is clicked', () => {
		cy.get('[data-test="project-card-1"] a').click();

		cy.url().should('include', '/admin-panel');
	});

	it('should display the confirmation modal when delete icon is clicked', () => {
		cy.get('[data-test="project-card-1"]')
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-content"]').should(
			'contain',
			'Are you sure that you want to delete this project?'
		);
	});

	it('should hide the confirmation modal when cancel button is clicked', () => {
		cy.get('[data-test="project-card-1"]')
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-cancel-button"]').click();

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
	});

	it('should delete a project and hide the confirmation modal', () => {
		cy.window().then(win => {
			cy.stub(win.console, 'log').as('logStub');
		});

		cy.get('[data-test="project-card-1"]')
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-confirm-button"]').click();

		cy.get('@logStub').should('be.calledWith', 'Deleting project with id: 1');

		cy.get('@logStub').should(
			'be.calledWith',
			'Project with id: 1 successfully deleted'
		);

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
	});
});
