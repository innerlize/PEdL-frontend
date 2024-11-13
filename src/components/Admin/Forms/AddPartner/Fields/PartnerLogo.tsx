import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import { validateImageUrl } from '../../../../../utils/validateImageUrl';
import { AdminFieldWrapper } from '../../FieldWrapper';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminSimpleInputType } from '../../Inputs/SimpleInput';
import { PhotoProvider } from 'react-photo-view';
import { AdminImageBrokenElement } from '../../ImageBrokenElement';
import { AdminImagePreviewBox } from '../../ImagePreviewBox';

export const AdminPartnerLogoField: React.FC = () => {
	const [logoUrl, setLogoUrl] = useState<string | null>(null);

	const [field, , helpers] = useField('partnerLogo');

	const addLogo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			helpers.setTouched(true);

			if (logoUrl) {
				const imageIsValid = await validateImageUrl(logoUrl);

				if (!imageIsValid) {
					helpers.setError('Image URL is not valid. Logo addition skipped.');

					return;
				}

				helpers.setValue(logoUrl);
				setLogoUrl('');
			}
		}
	};

	const removeLogo = () => {
		helpers.setValue('');
		setLogoUrl('');
	};

	const helper = (
		<>
			<p>
				Enter an image URL and press{' '}
				<span className='text-secondary'>Enter</span> to add it as the logo for
				this partner.
			</p>
		</>
	);

	return (
		<AdminFieldWrapper data-test='admin-partner-logo-field'>
			<AdminInputFieldHeader title='Partner logo' required helper={helper} />

			<AdminSimpleInputType
				value={field.value ? field.value : logoUrl}
				onChange={e => setLogoUrl(e.target.value)}
				onKeyDown={async e => await addLogo(e)}
				placeholder='https://i.pinimg.com/736x/a5/ba/c6/a5bac66ee6c86f31e48fc170a9f158a5.jpg'
				disabled={field.value ? true : false}
			/>

			{field.value && (
				<PhotoProvider
					brokenElement={<AdminImageBrokenElement />}
					bannerVisible={false}>
					<AdminImagePreviewBox imageSrc={field.value} removeFn={removeLogo} />
				</PhotoProvider>
			)}

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
