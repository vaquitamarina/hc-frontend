import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '@hooks/useAuth';

function ProtectedRoutes() {
  const { isError } = useCurrentUser();
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
export default ProtectedRoutes;
