import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react';

const Menu = () => {
	const routes = [
		{ path: '/home', label: 'Home' },
		{ path: '/about', label: 'About' },
		{ path: '/portfolio', label: 'Portfolio' },
		{ path: '/contact', label: 'Contact' }
	];

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

export const MobileNavbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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

			{isMenuOpen && <Menu />}
		</div>
	);
};
