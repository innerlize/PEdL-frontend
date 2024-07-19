export const SvgElements: React.FC = () => {
	return (
		<div className='absolute flex justify-between w-full bottom-0 left-0 p-[30px] md:p-[70px] xl:flex-col xl:w-0 xl:h-full xl:p-[30px] 2xl:p-[45px]'>
			<div className='size-8 xl:size-6 xl:rotate-90 2xl:size-8'>
				<svg
					width='100%'
					height='100%'
					viewBox='0 0 32 32'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<line
						x1='2'
						y1='31'
						x2='32'
						y2='31'
						stroke='#00C896'
						strokeWidth='2'
					/>
					<line
						x1='1'
						y1='30'
						x2='1'
						y2='-3.57628e-06'
						stroke='#00C896'
						strokeWidth='2'
					/>
					<rect
						y='32'
						width='2'
						height='2'
						transform='rotate(-90 0 32)'
						fill='#00C896'
					/>
				</svg>
			</div>

			<div className='size-8 xl:size-6 xl:rotate-90 2xl:size-8'>
				<svg
					width='100%'
					height='100%'
					viewBox='0 0 32 32'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<line x1='31' y1='30' x2='31' stroke='#00C896' strokeWidth='2' />
					<line x1='30' y1='31' y2='31' stroke='#00C896' strokeWidth='2' />
					<rect
						x='32'
						y='32'
						width='2'
						height='2'
						transform='rotate(180 32 32)'
						fill='#00C896'
					/>
				</svg>
			</div>
		</div>
	);
};
