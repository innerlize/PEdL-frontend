import { socials } from '../data/socials';
import { SocialType } from '../types/Social';
import { SocialBubble } from './SocialBubble';

interface SocialContainerProps {
	socialsToDisplay: SocialType[];
	className?: string;
}

export const SocialContainer: React.FC<SocialContainerProps> = ({
	socialsToDisplay,
	className
}) => {
	const socialsData = socials.filter(social =>
		socialsToDisplay.includes(social.type)
	);

	return (
		<div className={className}>
			{socialsData.map(social => (
				<SocialBubble
					key={social.type}
					type={social.type}
					link={social.link}
					icon={social.icon}
				/>
			))}
		</div>
	);
};
