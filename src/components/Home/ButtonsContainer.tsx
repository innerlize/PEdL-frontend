import { CTAButton } from './CTAButton';

interface ButtonsContainerProps {
	buttonsToDisplay: { innerText: string; pathTo: string; icon?: JSX.Element }[];
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
	buttonsToDisplay
}) => {
	return (
		<div className='flex flex-col items-center gap-[15px] md:flex-row md:flex-wrap md:justify-center md:gap-[50px] xl:gap-[30px] xl:justify-start'>
			{buttonsToDisplay.map((button, index) => {
				return (
					<CTAButton
						key={index}
						innerText={button.innerText}
						pathTo={button.pathTo}
						icon={button.icon}
					/>
				);
			})}
		</div>
	);
};
