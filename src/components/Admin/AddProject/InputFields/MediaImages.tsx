import React, { useState } from 'react';
import {
	ArrayHelpers,
	ErrorMessage,
	FieldArray,
	useFormikContext
} from 'formik';
import { AdminSimpleInputType } from './InputTypes/SimpleInputType';
import { AdminInputFieldHeader } from './InputFieldContent/InputFieldHeader';
import { AdminImagePreviewBox } from './InputFieldContent/ImagePreviewBox';
import { PhotoProvider } from 'react-photo-view';
import { AdminImageBrokenElement } from './InputFieldContent/ImageBrokenElement';
import { validateImageUrl } from '../../../../utils/validateImageUrl';
import { AdminFieldWrapper } from './InputFieldContent/FieldWrapper';

export const AdminMediaImagesField: React.FC = () => {
	const { setFieldError } = useFormikContext();
	const [imageUrl, setImageUrl] = useState<string>('');

	const addImage = async (
		e: React.KeyboardEvent<HTMLInputElement>,
		arrayHelpers: ArrayHelpers
	) => {
		if (e.key === 'Enter' && imageUrl) {
			e.preventDefault();

			const imageIsValid = await validateImageUrl(imageUrl);

			if (!imageIsValid) {
				setFieldError(
					'mediaImages',
					'Invalid image URL. Image not added to the list.'
				);

				return;
			}

			const newImage = imageUrl;

			arrayHelpers.push(newImage);
			setImageUrl('');
		}
	};

	const removeImage = (index: number, arrayHelpers: ArrayHelpers) => {
		arrayHelpers.remove(index);
	};

	const helper = (
		<>
			<p>
				Enter an image URL and press <span className='text-primary'>Enter</span>{' '}
				to add it to the list.
			</p>

			<p>You can add as many images as you want!</p>
		</>
	);

	return (
		<FieldArray
			name='mediaImages'
			render={arrayHelpers => (
				<AdminFieldWrapper data-test='admin-media-images-field'>
					<AdminInputFieldHeader title='Media images' helper={helper} />

					<AdminSimpleInputType
						type='text'
						value={imageUrl}
						onChange={e => setImageUrl(e.target.value)}
						onKeyDown={e => addImage(e, arrayHelpers)}
						placeholder='https://i.pinimg.com/736x/ed/93/6f/ed936fa3053731b50c0af7a8018453ee.jpg'
					/>

					{arrayHelpers.form.values.mediaImages.length > 0 && (
						<div className='flex flex-wrap gap-2.5'>
							<PhotoProvider brokenElement={<AdminImageBrokenElement />}>
								{arrayHelpers.form.values.mediaImages.map(
									(image: string, index: number) => (
										<AdminImagePreviewBox
											key={index}
											imageSrc={image}
											removeFn={() => removeImage(index, arrayHelpers)}
										/>
									)
								)}
							</PhotoProvider>
						</div>
					)}

					<ErrorMessage
						name='mediaImages'
						render={error => <div className='text-red-500'>{error}</div>}
					/>
				</AdminFieldWrapper>
			)}
		/>
	);
};
