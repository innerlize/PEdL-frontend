import { skills } from '../../../src/data/skills';

describe('AboutPage', () => {
	beforeEach(() => {
		cy.visit('/about');
	});

	it('should render the SectionHeader with title and subtitle', () => {
		cy.get('h1').should(
			'contain.html',
			'My <span class="text-primary">Skills</span> &amp; <span class="text-secondary">Leadership</span>'
		);

		cy.get('h2').should(
			'contain.text',
			'A glimpse into my professional capabilities and leadership qualities'
		);
	});

	it('should render the SkillsContainer with technical skills', () => {
		cy.get('[data-test="technical-skills"]').within(() => {
			cy.get('div').each(($el, index) => {
				cy.wrap($el).find('p').should('have.text', skills.technical[index]);
			});
		});

		cy.get('[data-test="technical-skills"]')
			.children('div')
			.should('have.length', skills.technical.length);
	});

	it('should render the SkillsContainer with leadership skills', () => {
		cy.get('[data-test="leadership-skills"]').within(() => {
			cy.get('div').each(($el, index) => {
				cy.wrap($el).find('p').should('have.text', skills.leadership[index]);
			});
		});

		cy.get('[data-test="leadership-skills"]')
			.children('div')
			.should('have.length', skills.leadership.length);
	});

	it('should have correct styles for SkillTip icons', () => {
		cy.get('[data-test="technical-skills"]').within(() => {
			cy.get('div').each($el => {
				cy.wrap($el)
					.find('[data-test="skill-tip-icon"]')
					.should('have.class', 'text-primary');
			});
		});

		cy.get('[data-test="leadership-skills"]').within(() => {
			cy.get('div').each($el => {
				cy.wrap($el)
					.find('[data-test="skill-tip-icon"]')
					.should('have.class', 'text-secondary');
			});
		});
	});
});
