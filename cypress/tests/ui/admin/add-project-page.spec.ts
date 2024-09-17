describe('Admin Add Project Page', () => {
	beforeEach(() => {
		cy.visit('/admin-panel/project/add');
	});

	it('should render the page with header and form', () => {
		cy.get('h2').contains('Creating project').should('be.visible');

		cy.get('form').should('exist');
	});

	it('should display validation errors when submitting an empty form', () => {
		cy.get('[data-test="admin-add-project-form"]').submit();

		cy.get('.text-red-500')
			.contains('Project name is required')
			.should('be.visible');
		cy.get('.text-red-500')
			.contains('Customer name is required')
			.should('be.visible');
		cy.get('.text-red-500')
			.contains('Description is required')
			.should('be.visible');
		cy.get('.text-red-500')
			.contains('At least one software is required')
			.should('be.visible');
		cy.get('.text-red-500')
			.contains('Thumbnail is required')
			.should('be.visible');
	});

	it('should successfully submit the form with valid data', () => {
		const thumbnailURL =
			'https://images.pexels.com/photos/374857/pexels-photo-374857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

		cy.get('input[name="projectName"]').type('Example Project');

		cy.get('input[name="customerName"]').type('Example Customer');

		cy.get('textarea[name="description"]').type('This is an example project.');

		cy.get('input[placeholder="Figma"]').type('React{enter}');
		cy.get('[data-test="admin-pill"]')
			.should('be.visible')
			.and('have.length', 1)
			.and('contain', 'React');

		cy.get('[data-test="admin-thumbnail-field"] input').type(
			`${thumbnailURL}{enter}`
		);
		cy.get('[data-test="admin-image-preview-box"] img')
			.should('be.visible')
			.and('have.attr', 'src')
			.and('eq', thumbnailURL);

		cy.get('form').submit();

		cy.get('.Toastify__toast')
			.contains('Project successfully created!')
			.should('be.visible');
	});

	it('should show an error for an invalid thumbnail URL', () => {
		const invalidThumbnailURL = 'https://www.invalid-thumbnail-url.com/123';

		cy.get('[data-test="admin-thumbnail-field"] input').type(
			`${invalidThumbnailURL}{enter}`
		);

		cy.get('.text-red-500')
			.contains('Image URL is not valid. Thumbnail addition skipped.')
			.should('be.visible');
	});

	it('should allow adding and removing software pills', () => {
		cy.get('input[placeholder="Figma"]').type('React{enter}');

		cy.get('[data-test="admin-pill"]')
			.should('be.visible')
			.and('contain', 'React');

		cy.get('[data-test="admin-pill"]').contains('React').click();

		cy.get('[data-test="admin-pill"]').should('not.exist');
	});

	it('should allow adding a valid image URL and display its preview', () => {
		const imageURL =
			'https://images.pexels.com/photos/374857/pexels-photo-374857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

		cy.get('[data-test="admin-media-images-field"] input').type(
			`${imageURL}{enter}`
		);

		cy.get('[data-test="admin-image-preview-box"] img')
			.should('be.visible')
			.and('have.attr', 'src')
			.and('eq', imageURL);
	});

	it('should show an error for an invalid image URL', () => {
		const invalidImageURL = 'https://www.invalid-image-url.com/123';

		cy.get('[data-test="admin-media-images-field"] input').type(
			`${invalidImageURL}{enter}`
		);

		cy.get('.text-red-500')
			.contains('Invalid image URL. Image not added to the list.')
			.should('be.visible');
	});

	it('should allow adding a valid video URL and display its preview', () => {
		const videoURL = 'https://www.youtube.com/watch?v=a5uQMwRMHcs';

		cy.get('[data-test="admin-media-videos-field"] input').type(
			`${videoURL}{enter}`
		);

		cy.get('.react-player__preview')
			.should('be.visible')
			.invoke('attr', 'style')
			.should(
				'include',
				'background-image: url("https://i.ytimg.com/vi/a5uQMwRMHcs/hqdefault.jpg")'
			);
	});

	it('should show an error for an invalid video URL', () => {
		const invalidVideoURL = 'https://www.invalid-video-url.com/123';

		cy.get('[data-test="admin-media-videos-field"] input').type(
			`${invalidVideoURL}{enter}`
		);

		cy.get('.text-red-500')
			.contains('This video cannot be played. Video not added to the list.')
			.should('be.visible');
	});

	it('should allow adding a link and display its tooltip', () => {
		const linkLabel = 'Example Link';
		const linkURL = 'https://example.com';

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
		const linkLabel = 'Example Link';

		cy.get('[data-test="admin-links-field"] input')
			.first()
			.type(`${linkLabel}`);

		cy.get('[data-test="admin-links-field"] input').last().type('{enter}');

		cy.get('.text-red-500')
			.contains('Both fields are required to add a link, label and URL.')
			.should('be.visible');
	});

	it('should throw an error when trying to add an existing link', () => {
		const linkLabel = 'Example Link';
		const linkURL = 'https://example.com';

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
		const linkLabel = 'Example Link';
		const linkURL = 'https://example.com';

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
