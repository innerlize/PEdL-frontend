import { IoIosRemoveCircle } from 'react-icons/io';
import { PhotoView } from 'react-photo-view';

interface AdminImagePreviewBoxProps {
	imageSrc: string;
	removeFn: () => void;
}

export const AdminImagePreviewBox: React.FC<AdminImagePreviewBoxProps> = ({
	imageSrc,
	removeFn
}) => (
	<div data-test='admin-image-preview-box' className='relative size-24'>
		<div
			className='absolute p-[2px] text-center top-[5px] right-[5px] text-white bg-warning cursor-pointer rounded-[3px] drop-shadow-lg transition-colors hover:bg-red-500'
			onClick={removeFn}>
			<IoIosRemoveCircle className='size-full' />
		</div>

		<PhotoView src={imageSrc}>
			<img
				className='size-full rounded-[3px] outline outline-1 outline-primary object-cover cursor-zoom-in'
				src={imageSrc}
				loading='lazy'
				alt='Evidence'
			/>
		</PhotoView>
	</div>
);
