import { apiClient } from '../config/axios';
import { CreateProjectRequest } from '../types/AddProject';
import { Project } from '../types/Portfolio';

export const getProjects = async (): Promise<Project[]> => {
	const response = await apiClient.get('/projects');

	return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
	const response = await apiClient.get(`/projects/${id}`);

	return response.data;
};

export const createProject = async (
	project: CreateProjectRequest,
	token: string
): Promise<unknown> => {
	const response = await apiClient.post('/projects', project, {
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};

export const updateProject = async (
	id: string,
	project: CreateProjectRequest,
	token: string
): Promise<unknown> => {
	const response = await apiClient.patch(`/projects/${id}`, project, {
		headers: { Authorization: `Bearer ${token}` }
	});

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

export const updateProjectOrder = async (
	id: string,
	newOrder: number,
	app: string,
	token: string
): Promise<unknown> => {
	const response = await apiClient.patch(
		`/projects/${id}/order`,
		{ newOrder, app },
		{
			headers: { Authorization: `Bearer ${token}` }
		}
	);

	console.log('response', response.data);

	return response.data;
};
