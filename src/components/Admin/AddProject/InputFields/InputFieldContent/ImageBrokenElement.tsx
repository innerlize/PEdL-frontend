import { TbError404Off } from 'react-icons/tb';

export const AdminImageBrokenElement: React.FC = () => (
	<div className='w-9/12 mx-auto text-white text-center'>
		<div className='size-2/4 mx-auto mb-5'>
			<TbError404Off className='size-full' />
		</div>

		<p>This image is broken. Please review your image URL and try again.</p>
	</div>
);
