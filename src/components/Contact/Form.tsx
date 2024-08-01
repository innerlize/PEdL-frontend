import { useMediaQuery } from 'react-responsive';
import { InputField } from './InputField';
import { PhoneInput } from './PhoneInput';
import { TextArea } from './TextArea';

export const Form: React.FC = () => {
	const isTablet = useMediaQuery({ minDeviceWidth: 800, maxDeviceWidth: 1280 });
	const isDesktop = useMediaQuery({ minDeviceWidth: 1280 });
	const isLargeDesktop = useMediaQuery({ minDeviceWidth: 1536 });

	function getRows() {
		switch (true) {
			case isTablet: {
				return 5;
			}
			case isDesktop: {
				return 7;
			}
			case isLargeDesktop: {
				return 9;
			}
			default: {
				return 5;
			}
		}
	}

	return (
		<form
			data-test='contact-form'
			className='w-full flex flex-col items-center gap-11 my-[100px] xl:max-2xl:gap-7 xl:my-0 2xl:w-[712px]'>
			<div className='flex flex-col gap-5 w-full md:gap-[35px] xl:max-2xl:gap-4'>
				<div className='flex flex-col gap-5 md:flex-row md:gap-[35px] xl:max-2xl:gap-4'>
					<InputField label='First name' placeholder='Dante' />

					<InputField label='Last name' placeholder='Alighieri' />
				</div>

				<div className='flex flex-col gap-5 md:flex-row md:gap-[35px] xl:max-2xl:gap-4'>
					<PhoneInput label='Phone number' isOptional />

					<InputField
						label='Email address'
						placeholder='dante.alighieri@example.com'
					/>
				</div>

				<TextArea
					label='Your message'
					rows={getRows()}
					placeholder="Hi Pablo, I'm interested in..."
				/>
			</div>

			<button
				onClick={e => {
					e.preventDefault();
				}}
				type='submit'
				disabled={true}
				className='px-[65px] py-2.5 text-2xl text-neutral font-semibold bg-white rounded-[3px] cursor-pointer transition-colors hover:text-white hover:bg-primary xl:px-12 xl:py-2 xl:text-lg'>
				Send
			</button>
		</form>
	);
};
