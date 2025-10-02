import Tab from '@ui/Tab/Tab';
import AdultPatientsList from '../../../components/AdultPatientsList/AdultPatientsList';


function StudentDashboard() {
  return (
    <div className={'studentdashboard'}>
      <AdultPatientsList studentId="123" />
      <div className={'studentdashboard__adult'}>
        <h2>Adulto</h2>
        <Tab name="citas" isActive="true">
          Citas
        </Tab>
      </div>
    </div>
  );
}

export default StudentDashboard;
