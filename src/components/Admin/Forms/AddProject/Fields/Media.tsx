import { AdminFieldWrapper } from '../../FieldWrapper';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminMediaImagesFields } from './MediaImagesField/MediaImages';
import { ExistingImagesPreviews } from './MediaImagesField/Previews/ExistingImagesPreviews';
import { NewImagesPreviews } from './MediaImagesField/Previews/NewImagesPreviews';
import { AdminMediaVideosFields } from './MediaVideosField/MediaVideos';
import { ExistingVideosPreviews } from './MediaVideosField/Previews/ExistingVideosPreviews';
import { NewVideosPreviews } from './MediaVideosField/Previews/NewVideosPreviews';

interface AdminMediaFieldProps {
	projectId: string;
}

export const AdminMediaField: React.FC<AdminMediaFieldProps> = ({
	projectId
}) => {
	const title = 'Media';

	const helper = (
		<>
			<p>
				Add images and videos via URLs and{' '}
				<span className='text-primary'>press Enter</span>.
			</p>

			<p>
				Also, you can upload them by{' '}
				<span className='text-primary'>dragging and dropping</span> them from
				your device!
			</p>
		</>
	);

	return (
		<AdminFieldWrapper>
			<AdminInputFieldHeader title={title} helper={helper} />

			<div data-test='admin-media-field' className='flex flex-col gap-12'>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col gap-6'>
						<AdminMediaImagesFields />
						<NewImagesPreviews />
					</div>

					<div className='flex flex-col gap-6'>
						<AdminMediaVideosFields />
						<NewVideosPreviews />
					</div>
				</div>

				{projectId && (
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-3'>
							<p className='text-[14px] leading-4 md:text-base'>
								Previews of{' '}
								<span className='text-primary'>
									media already stored and assigned
								</span>{' '}
								to this project.
							</p>

							<p className='text-[14px] leading-4 md:text-base'>
								If you want to remove one of them,{' '}
								<span className='text-warning'>
									click the red button at the top-right corner
								</span>{' '}
								of its box. This will unassign it from this project and also
								delete it from storage (if it was uploaded).
							</p>
						</div>

						<div className='flex flex-col gap-4'>
							<ExistingImagesPreviews projectId={projectId} />
							<ExistingVideosPreviews projectId={projectId} />
						</div>
					</div>
				)}
			</div>
		</AdminFieldWrapper>
	);
};
