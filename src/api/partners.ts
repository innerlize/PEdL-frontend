import { apiClient } from '../config/axios';
import { CreatePartnerRequest } from '../types/AddPartner';
import { Partner } from '../types/Partner';

export const getPartners = async (): Promise<Partner[]> => {
	const response = await apiClient.get('/partners');

	return response.data;
};

export const getPartner = async (id: string): Promise<Partner> => {
	const response = await apiClient.get(`/partners/${id}`);

	return response.data;
};

export const createPartner = async (
	partner: CreatePartnerRequest,
	token: string
): Promise<unknown> => {
	const response = await apiClient.post('/partners', partner, {
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};

export const updatePartner = async (
	id: string,
	partner: CreatePartnerRequest,
	token: string
): Promise<unknown> => {
	const response = await apiClient.patch(`/partners/${id}`, partner, {
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};

export const deletePartner = async (
	id: string,
	token: string
): Promise<unknown> => {
	const response = await apiClient.delete(`/partners/${id}`, {
		headers: { Authorization: `Bearer ${token}` }
	});

	return response.data;
};
