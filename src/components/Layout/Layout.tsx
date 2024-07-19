import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC = () => {
	return (
		<div>
			<Navbar />

			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
