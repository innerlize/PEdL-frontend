import { ProjectsContainer } from '../components/Portfolio/ProjectsContainer';
import { SectionHeader } from '../components/SectionHeader';

const PortfolioPage: React.FC = () => {
	const title = (
		<>
			My Creative <span className='text-primary'>Showcase</span>
		</>
	);

	const subtitle = (
		<>
			A curated collection of my latest and greatest projects.
			<br />
			<br />
			<span className='text-primary'>Swipe the carousel</span> and{' '}
			<span className='text-primary'>click on any project</span> to explore its
			details!
		</>
	);

	return (
		<div className='w-full'>
			<SectionHeader title={title} subtitle={subtitle} />

			<ProjectsContainer />
		</div>
	);
};

export default PortfolioPage;
