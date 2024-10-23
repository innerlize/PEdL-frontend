import { partners } from '../../../fixtures/partners';

describe('Admin - PartnersPage', () => {
	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.intercept('GET', '/api/partners', {
			statusCode: 200,
			body: partners
		}).as('GET_PARTNERS');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/partners');

		cy.wait('@VERIFY_ADMIN_ACCESS');

		cy.wait('@GET_PARTNERS');
	});

	it('should display all partners in the carousel', () => {
		cy.get('.swiper-slide').should('have.length', 4);

		cy.get('[data-test="partner-card-1"] img').should('be.visible');
		cy.get('[data-test="partner-card-2"] img').should('be.visible');
		cy.get('[data-test="partner-card-3"] img').should('be.visible');
		cy.get('[data-test="partner-card-4"] img').should('exist');
	});

	it('should navigate to the admin home page when a partner is clicked', () => {
		cy.get('[data-test="partner-card-1"] a').click();

		cy.url().should('include', '/admin-panel');
	});

	it('should display the confirmation modal when delete icon is clicked', () => {
		cy.get('[data-test="partner-card-1"]')
			.find('[data-test="partner-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-content"]').should(
			'contain',
			'Are you sure that you want to delete this partner?'
		);
	});

	it('should hide the confirmation modal when cancel button is clicked', () => {
		cy.get('[data-test="partner-card-1"]')
			.find('[data-test="partner-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-cancel-button"]').click();

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
	});

	it('should delete a partner and hide the confirmation modal', () => {
		const partnerId = partners[0].id;

		cy.intercept('DELETE', `/api/partners/${partnerId}`, {
			statusCode: 200
		}).as('DELETE_PARTNER');

		cy.get(`[data-test="partner-card-${partnerId}"]`)
			.find('[data-test="partner-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-confirm-button"]').click();

		cy.wait('@DELETE_PARTNER').then(() => {
			cy.get(`[data-test="partner-card-${partnerId}"]`).invoke('remove');
		});

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
		cy.get(`[data-test="partner-card-${partnerId}"]`).should('not.exist');
	});
});
