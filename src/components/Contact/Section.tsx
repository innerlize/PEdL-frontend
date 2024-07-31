interface SectionProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
	title,
	subtitle,
	children
}) => {
	return (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col gap-2'>
				<h4 className='text-2xl text-primary font-semibold md:max-xl:text-[32px]'>
					{title}
				</h4>

				<p className='text-xl font-light leading-[23px] md:max-xl:text-2xl md:max-xl:leading-7'>
					{subtitle}
				</p>
			</div>

			<div>{children}</div>
		</div>
	);
};
