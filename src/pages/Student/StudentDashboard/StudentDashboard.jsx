import HCList from '@features/student/HCList';
import { useCurrentUser } from '@hooks/useAuth';
import { useCreateDraft } from '@hooks/useHistoria';
import Button from '@ui/Button';
import { useNavigate } from 'react-router';
import './StudentDashboard.css';
import { useForm } from '@stores/useForm';

export function StudentDashboard() {
  const { data } = useCurrentUser();
  const navigate = useNavigate();
  const { setFormMode } = useForm();
  const createDraft = useCreateDraft();

  const handleAddHc = async () => {
    try {
      setFormMode();
      const res = await createDraft.mutateAsync();
      navigate(`/historia/${res.id_historia}/anamnesis/`);
    } catch (error) {
      console.error('Error al crear borrador:', error);
    }
  };

  return (
    <div className="student-content">
      <div className="student-content__patient">
        <div className="student-content__tittle">
          <h2>Adulto</h2>
          <Button onClick={handleAddHc}>Añadir</Button>
        </div>
        <HCList studentId={data.id} />
      </div>
      <div className="linea-vertical"></div>

      <div className="student-content__patient">
        <div className="student-content__tittle">
          <h2>Niño</h2>
          <Button onClick={handleAddHc}>Añadir</Button>
        </div>
        <HCList studentId={data.id} />
      </div>
    </div>
  );
}

export default StudentDashboard;
