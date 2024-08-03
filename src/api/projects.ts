import { apiClient } from '../config/axios';
import { Project } from '../types/Portfolio';

export const getProjects = async (): Promise<Project[]> => {
	const response = await apiClient.get('/projects');

	return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
	const response = await apiClient.get(`/projects/${id}`);

	return response.data;
};
