import Zoom from 'react-medium-image-zoom';

interface ImageProps {
	src: string;
}

export const Image: React.FC<ImageProps> = ({ src }) => (
	<Zoom classDialog='custom-fullscreen-dialog' zoomMargin={30}>
		<img
			alt='Project evidence'
			src={src}
			className='max-w-[200px] h-[96px] object-contain rounded-[3px] xl:max-2xl:max-w-[100px]'
		/>
	</Zoom>
);
