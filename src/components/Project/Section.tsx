interface SectionProps {
	title: string;
	children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
	<div data-test='project-details-section'>
		<h4 className='text-2xl font-semibold text-primary md:max-xl:text-[32px]'>
			{title}
		</h4>

		<div className='flex flex-col gap-5 text-xl font-light leading-[23px] mt-[20px] md:max-xl:text-2xl md:leading-7'>
			{children}
		</div>
	</div>
);
