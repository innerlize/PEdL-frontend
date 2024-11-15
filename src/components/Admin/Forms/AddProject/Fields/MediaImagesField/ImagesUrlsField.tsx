import { ErrorMessage, useFormikContext } from 'formik';
import { ProjectFormFieldsValues } from '../../../../../../types/AddProject';
import { AdminSimpleInputType } from '../../../Inputs/SimpleInput';
import { validateImageUrl } from '../../../../../../utils/validateImageUrl';

export const ImagesUrlsField: React.FC = () => {
	const { values, setFieldValue, setFieldError } =
		useFormikContext<ProjectFormFieldsValues>();
	const urls = values.imagesUrls || [];

	const addImageUrl = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			const currentTarget = e.currentTarget;
			const newImageUrl = currentTarget.value.trim();
			const isValidUrl = await validateImageUrl(newImageUrl);

			if (!isValidUrl) {
				setFieldError(
					'imagesUrls',
					'Image URL is not valid. Image addition skipped.'
				);
				return;
			}

			if (newImageUrl && isValidUrl) {
				setFieldValue('imagesUrls', [...urls, newImageUrl]);
				currentTarget.value = '';
			}
		}
	};

	return (
		<div>
			<AdminSimpleInputType
				placeholder='https://i.pinimg.com/736x/ed/93/6f/ed936fa3053731b50c0af7a8018453ee.jpg'
				onKeyDown={addImageUrl}
			/>

			<ErrorMessage
				name='imagesUrls'
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</div>
	);
};
