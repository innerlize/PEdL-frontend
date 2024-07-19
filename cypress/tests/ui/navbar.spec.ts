describe('Navbar Component', () => {
	const routes = ['Home', 'About', 'Portfolio', 'Contact'];

	beforeEach(() => {
		cy.visit('/about');
	});

	it('should display DesktopNavbar on large screens', () => {
		cy.viewport(1280, 800);

		cy.get('nav')
			.find('a')
			.should('have.length', 4)
			.each((link, index) => {
				const routeLabel = routes[index];

				cy.wrap(link).contains(routeLabel);
			});

		cy.get('.hamburger-react').should('not.exist');
		cy.get('[data-test="mobile-navbar-menu"]').should('not.exist');
	});

	it('should display MobileNavbar on small screens', () => {
		cy.viewport(375, 667);
		cy.get('.hamburger-react').should('be.visible');

		cy.viewport(800, 1028);
		cy.get('.hamburger-react').should('be.visible');
	});

	it('should toggle menu on hamburger click', () => {
		cy.viewport(375, 667);

		cy.get('.hamburger-react').click();

		cy.get('[data-test="mobile-navbar-menu"]')
			.should('be.visible')
			.find('a')
			.should('have.length', 4)
			.each((link, index) => {
				const routeLabel = routes[index];

				cy.wrap(link).contains(routeLabel);
			});
	});

	it('should highlight active link', () => {
		cy.viewport(1280, 800);

		cy.contains('About').click();

		cy.contains('About').should('have.class', 'text-white');

		cy.contains('Home')
			.should('not.have.class', 'text-white')
			.and('have.class', 'text-accent');
		cy.contains('Portfolio')
			.should('not.have.class', 'text-white')
			.and('have.class', 'text-accent');
		cy.contains('Contact')
			.should('not.have.class', 'text-white')
			.and('have.class', 'text-accent');
	});

	it('should show correct height for different screen sizes', () => {
		cy.viewport(375, 667);
		cy.get('nav').should('have.css', 'height', '90px');

		cy.viewport(1024, 768);
		cy.get('nav').should('have.css', 'height', '120px');

		cy.viewport(1280, 800);
		cy.get('nav').should('have.css', 'height', '72px');

		cy.viewport(1600, 900);
		cy.get('nav').should('have.css', 'height', '72px');
	});
});
