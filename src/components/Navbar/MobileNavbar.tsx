import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react';
import { Route } from '../../types/Navbar';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

interface MenuProps {
	routes: Route[];
}

const Menu: React.FC<MenuProps> = ({ routes }) => {
	return (
		<div
			data-test='mobile-navbar-menu'
			className='absolute flex flex-col items-center justify-center gap-[38px] size-full top-0 left-0 bg-primary z-10'>
			{routes.map((route, index) => (
				<NavLink
					key={index}
					to={route.path}
					className={({ isActive }) =>
						`font-roboto font-bold text-[40px] md:text-[64px] ${isActive ? 'text-white' : 'text-accent'}`
					}>
					{route.label}
				</NavLink>
			))}
		</div>
	);
};

interface MobileNavbarProps {
	routes: Route[];
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ routes }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	if (isMenuOpen) {
		disablePageScroll();
	} else {
		enablePageScroll();
	}

	return (
		<div data-test='mobile-navbar' className='size-full'>
			<div className='relative flex items-center justify-end size-full px-[30px] z-20'>
				<Hamburger
					toggled={isMenuOpen}
					toggle={setIsMenuOpen}
					color='white'
					rounded
					size={60}
				/>
			</div>

			{isMenuOpen && <Menu routes={routes} />}
		</div>
	);
};
