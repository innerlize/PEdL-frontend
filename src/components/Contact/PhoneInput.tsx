import { PhoneInput as RIPhoneInput } from 'react-international-phone';

interface PhoneInputProps {
	label: string;
	isOptional?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
	label,
	isOptional
}) => {
	return (
		<div className='w-full text-[15px] md:max-xl:text-xl'>
			<div className='flex justify-between items-center'>
				<label className='block font-medium mb-2'>{label}</label>

				{isOptional && (
					<span className='block mb-2 text-gray-500'>Optional</span>
				)}
			</div>

			<RIPhoneInput
				forceDialCode
				inputProps={{
					className:
						'w-full py-3 px-4 text-neutral bg-white outline-none rounded-r-[3px] transition-colors focus:border-primary xl:max-2xl:py-2 xl:max-2xl:px-3'
				}}
				countrySelectorStyleProps={{
					buttonClassName:
						'h-full px-3 bg-accent transition-colors border-none hover:bg-primary',
					dropdownStyleProps: {
						className: 'text-white bg-neutral outline outline-1 outline-accent',
						listItemClassName: 'hover:bg-accent'
					},
					dropdownArrowClassName: 'border-t-white'
				}}
			/>
		</div>
	);
};
