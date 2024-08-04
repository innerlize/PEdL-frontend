import { project } from '../../fixtures/project';
import { projects } from '../../fixtures/projects';

describe('PortfolioPage', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/projects', { body: projects }).as('GET_PROJECTS');
		cy.intercept('GET', '/api/projects/1', { body: project }).as('GET_PROJECT');

		cy.visit('/portfolio');
	});

	it('should display the correct title and subtitle', () => {
		cy.contains('My Creative Showcase').should('be.visible');
		cy.contains(
			'A curated collection of my latest and greatest projects.'
		).should('be.visible');
		cy.contains('Swipe the carousel').should('be.visible');
		cy.contains('click on any project').should('be.visible');
	});

	it('should render the ProjectsContainer component', () => {
		cy.wait('@GET_PROJECTS');

		cy.get('.swiper').should('exist');

		cy.get('.swiper-slide').should('have.length', 4);

		cy.get('[data-test="project-card-1"]').should('be.visible');
	});

	it('should display project cards with correct thumbnails', () => {
		cy.wait('@GET_PROJECTS');

		projects.forEach(project => {
			cy.get(`[data-test="project-card-${project.id}"] img`)
				.should('exist')
				.and('have.attr', `src`, project.thumbnail);
		});
	});

	it('should navigate to project details page on clicking a project card', () => {
		cy.wait('@GET_PROJECTS');

		cy.get('.swiper-slide').first().click();

		cy.wait('@GET_PROJECT');

		cy.url().should('include', `/project/${project.id}`);
	});
});
