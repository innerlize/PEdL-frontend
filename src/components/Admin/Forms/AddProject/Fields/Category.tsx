import { ErrorMessage, useField } from 'formik';
import { AdminFieldWrapper } from '../../FieldWrapper';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminSelectInputType } from '../../Inputs/SelectInput';

export const AdminCategoryField = () => {
	const [field] = useField('category');

	const title = 'Category';

	const helper = (
		<p>
			Your project can be assigned to a specific category. Just choose the one
			that best fits with it!
		</p>
	);

	const options = ['Movie', 'Game', 'Other'];

	return (
		<AdminFieldWrapper>
			<AdminInputFieldHeader title={title} helper={helper} required />

			<AdminSelectInputType field={field} options={options} />

			<ErrorMessage
				name={field.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
