import { AdminAddProjectForm } from '../../components/Admin/Forms/AddProject/Form';
import { AdminFormPageHeader } from '../../components/Admin/Forms/FormPageHeader';

const AdminAddProjectPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center gap-16 w-full pt-[52px] md:pt-[82px] md:gap-24'>
			<AdminFormPageHeader title='Creating project' />

			<AdminAddProjectForm />
		</div>
	);
};

export default AdminAddProjectPage;
