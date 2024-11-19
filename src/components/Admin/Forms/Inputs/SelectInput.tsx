import React from 'react';
import { FieldInputProps } from 'formik';

interface AdminSelectInputTypeProps
	extends React.InputHTMLAttributes<HTMLSelectElement> {
	field: FieldInputProps<string>;
	options: string[];
	placeholder?: string;
}

export const AdminSelectInputType: React.FC<AdminSelectInputTypeProps> = ({
	field,
	options,
	placeholder = 'Select an option',
	...props
}) => {
	return (
		<div className='text-[15px] md:text-base'>
			<select
				{...field}
				{...props}
				className='w-full p-2.5 text-neutral rounded-[3px] border-e-[10px] border-e-white'
				value={field.value || ''}>
				<option value='' disabled hidden>
					{placeholder}
				</option>

				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};
