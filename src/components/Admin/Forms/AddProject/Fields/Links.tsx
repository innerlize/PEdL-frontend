import { useEffect, useState } from 'react';
import {
	ArrayHelpers,
	ErrorMessage,
	FieldArray,
	useField,
	useFormikContext
} from 'formik';
import { AdminPill } from '../../Pill';
import { getRandomHexColor } from '../../../../../utils/getRandomHexColor';
import { AdminSimpleInputType } from '../../Inputs/SimpleInput';
import { AdminInputFieldHeader } from '../../InputFieldHeader';
import { AdminFieldWrapper } from '../../FieldWrapper';
import { ProjectFormFieldsValues } from '../../../../../types/AddProject';

interface Link {
	label: string;
	src: string;
	backgroundColor: string;
}

const AdminLinksField = () => {
	const { initialValues, setFieldError } =
		useFormikContext<ProjectFormFieldsValues>();
	const [field] = useField('links');

	const [linkLabel, setLinkLabel] = useState('');
	const [linkSrc, setLinkSrc] = useState('');

	const [linkPills, setLinkPills] = useState<Link[]>([]);

	const addLink = (
		e: React.KeyboardEvent<HTMLInputElement>,
		arrayHelpers: ArrayHelpers
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			const bothFieldsAreFilled = linkLabel.trim() && linkSrc.trim();
			const linkAlreadyExists = linkPills.some(
				linkPill => linkPill.label.toLowerCase() === linkLabel.toLowerCase()
			);

			if (!bothFieldsAreFilled) {
				setFieldError(
					'links',
					'Both fields are required to add a link, label and URL.'
				);
			} else if (linkAlreadyExists) {
				setFieldError('links', `Link "${linkLabel}" already exists.`);
			} else {
				const newLinkPill = {
					label: linkLabel.trim(),
					src: linkSrc.trim(),
					backgroundColor: getRandomHexColor()
				};

				setLinkPills([...linkPills, newLinkPill]);
				arrayHelpers.push({ label: newLinkPill.label, url: newLinkPill.src });

				setLinkLabel('');
				setLinkSrc('');
			}
		}
	};

	const removeLink = (index: number, arrayHelpers: ArrayHelpers) => {
		const updatedLinks = linkPills.filter((_, i) => i !== index);
		setLinkPills(updatedLinks);
		arrayHelpers.remove(index);
	};

	useEffect(() => {
		if (initialValues.links && initialValues.links.length > 0) {
			const initialLinks = field.value.map(
				(link: { label: string; src: string }) => ({
					label: link.label,
					src: link.src,
					backgroundColor: getRandomHexColor()
				})
			);

			setLinkPills(initialLinks);
		}
	}, [initialValues]);

	const helper = (
		<>
			<p>
				Once you filled the fields, you will be able to add a link by pressing
				the <span className='text-primary'>Enter</span> key.
			</p>

			<p>
				To view the URL assigned to a link, just{' '}
				<span className='text-primary'>hover</span> over it.
			</p>

			<p>
				And to <span className='text-warning'>remove</span> a link,{' '}
				<span className='text-warning'>just press on it&apos;s pill</span>.
			</p>
		</>
	);

	return (
		<FieldArray
			name='links'
			render={arrayHelpers => (
				<AdminFieldWrapper data-test='admin-links-field'>
					<AdminInputFieldHeader title='Links' helper={helper} />

					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-2'>
							<label className='text-lg' htmlFor='linkLabel'>
								Label
							</label>

							<AdminSimpleInputType
								value={linkLabel}
								onChange={e => setLinkLabel(e.target.value)}
								onKeyDown={e => addLink(e, arrayHelpers)}
								placeholder='Twitter'
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<label className='text-lg' htmlFor='linkSrc'>
								URL
							</label>

							<AdminSimpleInputType
								value={linkSrc}
								onChange={e => setLinkSrc(e.target.value)}
								onKeyDown={e => addLink(e, arrayHelpers)}
								placeholder='https://x.com/NASA'
							/>
						</div>

						{linkPills.length > 0 && (
							<div
								data-test='links-pills-container'
								className='flex flex-wrap gap-2.5'>
								{linkPills.map((link, index) => (
									<AdminPill
										key={index}
										name={link.label}
										backgroundColor={link.backgroundColor}
										onClick={() => removeLink(index, arrayHelpers)}
										tooltipContent={link.src}
									/>
								))}
							</div>
						)}
					</div>

					<ErrorMessage
						name='links'
						render={error => <div className='text-red-500'>{error}</div>}
					/>
				</AdminFieldWrapper>
			)}
		/>
	);
};

export default AdminLinksField;
