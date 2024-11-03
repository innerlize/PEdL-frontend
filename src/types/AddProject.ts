export interface ProjectFormFieldsValues extends ProjectFormInitialValues {}

export interface ProjectFormInitialValues {
	projectName: string;
	customerName: string;
	description: string;
	softwares: string[];
	thumbnail: string;
	mediaImages?: string[];
	imagesUrls?: string[];
	imagesFiles?: File[];
	mediaVideos?: string[];
	videosUrls?: string[];
	videosFiles?: File[];
	start_date: Date | null;
	end_date: Date | null;
	links?: Link[];
}

export interface CreateProjectRequest {
	name: string;
	customer: string;
	description: string;
	softwares?: string[];
	thumbnail?: string;
	media?: {
		imagesUrls?: string[];
		imagesFiles?: File[];
		videosUrls?: string[];
		videosFiles?: File[];
	};
	start_date: Date;
	end_date: Date;
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
