import { useFormikContext } from 'formik';
import { ProjectFormFieldsValues } from '../../../../../../../types/AddProject';
import { PhotoProvider } from 'react-photo-view';
import { AdminImageBrokenElement } from '../../../../ImageBrokenElement';
import { AdminImagePreviewBox } from '../../../../ImagePreviewBox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFileFromProject } from '../../../../../../../api/projects';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { toast } from 'react-toastify';

interface AdminExistingImagesPreviewsProps {
	projectId: string;
}

export const ExistingImagesPreviews: React.FC<
	AdminExistingImagesPreviewsProps
> = ({ projectId }) => {
	const { values } = useFormikContext<ProjectFormFieldsValues>();
	const existingImages = values.mediaImages || [];
	const { getCurrentUserToken } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: async (fileName: string) => {
			const token = await getCurrentUserToken();

			return deleteFileFromProject(projectId, fileName, 'image', token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			toast.success('Image successfully deleted!');
		},
		onError: error => {
			toast.error('Error deleting image! Check console for more details.');
			console.error('Error deleting image: ', error);
		}
	});

	return (
		<div>
			{existingImages.length ? (
				<>
					<p className='mb-2 text-sm font-medium'>Images</p>

					<div className='flex gap-2 flex-wrap'>
						<PhotoProvider brokenElement={<AdminImageBrokenElement />}>
							{existingImages.map((url, index) => {
								return (
									<AdminImagePreviewBox
										key={index}
										imageSrc={url}
										removeFn={() => mutate(url)}
									/>
								);
							})}
						</PhotoProvider>
					</div>
				</>
			) : null}
		</div>
	);
};
