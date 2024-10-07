import { useQuery } from '@tanstack/react-query';
import { ProjectsContainer } from '../components/Portfolio/ProjectsContainer';
import { SectionHeader } from '../components/SectionHeader';
import { getProjects } from '../api/projects';
import { Spinner } from '../components/Spinner';

const PortfolioPage: React.FC = () => {
	const {
		data: projects,
		isLoading,
		error
	} = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects
	});

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

	const renderContent = () => {
		if (isLoading) {
			return (
				<div className='size-full flex justify-center items-center'>
					<Spinner color='#00C896' />
				</div>
			);
		}

		if (error) {
			return <div>Error loading projects!</div>;
		}

		if (projects && projects.length > 0) {
			return <ProjectsContainer projects={projects} />;
		}

		return (
			<div className='size-full flex justify-center items-center text-2xl text-center italic'>
				No projects found... <span className='mx-2 text-primary'>yet</span> ;)
			</div>
		);
	};

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
