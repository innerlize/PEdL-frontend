import { Tooltip } from 'react-tooltip';

interface AdminPillProps {
	name: string;
	backgroundColor: string;
	onClick: () => void;
	tooltipContent?: string;
}

export const AdminPill: React.FC<AdminPillProps> = ({
	name,
	backgroundColor,
	onClick,
	tooltipContent
}) => {
	return (
		<div
			data-test='admin-pill'
			data-tooltip-id={tooltipContent && `tooltip-${name}`}
			className='font-roboto text-[15px] font-semibold p-[5px] rounded-[3px] leading-[18px] text-shadow-sm cursor-pointer md:text-base'
			style={{ backgroundColor }}
			onClick={onClick}>
			<div>{name}</div>

			{tooltipContent && (
				<Tooltip id={`tooltip-${name}`} place='top' content={tooltipContent} />
			)}
		</div>
	);
};
