import React from 'react';

interface AdminSectionHeaderProps {
	title: React.ReactNode;
	subtitle: React.ReactNode;
}

export const AdminSectionHeader: React.FC<AdminSectionHeaderProps> = ({
	title,
	subtitle
}) => (
	<div className='flex flex-col gap-10 text-center font-semibold mt-[52px] md:mt-[82px] xl:mt-[10px] xl:gap-6 2xl:mt-2'>
		<h1 className=' font-roboto text-[40px] leading-[47px] md:text-5xl md:leading-[56px] xl:text-3xl 2xl:text-5xl'>
			{title}
		</h1>

		<h2 className='font-montserrat text-xl leading-[23px] md:max-xl:text-2xl md:max-xl:leading-[29px]'>
			{subtitle}
		</h2>
	</div>
);
