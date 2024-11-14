import { useFormikContext } from 'formik';
import { useState, useEffect } from 'react';
import { ProjectFormFieldsValues } from '../../../../../../../types/AddProject';
import { AdminImagePreviewBox } from '../../../../ImagePreviewBox';
import { PhotoProvider } from 'react-photo-view';
import { AdminImageBrokenElement } from '../../../../ImageBrokenElement';

export const NewImagesPreviews = () => {
	const { values, setFieldValue } = useFormikContext<ProjectFormFieldsValues>();
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

	const removeImage = (index: number) => {
		if (values.imagesUrls && index < values.imagesUrls!.length) {
			setFieldValue(
				'imagesUrls',
				values.imagesUrls!.filter((_, i) => i !== index)
			);
		} else if (
			values.imagesFiles &&
			index - values.imagesUrls!.length < values.imagesFiles!.length
		) {
			setFieldValue(
				'imagesFiles',
				values.imagesFiles!.filter(
					(_, i) => i !== index - values.imagesUrls!.length
				)
			);
		}
	};

	useEffect(() => {
		const urls = [
			...(values.imagesUrls || []),
			...(values.imagesFiles || []).map(file => URL.createObjectURL(file))
		];
		setPreviewUrls(urls);

		return () => {
			(values.imagesFiles || []).forEach(file =>
				URL.revokeObjectURL(file.name)
			);
		};
	}, [values.imagesUrls, values.imagesFiles]);

	return (
		<div data-test='admin-media-new-images-previews'>
			{previewUrls.length > 0 ? (
				<>
					<p className='mb-2 text-sm font-medium'>
						Previews of <span className='text-primary'>images</span> that you
						want to add...
					</p>

					<div className='flex gap-2 flex-wrap'>
						<PhotoProvider brokenElement={<AdminImageBrokenElement />}>
							{previewUrls.map((url, index) => (
								<AdminImagePreviewBox
									key={index}
									imageSrc={url}
									removeFn={() => removeImage(index)}
								/>
							))}
						</PhotoProvider>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};
