import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import Layout from '../components/Layout/Layout';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/about',
				element: <div>About</div>
			}
		]
	},
	{
		path: '/',
		element: <HomePage />
	}
]);
