import { KeyboardEvent, useState } from 'react';
import {
	ArrayHelpers,
	ErrorMessage,
	FieldArray,
	useFormikContext
} from 'formik';
import { getRandomHexColor } from '../../../../../utils/getRandomHexColor';
import { SoftwarePill } from '../../../../../types/AddProject';
import { AdminPill } from '../../Pill';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminSimpleInputType } from '../../Inputs/SimpleInput';
import { AdminFieldWrapper } from '../../FieldWrapper';

const AdminSoftwaresField = () => {
	const { setFieldError } = useFormikContext();

	const [inputValue, setInputValue] = useState('');
	const [softwarePills, setSoftwarePills] = useState<SoftwarePill[]>([]);

	const addSoftware = (
		event: KeyboardEvent<HTMLInputElement>,
		arrayHelpers: ArrayHelpers
	) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			const softwarePillAlreadyExists = softwarePills.some(
				pill => pill.name.toLowerCase() === inputValue.toLowerCase()
			);

			if (softwarePillAlreadyExists) {
				setFieldError(
					'softwares',
					`The software "${inputValue}" already exists`
				);
			} else {
				const newSoftware = inputValue.trim();

				if (newSoftware) {
					const newColor = getRandomHexColor();
					const newSoftwarePill = { name: newSoftware, color: newColor };

					setSoftwarePills([...softwarePills, newSoftwarePill]);
					arrayHelpers.push(newSoftware);
					setInputValue('');
					setFieldError('softwares', undefined);
				}
			}
		}
	};

	const removeSoftware = (index: number, arrayHelpers: ArrayHelpers) => {
		const updatedPills = softwarePills.filter((_, i) => i !== index);

		setSoftwarePills(updatedPills);
		arrayHelpers.remove(index);
	};

	const helper = (
		<>
			<p>
				Type a value and add it by using the{' '}
				<span className='text-primary'>Enter</span> key.
			</p>

			<p>
				Also, <span className='text-warning'>click on any pill</span> to{' '}
				<span className='text-warning'>remove</span> it from your list of used
				softwares!
			</p>
		</>
	);

	return (
		<FieldArray
			name='softwares'
			render={arrayHelpers => (
				<AdminFieldWrapper data-test='admin-softwares-field'>
					<AdminInputFieldHeader title='Softwares' required helper={helper} />

					<AdminSimpleInputType
						type='text'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={e => addSoftware(e, arrayHelpers)}
						placeholder='Figma'
					/>

					{softwarePills.length > 0 && (
						<div className='flex flex-wrap gap-2.5'>
							{softwarePills.map((pill, index) => (
								<AdminPill
									key={index}
									name={pill.name}
									backgroundColor={pill.color}
									onClick={() => removeSoftware(index, arrayHelpers)}
								/>
							))}
						</div>
					)}

					<ErrorMessage
						name='softwares'
						render={error => <div className='text-red-500'>{error}</div>}
					/>
				</AdminFieldWrapper>
			)}
		/>
	);
};

export default AdminSoftwaresField;
