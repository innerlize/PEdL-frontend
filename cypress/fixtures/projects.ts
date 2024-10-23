export const projects = [
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
				src: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				src: 'https://www.google.com'
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
				src: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				src: 'https://www.google.com'
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
				src: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				src: 'https://www.google.com'
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
				src: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				src: 'https://www.google.com'
			}
		]
	}
];

export const projectCreatedResponse = {
	message: 'Project successfully created!',
	status: 200,
	data: {
		id: 'project-123',
		name: 'Example Project',
		customer: 'Example Customer',
		description: 'This is an example project.',
		softwares: ['React', 'Figma'],
		thumbnail:
			'https://images.pexels.com/photos/374857/pexels-photo-374857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		media: {
			images: [
				'https://example.com/image1.jpg',
				'https://example.com/image2.jpg'
			],
			videos: ['https://example.com/video1.mp4']
		},
		start_date: {
			_seconds: Math.floor(new Date('2024-10-15').getTime() / 1000),
			_nanoseconds: 0
		},
		end_date: {
			_seconds: Math.floor(new Date('2024-12-15').getTime() / 1000),
			_nanoseconds: 0
		},
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/example-project'
			},
			{
				label: 'Live Demo',
				src: 'https://example.com/live-demo'
			}
		]
	}
};

export const projectUpdatedResponse = {
	message: 'Project with id "1" successfully updated!',
	status: 200,
	data: {
		id: '1',
		name: 'Updated Project 1',
		customer: 'Updated Customer 1',
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
				src: 'https://www.google.com'
			},
			{
				label: 'Link 2',
				src: 'https://www.google.com'
			}
		]
	}
};
