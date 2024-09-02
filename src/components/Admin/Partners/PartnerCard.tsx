import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useConfirmModal } from '../../../hooks/useConfirmModal';

interface AdminPartnerCardProps {
	id: string;
	name: string;
	thumbnail: string;
}

export const AdminPartnerCard: React.FC<AdminPartnerCardProps> = ({
	id,
	name,
	thumbnail
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { showModal } = useConfirmModal();

	const handleDelete = async () => {
		console.log(`Deleting partner with id "${id}"`);

		await new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
			console.log(`Partner with id "${id}" successfully deleted`);
		});
	};

	const handleShowModal = () => {
		const modalContent = (
			<p>
				Are you sure that you want to{' '}
				<span className='text-warning font-bold'>delete</span> this partner?
			</p>
		);

		showModal(modalContent, handleDelete);
	};

	return (
		<div data-test={`partner-card-${id}`} className='size-full'>
			<div
				data-test='partner-card-delete-button'
				onClick={handleShowModal}
				className='absolute text-[24px] p-[6px] text-center top-[5px] right-[5px] text-3xl text-white bg-warning cursor-pointer rounded-[3px] drop-shadow-lg transition-colors hover:bg-red-500'>
				<FaTrashAlt />
			</div>

			<Link to={`/admin-panel`}>
				<img
					src={thumbnail}
					alt={isLoaded ? `${name}'s partner thumbnail` : ''}
					loading='lazy'
					className='size-full object-cover rounded-[5px]'
					onLoad={() => setIsLoaded(true)}
				/>

				<div className='swiper-lazy-preloader' />
			</Link>
		</div>
	);
};
