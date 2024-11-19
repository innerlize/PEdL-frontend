import { ProjectFormFieldsValues } from '../types/AddProject';

export const mapProjectFormValuesToRequest = (
	values: ProjectFormFieldsValues
): FormData => {
	const formData = new FormData();

	formData.append('name', values.projectName);
	formData.append('customer', values.customerName);
	formData.append('description', values.description);

	values.softwares?.forEach(software => {
		formData.append('softwares[]', software);
	});

	formData.append('thumbnail', values.thumbnail);

	values.imagesUrls?.forEach(url => formData.append('imagesUrls[]', url));
	values.imagesFiles?.forEach(file => formData.append('imagesFiles[]', file));
	values.videosUrls?.forEach(url => formData.append('videosUrls[]', url));
	values.videosFiles?.forEach(file => formData.append('videosFiles[]', file));

	formData.append('start_date', values.start_date!.toISOString());
	formData.append('end_date', values.end_date!.toISOString());

	formData.append('category', values.category!);

	values.links?.forEach((link, index) => {
		formData.append(`links[${index}][label]`, link.label);
		formData.append(`links[${index}][url]`, link.url);
	});

	return formData;
};
