import { projects } from '../../../src/data/projects';

describe('PortfolioPage', () => {
	beforeEach(() => {
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
		cy.get('.swiper').should('exist');
		cy.get('.swiper-slide').should('have.length', projects.length);
	});

	it('should display project cards with correct thumbnails', () => {
		projects.forEach(project => {
			cy.get(`[data-test="project-card-${project.id}"] img`)
				.should('exist')
				.and('have.attr', `src`, project.thumbnail);
		});
	});

	it('should navigate to project details page on clicking a project card', () => {
		cy.get('.swiper-slide').first().click();
		cy.url().should('include', `/project/${projects[0].id}`);
	});
});
