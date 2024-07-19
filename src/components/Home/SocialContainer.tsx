import { socials } from '../../data/socials';
import { SocialType } from '../../types/Social';
import { SocialBubble } from '../SocialBubble';

interface SocialContainerProps {
	socialsToDisplay: SocialType[];
}

export const SocialContainer: React.FC<SocialContainerProps> = ({
	socialsToDisplay
}) => {
	const socialsData = socials.filter(social =>
		socialsToDisplay.includes(social.type)
	);

	return (
		<div className='flex justify-center gap-2.5 md:gap-10 xl:absolute xl:top-[30px] 2xl:top-[45px]'>
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
