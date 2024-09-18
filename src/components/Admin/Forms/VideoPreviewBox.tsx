import { IoIosRemoveCircle } from 'react-icons/io';
import ReactPlayer from 'react-player';

interface AdminVideoPreviewBoxProps {
	videoSrc: string;
	removeFn: () => void;
}

export const AdminVideoPreviewBox: React.FC<AdminVideoPreviewBoxProps> = ({
	videoSrc,
	removeFn
}) => (
	<div data-test='admin-video-preview-box' className='relative size-24'>
		<div
			className='absolute p-[2px] text-center top-[5px] right-[5px] text-white bg-warning cursor-pointer rounded-[3px] drop-shadow-lg transition-colors hover:bg-red-500'
			onClick={removeFn}>
			<IoIosRemoveCircle className='size-full' />
		</div>

		<div className='size-full rounded-[3px] outline outline-1 outline-secondary object-cover cursor-zoom-in'>
			<ReactPlayer
				width={'100%'}
				height={'100%'}
				url={videoSrc}
				light
				config={{
					youtube: {
						playerVars: { showinfo: 0, rel: 0, modestbranding: 0 }
					}
				}}
			/>
		</div>
	</div>
);
