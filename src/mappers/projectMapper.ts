import {
	CreateProjectRequest,
	ProjectFormFieldsValues
} from '../types/AddProject';

export const mapProjectFormValuesToRequest = (
	values: ProjectFormFieldsValues
): CreateProjectRequest => {
	const requestData: CreateProjectRequest = {
		name: values.projectName,
		customer: values.customerName,
		description: values.description,
		softwares: values.softwares,
		thumbnail: values.thumbnail,
		media: {
			imagesUrls: values.imagesUrls,
			imagesFiles: values.imagesFiles,
			videosUrls: values.videosUrls,
			videosFiles: values.videosFiles
		},
		start_date: values.start_date!,
		end_date: values.end_date!,
		links: values.links
	};

	return requestData;
};
