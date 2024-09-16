export const imageURLIsValid = (imageUrl: string): Promise<boolean> => {
	return new Promise(resolve => {
		const img = new Image();
		img.src = imageUrl;

		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};
