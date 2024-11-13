import { useFormikContext } from 'formik';
import { ProjectFormFieldsValues } from '../../../../../../../types/AddProject';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFileFromProject } from '../../../../../../../api/projects';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { AdminVideoPreviewBox } from '../../../../VideoPreviewBox';

interface AdminExistingVideosPreviewsProps {
	projectId: string;
}

export const ExistingVideosPreviews: React.FC<
	AdminExistingVideosPreviewsProps
> = ({ projectId }) => {
	const { values } = useFormikContext<ProjectFormFieldsValues>();
	const existingVideos = values.mediaVideos || [];
	const { getCurrentUserToken } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: async (fileName: string) => {
			const token = await getCurrentUserToken();
			return deleteFileFromProject(projectId, fileName, 'video', token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			toast.success('Video successfully deleted!');
		},
		onError: error => {
			toast.error('Error deleting video! Check console for more details.');
			console.error('Error deleting video: ', error);
		}
	});

	return (
		<div>
			{existingVideos.length ? (
				<>
					<p className='mb-2 text-sm font-medium'>Videos</p>

					<div className='flex gap-2 flex-wrap'>
						{existingVideos.map((url, index) => (
							<AdminVideoPreviewBox
								key={index}
								videoSrc={url}
								removeFn={() => mutate(url)}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
};
