import { ErrorMessage, useField } from 'formik';
import React from 'react';
import { AdminTextAreaInputType } from '../../Inputs/TextAreaInput';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminFieldWrapper } from '../../FieldWrapper';

export const AdminDescriptionField: React.FC = () => {
	const [field] = useField('description');

	return (
		<AdminFieldWrapper data-test='admin-description-field'>
			<AdminInputFieldHeader title='Description' required />

			<AdminTextAreaInputType
				placeholder='An amazing project about...'
				field={field}
			/>

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
