import { Navigate, Outlet } from 'react-router';
import { useCurrentUser } from '@hooks/useAuth';

function ProtectedRoutes() {
  const { data: user, isLoading } = useCurrentUser();
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
export default ProtectedRoutes;