import { Link } from 'react-router-dom';

interface CTACardProps {
	title: string;
	subtitle: string;
	redirectTo: string;
	icon: JSX.Element;
	backgroundColor: string;
	hoverBackgroundColor: string;
}

export const CTACard: React.FC<CTACardProps> = ({
	title,
	subtitle,
	redirectTo,
	icon,
	backgroundColor,
	hoverBackgroundColor
}) => {
	return (
		<Link to={redirectTo}>
			<div
				data-test='admin-CTACard'
				className={`flex items-center justify-center gap-5 px-[28px] py-[30px] ${backgroundColor} rounded-[3px] cursor-pointer transition-color hover:${hoverBackgroundColor} md:max-xl:w-[470px] md:max-xl:px-[58px] md:py-[40px] 2xl:p-[58px]`}>
				<div className='flex flex-col gap-2.5 w-[191px] text-left md:w-[243px] 2xl:gap-3'>
					<p className='text-2xl font-black md:max-xl:text-4xl 2xl:text-[32px]'>
						{title}
					</p>

					<p className='text-[15px] leading-[18px] md:text-base md:leading-[19px]'>
						{subtitle}
					</p>
				</div>

				<div
					data-test='admin-CTACard-icon'
					className='size-20 md:size-[90px] xl:max-2xl:size-16'>
					{icon}
				</div>
			</div>
		</Link>
	);
};
