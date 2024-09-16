export interface AdminAddProjectFormData {
	projectName: string;
	customerName: string;
	description: string;
	softwares: string[];
	thumbnail: string;
	mediaImages?: string[];
	mediaVideos?: string[];
	links?: Link[];
}

export interface SoftwarePill {
	name: string;
	color: string;
}

interface Link {
	label: string;
	src: string;
}
