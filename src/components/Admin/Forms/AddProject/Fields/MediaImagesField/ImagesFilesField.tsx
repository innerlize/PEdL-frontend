import { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';
import { ProjectFormFieldsValues } from '../../../../../../types/AddProject';
import { generateFileHash } from '../../../../../../utils/generateFileHash';
import { toast } from 'react-toastify';
import { IoIosWarning } from 'react-icons/io';
import { FaRegImage } from 'react-icons/fa';
import { MdUpload } from 'react-icons/md';
import clsx from 'clsx';

export const ImagesFilesField: React.FC = () => {
	const { values, setFieldValue } = useFormikContext<ProjectFormFieldsValues>();

	const fileTypes = [
		'image/png',
		'image/jpeg',
		'image/jpg',
		'image/gif',
		'image/webp'
	];
	const maxFileSize = 2 * 1024 * 1024;

	const getExistingHashes = async (files: File[]) => {
		return new Map<string, string>(
			await Promise.all(
				files.map(
					async file => [file.name, await generateFileHash(file)] as const
				)
			)
		);
	};

	const handleNewFiles = useCallback(
		async (newFiles: File[], currentFiles: File[]) => {
			const currentHashes = await getExistingHashes(currentFiles);
			const uniqueFiles: File[] = [];

			for (const newFile of newFiles) {
				const newFileHash = await generateFileHash(newFile);
				if (Array.from(currentHashes.values()).includes(newFileHash)) {
					toast.warning(<DuplicateFileWarning fileName={newFile.name} />, {
						icon: () => <IoIosWarning />
					});
				} else {
					uniqueFiles.push(newFile);
					currentHashes.set(newFile.name, newFileHash);
				}
			}
			return uniqueFiles;
		},
		[]
	);

	const handleFileError = (errorCode: string) => {
		switch (errorCode) {
			case 'file-too-large':
				toast.error('File too large! Remember, 2 MB max.', {
					icon: () => <IoIosWarning />
				});
				break;
			case 'file-invalid-type':
				toast.error('File type is not valid!', {
					icon: () => <IoIosWarning />
				});
				break;
			default:
				toast.error('An unknown error occurred with this file', {
					icon: () => <IoIosWarning />
				});
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: Object.fromEntries(
			fileTypes.map(type => [type, [`.${type.split('/').pop()}`]])
		),
		maxSize: maxFileSize,
		onDropAccepted: async acceptedFiles => {
			const newFiles = await handleNewFiles(
				acceptedFiles,
				values.imagesFiles || []
			);
			setFieldValue('imagesFiles', [
				...(values.imagesFiles || []),
				...newFiles
			]);
		},
		onDropRejected: rejectedFiles => {
			rejectedFiles.forEach(file => {
				file.errors.forEach(error => {
					handleFileError(error.code);
				});
			});
		}
	});

	return (
		<div className='w-full cursor-pointer'>
			<div
				{...getRootProps()}
				className={clsx(
					'group flex flex-col justify-center items-center py-6 border border-dashed transition-colors hover:border-primary',
					isDragActive && 'border-primary'
				)}>
				<input {...getInputProps()} />
				<div className='flex justify-center'>
					<div
						className={clsx(
							'relative flex group-hover:text-primary transition-colors',
							isDragActive && 'text-primary'
						)}>
						<FaRegImage className='block relative size-[90px]' />
						<MdUpload className='absolute top-1.5 right-[-6px] size-[40px] bg-neutral p-1.5 rounded-full border-4 shadow-[0_2px_2px_rgba(0,0,0,1)]' />
					</div>
				</div>

				<div className='flex flex-col items-center gap-1 select-none'>
					<p className='font-bold'>
						Drag and drop <span className='text-primary'>or browse</span> to
						upload!
					</p>
					<p className='text-sm'>
						{fileTypes
							.map(type =>
								type.split('/').pop()!.toUpperCase().replace('.', '')
							)
							.join(', ')}{' '}
						<span className='text-primary'>
							up to {maxFileSize / 1024 / 1024} MB
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

const DuplicateFileWarning: React.FC<{ fileName: string }> = ({ fileName }) => (
	<>
		<p className='mb-3 font-bold leading-[18px]'>
			A file with the same name already exists. Please upload a different file.
		</p>
		<div className='text-sm'>
			<p className='font-bold'>File trying to upload:</p>
			<p className='text-xs font-medium'>{fileName}</p>
		</div>
	</>
);
