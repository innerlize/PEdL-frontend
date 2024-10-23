import { projects } from '../../../fixtures/projects';

describe('Admin - PortfolioPage', () => {
	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.intercept('GET', '/api/projects', {
			statusCode: 200,
			body: projects
		}).as('GET_PROJECTS');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/portfolio');

		cy.wait('@VERIFY_ADMIN_ACCESS');

		cy.wait('@GET_PROJECTS');
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
		const projectId = projects[0].id;

		cy.intercept('DELETE', `/api/projects/${projectId}`, {
			statusCode: 200
		}).as('DELETE_PROJECT');

		cy.get(`[data-test="project-card-${projectId}"]`)
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-confirm-button"]').click();

		cy.wait('@DELETE_PROJECT').then(() => {
			cy.get(`[data-test="project-card-${projectId}"]`).invoke('remove');
		});

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
		cy.get(`[data-test="project-card-${projectId}"]`).should('not.exist');
	});
});
