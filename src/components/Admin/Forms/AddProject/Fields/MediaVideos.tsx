import React, { useState } from 'react';
import {
	ArrayHelpers,
	ErrorMessage,
	FieldArray,
	useFormikContext
} from 'formik';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminSimpleInputType } from '../../Inputs/SimpleInput';
import { AdminVideoPreviewBox } from '../../VideoPreviewBox';
import ReactPlayer from 'react-player';
import { AdminFieldWrapper } from '../../FieldWrapper';

export const AdminMediaVideosField: React.FC = () => {
	const { setFieldError } = useFormikContext();
	const [videoUrl, setVideoUrl] = useState<string>('');

	const addVideo = (
		e: React.KeyboardEvent<HTMLInputElement>,
		arrayHelpers: ArrayHelpers
	) => {
		if (e.key === 'Enter' && videoUrl) {
			e.preventDefault();

			const newVideo = videoUrl;
			const canPlay = ReactPlayer.canPlay(newVideo);

			if (!canPlay) {
				setFieldError(
					'mediaVideos',
					'This video cannot be played. Video not added to the list.'
				);

				return;
			}

			arrayHelpers.push(newVideo);
			setVideoUrl('');
		}
	};

	const removeVideo = (index: number, arrayHelpers: ArrayHelpers) => {
		arrayHelpers.remove(index);
	};

	const helper = (
		<>
			<p>
				Enter a video URL and press <span className='text-primary'>Enter</span>{' '}
				to add it to the list.
			</p>

			<p>You can add as many videos as you want!</p>
		</>
	);

	return (
		<FieldArray
			name='mediaVideos'
			render={arrayHelpers => (
				<AdminFieldWrapper data-test='admin-media-videos-field'>
					<AdminInputFieldHeader title='Media videos' helper={helper} />

					<AdminSimpleInputType
						type='text'
						value={videoUrl}
						onChange={e => setVideoUrl(e.target.value)}
						onKeyDown={e => addVideo(e, arrayHelpers)}
						placeholder='https://www.youtube.com/watch?v=kG7d_4LeP48'
					/>

					{arrayHelpers.form.values.mediaVideos.length > 0 && (
						<div
							data-test='media-videos-boxes-container'
							className='flex flex-wrap gap-2.5'>
							{arrayHelpers.form.values.mediaVideos.map(
								(video: string, index: number) => (
									<AdminVideoPreviewBox
										key={index}
										videoSrc={video}
										removeFn={() => removeVideo(index, arrayHelpers)}
									/>
								)
							)}
						</div>
					)}

					<ErrorMessage
						name='mediaVideos'
						render={error => <div className='text-red-500'>{error}</div>}
					/>
				</AdminFieldWrapper>
			)}
		/>
	);
};
