import { ErrorMessage, useField } from 'formik';
import { AdminSimpleInputType } from '../../Inputs/SimpleInput';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminFieldWrapper } from '../../FieldWrapper';

export const AdminPartnerNameField: React.FC = () => {
	const [field] = useField('partnerName');

	return (
		<AdminFieldWrapper data-test='admin-partner-name-field'>
			<AdminInputFieldHeader title='Partner name' required />

			<AdminSimpleInputType placeholder='Plux' field={field} />

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
