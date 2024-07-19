import React from 'react';
import { Social } from '../types/Social';

interface SocialBubbleProps extends Social {}

export const SocialBubble: React.FC<SocialBubbleProps> = ({
	type,
	link,
	icon
}) => {
	return (
		<div className='flex items-center justify-center size-[50px] border border-accent rounded-full cursor-pointer transition-colors hover:bg-primary hover:border-primary md:size-20 xl:size-[50px] 2xl:size-[60px]'>
			<a
				data-test={`social-${type}`}
				className='w-6 h-6 md:w-10 md:h-10 xl:size-[25px] 2xl:size-[30px]'
				href={link}
				target='_blank'
				rel='noreferrer'>
				{icon}
			</a>
		</div>
	);
};
