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
		<div className='flex flex-col w-full'>
			<SectionHeader title={title} subtitle={subtitle} />

			<div className='flex-1 mt-[40px] md:mt-[130px] xl:mt-[60px] 2xl:mt-[80px]'>
				{renderContent()}
			</div>
		</div>
	);
};

export default PortfolioPage;
