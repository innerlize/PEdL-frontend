import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AdminUnauthorizedPage } from '../../pages/Admin/Unauthorized';

const ProtectedRoutes: React.FC = () => {
	const { user } = useAuth();

	if (!user) {
		return <AdminUnauthorizedPage />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
