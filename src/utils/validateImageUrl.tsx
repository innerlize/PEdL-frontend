import { validateImage } from 'image-validator';

export const validateImageUrl = async (imageUrl: string): Promise<boolean> => {
	const isValid = await validateImage(imageUrl);

	return isValid ? true : false;
};
