import { ProjectFormValues, CreateProjectRequest } from '../types/AddProject';

export const mapProjectFormValuesToRequest = (
	values: ProjectFormValues
): CreateProjectRequest => {
	const requestData: CreateProjectRequest = {
		name: values.projectName,
		customer: values.customerName,
		description: values.description,
		softwares: values.softwares,
		thumbnail: values.thumbnail,
		media: {
			images: values.mediaImages,
			videos: values.mediaVideos
		},
		start_date: values.start_date!,
		end_date: values.end_date!,
		links: values.links
	};

	return requestData;
};
