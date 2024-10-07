import { Link } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
	return (
		<nav className='sticky flex items-center z-10 top-[30px] w-full h-full md:top-[70px] 2xl:top-[72px]'>
			<Link
				to='/admin-panel'
				className='font-roboto px-[25px] py-[10px] leading-[28px] text-2xl text-white font-bold uppercase bg-primary rounded-[3px]'>
				Back
			</Link>
		</nav>
	);
};

export default AdminNavbar;
