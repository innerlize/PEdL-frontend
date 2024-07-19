import { useMediaQuery } from 'react-responsive';
import { MobileNavbar } from './MobileNavbar';
import { DesktopNavbar } from './DesktopNavbar';

const Navbar: React.FC = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' });

	return (
		<nav className='w-full h-[90px] bg-primary md:h-[120px] xl:h-[72px]'>
			{isTabletOrMobile ? <MobileNavbar /> : <DesktopNavbar />}
		</nav>
	);
};

export default Navbar;
