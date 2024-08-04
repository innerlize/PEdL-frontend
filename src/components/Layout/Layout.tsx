import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC = () => {
	return (
		<div className='flex flex-col min-w-screen min-h-screen bg-neutral'>
			<Navbar />

			<div className='flex flex-1 text-white p-[30px] md:p-[70px] xl:py-[52px] xl:px-[127px] 2xl:py-[72px] 2xl:px-[227px]'>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
