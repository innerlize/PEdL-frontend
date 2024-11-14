import { VideosUrlsField } from './VideosUrlsField';
import { VideosFilesField } from './VideosFilesField';

export const AdminMediaVideosFields: React.FC = () => (
	<div className='flex flex-col gap-6'>
		<div data-test='admin-media-videos-url-field'>
			<p className='mb-2 text-sm font-medium'>Video URL</p>

			<VideosUrlsField />
		</div>

		<div data-test='admin-media-videos-file-field'>
			<p className='mb-2 text-sm font-medium'>Videos local files</p>

			<VideosFilesField />
		</div>
	</div>
);
