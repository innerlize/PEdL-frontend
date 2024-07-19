describe('HomePage', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.viewport(408, 777);
	});

	it('should render the main components', () => {
		cy.get('h1').should('contain.text', 'Hi, I’m Pablo,');
		cy.get('h2').should(
			'contain.text',
			'What I love most in life is solving technical and non-technical problems.'
		);
		cy.get('[data-test="home-image"]').should('not.be.visible');
	});

	it('should display the correct social media icons', () => {
		const socials = ['LinkedIn', 'YouTube', 'IMDb', 'GitHub', 'Twitter'];

		socials.forEach(social => {
			cy.get(`[data-test=social-${social}]`).should('be.visible');
		});
	});

	it('should redirect to the correct pages when clicking on the buttons', () => {
		cy.get('[data-test="button-Contact me"] > .flex')
			.should('contain.text', 'Contact me')
			.click();
		cy.url().should('include', '/contact');

		cy.visit('/');
		cy.get('[data-test="button-About me"] > .flex')
			.should('contain.text', 'About me')
			.click();
		cy.url().should('include', '/about');

		cy.visit('/');
		cy.get('[data-test="button-Get Resume"] > .flex')
			.should('contain.text', 'Get Resume')
			.click();
		cy.url().should('include', '/resume');

		cy.visit('/');
		cy.get('[data-test="button-Portfolio"] > .flex')
			.should('contain.text', 'Portfolio')
			.click();
		cy.url().should('include', '/portfolio');
	});

	it('should display the typewriter text effect', () => {
		const roles = ['CG Supervisor', 'Pipeline TD', 'Tech Artist'];

		cy.contains(roles[0]).should('be.visible');

		cy.wait(3500);

		cy.contains(roles[1]).should('be.visible');

		cy.wait(3500);

		cy.contains(roles[2]).should('be.visible');
	});

	it('should display the home-image when viewport is greater than 1280px', () => {
		cy.viewport(1366, 643);

		cy.get('[data-test="home-image"]').should('be.visible');
	});
});
