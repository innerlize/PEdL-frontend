describe('Contact Page', () => {
	beforeEach(() => {
		cy.visit('/contact');
	});

	it('should load the contact page correctly', () => {
		cy.contains('Get in Touch').should('be.visible');
		cy.contains("Let's connect and create something awesome together!").should(
			'be.visible'
		);
	});

	it('should display the contact form', () => {
		cy.contains('First name').should('be.visible');
		cy.contains('Last name').should('be.visible');
		cy.contains('Phone number').should('be.visible');
		cy.contains('Email address').should('be.visible');
		cy.contains('Your message').should('be.visible');

		cy.get('form[data-test="contact-form"]').should('be.visible');
		cy.get('input[placeholder="Dante"]').should('be.visible');
		cy.get('input[placeholder="Alighieri"]').should('be.visible');
		cy.get('input[placeholder="dante.alighieri@example.com"]').should(
			'be.visible'
		);
		cy.get('textarea[placeholder="Hi Pablo, I\'m interested in..."]').should(
			'be.visible'
		);
		cy.get('.react-international-phone-country-selector-button').should(
			'be.visible'
		);
		cy.get('.react-international-phone-input-container').should('be.visible');

		cy.contains('Phone').siblings().contains('Optional').should('be.visible');

		cy.get('button').contains('Send').should('be.visible');
	});

	it('should change country code number', () => {
		cy.get('.react-international-phone-country-selector-button').click();

		cy.contains('Argentina').click();

		cy.get('.react-international-phone-input-container').should(
			'contain',
			'+54'
		);
	});

	it('should display contact alternatives section', () => {
		cy.contains('Contact alternatives').should('be.visible');
		cy.contains('You can also contact me via:').should('be.visible');
		cy.get('button').contains('Use template').should('be.visible');
	});

	it('should use the template when "Use template" button is clicked', () => {
		cy.get('button').contains('Use template').click();
		cy.get('textarea').should(
			'have.value',
			"Hi [Recipient's Name], I hope you are doing well. I would like to propose a collaboration on [Project Name] that I believe we could both benefit from. Based on your skills and experience at [Recipient's Company], I think we would make a great team to achieve the goals of this project. I am confident that by working together, we can leverage our strengths and create something truly impactful. If you are interested, please let me know so we can discuss the details further. Looking forward to your response. Best regards, [Your Name] [Your Company]"
		);
	});

	it('should prevent form submission', () => {
		cy.get('form[data-test="contact-form"]').within(() => {
			cy.get('button[type="submit"]').should('be.disabled');
		});
	});
});
