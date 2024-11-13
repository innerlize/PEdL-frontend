import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../api/projects';
import { useLocation } from 'react-router-dom';
import { AdminAddProjectForm } from '../../components/Admin/Forms/AddProject/Form';
import { AdminFormPageHeader } from '../../components/Admin/Forms/FormPageHeader';

const AdminAddProjectPage: React.FC = () => {
	const projectId = useLocation().state;
	const isEditing = !!projectId;

	const { data: project, isLoading } = useQuery({
		queryKey: ['projects', projectId],
		queryFn: () => getProject(projectId),
		enabled: isEditing
	});

	if (isLoading && isEditing) return <div>Loading...</div>;

	return (
		<div className='flex flex-col items-center gap-16 w-full pt-[52px] md:pt-[82px] md:gap-24 font-roboto'>
			<AdminFormPageHeader
				title={isEditing ? 'Updating project' : 'Creating project'}
			/>

			<AdminAddProjectForm project={project} />
		</div>
	);
};

export default AdminAddProjectPage;
