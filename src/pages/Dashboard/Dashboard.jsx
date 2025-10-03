import { useCurrentUser } from '@hooks/useAuth';
import StudentContent from '@pages/Student/StudentContent';
function Dashboard() {
  const { data } = useCurrentUser();
  const renderContent = () => {
    switch (data?.role) {
      case 'student':
        return <StudentContent></StudentContent>;
      case 'teacher':
        return <div>Teacher Content</div>;
      case 'admin':
        return <div>Admin Content</div>;
    }
  };
  return <div>{renderContent()}</div>;
}

export default Dashboard;
