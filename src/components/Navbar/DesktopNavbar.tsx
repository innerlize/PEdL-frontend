import { NavLink } from 'react-router-dom';
import { Route } from '../../types/Navbar';

interface DesktopNavbarProps {
	routes: Route[];
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ routes }) => {
	return (
		<div
			data-test='desktop-navbar'
			className='flex items-center justify-center gap-[120px] size-full 2xl:gap-[170px]'>
			{routes.map((route, index) => (
				<NavLink
					key={index}
					to={route.path}
					className={({ isActive }) =>
						`font-roboto font-bold text-[18px] 2xl:text-[24px] transition-colors ${isActive ? 'text-white' : 'text-accent hover:text-neutral'}`
					}>
					{route.label}
				</NavLink>
			))}
		</div>
	);
};
