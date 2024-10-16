import { AdminProjectsCarousel } from '../../components/Admin/Portfolio/ProjectsCarousel';
import { AdminSectionHeader } from '../../components/Admin/SectionHeader';

const adminProjectsData = [
	{
		id: '1',
		name: 'Project 1',
		customer: 'Customer 1',
		description: 'Project 1 description',
		softwares: ['Software 1', 'Software 2'],
		thumbnail:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg',
		media: {
			images: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			],
			videos: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			]
		},
		start_date: {
			_seconds: 1000000000,
			_nanoseconds: 123
		},
		end_date: {
			_seconds: 2000000000,
			_nanoseconds: 123
		},
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
		customer: 'Customer 2',
		description: 'Project 2 description',
		softwares: ['Software 1', 'Software 2'],
		thumbnail: 'https://a-z-animals.com/media/shiba-inu-1.jpg',
		media: {
			images: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			],
			videos: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			]
		},
		start_date: {
			_seconds: 3000000000,
			_nanoseconds: 123
		},
		end_date: {
			_seconds: 4000000000,
			_nanoseconds: 123
		},
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
		customer: 'Customer 3',
		description: 'Project 3 description',
		softwares: ['Software 1', 'Software 2'],
		thumbnail:
			'https://www.tiendanimal.es/articulos/wp-content/uploads/2020/03/cobaya-sobre-heno-1200x900.jpg',
		media: {
			images: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			],
			videos: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			]
		},
		start_date: {
			_seconds: 5000000000,
			_nanoseconds: 123
		},
		end_date: {
			_seconds: 6000000000,
			_nanoseconds: 123
		},
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
		customer: 'Customer 4',
		description: 'Project 4 description',
		softwares: ['Software 1', 'Software 2'],
		thumbnail:
			'https://www.zooplus.es/magazine/wp-content/uploads/2022/02/Cotorra-argentina.jpeg',
		media: {
			images: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			],
			videos: [
				'https://via.placeholder.com/250',
				'https://via.placeholder.com/250'
			]
		},
		start_date: {
			_seconds: 7000000000,
			_nanoseconds: 123
		},
		end_date: {
			_seconds: 8000000000,
			_nanoseconds: 123
		},
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

const AdminPortfolioPage: React.FC = () => {
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
			top-right corner of its box.
		</>
	);

	return (
		<div className='w-full'>
			<AdminSectionHeader title={title} subtitle={subtitle} />

			<div className='flex-1 mt-[60px] md:mt-[130px] xl:mt-[60px] 2xl:mt-[80px]'>
				<AdminProjectsCarousel projects={adminProjectsData} />
			</div>
		</div>
	);
};

export default AdminPortfolioPage;
