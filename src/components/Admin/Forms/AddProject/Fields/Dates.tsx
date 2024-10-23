import React from 'react';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AdminFieldWrapper } from '../../FieldWrapper';
import { AdminInputFieldHeader } from '../../InputFieldHeader';

export const AdminDatesField: React.FC = () => {
	const { setFieldValue } = useFormikContext();
	const [startDateField] = useField('start_date');
	const [endDateField] = useField('end_date');

	return (
		<AdminFieldWrapper data-test='admin-dates-field'>
			<AdminInputFieldHeader title='Dates' required />

			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='start_date'>Start date</label>

					<DatePicker
						{...startDateField}
						selected={startDateField.value}
						onChange={date => setFieldValue('start_date', date)}
						dateFormat='MM/dd/yyyy'
						placeholderText='Select a start date'
						className='w-full px-2.5 py-[8.5px] font-roboto text-neutral rounded-[3px] truncate'
						showIcon
						autoComplete='off'
						data-test='admin-start-date-field'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label htmlFor='end_date'>End date</label>

					<DatePicker
						{...endDateField}
						selected={endDateField.value}
						onChange={date => setFieldValue('end_date', date)}
						dateFormat='MM/dd/yyyy'
						placeholderText='Select an end date'
						className='w-full px-2.5 py-[8.5px] font-roboto text-neutral rounded-[3px] truncate'
						showIcon
						autoComplete='off'
						data-test='admin-end-date-field'
					/>
				</div>
			</div>

			<ErrorMessage
				name={startDateField.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
			<ErrorMessage
				name={endDateField.name}
				render={error => <div className='text-red-500'>{error}</div>}
			/>
		</AdminFieldWrapper>
	);
};
