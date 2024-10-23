import { FieldInputProps } from 'formik';

interface AdminTextAreaInputTypeProps {
	placeholder: string;
	field?: FieldInputProps<string>;
}

export const AdminTextAreaInputType: React.FC<AdminTextAreaInputTypeProps> = ({
	placeholder,
	field
}) => {
	return (
		<div className='text-[15px] md:text-base'>
			<textarea
				className='w-full min-h-[92px] max-h-[600px] px-2.5 py-[8.5px] font-roboto text-neutral rounded-[3px] resize-y md:min-h-[120px]'
				placeholder={placeholder}
				{...field}
			/>
		</div>
	);
};
