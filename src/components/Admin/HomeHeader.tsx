interface HomeHeaderProps {
	title: React.ReactNode;
	subtitle: React.ReactNode;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ title, subtitle }) => {
	return (
		<div>
			<h1 className='text-[40px] font-bold md:text-[64px] xl:max-2xl:text-4xl'>
				{title}
			</h1>

			<h2 className='text-2xl font-semibold md:text-[32px] xl:max-2xl:text-xl 2xl:mt-[15px]'>
				{subtitle}
			</h2>
		</div>
	);
};
