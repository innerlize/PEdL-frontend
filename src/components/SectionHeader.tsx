import React from 'react';

interface SectionHeaderProps {
	title: React.ReactNode;
	subtitle: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
	title,
	subtitle
}) => (
	<div className='flex flex-col gap-10 text-center font-semibold mt-[50px] mb-[100px] md:mt-[10px] xl:gap-6 xl:mb-[130px] 2xl:mt-2'>
		<h1 className='font-roboto text-[32px] leading-[38px] md:text-5xl xl:text-3xl 2xl:text-5xl'>
			{title}
		</h1>

		<h2 className='font-montserrat text-xl leading-6 md:max-xl:text-[32px] md:max-xl:leading-[39px]'>
			{subtitle}
		</h2>
	</div>
);
