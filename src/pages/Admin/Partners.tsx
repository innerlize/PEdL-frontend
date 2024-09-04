import { AdminPartnersCarousel } from '../../components/Admin/Partners/PartnersCarousel';
import { AdminSectionHeader } from '../../components/Admin/SectionHeader';

const adminPartnersData = [
	{
		id: '1',
		name: 'Project 1',
		image:
			'https://static.vecteezy.com/system/resources/previews/000/610/054/original/vector-successful-partners-people-logos-design-concept-template.jpg',
		links: [
			{
				label: 'Link 1',
				url: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				url: 'https://www.google.com'
			}
		]
	},

	{
		id: '2',
		name: 'Project 2',
		image:
			'https://images-platform.99static.com//AGVH-KoQLUr4ZJoqo3QibT56tuo=/657x97:1921x1361/fit-in/500x500/projects-files/38/3879/387902/12ea69e9-8c54-4579-aa09-0e65dae025a9.jpg',
		links: [
			{
				label: 'Link 1',
				url: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				url: 'https://www.google.com'
			}
		]
	},

	{
		id: '3',
		name: 'Project 3',
		image:
			'https://visme.co/blog/wp-content/uploads/2017/08/40-Creative-Logo-Designs-to-Inspire-You-Databerry-2.jpg',
		links: [
			{
				label: 'Link 1',
				url: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				url: 'https://www.google.com'
			}
		]
	},

	{
		id: '4',
		name: 'Project 4',
		image:
			'https://static.vecteezy.com/system/resources/previews/023/899/822/non_2x/sample-golden-eagle-bird-logo-design-premium-graphic-illustration-vector.jpg',
		links: [
			{
				label: 'Link 1',
				url: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				url: 'https://www.google.com'
			}
		]
	}
];

const AdminPartnersPage: React.FC = () => {
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

	return (
		<div className='w-full'>
			<AdminSectionHeader title={title} subtitle={subtitle} />

			<div className='flex-1 mt-[100px] md:mt-[130px]'>
				<AdminPartnersCarousel partners={adminPartnersData} />
			</div>
		</div>
	);
};

export default AdminPartnersPage;
