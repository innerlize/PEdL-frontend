import { useQuery } from '@tanstack/react-query';
import { AdminPartnersCarousel } from '../../components/Admin/Partners/PartnersCarousel';
import { AdminSectionHeader } from '../../components/Admin/SectionHeader';
import { getPartners } from '../../api/partners';
import { Spinner } from '../../components/Spinner';

const AdminPartnersPage: React.FC = () => {
	const {
		data: partners,
		isLoading,
		error
	} = useQuery({
		queryKey: ['partners'],
		queryFn: getPartners
	});

	const title = 'Partners';

	const subtitle = (
		<>
			If you want to <span className='text-secondary'>edit</span> a partner,{' '}
			<span className='text-secondary'>just click on it</span> to go to the edit
			form.
			<br />
			<br />
			If you want to <span className='text-[#CC3333]'>delete</span> a partner,{' '}
			<span className='text-[#CC3333]'>click on the red button</span> at the
			top-right corner of its box.
		</>
	);

	const renderContent = () => {
		if (isLoading) {
			return (
				<div className='size-full flex justify-center items-center'>
					<Spinner color='#00BCFF' />
				</div>
			);
		}

		if (error) {
			return <div>Error loading partners!</div>;
		}

		if (partners && partners.length > 0) {
			return <AdminPartnersCarousel partners={partners} />;
		}

		return (
			<div className='size-full flex justify-center items-center text-2xl text-center italic'>
				No partners found... <span className='mx-2 text-secondary'>yet</span> ;)
			</div>
		);
	};

	return (
		<div className='flex flex-col w-full'>
			<AdminSectionHeader title={title} subtitle={subtitle} />

			<div className='flex-1 mt-[60px] md:mt-[130px] xl:mt-[60px] 2xl:mt-[80px]'>
				{renderContent()}
			</div>
		</div>
	);
};

export default AdminPartnersPage;
