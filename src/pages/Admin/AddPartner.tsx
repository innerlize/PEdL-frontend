import { useQuery } from '@tanstack/react-query';
import { getPartner } from '../../api/partners';
import { useLocation } from 'react-router-dom';
import { AdminAddPartnerForm } from '../../components/Admin/Forms/AddPartner/Form';
import { AdminFormPageHeader } from '../../components/Admin/Forms/FormPageHeader';

const AdminAddPartnerPage: React.FC = () => {
	const partnerId = useLocation().state;
	const isEditing = !!partnerId;

	const { data: partner, isLoading } = useQuery({
		queryKey: ['partners', partnerId],
		queryFn: () => getPartner(partnerId),
		enabled: !!partnerId
	});

	if (isLoading && isEditing) return <div>Loading...</div>;

	return (
		<div className='flex flex-col items-center gap-16 w-full pt-[52px] md:pt-[82px] md:gap-24'>
			<AdminFormPageHeader
				title={isEditing ? 'Updating partner' : 'Creating partner'}
			/>

			<AdminAddPartnerForm partner={partner} />
		</div>
	);
};

export default AdminAddPartnerPage;
