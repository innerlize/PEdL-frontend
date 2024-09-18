import { useLocation } from 'react-router-dom';
import { AdminHelperText } from './HelperText';
import { FaAsterisk } from 'react-icons/fa';
import clsx from 'clsx';

interface AdminInputFieldHeaderProps {
	title: string;
	required?: boolean;
	helper?: React.ReactNode;
}

export const AdminInputFieldHeader: React.FC<AdminInputFieldHeaderProps> = ({
	title,
	required,
	helper
}) => {
	const location = useLocation();

	const isPartnerAddPage = location.pathname.includes('/partners/add');

	return (
		<div className='flex flex-col gap-2 font-roboto text-white'>
			<div className='flex gap-1'>
				<p className='text-base font-bold md:text-xl'>{title}</p>

				{required && (
					<div
						className={clsx(
							'size-2',
							isPartnerAddPage ? 'text-secondary' : 'text-primary'
						)}>
						<FaAsterisk className='size-full' />
					</div>
				)}
			</div>

			{helper && <AdminHelperText>{helper}</AdminHelperText>}
		</div>
	);
};
