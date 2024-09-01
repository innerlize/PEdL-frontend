import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import PortfolioPage from '../pages/Portfolio';
import ProjectPage from '../pages/Project';
import ContactPage from '../pages/Contact';
import AdminHomePage from '../pages/Admin/Home';
import AdminLayout from '../components/Admin/Layout/Layout';
import AdminPortfolioPage from '../pages/Admin/Portfolio';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/about',
				element: <AboutPage />
			},
			{
				path: '/portfolio',
				element: <PortfolioPage />
			},
			{
				path: '/contact',
				element: <ContactPage />
			}
		]
	},
	{
		path: '/',
		element: <HomePage />
	},
	{
		path: '/portfolio/project/:id',
		element: <ProjectPage />
	},
	{
		path: '/admin-panel/',
		element: <AdminHomePage />
	},
	{
		element: <AdminLayout />,
		children: [
			{
				path: '/admin-panel/portfolio',
				element: <AdminPortfolioPage />
			}
		]
	}
]);
