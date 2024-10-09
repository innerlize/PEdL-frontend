import { useNavigate } from 'react-router-dom';
import Error404Illustration from '../assets/images/Error-404-Illustration.png';

const NotFoundPage = () => {
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/');
	};

	return (
		<div className='flex flex-col justify-center items-center gap-7 h-screen bg-neutral text-white'>
			<img
				src={Error404Illustration}
				className='w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5'
			/>

			<div className='flex flex-col text-center gap-6'>
				<h2 className='text-2xl font-semibold'>Page Not Found</h2>
				<p>
					Damn... I think you’re lost, because this page doesn’t exist or is
					currently unavailable.
				</p>
			</div>

			<button
				onClick={goHome}
				className='px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition'>
				Take me home!
			</button>
		</div>
	);
};

export default NotFoundPage;
