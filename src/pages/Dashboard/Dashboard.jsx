import { useCurrentUser } from '@hooks/useAuth';
import StudentDashboard from '@pages/Student/StudentDashboard/StudentDashboard';
import AdminDashboard from '@pages/Admin/AdminDashboard';

function Dashboard() {
  const { data } = useCurrentUser();
  const renderContent = () => {
    switch (data?.role) {
      case 'estudiante':
        return <StudentDashboard />;
      case 'profesor':
        return <div>Profesor Content</div>;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div />;
    }
  };
  return <div>{renderContent()}</div>;
}

export default Dashboard;
