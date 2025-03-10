import { useAuth } from '../provider/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to={'/signin'} />;
  return <Outlet />;
};

export default PrivateRoute;
