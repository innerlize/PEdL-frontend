import { Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { AdminPartnerNameField } from './Fields/PartnerName';
import { AdminPartnerLogoField } from './Fields/PartnerLogo';
import { AdminAddPartnerFormData } from '../../../../types/AddPartner';
import { Spinner } from '../../../Spinner';

const validationSchema = Yup.object({
	partnerName: Yup.string().required('Partner name is required'),
	partnerLogo: Yup.string().required('Partner logo is required')
});

export const AdminAddPartnerForm = () => {
	const initialValues = {
		partnerName: '',
		partnerLogo: ''
	};

	const logValues = async (values: AdminAddPartnerFormData) => {
		console.log('Starting partner creation...');

		await new Promise(resolve =>
			setTimeout(() => {
				resolve(null);

				toast.success('Partner successfully created!', {
					icon: () => '🎉',
					className: 'font-semibold'
				});

				console.log(values);
			}, 2000)
		);
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={logValues}>
				{({ isSubmitting }) => (
					<Form
						data-test='admin-add-partner-form'
						className='flex flex-col gap-10 md:w-[348px] xl:w-[448px]'>
						<AdminPartnerNameField />

						<AdminPartnerLogoField />

						<button
							type='submit'
							className={`flex justify-center items-center w-[203px] h-[48px] mx-auto mt-[30px] font-roboto text-xl font-bold rounded-[3px] ${isSubmitting ? '' : 'bg-secondary'} md:text-2xl`}
							disabled={isSubmitting}>
							{isSubmitting ? <Spinner color='#00BCFF' /> : 'Create partner'}
						</button>
					</Form>
				)}
			</Formik>

			<ToastContainer />
		</>
	);
};
