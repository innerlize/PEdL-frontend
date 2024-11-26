import { projects } from '../../../fixtures/projects';
import { projectWithToggledVisibility } from '../../../fixtures/project';

describe('Admin - PortfolioPage', () => {
	const firstProjectId = projects[0].id;
	const secondProjectId = projects[1].id;

	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.intercept('GET', '/api/projects', {
			statusCode: 200,
			body: projects
		}).as('GET_PROJECTS');

		cy.intercept('GET', '/api/projects/*', {
			statusCode: 200,
			body: projects[0]
		}).as('GET_SINGLE_PROJECT');

		cy.intercept('PATCH', '/api/projects/*/visibility/*', {
			statusCode: 200
		}).as('TOGGLE_PROJECT_VISIBILITY');

		cy.intercept('PATCH', '/api/projects/2/order', {
			statusCode: 200
		}).as('REORDER_PROJECTS');

		cy.intercept('DELETE', `/api/projects/*`, {
			statusCode: 200
		}).as('DELETE_PROJECT');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/portfolio');

		cy.wait('@VERIFY_ADMIN_ACCESS');

		cy.wait('@GET_PROJECTS');
	});

	it('should display both lists for both "PEdL" and "CofCof" apps', () => {
		cy.get('[data-test="pedl-projects-list"]').should('be.visible');
		cy.get('[data-test="cofcof-projects-list"]').should('be.visible');
	});

	it('should display all projects in the correct list by app', () => {
		const expectedLength = projects.length;

		cy.get('[data-test="pedl-projects-list"] [data-test="projects-list-item"]')
			.should('have.length', expectedLength)
			.each(($el, index) => {
				cy.wrap($el).should('contain', projects[index].name);
				cy.wrap($el)
					.find('img')
					.should('have.attr', 'src', projects[index].thumbnail);
			});

		cy.get(
			'[data-test="cofcof-projects-list"] [data-test="projects-list-item"]'
		)
			.should('have.length', expectedLength)
			.each(($el, index) => {
				cy.wrap($el).should('contain', projects[index].name);
				cy.wrap($el)
					.find('img')
					.should('have.attr', 'src', projects[index].thumbnail);
			});
	});

	it('displays projects in the correct order based on order-[app] property', () => {
		projects.forEach((project, index) => {
			cy.get(
				'[data-test="pedl-projects-list"] [data-test="projects-list-item"]'
			)
				.eq(index)
				.should('contain', project.name);
		});

		projects.forEach((project, index) => {
			cy.get(
				'[data-test="cofcof-projects-list"] [data-test="projects-list-item"]'
			)
				.eq(index)
				.should('contain', project.name);
		});
	});

	it('allows reordering of projects by dragging and dropping', () => {
		cy.dragAndDrop(
			'[data-test="pedl-projects-list"] [data-test="project-card-2"]',
			'[data-test="pedl-projects-list"] [data-test="project-card-4"]'
		);

		cy.wait('@REORDER_PROJECTS');

		cy.get('[data-test="pedl-projects-list"] [data-test="projects-list-item"]')
			.eq(1)
			.should('contain', projects[2].name);

		cy.get('[data-test="pedl-projects-list"] [data-test="projects-list-item"]')
			.eq(2)
			.should('contain', projects[3].name);

		cy.get('[data-test="pedl-projects-list"] [data-test="projects-list-item"]')
			.eq(3)
			.should('contain', projects[1].name);
	});

	it('should toggle project visibility', () => {
		cy.intercept('GET', '/api/projects', {
			statusCode: 200,
			body: [projectWithToggledVisibility, ...projects.slice(1)]
		}).as('GET_PROJECTS_WITH_MODIFIED_VISIBILITY');

		cy.get(
			`[data-test="pedl-projects-list"] [data-test="project-card-${firstProjectId}"]`
		)
			.find('[data-test="project-card-visibility-button"]')
			.then($el => {
				cy.wrap($el)
					.find('[data-test="visibility-icon-hidden"]')
					.should('be.visible');
			})
			.click();

		cy.wait('@TOGGLE_PROJECT_VISIBILITY');

		cy.wait('@GET_PROJECTS_WITH_MODIFIED_VISIBILITY');

		cy.get(
			`[data-test="pedl-projects-list"] [data-test="project-card-${firstProjectId}"]`
		)
			.find('[data-test="project-card-visibility-button"]')
			.then($el => {
				cy.wrap($el)
					.find('[data-test="visibility-icon-visible"]')
					.should('be.visible');
			});
	});

	it('should navigate to the edit project form page when a project is clicked', () => {
		cy.get(
			`[data-test="pedl-projects-list"] [data-test="project-card-${firstProjectId}"]`
		).click();

		cy.wait('@GET_SINGLE_PROJECT');

		cy.url().should('include', '/admin-panel/project/add');
	});

	it('should display the confirmation modal when delete icon is clicked', () => {
		cy.get(
			`[data-test="pedl-projects-list"] [data-test="project-card-${firstProjectId}"]`
		)
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-text"] > p')
			.should('be.visible')
			.and('have.text', 'Are you sure that you want to delete this project?');

		cy.get('[data-test="confirm-modal-cancel-button"]')
			.should('be.visible')
			.and('have.text', 'Cancel');

		cy.get('[data-test="confirm-modal-confirm-button"]')
			.should('be.visible')
			.and('have.text', 'Delete');
	});

	it('should hide the confirmation modal when cancel button is clicked', () => {
		cy.get(
			`[data-test="pedl-projects-list"] [data-test="project-card-${firstProjectId}"]`
		)
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-cancel-button"]').click();

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
	});

	it('should delete a project, hide the confirmation modal and reorder remaining projects', () => {
		const expectedPedlProjectsAfterDelete = projects.filter(
			project => project.id !== secondProjectId
		);

		const expectedCofCofProjectsAfterDelete = projects.filter(
			project => project.id !== secondProjectId
		);

		cy.get(
			`[data-test="pedl-projects-list"] [data-test="project-card-${secondProjectId}"]`
		)
			.find('[data-test="project-card-delete-button"]')
			.click();

		cy.get('[data-test="confirm-modal-confirm-button"]').click();

		cy.wait('@DELETE_PROJECT').then(() => {
			cy.get(
				`[data-test="pedl-projects-list"] [data-test="projects-list-item"]`
			)
				.eq(1)
				.invoke('remove');

			cy.get(
				`[data-test="cofcof-projects-list"] [data-test="projects-list-item"]`
			)
				.eq(1)
				.invoke('remove');
		});

		cy.get('[data-test="confirm-modal-content"]').should('not.exist');
		cy.get(`[data-test="project-card-${secondProjectId}"]`).should('not.exist');

		cy.get(
			'[data-test="pedl-projects-list"] [data-test="projects-list-item"]'
		).should('have.length', projects.length - 1);

		cy.get(
			'[data-test="cofcof-projects-list"] [data-test="projects-list-item"]'
		).should('have.length', projects.length - 1);

		expectedPedlProjectsAfterDelete.forEach((project, index) => {
			cy.get(
				'[data-test="pedl-projects-list"] [data-test="projects-list-item"]'
			)
				.eq(index)
				.should('contain', project.name);
		});

		expectedCofCofProjectsAfterDelete.forEach((project, index) => {
			cy.get(
				'[data-test="cofcof-projects-list"] [data-test="projects-list-item"]'
			)
				.eq(index)
				.should('contain', project.name);
		});
	});
});
