import { SectionHeader } from '../components/SectionHeader';
import { Form } from '../components/Contact/Form';
import { Section } from '../components/Contact/Section';
import { useContext } from 'react';
import { TextAreaContext } from '../contexts/TextAreaContext';
import { SocialContainer } from '../components/SocialContainer';

const ContactPage: React.FC = () => {
	const { useTemplate } = useContext(TextAreaContext);

	const title = (
		<>
			Get in <span className='text-primary'>Touch</span>
		</>
	);

	const subtitle = (
		<p>Let&apos;s connect and create something awesome together!</p>
	);

	return (
		<div className='w-full'>
			<SectionHeader title={title} subtitle={subtitle} />

			<div className='font-roboto xl:flex xl:justify-center xl:gap-[100px] xl:mt-[60px] 2xl:mt-[100px]'>
				<Form />

				<div className='flex flex-col gap-[50px] xl:gap-[30px] 2xl:w-[500px]'>
					<div>
						<Section
							title='Contact alternatives'
							subtitle='You can also contact me via:'>
							<SocialContainer
								socialsToDisplay={['WhatsApp', 'LinkedIn']}
								className='flex justify-start gap-[30px]'
							/>
						</Section>
					</div>

					<div>
						<Section
							title='Use a template'
							subtitle='Need some help redacting a message for me? Click the button below to use a simple template!'>
							<button
								className='text-xl text-neutral font-semibold bg-white py-[10px] px-[20px] rounded-[3px] transition-colors hover:text-white hover:bg-primary md:text-2xl xl:text-lg'
								onClick={useTemplate}>
								Use template
							</button>
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
