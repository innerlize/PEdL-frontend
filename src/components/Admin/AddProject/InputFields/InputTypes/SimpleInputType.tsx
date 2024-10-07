import { FieldInputProps } from 'formik';
import React from 'react';

interface AdminSimpleInputTypeProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	field?: FieldInputProps<string>;
}

export const AdminSimpleInputType: React.FC<AdminSimpleInputTypeProps> = ({
	field,
	...props
}) => {
	return (
		<div className='text-[15px] md:text-base'>
			<input
				className='w-full px-2.5 py-[8.5px] font-roboto text-neutral rounded-[3px] truncate'
				type='text'
				{...field}
				{...props}
			/>
		</div>
	);
};
