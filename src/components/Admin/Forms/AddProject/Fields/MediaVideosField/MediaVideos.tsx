import { VideosUrlsField } from './VideosUrlsField';
import { VideosFilesField } from './VideosFilesField';

export const AdminMediaVideosFields: React.FC = () => (
	<div className='flex flex-col gap-6'>
		<div>
			<p className='mb-2 text-sm font-medium'>Video URL</p>

			<VideosUrlsField />
		</div>

		<div>
			<p className='mb-2 text-sm font-medium'>Videos local files</p>

			<VideosFilesField />
		</div>
	</div>
);
