import { SkillsContainer } from '../components/About/SkillsContainer';
import { SectionHeader } from '../components/SectionHeader';

export const AboutPage: React.FC = () => {
	const title = (
		<>
			My <span className='text-primary'>Skills</span> &{' '}
			<span className='text-secondary'>Leadership</span>
		</>
	);

	const subtitle =
		'A glimpse into my professional capabilities and leadership qualities';

	return (
		<div>
			<SectionHeader title={title} subtitle={subtitle} />

			<SkillsContainer />
		</div>
	);
};
