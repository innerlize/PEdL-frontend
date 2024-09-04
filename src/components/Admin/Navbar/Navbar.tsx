import { Link } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
	return (
		<nav className='sticky flex items-center z-10 top-0 w-full h-full'>
			<Link
				to='/admin-panel'
				className='font-roboto px-[25px] py-[10px] leading-[28px] text-2xl text-white font-bold uppercase bg-primary rounded-[3px]'>
				Back
			</Link>
		</nav>
	);
};

export default AdminNavbar;
