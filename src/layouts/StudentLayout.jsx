import { Outlet } from 'react-router';
import Header from '@cmlayout/Header';
import Tab from '@ui/Tab';

function StudentLayout() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 bg-[var(--color-secondary)] p-5 pt-[45px] flex max-w-full">
        <div className="bg-[var(--color-background)] flex-1 rounded-[var(--radius-lg)] p-[50px] pt-14 relative">
          <div className="top-[-15px] absolute flex flex-row w-[500px]">
            <Tab isActive={true} name="hc">
              HISTORIA CLÍNICA
            </Tab>
            <Tab name="cita">CITAS</Tab>
          </div>
          <div className="max-w-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;
