import { useFormikContext } from 'formik';
import { useState, useEffect } from 'react';
import { ProjectFormFieldsValues } from '../../../../../../../types/AddProject';
import { AdminVideoPreviewBox } from '../../../../VideoPreviewBox';

export const NewVideosPreviews = () => {
	const { values, setFieldValue } = useFormikContext<ProjectFormFieldsValues>();
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

	const removeVideo = (index: number) => {
		if (values.videosUrls && index < values.videosUrls!.length) {
			setFieldValue(
				'videosUrls',
				values.videosUrls!.filter((_, i) => i !== index)
			);
		} else if (
			values.videosFiles &&
			index - values.videosUrls!.length < values.videosFiles!.length
		) {
			setFieldValue(
				'videosFiles',
				values.videosFiles!.filter(
					(_, i) => i !== index - values.videosUrls!.length
				)
			);
		}
	};

	useEffect(() => {
		const urls = [
			...(values.videosUrls || []),
			...(values.videosFiles || []).map(file => URL.createObjectURL(file))
		];
		setPreviewUrls(urls);

		return () => {
			(values.videosFiles || []).forEach(file =>
				URL.revokeObjectURL(file.name)
			);
		};
	}, [values.videosUrls, values.videosFiles]);

	return (
		<div>
			{previewUrls.length > 0 ? (
				<>
					<p className='mb-2 text-sm font-medium'>
						Previews of <span className='text-primary'>videos</span> that you
						want to add...
					</p>

					<div className='flex gap-2 flex-wrap'>
						{previewUrls.map((url, index) => (
							<AdminVideoPreviewBox
								key={index}
								videoSrc={url}
								removeFn={() => removeVideo(index)}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
};
