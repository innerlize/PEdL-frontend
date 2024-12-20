export interface ProjectFormFieldsValues extends ProjectFormInitialValues {}

export interface ProjectFormInitialValues {
	projectName: string;
	customerName: string;
	description: string;
	softwares: string[];
	thumbnail: string;
	mediaImages?: string[];
	mediaVideos?: string[];
	imagesUrls?: string[];
	imagesFiles?: File[];
	videosUrls?: string[];
	videosFiles?: File[];
	start_date: Date | null;
	end_date: Date | null;
	links?: Link[];
}

export interface SoftwarePill {
	name: string;
	color: string;
}

interface Link {
	label: string;
	url: string;
}
