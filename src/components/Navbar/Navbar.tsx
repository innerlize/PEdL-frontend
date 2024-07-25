import { useMediaQuery } from 'react-responsive';
import { MobileNavbar } from './MobileNavbar';
import { DesktopNavbar } from './DesktopNavbar';
import { Route } from '../../types/Navbar';

const Navbar: React.FC = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' });

	const routes: Route[] = [
		{ path: '/', label: 'Home' },
		{ path: '/about', label: 'About' },
		{ path: '/portfolio', label: 'Portfolio' },
		{ path: '/contact', label: 'Contact' }
	];

	return (
		<nav className='sticky z-10 top-0 w-full h-[90px] bg-primary md:h-[120px] xl:h-[52px] 2xl:h-[72px]'>
			{isTabletOrMobile ? (
				<MobileNavbar routes={routes} />
			) : (
				<DesktopNavbar routes={routes} />
			)}
		</nav>
	);
};

export default Navbar;
