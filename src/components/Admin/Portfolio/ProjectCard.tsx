import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../../../api/projects';
import { useAuth } from '../../../hooks/useAuth';
import clsx from 'clsx';

interface AdminProjectCardProps {
	id: string;
	name: string;
	thumbnail: string;
	app?: 'pedl' | 'cofcof';
}

export const AdminProjectCard: React.FC<AdminProjectCardProps> = ({
	id,
	name,
	thumbnail,
	app
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
		<div
			data-test={`project-card-${id}`}
			className='relative w-[150px] h-[60px] md:w-[200px] md:h-[80px] xl:w-[250px] xl:h-[100px] 2xl:w-[300px] 2xl:h-[120px]'>
			<div
				data-test='project-card-delete-button'
				onClick={handleShowModal}
				className='absolute text-[14px] p-[6px] text-center top-1 left-1 text-3xl text-white bg-warning cursor-pointer rounded-[3px] drop-shadow-lg transition-colors hover:bg-red-500 md:text-[16px] xl:text-[18px] 2xl:text-[20px]'>
				<FaTrashAlt />
			</div>

			<Link to={`/admin-panel/project/add`} state={id}>
				<img
					src={thumbnail}
					alt={isLoaded ? `${name}'s project thumbnail` : ''}
					loading='lazy'
					className='size-full object-cover rounded-[5px]'
					onLoad={() => setIsLoaded(true)}
				/>

				<p
					className={clsx(
						'absolute bottom-1 right-1 max-w-[50%] text-[10px] rounded-[3px] p-[2px] truncate text-white font-bold md:text-[12px] xl:text-[14px] 2xl:text-[16px] md:p-[4px] xl:p-[6px]',
						app === 'pedl' ? 'bg-primary' : 'bg-secondary'
					)}>
					{name}
				</p>
			</Link>
		</div>
	);
};
