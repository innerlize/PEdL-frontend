describe('Project Page', () => {
	beforeEach(() => {
		cy.visit('/portfolio');

		cy.get('.swiper-slide').first().click();
	});

	it('should display the project page', () => {
		cy.get('h1').contains('Metegol').should('be.visible');
		cy.get('div').contains('01/05/2012').should('be.visible');
		cy.get('div').contains('31/01/2013').should('be.visible');
	});

	it('should navigate back to the portfolio page', () => {
		cy.get('a').contains('Back').click();

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
			.contains('Link 1')
			.should('have.attr', 'href', 'https://example.com');

		cy.get('a')
			.contains('Link 2')
			.should('have.attr', 'href', 'https://example.com');
	});

	it('should display images in the carousel and swipe through them', () => {
		cy.get('.swiper').should('be.visible');
		cy.get('.swiper-slide').should('have.length', 6);

		cy.get('.swiper-button-next').click();
		cy.get('.swiper-button-prev').click();

		cy.get('.swiper-slide-active img').should('be.visible');
	});
});
