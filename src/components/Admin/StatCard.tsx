interface StatCardProps {
	label: string;
	value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
	return (
		<div
			data-test='admin-StatCard'
			className='flex flex-col justify-center gap-1 w-[130px] h-[90px] px-[10px] py-[18px] bg-white text-left rounded-[3px] md:max-xl:w-[150px] md:max-xl:h-[108px] 2xl:w-[150px] 2xl:h-[108px]'>
			<p className='text-[13px] text-[#6B7280] md:max-xl:text-[15px]'>
				{label}
			</p>

			<div className='text-3xl text-secondary font-semibold md:max-xl:text-[40px] 2xl:text-[40px]'>
				{value}
			</div>
		</div>
	);
};
