import AdultPatientList from '@features/student/AdultPatientList/AdultPatientList';
import { useCurrentUser } from '@hooks/useAuth';
import Button from '@ui/Button/Button';
import './StudentDashboard.css';
export function StudentDashboard() {
  const { data } = useCurrentUser();
  return (
    <div className="student-content">
      <div>
        <div className="student-content__tittle">
          <h2>Adulto</h2>
          <Button>Añadir</Button>
        </div>
        <AdultPatientList studentId={data.id}></AdultPatientList>
      </div>
      <div className="student-content__child">
        <div className="student-content__tittle">
          <h2>Niño</h2>
          <Button>Añadir</Button>
        </div>
        <AdultPatientList studentId={data.id}></AdultPatientList>
      </div>
    </div>
  );
}

export default StudentDashboard;
