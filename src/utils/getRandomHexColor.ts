export const getRandomHexColor = (): string => {
	const hexDigits = '0123456789abcdef';
	let hexColor = '#';

	for (let i = 0; i < 6; i++) {
		hexColor += hexDigits[Math.floor(Math.random() * 16)];
	}

	return hexColor;
};
