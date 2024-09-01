import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Navbar/Navbar';

const AdminLayout: React.FC = () => {
	return (
		<div className='flex flex-col min-w-screen min-h-screen bg-neutral p-[30px] md:p-[70px] xl:py-[52px] xl:px-[127px] 2xl:py-[72px] 2xl:px-[227px]'>
			<AdminNavbar />

			<div className='flex flex-1 text-white'>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
