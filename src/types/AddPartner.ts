export interface PartnerFormValues {
	partnerName: string;
	partnerLogo: string;
	links?: Link[];
}

export interface CreatePartnerRequest {
	name: string;
	image: string;
	links?: Link[];
}

interface Link {
	label: string;
	url: string;
}
