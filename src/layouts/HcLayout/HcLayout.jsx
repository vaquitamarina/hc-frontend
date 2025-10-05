import { Outlet } from 'react-router';
import Header from '@cmlayout/Header/Header';
import './HcLayout.css';
import Sidebar from '@cmlayout/Sidebar/Sidebar';
import { useParams } from 'react-router';
import { CircleUserRound } from 'lucide-react';
import { useCurrentPatientStore } from '@stores/usePatientStore';

function HcLayout() {
  const { id } = useParams();
  const patient = useCurrentPatientStore((state) => state.currentPatient);
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
            <div className="hc__patient">
              <div>
                <CircleUserRound
                  size={84}
                  strokeWidth={1}
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <h2 className="anamnesis__title">
                {patient?.name || 'Paciente ingresante'}
              </h2>
            </div>
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
