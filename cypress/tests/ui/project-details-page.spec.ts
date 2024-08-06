import { project } from '../../fixtures/project';
import { projects } from '../../fixtures/projects';

describe('Project Page', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/projects', { body: projects }).as('GET_PROJECTS');
		cy.intercept('GET', '/api/projects/1', { body: project }).as('GET_PROJECT');

		cy.visit('/portfolio');

		cy.wait('@GET_PROJECTS');

		cy.get('.swiper-slide').first().click();

		cy.wait('@GET_PROJECT');
	});

	it('should display the project page', () => {
		cy.get('h1').contains(project.name).should('be.visible');

		cy.get('[data-test="project-start_date"]')
			.should('contain', '09/08/2001')
			.should('be.visible');

		cy.get('[data-test="project-end_date"]')
			.should('contain', '05/18/2033')
			.should('be.visible');
	});

	it('should navigate back to the portfolio page', () => {
		cy.get('a').contains('Back').click();

		cy.wait('@GET_PROJECTS');

		cy.url().should('include', '/portfolio');
	});

	it('should display project details sections', () => {
		cy.get('[data-test="project-details-section"]')
			.contains('Customer')
			.should('be.visible');

		cy.get('[data-test="project-details-section"]')
			.contains('Softwares')
			.should('be.visible');

		cy.get('[data-test="project-details-section"]')
			.contains('Links')
			.should('be.visible');

		cy.get('[data-test="project-details-section"]')
			.contains('Description')
			.should('be.visible');

		cy.get('[data-test="project-details-section"]')
			.contains('Media')
			.should('be.visible');
	});

	it('should display and navigate through links', () => {
		cy.get('[data-test="project-details-section"]')
			.contains('Links')
			.scrollIntoView();

		cy.get('a')
			.contains(project.links[0].label)
			.should('have.attr', 'href', project.links[0].url);

		cy.get('a')
			.contains(project.links[1].label)
			.should('have.attr', 'href', project.links[1].url);
	});

	it('should display images in the carousel and swipe through them', () => {
		cy.viewport(408, 777);

		cy.get('.swiper').should('be.visible');
		cy.get('.swiper-slide').should('have.length', project.media.images.length);

		cy.get('.swiper-button-next').click();
		cy.get('.swiper-button-prev').click();

		cy.get('.swiper-slide-active img').should('be.visible');
	});
});
