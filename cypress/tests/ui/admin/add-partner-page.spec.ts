import {
	partners,
	partnerCreatedResponse,
	partnerUpdatedResponse
} from '../../../fixtures/partners';

describe('Admin - Add Partner Page', () => {
	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.intercept('POST', '/api/partners', {
			statusCode: 200,
			body: partnerCreatedResponse
		}).as('CREATE_PARTNER');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/partners/add');

		cy.wait('@VERIFY_ADMIN_ACCESS');
	});

	it('should render the page with header and form', () => {
		cy.get('h2').contains('Creating partner').should('be.visible');

		cy.get('form').should('exist');
	});

	it('should display validation errors when submitting an empty form', () => {
		cy.get('[data-test="admin-add-partner-form"]').submit();

		cy.get('.text-red-500')
			.contains('Partner name is required')
			.should('be.visible');

		cy.get('.text-red-500')
			.contains('Partner logo is required')
			.should('be.visible');
	});

	it('should successfully submit the form with valid data', () => {
		const logoURL =
			'https://marketplace.canva.com/EAFvMagh96A/1/0/1600w/canva-colorful-modern-infinity-technology-free-logo-wGSY8kq1SkY.jpg';

		cy.get('[data-test="admin-partner-name-field"] input').type(
			'Example Partner'
		);

		cy.get('[data-test="admin-partner-logo-field"] input').type(
			`${logoURL}{enter}`
		);
		cy.get('[data-test="admin-image-preview-box"] img')
			.should('be.visible')
			.and('have.attr', 'src')
			.and('eq', logoURL);

		cy.get('form').submit();

		cy.wait('@CREATE_PARTNER');

		cy.get('.Toastify__toast')
			.contains('Partner successfully created!')
			.should('be.visible');
	});

	it('should allow adding a valid image URL and display its preview', () => {
		const logoURL =
			'https://marketplace.canva.com/EAFvMagh96A/1/0/1600w/canva-colorful-modern-infinity-technology-free-logo-wGSY8kq1SkY.jpg';

		cy.get('[data-test="admin-partner-logo-field"] input').type(
			`${logoURL}{enter}`
		);

		cy.get('[data-test="admin-image-preview-box"] img')
			.should('be.visible')
			.and('have.attr', 'src')
			.and('eq', logoURL);
	});

	it('should show an error for an invalid image URL', () => {
		const invalidLogoURL = 'https://www.invalid-image-url.com/123';

		cy.get('[data-test="admin-partner-logo-field"] input').type(
			`${invalidLogoURL}{enter}`
		);

		cy.get('.text-red-500')
			.contains('Image URL is not valid. Logo addition skipped.')
			.should('be.visible');
	});

	describe('Link fields', () => {
		const linkLabel = 'Example Link';
		const linkURL = 'https://example.com';

		it('should allow adding a link and display its tooltip', () => {
			cy.get('[data-test="admin-links-field"] input')
				.first()
				.type(`${linkLabel}`);

			cy.get('[data-test="admin-links-field"] input')
				.last()
				.type(`${linkURL}{enter}`);

			cy.get('[data-test="admin-pill"]')
				.should('be.visible')
				.and('contain', linkLabel);

			cy.get('[data-test="admin-pill"]').trigger('mouseover');

			cy.get(`.react-tooltip`).should('be.visible').and('contain', linkURL);
		});

		it('should show an error when a link does not have a label or URL', () => {
			cy.get('[data-test="admin-links-field"] input')
				.first()
				.type(`${linkLabel}`);

			cy.get('[data-test="admin-links-field"] input').last().type('{enter}');

			cy.get('.text-red-500')
				.contains('Both fields are required to add a link, label and URL.')
				.should('be.visible');
		});

		it('should throw an error when trying to add an existing link', () => {
			cy.get('[data-test="admin-links-field"] input')
				.first()
				.type(`${linkLabel}`);

			cy.get('[data-test="admin-links-field"] input')
				.last()
				.type(`${linkURL}{enter}`);

			cy.get('[data-test="admin-links-field"] input')
				.first()
				.type(`${linkLabel}`);

			cy.get('[data-test="admin-links-field"] input')
				.last()
				.type(`${linkURL}{enter}`);

			cy.get('.text-red-500')
				.contains(`Link "${linkLabel}" already exists.`)
				.should('be.visible');
		});

		it('should remove a link pill on click', () => {
			cy.get('[data-test="admin-links-field"] input')
				.first()
				.type(`${linkLabel}`);

			cy.get('[data-test="admin-links-field"] input')
				.last()
				.type(`${linkURL}{enter}`);

			cy.get('[data-test="admin-pill"]').contains(linkLabel).click();

			cy.get('[data-test="admin-pill"]').should('not.exist');
		});
	});
});

describe('Admin - Add Partner Page - Update Partner', () => {
	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.intercept('GET', '/api/partners', {
			statusCode: 200,
			body: partners
		}).as('GET_PARTNERS');

		cy.intercept('GET', '/api/partners/*', {
			statusCode: 200,
			body: partners[0]
		}).as('GET_SINGLE_PARTNER');

		cy.intercept('PATCH', '/api/partners/*', {
			statusCode: 200,
			body: partnerUpdatedResponse
		}).as('UPDATE_PARTNER');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/partners');

		cy.wait('@VERIFY_ADMIN_ACCESS');

		cy.wait('@GET_PARTNERS');

		cy.get('[data-test="partner-card-1"]').should('be.visible').click();

		cy.url().should(
			'eq',
			`${Cypress.config().baseUrl}/admin-panel/partners/add`
		);

		cy.wait('@GET_SINGLE_PARTNER');
	});

	it('should render the page with header and form', () => {
		cy.get('h2').contains('Updating partner').should('be.visible');

		cy.get('form').should('exist');
	});

	it('should populate form fields with existing partner data on load', () => {
		const partner = partners[0];

		cy.get('input[name="partnerName"]').should('have.value', partner.name);

		cy.get('[data-test="admin-partner-name-field"] input').type(
			'Example Partner'
		);

		cy.get('[data-test="admin-image-preview-box"] img')
			.should('be.visible')
			.and('have.attr', 'src')
			.and('eq', partner.image);

		cy.get('[data-test="links-pills-container"]')
			.children()
			.should('have.length', partner.links.length)
			.each(($link, index) => {
				cy.wrap($link)
					.contains(partner.links[index].label)
					.trigger('mouseover')
					.then(() => {
						cy.get('.react-tooltip')
							.should('be.visible')
							.and('contain', partner.links[index].src);
					});
			});
	});

	it('should update partner data when form is submitted', () => {
		const newPartnerName = 'Updated Partner One';

		cy.intercept('GET', '/api/partners/*', {
			statusCode: 200,
			body: {
				...partners[0],
				name: newPartnerName
			}
		}).as('GET_SINGLE_PARTNER_UPDATED');

		cy.get('input[name="partnerName"]').clear().type(newPartnerName);

		cy.get('form').submit();

		cy.wait('@UPDATE_PARTNER')
			.its('response.body.data.name')
			.should('eq', newPartnerName);

		cy.get('.Toastify__toast')
			.contains('Partner successfully updated!')
			.should('be.visible');

		cy.reload();

		cy.wait('@GET_SINGLE_PARTNER_UPDATED');

		cy.get('input[name="partnerName"]').should('have.value', newPartnerName);
	});
});
