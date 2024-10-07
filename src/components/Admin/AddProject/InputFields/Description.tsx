import { ErrorMessage, useField } from 'formik';
import React from 'react';
import { AdminTextAreaInputType } from './InputTypes/TextAreaInputType';
import { AdminInputFieldHeader } from './InputFieldContent/InputFieldHeader';
import { AdminFieldWrapper } from './InputFieldContent/FieldWrapper';

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
