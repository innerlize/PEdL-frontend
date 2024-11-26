import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { updateProjectVisibility } from '../../../api/projects';
import { AppName } from '../../../types/Portfolio';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface VisibilityButtonProps {
	id: string;
	appName: AppName;
	isVisible: boolean;
}

export const VisibilityButton: React.FC<VisibilityButtonProps> = ({
	id,
	appName,
	isVisible
}) => {
	const { getCurrentUserToken } = useAuth();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async () => {
			const token = await getCurrentUserToken();

			return updateProjectVisibility(id, appName, token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
		onError: (err: AxiosError<{ message: string }>) =>
			toast.error(
				<>
					<span className='text-warning font-bold'>
						Error updating project visibility!
					</span>
					<br />
					<span className='text-sm'>{err.response?.data.message}</span>
				</>,
				{
					icon: () => '🚨'
				}
			)
	});

	return (
		<div
			data-test='project-card-visibility-button'
			onClick={() => mutation.mutate()}>
			{isVisible ? (
				<FaEye data-test='visibility-icon-visible' />
			) : (
				<FaEyeSlash data-test='visibility-icon-hidden' />
			)}
		</div>
	);
};
