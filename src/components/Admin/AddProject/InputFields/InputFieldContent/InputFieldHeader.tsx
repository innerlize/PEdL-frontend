import { AdminHelperText } from '../../HelperText';
import { FaAsterisk } from 'react-icons/fa';

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
	return (
		<div className='flex flex-col gap-2 font-roboto text-white'>
			<div className='flex gap-1'>
				<p className='text-base font-bold md:text-xl'>{title}</p>

				{required && (
					<div className='text-primary size-2'>
						<FaAsterisk className='size-full' />
					</div>
				)}
			</div>

			{helper && <AdminHelperText>{helper}</AdminHelperText>}
		</div>
	);
};
