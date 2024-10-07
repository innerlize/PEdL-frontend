import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import { AdminSimpleInputType } from './InputTypes/SimpleInputType';
import { AdminInputFieldHeader } from './InputFieldContent/InputFieldHeader';
import { AdminFieldWrapper } from './InputFieldContent/FieldWrapper';
import { AdminImagePreviewBox } from './InputFieldContent/ImagePreviewBox';
import { PhotoProvider } from 'react-photo-view';
import { AdminImageBrokenElement } from './InputFieldContent/ImageBrokenElement';
import { validateImageUrl } from '../../../../utils/validateImageUrl';

export const AdminThumbnailField: React.FC = () => {
	const [thumbnail, setThumbnail] = useState<string>('');
	const [field, , helpers] = useField('thumbnail');

	const addThumbnail = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			helpers.setTouched(true);

			if (thumbnail) {
				const imageIsValid = await validateImageUrl(thumbnail);

				if (!imageIsValid) {
					helpers.setError(
						'Image URL is not valid. Thumbnail addition skipped.'
					);

					return;
				}

				helpers.setValue(thumbnail);
				setThumbnail('');
			}
		}
	};

	const removeThumbnail = () => {
		helpers.setValue('');
		setThumbnail('');
	};

	const helper = (
		<>
			<p>
				Enter an image URL and press <span className='text-primary'>Enter</span>{' '}
				to add it as the thumbnail for this project.
			</p>
		</>
	);

	return (
		<AdminFieldWrapper data-test='admin-thumbnail-field'>
			<AdminInputFieldHeader title='Thumbnail' required helper={helper} />

			<AdminSimpleInputType
				type='text'
				value={field.value ? field.value : thumbnail}
				onChange={e => setThumbnail(e.target.value)}
				onKeyDown={async e => await addThumbnail(e)}
				placeholder='https://i.pinimg.com/736x/ed/93/6f/ed936fa3053731b50c0af7a8018453ee.jpg'
				disabled={field.value ? true : false}
			/>

			{field.value && (
				<PhotoProvider
					brokenElement={<AdminImageBrokenElement />}
					bannerVisible={false}>
					<AdminImagePreviewBox
						imageSrc={field.value}
						removeFn={removeThumbnail}
					/>
				</PhotoProvider>
			)}

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
