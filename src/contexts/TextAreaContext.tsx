import React, { createContext, useState } from 'react';

interface TextAreaContextValues {
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	useTemplate: () => void;
}

export const TextAreaContext = createContext<TextAreaContextValues>({
	text: '',
	setText: () => {},
	useTemplate: () => {}
});

interface TextAreaProviderProps {
	children: React.ReactNode;
}

const TextAreaProvider: React.FC<TextAreaProviderProps> = ({ children }) => {
	const [text, setText] = useState<string>('');

	const useTemplate = () => {
		setText(
			"Hi Pablo, I hope you are doing well. I would like to propose a collaboration on [Project Name] that I believe we could both benefit from. Based on your skills and experience at [Recipient's Company], I think we would make a great team to achieve the goals of this project. I am confident that by working together, we can leverage our strengths and create something truly impactful. If you are interested, please let me know so we can discuss the details further. Looking forward to your response. Best regards, [Your Name] [Your Company]"
		);
	};

	return (
		<TextAreaContext.Provider value={{ text, setText, useTemplate }}>
			{children}
		</TextAreaContext.Provider>
	);
};

export default TextAreaProvider;
