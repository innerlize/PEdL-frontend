import { ErrorMessage, useFormikContext } from 'formik';
import { ProjectFormFieldsValues } from '../../../../../../types/AddProject';
import { AdminSimpleInputType } from '../../../Inputs/SimpleInput';
import ReactPlayer from 'react-player';

export const VideosUrlsField: React.FC = () => {
	const { values, setFieldValue, setFieldError } =
		useFormikContext<ProjectFormFieldsValues>();
	const urls = values.videosUrls || [];

	const addVideoUrl = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			const currentTarget = e.currentTarget;
			const newVideoUrl = currentTarget.value.trim();
			const canPlay = ReactPlayer.canPlay(newVideoUrl);

			if (!canPlay) {
				setFieldError(
					'videosUrls',
					'The video URL is not valid and cannot be played. Video addition skipped.'
				);
				return;
			}

			if (newVideoUrl && canPlay) {
				setFieldValue('videosUrls', [...urls, newVideoUrl]);
				currentTarget.value = '';
			}
		}
	};

	return (
		<div>
			<AdminSimpleInputType
				placeholder='https://www.youtube.com/watch?v=kG7d_4LeP48'
				onKeyDown={addVideoUrl}
			/>

			<ErrorMessage
				name='videosUrls'
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</div>
	);
};
