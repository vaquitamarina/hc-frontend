import Button from '../../../components/ui/Button/Button';
import './Dashboard.css';
function StudentDashboard() {
  return (
    <div className={'studentdashboard'}>
      <div className={'studentdashboard__adult'}>
        <h2>Adulto</h2>
        <Button>Crear</Button>
      </div>
    </div>
  );
}

export default StudentDashboard;
