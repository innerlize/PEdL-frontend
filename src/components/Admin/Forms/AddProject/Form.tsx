import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AdminSoftwaresField from './Fields/Softwares';
import {
	CreateProjectRequest,
	ProjectFormValues
} from '../../../../types/AddProject';
import { AdminProjectNameField } from './Fields/ProjectName';
import { AdminCustomerNameField } from './Fields/CustomerName';
import { AdminDescriptionField } from './Fields/Description';
import { AdminThumbnailField } from './Fields/Thumbnail';
import { AdminMediaImagesField } from './Fields/MediaImages';
import { AdminMediaVideosField } from './Fields/MediaVideos';
import AdminLinksField from './Fields/Links';
import { Spinner } from '../../../Spinner';
import { toast, ToastContainer } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { createProject, updateProject } from '../../../../api/projects';
import { useAuth } from '../../../../hooks/useAuth';
import { AdminDatesField } from './Fields/Dates';
import { mapProjectFormValuesToRequest } from '../../../../mappers/projectMapper';
import { convertTimestampToDate } from '../../../../utils/convertTimestampToDate';
import { Project } from '../../../../types/Portfolio';

interface AdminAddProjectFormProps {
	project?: Project;
}

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
	),
	start_date: Yup.date().required('Start date is required'),
	end_date: Yup.date()
		.required('End date is required')
		.min(Yup.ref('start_date'), 'End date must be after start date')
});

export const AdminAddProjectForm: React.FC<AdminAddProjectFormProps> = ({
	project
}) => {
	const { getCurrentUserToken } = useAuth();

	const mutation = useMutation({
		mutationFn: async (newProject: CreateProjectRequest) => {
			const token = await getCurrentUserToken();

			if (project) {
				return updateProject(project!.id, newProject, token!);
			}

			return createProject(newProject, token!);
		},
		onSuccess: () => {
			if (project) {
				toast.success('Project successfully updated!', {
					icon: () => '🎉',
					className: 'font-semibold'
				});

				return;
			}

			toast.success('Project successfully created!', {
				icon: () => '🎉',
				className: 'font-semibold'
			});
		},
		onError: () => {
			toast.error('Error creating project!');
		}
	});

	const submitProjectForm = async (values: ProjectFormValues) => {
		const payload = mapProjectFormValuesToRequest(values);

		await mutation.mutateAsync(payload);
	};

	const initialValues: ProjectFormValues = {
		projectName: project?.name || '',
		customerName: project?.customer || '',
		description: project?.description || '',
		softwares: project?.softwares || [],
		thumbnail: project?.thumbnail || '',
		mediaImages: project?.media?.images || [],
		mediaVideos: project?.media?.videos || [],
		links: project?.links || [],
		start_date: project?.start_date
			? new Date(convertTimestampToDate(project.start_date))
			: null,
		end_date: project?.end_date
			? new Date(convertTimestampToDate(project.end_date))
			: null
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
				onSubmit={values => submitProjectForm(values)}
				enableReinitialize>
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

						<AdminDatesField />

						<AdminLinksField />

						<button
							type='submit'
							className={`flex justify-center items-center w-[203px] h-[48px] mx-auto mt-[30px] font-roboto text-xl font-bold rounded-[3px] ${isSubmitting ? '' : 'bg-primary'} md:text-2xl`}
							disabled={isSubmitting}>
							{isSubmitting ? (
								<Spinner color='#00C896' />
							) : project ? (
								'Update project'
							) : (
								'Create project'
							)}
						</button>
					</Form>
				)}
			</Formik>

			<ToastContainer />
		</>
	);
};
