import { NavLink } from 'react-router-dom';

export const DesktopNavbar: React.FC = () => {
	const routes = [
		{ path: '/home', label: 'Home' },
		{ path: '/about', label: 'About' },
		{ path: '/portfolio', label: 'Portfolio' },
		{ path: '/contact', label: 'Contact' }
	];

	return (
		<div
			data-test='desktop-navbar'
			className='flex items-center justify-center gap-[120px] size-full 2xl:gap-[170px]'>
			{routes.map((route, index) => (
				<NavLink
					key={index}
					to={route.path}
					className={({ isActive }) =>
						`font-roboto font-bold text-[18px] 2xl:text-[24px] ${isActive ? 'text-white' : 'text-accent'}`
					}>
					{route.label}
				</NavLink>
			))}
		</div>
	);
};
