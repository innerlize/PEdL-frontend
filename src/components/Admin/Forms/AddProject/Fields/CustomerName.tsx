import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { AdminSimpleInputType } from '../../Inputs/SimpleInput';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminFieldWrapper } from '../../FieldWrapper';

export const AdminCustomerNameField: React.FC = () => {
	const [field] = useField('customerName');

	return (
		<AdminFieldWrapper data-test='admin-customer-name-field'>
			<AdminInputFieldHeader title='Customer name' required />

			<AdminSimpleInputType placeholder='Ruddít' field={field} />

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
