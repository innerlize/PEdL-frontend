import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminUnauthorizedPage: React.FC = () => {
	const navigate = useNavigate();

	const tryAgain = async () => {
		navigate('/admin-panel/auth');
	};

	return (
		<div className='flex flex-col justify-center items-center gap-7 h-screen bg-neutral text-white'>
			<h1 className='text-6xl font-bold text-secondary'>401</h1>

			<div className='flex flex-col text-center gap-6'>
				<h2 className='text-2xl font-semibold'>Unauthorized Access</h2>

				<p>
					Well... this is awkward, but you’re not supposed to be here. How did
					you even get this far?
				</p>
			</div>

			<button
				onClick={tryAgain}
				className='px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition'>
				Let me identify myself
			</button>
		</div>
	);
};
