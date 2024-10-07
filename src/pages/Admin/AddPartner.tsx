import { AdminAddPartnerForm } from '../../components/Admin/Forms/AddPartner/Form';
import { AdminFormPageHeader } from '../../components/Admin/Forms/FormPageHeader';

const AdminAddPartnerPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center gap-16 w-full pt-[52px] md:pt-[82px] md:gap-24'>
			<AdminFormPageHeader title='Creating partner' />

			<AdminAddPartnerForm />
		</div>
	);
};

export default AdminAddPartnerPage;
