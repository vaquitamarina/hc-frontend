import Tab from '@ui/Tab/Tab';
function StudentDashboard() {
  return (
    <div className={'studentdashboard'}>
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
