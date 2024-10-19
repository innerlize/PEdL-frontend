import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../../../api/projects';
import { useAuth } from '../../../hooks/useAuth';

interface AdminProjectCardProps {
	id: string;
	name: string;
	thumbnail: string;
}

export const AdminProjectCard: React.FC<AdminProjectCardProps> = ({
	id,
	name,
	thumbnail
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { showModal } = useConfirmModal();
	const { getCurrentUserToken } = useAuth();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async () => {
			const token = await getCurrentUserToken();

			return await deleteProject(id, token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
		onError: error => {
			console.error(`Error deleting project with id ${id}: `, error);
		}
	});

	const handleDelete = async () => {
		await mutation.mutateAsync();
	};

	const handleShowModal = () => {
		const modalContent = (
			<p>
				Are you sure that you want to{' '}
				<span className='text-warning font-bold'>delete</span> this project?
			</p>
		);

		showModal(modalContent, handleDelete);
	};

	return (
		<div data-test={`project-card-${id}`} className='size-full'>
			<div
				data-test='project-card-delete-button'
				onClick={handleShowModal}
				className='absolute text-[24px] p-[6px] text-center top-[5px] right-[5px] text-3xl text-white bg-warning cursor-pointer rounded-[3px] drop-shadow-lg transition-colors hover:bg-red-500'>
				<FaTrashAlt />
			</div>

			<Link to={`/admin-panel`}>
				<img
					src={thumbnail}
					alt={isLoaded ? `${name}'s project thumbnail` : ''}
					loading='lazy'
					className='size-full object-cover rounded-[5px]'
					onLoad={() => setIsLoaded(true)}
				/>

				<div className='swiper-lazy-preloader' />
			</Link>
		</div>
	);
};
