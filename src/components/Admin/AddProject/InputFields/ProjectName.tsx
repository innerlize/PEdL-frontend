import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { AdminSimpleInputType } from './InputTypes/SimpleInputType';
import { AdminInputFieldHeader } from './InputFieldContent/InputFieldHeader';
import { AdminFieldWrapper } from './InputFieldContent/FieldWrapper';

export const AdminProjectNameField: React.FC = () => {
	const [field] = useField('projectName');

	return (
		<AdminFieldWrapper data-test='admin-project-name-field'>
			<AdminInputFieldHeader title='Project name' required />

			<AdminSimpleInputType placeholder='Axios' field={field} />

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
