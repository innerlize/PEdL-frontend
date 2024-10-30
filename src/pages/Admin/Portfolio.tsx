import { useQuery } from '@tanstack/react-query';
import { AdminProjectsList } from '../../components/Admin/Portfolio/ProjectsList';
import { AdminSectionHeader } from '../../components/Admin/SectionHeader';
import { Spinner } from '../../components/Spinner';
import { getProjects } from '../../api/projects';
import { AppName, Project } from '../../types/Portfolio';

const AdminPortfolioPage: React.FC = () => {
	const {
		data: projects,
		isLoading,
		error
	} = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects
	});

	const title = 'Projects';

	const subtitle = (
		<>
			If you want to <span className='text-primary'>edit</span> a project,{' '}
			<span className='text-primary'>just click on it</span> to go to the edit
			form.
			<br />
			<br />
			If you want to <span className='text-[#CC3333]'>delete</span> a project,{' '}
			<span className='text-[#CC3333]'>click on the red button</span> at the
			top-left corner of its box.
		</>
	);

	const sortProjectsByApp = (projects: Project[], app: AppName) =>
		[...projects].sort(
			(a, b) => (a.order[app] ?? Infinity) - (b.order[app] ?? Infinity)
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
			const apps: AppName[] = ['pedl', 'cofcof'];

			return apps.map(app => {
				const sortedProjects = sortProjectsByApp(projects, app);

				return (
					<AdminProjectsList key={app} projects={sortedProjects} app={app} />
				);
			});
		}

		return (
			<div className='size-full flex justify-center items-center text-2xl text-center italic'>
				No projects found... <span className='mx-2 text-primary'>yet</span> ;)
			</div>
		);
	};

	return (
		<div className='flex flex-col w-full'>
			<AdminSectionHeader title={title} subtitle={subtitle} />

			<div
				data-test='projects-tables-container'
				className='flex justify-evenly mt-[60px] md:mt-[130px] xl:mt-[60px] 2xl:mt-[80px]'>
				{renderContent()}
			</div>
		</div>
	);
};

export default AdminPortfolioPage;
