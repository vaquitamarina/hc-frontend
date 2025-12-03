import HCList from '@features/student/HCList';
import { useCurrentUser } from '@hooks/useAuth';
import './StudentDashboard.css';

export function StudentDashboard() {
  const { data } = useCurrentUser();

  return (
    <div className="student-content">
      <div className="student-content__patient">
        <div className="student-content__tittle">
          <h2>Adulto</h2>
        </div>
        <HCList studentId={data.id} />
      </div>
      <div className="linea-vertical"></div>
    </div>
  );
}

export default StudentDashboard;
