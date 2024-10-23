export interface ProjectFormValues {
	projectName: string;
	customerName: string;
	description: string;
	softwares: string[];
	thumbnail: string;
	mediaImages?: string[];
	mediaVideos?: string[];
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
		images?: string[];
		videos?: string[];
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
