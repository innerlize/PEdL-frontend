import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import Layout from '../components/Layout/Layout';
import { AboutPage } from '../pages/About';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/about',
				element: <AboutPage />
			}
		]
	},
	{
		path: '/',
		element: <HomePage />
	}
]);
