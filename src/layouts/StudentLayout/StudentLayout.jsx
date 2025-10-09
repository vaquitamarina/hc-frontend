import { Outlet } from 'react-router';
import Header from '@cmlayout/Header';
import './StudentLayout.css';
import Tab from '@ui/Tab';

function StudentLayout() {
  return (
    <div className="student-layout">
      <Header />

      <main>
        <div className="student-layout__content">
          <div className="student-layout__tabs">
            <Tab isActive={true} name="hc">
              HISTORIA CLÍNICA
            </Tab>
            <Tab name="cita">CITAS</Tab>
          </div>
          <div className="student-layout__outlet">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;
