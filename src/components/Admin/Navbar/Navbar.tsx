import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const AdminNavbar: React.FC = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/admin-panel/auth');
	};

	return (
		<nav className='sticky flex items-center justify-between z-10 top-[30px] w-full h-full font-roboto leading-[28px] text-white font-bold md:top-[70px] 2xl:top-[72px]'>
			<Link
				to='/admin-panel'
				className='px-[25px] py-[10px] text-2xl uppercase bg-primary rounded-[3px]'>
				Back
			</Link>

			<button
				className='text-lg underline transition-colors hover:text-primary'
				onClick={handleLogout}>
				Logout
			</button>
		</nav>
	);
};

export default AdminNavbar;
