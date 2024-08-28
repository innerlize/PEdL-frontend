export const getRandomTypewriterString = (stringsArray: string[]) => {
	const randomIndex = Math.floor(Math.random() * stringsArray.length);

	return stringsArray[randomIndex];
};
