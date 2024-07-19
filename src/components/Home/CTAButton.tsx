import { Link } from 'react-router-dom';

interface CTAButtonProps {
	innerText: string;
	pathTo: string;
	icon?: JSX.Element;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
	innerText,
	pathTo,
	icon
}) => {
	return (
		<div
			data-test={`button-${innerText}`}
			className='flex items-center justify-center w-[200px] h-16 bg-primary rounded-[3px] cursor-pointer transition-colors hover:bg-[#00C886] md:w-[300px] md:h-24 xl:w-[220px] xl:h-[70px] 2xl:w-[300px] 2xl:h-24'>
			<Link
				to={pathTo}
				className='flex items-center justify-center gap-2.5 font-roboto text-2xl text-white font-bold md:text-4xl xl:text-2xl 2xl:text-[32px]'>
				{innerText}

				{icon && (
					<span className='inline-block w-[26px] h-[26px] md:w-[38px] md:h-[38px] xl:w-7 xl:h-7 2xl:w-[34px] 2xl:h-[34px]'>
						{icon}
					</span>
				)}
			</Link>
		</div>
	);
};
