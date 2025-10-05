import { Outlet } from 'react-router';
import Header from '@cmlayout/Header/Header';
import './HcLayout.css';
import Sidebar from '@cmlayout/Sidebar/Sidebar';
import { useParams } from 'react-router';

function HcLayout() {
  const { id } = useParams();
  const menuItems = [
    { path: `/historia/${id}/anamnesis`, label: 'Anamnesis' },
    { path: '', label: 'Examen Fisico' },
    { path: '', label: 'Diagnosticos presuntivos' },
    { path: '', label: 'Derivado a clinicas' },
    { path: '', label: 'Diagnostico en clinicas' },
    { path: '/evoluciones', label: 'Evoluciones' },
  ];
  return (
    <div className="hc-layout">
      <Header />

      <main>
        <div className="hc-layout__content-wrapper">
          <Sidebar title="Adulto" items={menuItems} />
          <div className="hc-layout__content">
            <div className="hc-layout__outlet">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HcLayout;
