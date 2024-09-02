export interface Partner {
	id: string;
	name: string;
	image: string;
	links: Link[];
}

interface Link {
	label: string;
	url: string;
}
