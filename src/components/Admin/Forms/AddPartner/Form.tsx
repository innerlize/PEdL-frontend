import { Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { AdminPartnerNameField } from './Fields/PartnerName';
import { AdminPartnerLogoField } from './Fields/PartnerLogo';
import { Spinner } from '../../../Spinner';
import {
	CreatePartnerRequest,
	PartnerFormValues
} from '../../../../types/AddPartner';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../../hooks/useAuth';
import { mapPartnerFormValuesToRequest } from '../../../../mappers/partnerMapper';
import { createPartner, updatePartner } from '../../../../api/partners';
import { AdminLinksField } from './Fields/Links';
import { Partner } from '../../../../types/Partner';

interface AdminAddPartnerFormProps {
	partner?: Partner;
}

const validationSchema = Yup.object({
	partnerName: Yup.string().required('Partner name is required'),
	partnerLogo: Yup.string().required('Partner logo is required'),
	links: Yup.array().of(
		Yup.object({ label: Yup.string(), src: Yup.string() }).optional()
	)
});

export const AdminAddPartnerForm: React.FC<AdminAddPartnerFormProps> = ({
	partner
}) => {
	const { getCurrentUserToken } = useAuth();

	const mutation = useMutation({
		mutationFn: async (newPartner: CreatePartnerRequest) => {
			const token = await getCurrentUserToken();

			if (partner) {
				return updatePartner(partner.id, newPartner, token!);
			}

			return await createPartner(newPartner, token!);
		},
		onSuccess: () => {
			if (partner) {
				toast.success('Partner successfully updated!', {
					icon: () => '🎉',
					className: 'font-semibold'
				});

				return;
			}

			toast.success('Partner successfully created!', {
				icon: () => '🎉',
				className: 'font-semibold'
			});
		},
		onError: () => {
			toast.error('Error creating partner!');
		}
	});

	const submitPartnerForm = async (values: PartnerFormValues) => {
		const payload = mapPartnerFormValuesToRequest(values);

		await mutation.mutateAsync(payload);
	};

	const initialValues: PartnerFormValues = {
		partnerName: partner?.name || '',
		partnerLogo: partner?.image || '',
		links: partner?.links || []
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				initialTouched={{
					links: true
				}}
				onSubmit={submitPartnerForm}
				enableReinitialize>
				{({ isSubmitting }) => (
					<Form
						data-test='admin-add-partner-form'
						className='flex flex-col gap-10 md:w-[348px] xl:w-[448px]'>
						<AdminPartnerNameField />

						<AdminPartnerLogoField />

						<AdminLinksField />

						<button
							type='submit'
							className={`flex justify-center items-center w-[203px] h-[48px] mx-auto mt-[30px] font-roboto text-xl font-bold rounded-[3px] ${isSubmitting ? '' : 'bg-secondary'} md:text-2xl`}
							disabled={isSubmitting}>
							{isSubmitting ? (
								<Spinner color='#00BCFF' />
							) : partner ? (
								'Update partner'
							) : (
								'Create partner'
							)}
						</button>
					</Form>
				)}
			</Formik>

			<ToastContainer />
		</>
	);
};
