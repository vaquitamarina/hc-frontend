import AdultPatientList from '@features/student/AdultPatientList/AdultPatientList';
import { useCurrentUser } from '@hooks/useAuth';
import Button from '@ui/Button/Button';
import { useNavigate } from 'react-router';
import './StudentDashboard.css';
import { useCurrentPatientStore } from '@stores/usePatientStore';
import { useForm } from '@stores/useForm';
//solo para la prueba
//
export function StudentDashboard() {
  const { data } = useCurrentUser();
  const navigate = useNavigate();
  const { removeCurrentPatient } = useCurrentPatientStore();
  const { setFormMode } = useForm();

  const handleAddHc = () => {
    removeCurrentPatient();
    setFormMode();
    navigate('/historia/0/anamnesis/');
  };

  return (
    <div className="student-content">
      <div className="student-content__adult">
        <div className="student-content__tittle">
          <h2>Adulto</h2>
          <Button onClick={handleAddHc}>Añadir</Button>
        </div>
        <AdultPatientList studentId={data.id}></AdultPatientList>
      </div>
      <div className="linea-vertical"></div>

      <div className="student-content__child">
        <div className="student-content__tittle">
          <h2>Niño</h2>
          <Button onClick={handleAddHc}>Añadir</Button>
        </div>
        <AdultPatientList studentId={data.id}></AdultPatientList>
      </div>
    </div>
  );
}

export default StudentDashboard;
