import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import PortfolioPage from '../pages/Portfolio';
import ProjectPage from '../pages/Project';

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
	}
]);
