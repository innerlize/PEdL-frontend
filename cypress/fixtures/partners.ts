export const partners = [
	{
		id: '1',
		name: 'Partner One',
		image: 'https://example.com/partner-one.jpg',
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/partner-one'
			},
			{
				label: 'Website',
				src: 'https://partner-one.com'
			}
		]
	},
	{
		id: '2',
		name: 'Partner Two',
		image: 'https://example.com/partner-two.jpg',
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/partner-two'
			},
			{
				label: 'Website',
				src: 'https://partner-two.com'
			}
		]
	},
	{
		id: '3',
		name: 'Partner Three',
		image: 'https://example.com/partner-three.jpg',
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/partner-three'
			},
			{
				label: 'Website',
				src: 'https://partner-three.com'
			}
		]
	},
	{
		id: '4',
		name: 'Partner Four',
		image: 'https://example.com/partner-four.jpg',
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/partner-four'
			},
			{
				label: 'Website',
				src: 'https://partner-four.com'
			}
		]
	}
];

export const partnerCreatedResponse = {
	message: 'Partner successfully created!',
	status: 200,
	data: {
		id: '5',
		name: 'Partner Five',
		image: 'https://example.com/partner-five.jpg',
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/partner-five'
			},
			{
				label: 'Website',
				src: 'https://partner-five.com'
			}
		]
	}
};

export const partnerUpdatedResponse = {
	message: 'Partner successfully updated!',
	status: 200,
	data: {
		id: '1',
		name: 'Updated Partner One',
		image: 'https://example.com/updated-partner-one.jpg',
		links: [
			{
				label: 'GitHub',
				src: 'https://github.com/updated-partner-one'
			},
			{
				label: 'Website',
				src: 'https://updated-partner-one.com'
			}
		]
	}
};
