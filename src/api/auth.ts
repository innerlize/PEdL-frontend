import { apiClient } from '../config/axios';

export const verifyAdminAccess = async (token: string): Promise<boolean> => {
	const response = await apiClient.post(
		'/admin/auth/verify-admin-access',
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);

	return response.data;
};

export const revokeToken = async (token: string): Promise<void> => {
	await apiClient.post(
		'/admin/auth/revoke-token',
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};
