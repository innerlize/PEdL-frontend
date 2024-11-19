import {
	projectCreatedResponse,
	projects,
	projectUpdatedResponse
} from '../../../fixtures/projects';
import { convertTimestampToDate } from '../../../support/utils';

describe('Admin - Add Project Page', () => {
	beforeEach(() => {
		cy.intercept('POST', 'api/admin/auth/verify-admin-access', {
			statusCode: 200,
			body: true
		}).as('VERIFY_ADMIN_ACCESS');

		cy.intercept('POST', '/api/projects', {
			statusCode: 200,
			body: projectCreatedResponse
		}).as('CREATE_PROJECT');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/project/add');

		cy.wait('@VERIFY_ADMIN_ACCESS');
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
		cy.get('.text-red-500')
			.contains('Start date is required')
			.should('be.visible');
		cy.get('.text-red-500')
			.contains('End date is required')
			.should('be.visible');
		cy.get('.text-red-500')
			.contains('Category is required')
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

		cy.get('[data-test="admin-dates-field"] input')
			.should('be.visible')
			.first()
			.click()
			.then(() => {
				cy.get('.react-datepicker .react-datepicker__day--007').click();
			});

		cy.get('[data-test="admin-category-field"]')
			.should('be.visible')
			.find('select')
			.select('Movie');

		cy.get('[data-test="admin-dates-field"] input')
			.should('be.visible')
			.last()
			.click()
			.then(() => {
				cy.get('.react-datepicker .react-datepicker__day--015').click();
			});

		cy.get('form').submit();

		cy.wait('@CREATE_PROJECT');

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

	describe('Image fields', () => {
		describe('Image URL field', () => {
			it('should allow adding a valid image URL and display its preview', () => {
				const imageURL =
					'https://images.pexels.com/photos/374857/pexels-photo-374857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

				cy.get('[data-test="admin-media-images-url-field"] input').type(
					`${imageURL}{enter}`
				);

				cy.get('[data-test="admin-media-new-images-previews"]')
					.should('be.visible')
					.and('have.text', 'Previews of images that you want to add...');

				cy.get('[data-test="admin-image-preview-box"]')
					.should('be.visible')
					.and('have.length', 1);

				cy.get('[data-test="admin-image-preview-box"] img')
					.should('be.visible')
					.and('have.attr', 'src', imageURL);
			});

			it('should show an error for an invalid image URL', () => {
				const invalidImageURL = 'https://www.invalid-image-url.com/123';

				cy.get('[data-test="admin-media-images-url-field"] input').type(
					`${invalidImageURL}{enter}`
				);

				cy.get('.text-red-500')
					.contains('Image URL is not valid. Image addition skipped.')
					.should('be.visible');
			});
		});

		describe('Image upload file field', () => {
			describe('Input click & selection', () => {
				it('should allow file upload through the input', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							{
								contents: Cypress.Buffer.from('dummy content'),
								fileName: 'valid-image.jpg',
								mimeType: 'image/jpeg',
								lastModified: Date.now()
							},
							{ force: true }
						);

					cy.get('[data-test="admin-image-preview-box"]')
						.should('be.visible')
						.and('have.length', 1);

					cy.get('[data-test="admin-image-preview-box"] img')
						.should('be.visible')
						.and('have.attr', 'src')
						.and(
							'match',
							new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
						);
				});

				it('should allow upload multiple images', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							[
								{
									contents: Cypress.Buffer.from('dummy content 1'),
									fileName: 'valid-image-1.jpg',
									mimeType: 'image/jpeg',
									lastModified: Date.now()
								},
								{
									contents: Cypress.Buffer.from('dummy content 2'),
									fileName: 'valid-image-2.jpg',
									mimeType: 'image/jpeg',
									lastModified: Date.now()
								}
							],
							{ force: true }
						);

					cy.get('[data-test="admin-image-preview-box"]')
						.should('be.visible')
						.and('have.length', 2);

					cy.get('[data-test="admin-image-preview-box"] img').each($img => {
						cy.wrap($img)
							.should('be.visible')
							.and('have.attr', 'src')
							.and(
								'match',
								new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
							);
					});
				});
			});

			describe('Drag and drop', () => {
				it('should allow file upload using drag and drop', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					).selectFile(
						{
							contents: Cypress.Buffer.from('dummy content'),
							fileName: 'valid-image.jpg',
							mimeType: 'image/jpeg',
							lastModified: Date.now()
						},
						{ action: 'drag-drop', force: true }
					);

					cy.get('[data-test="admin-image-preview-box"]')
						.should('be.visible')
						.and('have.length', 1);

					cy.get('[data-test="admin-image-preview-box"] img')
						.should('be.visible')
						.and('have.attr', 'src')
						.and(
							'match',
							new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
						);
				});

				it('should allow upload multiple images using drag and drop', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					).selectFile(
						[
							{
								contents: Cypress.Buffer.from('dummy content'),
								fileName: 'valid-image-1.jpg',
								mimeType: 'image/jpeg',
								lastModified: Date.now()
							},
							{
								contents: Cypress.Buffer.from('dummy content 2'),
								fileName: 'valid-image-2.jpg',
								mimeType: 'image/jpeg',
								lastModified: Date.now()
							}
						],
						{ action: 'drag-drop', force: true }
					);

					cy.get('[data-test="admin-image-preview-box"]')
						.should('be.visible')
						.and('have.length', 2);

					cy.get('[data-test="admin-image-preview-box"] img').each($img => {
						cy.wrap($img)
							.should('be.visible')
							.and('have.attr', 'src')
							.and(
								'match',
								new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
							);
					});
				});
			});

			describe('Error cases', () => {
				it('should show an error for an invalid image file', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							{
								contents: Cypress.Buffer.from('invalid image'),
								fileName: 'invalid-image.pdf',
								mimeType: 'application/pdf',
								lastModified: Date.now()
							},
							{ force: true }
						);

					cy.get('.Toastify__toast')
						.should('be.visible')
						.and('have.text', 'File type is not valid!');
				});

				it('should show an error for an invalid image file using drag and drop', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					).selectFile(
						{
							contents: Cypress.Buffer.from('invalid image'),
							fileName: 'invalid-image.pdf',
							mimeType: 'application/pdf',
							lastModified: Date.now()
						},
						{ action: 'drag-drop', force: true }
					);

					cy.get('.Toastify__toast')
						.should('be.visible')
						.and('have.text', 'File type is not valid!');
				});

				it('should show an error when image file size is too large', () => {
					cy.get(
						'[data-test="admin-media-images-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							{
								contents: Cypress.Buffer.alloc(3 * 1024 * 1024),
								fileName: 'large-image.jpg',
								mimeType: 'image/jpeg',
								lastModified: Date.now()
							},
							{ force: true }
						);

					cy.get('.Toastify__toast')
						.should('be.visible')
						.and('have.text', 'File too large! Remember, 2 MB max.');
				});
			});
		});
	});

	describe('Video fields', () => {
		describe('Video URL field', () => {
			it('should allow adding a valid video URL and display its preview', () => {
				const videoURL = 'https://www.youtube.com/watch?v=a5uQMwRMHcs';

				cy.get('[data-test="admin-media-videos-url-field"] input').type(
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

				cy.get('[data-test="admin-media-videos-url-field"] input').type(
					`${invalidVideoURL}{enter}`
				);

				cy.get('.text-red-500')
					.contains(
						'The video URL is not valid and cannot be played. Video addition skipped.'
					)
					.should('be.visible');
			});
		});

		describe('Video upload file field', () => {
			describe('Input click & selection', () => {
				it('should allow video file upload through the input', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							{
								contents: Cypress.Buffer.from('dummy video content'),
								fileName: 'valid-video.mp4',
								mimeType: 'video/mp4',
								lastModified: Date.now()
							},
							{ force: true }
						);

					cy.get('[data-test="admin-video-preview-box"]')
						.should('be.visible')
						.and('have.length', 1);

					cy.get('video')
						.should('be.visible')
						.and('have.attr', 'src')
						.and(
							'match',
							new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
						);
				});

				it('should allow upload multiple videos', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							[
								{
									contents: Cypress.Buffer.from('dummy video content 1'),
									fileName: 'valid-video-1.mp4',
									mimeType: 'video/mp4',
									lastModified: Date.now()
								},
								{
									contents: Cypress.Buffer.from('dummy video content 2'),
									fileName: 'valid-video-2.mp4',
									mimeType: 'video/mp4',
									lastModified: Date.now()
								}
							],
							{ force: true }
						);

					cy.get('[data-test="admin-video-preview-box"]')
						.should('be.visible')
						.and('have.length', 2);

					cy.get('video').each($video => {
						cy.wrap($video)
							.should('be.visible')
							.and('have.attr', 'src')
							.and(
								'match',
								new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
							);
					});
				});
			});

			describe('Drag and drop', () => {
				it('should allow video file upload using drag and drop', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					).selectFile(
						{
							contents: Cypress.Buffer.from('dummy video content'),
							fileName: 'valid-video.mp4',
							mimeType: 'video/mp4',
							lastModified: Date.now()
						},
						{ action: 'drag-drop', force: true }
					);

					cy.get('[data-test="admin-video-preview-box"]')
						.should('be.visible')
						.and('have.length', 1);

					cy.get('video')
						.should('be.visible')
						.and('have.attr', 'src')
						.and(
							'match',
							new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
						);
				});

				it('should allow upload multiple videos using drag and drop', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					).selectFile(
						[
							{
								contents: Cypress.Buffer.from('dummy video content 1'),
								fileName: 'valid-video-1.mp4',
								mimeType: 'video/mp4',
								lastModified: Date.now()
							},
							{
								contents: Cypress.Buffer.from('dummy video content 2'),
								fileName: 'valid-video-2.mp4',
								mimeType: 'video/mp4',
								lastModified: Date.now()
							}
						],
						{ action: 'drag-drop', force: true }
					);

					cy.get('[data-test="admin-video-preview-box"]')
						.should('be.visible')
						.and('have.length', 2);

					cy.get('video').each($video => {
						cy.wrap($video)
							.should('be.visible')
							.and('have.attr', 'src')
							.and(
								'match',
								new RegExp(`^blob:${Cypress.config('baseUrl')}/[a-f0-9-]+$`)
							);
					});
				});
			});

			describe('Error cases', () => {
				it('should show an error for an invalid video file', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							{
								contents: Cypress.Buffer.from('invalid video'),
								fileName: 'invalid-video.txt',
								mimeType: 'text/plain',
								lastModified: Date.now()
							},
							{ force: true }
						);

					cy.get('.Toastify__toast')
						.should('be.visible')
						.and('have.text', 'File type is not valid!');
				});

				it('should show an error for an invalid video file using drag and drop', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					).selectFile(
						{
							contents: Cypress.Buffer.from('invalid video'),
							fileName: 'invalid-video.txt',
							mimeType: 'text/plain',
							lastModified: Date.now()
						},
						{ action: 'drag-drop', force: true }
					);

					cy.get('.Toastify__toast')
						.should('be.visible')
						.and('have.text', 'File type is not valid!');
				});

				it('should show an error when video file size is too large', () => {
					cy.get(
						'[data-test="admin-media-videos-file-dropzone"] div input[type=file]'
					)
						.should('be.visible')
						.selectFile(
							{
								contents: Cypress.Buffer.alloc(51 * 1024 * 1024),
								fileName: 'large-video.mp4',
								mimeType: 'video/mp4',
								lastModified: Date.now()
							},
							{ force: true }
						);

					cy.get('.Toastify__toast')
						.should('be.visible')
						.and('have.text', 'File too large! Remember, 50 MB max.');
				});
			});
		});
	});

	describe('Date fields', () => {
		const padDay = (value: string, length: number = 3): string => {
			return value.padStart(length, '0');
		};

		it('should successfully add a start date', () => {
			const currentYear = new Date().getFullYear();
			const currentMonth = new Date().getMonth() + 1;
			const dayToSelect = '7';
			const formattedStartDate = `${currentMonth}/${padDay(dayToSelect, 2)}/${currentYear}`;

			cy.get('[data-test="admin-dates-field"] input')
				.first()
				.should('be.visible')
				.click();

			cy.get('.react-datepicker')
				.should('be.visible')
				.find(`.react-datepicker__day--${padDay(dayToSelect)}`)
				.should('be.visible')
				.click();

			cy.get('.react-datepicker').should('not.exist');

			cy.get('[data-test="admin-dates-field"] input')
				.first()
				.should('have.value', formattedStartDate);
		});

		it('should successfully add an end date', () => {
			const currentYear = new Date().getFullYear();
			const currentMonth = new Date().getMonth() + 1;
			const dayToSelect = '19';
			const formattedEndDate = `${currentMonth}/${padDay(dayToSelect, 2)}/${currentYear}`;

			cy.get('[data-test="admin-dates-field"] input')
				.last()
				.should('be.visible')
				.click();

			cy.get('.react-datepicker')
				.should('be.visible')
				.find(`.react-datepicker__day--${padDay(dayToSelect)}`)
				.should('be.visible')
				.click();

			cy.get('.react-datepicker').should('not.exist');

			cy.get('[data-test="admin-dates-field"] input')
				.last()
				.should('have.value', formattedEndDate);
		});
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

describe('Admin - Add Project Page - Update Project', () => {
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

		cy.intercept('PATCH', '/api/projects/*', {
			statusCode: 200,
			body: projectUpdatedResponse
		}).as('UPDATE_PROJECT');

		cy.signInWithGoogle();

		cy.visit('/admin-panel/portfolio');

		cy.wait('@VERIFY_ADMIN_ACCESS');

		cy.wait('@GET_PROJECTS');

		cy.get('[data-test="pedl-projects-list"] [data-test="project-card-1"]')
			.should('be.visible')
			.click();

		cy.url().should(
			'eq',
			`${Cypress.config().baseUrl}/admin-panel/project/add`
		);

		cy.wait('@GET_SINGLE_PROJECT');
	});

	it('should render the page with header and form', () => {
		cy.get('h2').contains('Updating project').should('be.visible');

		cy.get('form').should('exist');
	});

	it('should populate form fields with existing project data on load', () => {
		const project = projects[0];

		cy.get('input[name="projectName"]').should('have.value', project.name);

		cy.get('input[name="customerName"]').should('have.value', project.customer);

		cy.get('textarea[name="description"]').should(
			'have.value',
			project.description
		);

		cy.get('[data-test="admin-thumbnail-field"] input').should(
			'have.value',
			project.thumbnail
		);

		cy.get('input[name="start_date"]')
			.first()
			.should('have.value', convertTimestampToDate(project.start_date));
		cy.get('input[name="end_date"]').should(
			'have.value',
			convertTimestampToDate(project.end_date)
		);

		cy.get('[data-test="softwares-pills-container"]')
			.children()
			.should('have.length', project.softwares.length)
			.each(($software, index) => {
				cy.wrap($software).contains(project.softwares[index]);
			});

		cy.get(
			'[data-test="admin-media-existing-images-previews"] [data-test="admin-media-existing-images-previews-container"]'
		)
			.children()
			.should('have.length', project.media.images.length)
			.each(($image, index) => {
				cy.wrap($image)
					.find('img')
					.should('have.attr', 'src')
					.and('eq', project.media.images[index]);
			});
		cy.get(
			'[data-test="admin-media-existing-videos-previews"] [data-test="admin-media-existing-videos-previews-container"]'
		)
			.children()
			.should('have.length', project.media.videos.length)
			.each(($video, index) => {
				const videoUrl = project.media.videos[index];
				cy.wrap($video).then($el => {
					if (videoUrl.includes('youtube.com')) {
						cy.wrap($el).find('.react-player__preview').should('be.visible');
					} else {
						cy.wrap($el)
							.find('video')
							.should('be.visible')
							.and('have.attr', 'src')
							.and('eq', videoUrl);
					}
				});
			});

		cy.get('[data-test="links-pills-container"]')
			.children()
			.should('have.length', project.links.length)
			.each(($link, index) => {
				cy.wrap($link)
					.contains(project.links[index].label)
					.trigger('mouseover')
					.then(() => {
						cy.get('.react-tooltip')
							.should('be.visible')
							.and('contain', project.links[index].src);
					});
			});
	});

	it('should update project data when form is submitted', () => {
		const newProjectName = 'Updated Project 1';

		cy.intercept('GET', '/api/projects/*', {
			statusCode: 200,
			body: {
				...projects[0],
				name: newProjectName
			}
		}).as('GET_SINGLE_PROJECT_UPDATED');

		cy.get('input[name="projectName"]').clear().type(newProjectName);

		cy.get('form').submit();

		cy.wait('@UPDATE_PROJECT')
			.its('response.body.data.name')
			.should('eq', newProjectName);

		cy.get('.Toastify__toast')
			.contains('Project successfully updated!')
			.should('be.visible');

		cy.reload();

		cy.wait('@GET_SINGLE_PROJECT_UPDATED');

		cy.get('input[name="projectName"]').should('have.value', newProjectName);
	});
});
