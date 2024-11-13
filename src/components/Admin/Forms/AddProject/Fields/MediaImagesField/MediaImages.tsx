import { ImagesFilesField } from './ImagesFilesField';
import { ImagesUrlsField } from './ImagesUrlsField';

export const AdminMediaImagesFields: React.FC = () => (
	<div className='flex flex-col gap-6'>
		<div>
			<p className='mb-2 text-sm font-medium'>Image URL</p>

			<ImagesUrlsField />
		</div>

		<div>
			<p className='mb-2 text-sm font-medium'>Images local files</p>

			<ImagesFilesField />
		</div>
	</div>
);
