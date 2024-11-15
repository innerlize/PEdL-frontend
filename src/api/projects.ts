import { apiClient } from '../config/axios';
import { AppName, Project } from '../types/Portfolio';

export const getProjects = async (): Promise<Project[]> => {
	const response = await apiClient.get('/projects');

	return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
	const response = await apiClient.get(`/projects/${id}`);

	return response.data;
};

export const createProject = async (
	project: FormData,
	token: string
): Promise<unknown> => {
	const response = await apiClient.post('/projects', project, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const updateProject = async (
	id: string,
	project: FormData,
	token: string
): Promise<unknown> => {
	const response = await apiClient.patch(`/projects/${id}`, project, {
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};

export const updateProjectOrder = async (
	id: string,
	newOrder: number,
	app: AppName,
	token: string
): Promise<unknown> => {
	const response = await apiClient.patch(
		`/projects/${id}/order`,
		{ newOrder, app },
		{
			headers: { Authorization: `Bearer ${token}` }
		}
	);

	return response.data;
};

export const deleteProject = async (
	id: string,
	token: string
): Promise<unknown> => {
	const response = await apiClient.delete(`/projects/${id}`, {
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};

export const deleteFileFromProject = async (
	id: string,
	fileUrl: string,
	fileType: string,
	token: string
): Promise<void> => {
	const response = await apiClient.delete(`/projects/${id}/file`, {
		data: { fileUrl, fileType },
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};
