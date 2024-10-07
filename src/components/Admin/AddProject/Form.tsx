import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AdminSoftwaresField from './InputFields/Softwares';
import { AdminAddProjectFormData } from '../../../types/AddProject';
import { AdminProjectNameField } from './InputFields/ProjectName';
import { AdminCustomerNameField } from './InputFields/CustomerName';
import { AdminDescriptionField } from './InputFields/Description';
import { AdminThumbnailField } from './InputFields/Thumbnail';
import { AdminMediaImagesField } from './InputFields/MediaImages';
import { AdminMediaVideosField } from './InputFields/MediaVideos';
import AdminLinksField from './InputFields/Links';
import { Spinner } from '../../Spinner';
import { toast, ToastContainer } from 'react-toastify';

const validationSchema = Yup.object({
	projectName: Yup.string().required('Project name is required'),
	customerName: Yup.string().required('Customer name is required'),
	description: Yup.string().required('Description is required'),
	softwares: Yup.array()
		.of(Yup.string())
		.min(1, 'At least one software is required'),
	thumbnail: Yup.string().required('Thumbnail is required'),
	mediaImages: Yup.array().of(Yup.string().optional()),
	mediaVideos: Yup.array().of(Yup.string().optional()),
	links: Yup.array().of(
		Yup.object({ label: Yup.string(), src: Yup.string() }).optional()
	)
});

export const AdminAddProjectForm = () => {
	const logValues = async (values: AdminAddProjectFormData) => {
		console.log('Starting project creation...');

		await new Promise(resolve =>
			setTimeout(() => {
				const payload = {
					...values,
					softwares:
						values.softwares.length === 0 ? undefined : values.softwares
				};

				resolve(null);

				toast.success('Project successfully created!', {
					icon: () => '🎉',
					className: 'font-semibold'
				});

				console.log(payload);
			}, 2000)
		);
	};

	const initialValues: AdminAddProjectFormData = {
		projectName: '',
		customerName: '',
		description: '',
		softwares: [],
		thumbnail: '',
		mediaImages: [],
		mediaVideos: [],
		links: []
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				initialTouched={{
					mediaImages: true,
					mediaVideos: true,
					links: true
				}}
				onSubmit={values => logValues(values)}>
				{({ isSubmitting }) => (
					<Form
						data-test='admin-add-project-form'
						className='flex flex-col gap-10 md:w-[348px] xl:w-[448px]'>
						<AdminProjectNameField />

						<AdminCustomerNameField />

						<AdminDescriptionField />

						<AdminSoftwaresField />

						<AdminThumbnailField />

						<AdminMediaImagesField />

						<AdminMediaVideosField />

						<AdminLinksField />

						<button
							type='submit'
							className={`flex justify-center items-center w-[203px] h-[48px] mx-auto mt-[30px] font-roboto text-xl font-bold rounded-[3px] ${isSubmitting ? '' : 'bg-primary'} md:text-2xl`}
							disabled={isSubmitting}>
							{isSubmitting ? <Spinner /> : 'Create project'}
						</button>
					</Form>
				)}
			</Formik>

			<ToastContainer />
		</>
	);
};
