interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	isOptional?: boolean;
}

export const InputField: React.FC<InputProps> = ({
	label,
	isOptional,
	...rest
}) => {
	return (
		<div className='w-full text-[15px] md:max-xl:text-xl'>
			<div className='flex justify-between items-center'>
				<label className='block font-medium mb-2'>{label}</label>

				{isOptional && (
					<span className='block mb-2 text-gray-500'>Optional</span>
				)}
			</div>
			<input
				className='text-neutral py-3 px-4 block w-full rounded-[3px] focus:outline-none xl:max-2xl:py-2 xl:max-2xl:px-3'
				{...rest}
			/>
		</div>
	);
};
