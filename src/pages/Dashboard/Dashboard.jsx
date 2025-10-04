import { useCurrentUser } from '@hooks/useAuth';
import StudentDashboard from '@pages/Student/StudentDashboard/StudentDashboard';
function Dashboard() {
  const { data } = useCurrentUser();
  const renderContent = () => {
    switch (data?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <div>Teacher Content</div>;
      case 'admin':
        return <div>Admin Content</div>;
    }
  };
  return <div>{renderContent()}</div>;
}

export default Dashboard;
