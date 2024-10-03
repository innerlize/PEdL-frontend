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
import AdminPartnersPage from '../pages/Admin/Partners';
import AdminAddProjectPage from '../pages/Admin/AddProject';
import AdminAddPartnerPage from '../pages/Admin/AddPartner';
import AdminAuthPage from '../pages/Admin/Auth';
import ProtectedRoutes from '../components/Admin/ProtectedRoutes';
import NotFoundPage from '../pages/NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />
	},
	{
		path: '/portfolio/project/:id',
		element: <ProjectPage />
	},
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
		element: <ProtectedRoutes />,
		children: [
			{
				path: '/admin-panel',
				element: <AdminHomePage />
			},
			{
				element: <AdminLayout />,
				children: [
					{
						path: '/admin-panel/portfolio',
						element: <AdminPortfolioPage />
					},
					{
						path: '/admin-panel/partners',
						element: <AdminPartnersPage />
					},
					{
						path: '/admin-panel/project/add',
						element: <AdminAddProjectPage />
					},
					{
						path: '/admin-panel/partners/add',
						element: <AdminAddPartnerPage />
					}
				]
			}
		]
	},
	{
		path: '/admin-panel/auth',
		element: <AdminAuthPage />
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
]);
