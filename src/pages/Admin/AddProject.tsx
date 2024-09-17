import { AdminAddProjectForm } from '../../components/Admin/AddProject/Form';
import { AdminAddProjectHeader } from '../../components/Admin/AddProject/Header';

const AdminAddProjectPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center gap-16 w-full pt-[52px] md:pt-[82px] md:gap-24'>
			<AdminAddProjectHeader title='Creating project' />

			<AdminAddProjectForm />
		</div>
	);
};

export default AdminAddProjectPage;
