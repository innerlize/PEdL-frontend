import { typewriterStrings } from '../.././../../src/data/typewriterStrings';

describe('Admin - HomePage', () => {
	beforeEach(() => {
		cy.visit('/admin-panel');
	});

	it('should display the correct title with the name "Pablo"', () => {
		cy.get('h1').should('contain.text', 'Hi Pablo!');
	});

	it('should display the typewriter effect with one of the strings', () => {
		cy.wait(3500);

		cy.get('h2').should($subtitle => {
			const cleanedText = $subtitle.text().replace(/\|$/, '').trim();

			expect(typewriterStrings).to.include(cleanedText);
		});
	});

	it('should display the "Add a project" CTACard with correct text and icon', () => {
		cy.get('[data-test="admin-CTACard"]')
			.contains('Add a project')
			.should('be.visible');

		cy.get('[data-test="admin-CTACard"]')
			.contains('Got something cool? Add your latest creation!')
			.should('be.visible');

		cy.get('[data-test="admin-CTACard"]')
			.children('[data-test="admin-CTACard-icon"]')
			.should('be.visible');
	});

	it('should display the "Add a partner" CTACard with correct text and icon', () => {
		cy.get('[data-test="admin-CTACard"]')
			.contains('Add a partner')
			.should('be.visible');

		cy.get('[data-test="admin-CTACard"]')
			.contains('Got a new business buddy? Add them to the crew!')
			.should('be.visible');

		cy.get('[data-test="admin-CTACard"]')
			.children('[data-test="admin-CTACard-icon"]')
			.should('be.visible');
	});

	it('should display the correct value for "Total projects"', () => {
		cy.get('[data-test="admin-StatCard"]')
			.contains('Total projects')
			.siblings()
			.should('contain.text', '10');
	});

	it('should display the correct value for "Total partners"', () => {
		cy.get('[data-test="admin-StatCard"]')
			.contains('Total partners')
			.siblings()
			.should('contain.text', '7');
	});

	it('should have a link to view projects', () => {
		cy.get('a').contains('View my projects').should('be.visible');
	});

	it('should have a link to view partners', () => {
		cy.get('a').contains('View my partners').should('be.visible');
	});
});
