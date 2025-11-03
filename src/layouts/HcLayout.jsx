import { Outlet } from 'react-router';
import Header from '@cmlayout/Header';
import Sidebar from '@cmlayout/Sidebar';
import { useParams } from 'react-router';
import { CircleUserRound } from 'lucide-react';
import { usePatientByHistory } from '@hooks/useHistoria';

function HcLayout() {
  const { id } = useParams();
  const { data: patient } = usePatientByHistory(id);
  const menuItems = [
    { path: `/historia/${id}/anamnesis`, label: 'Anamnesis' },
    { path: `/dashboard`, label: 'Examen Fisico' },
    { path: `/dashboard`, label: 'Diagnosticos presuntivos' },
    { path: '/dashboard', label: 'Derivado a clinicas' },
    { path: '/dashboard', label: 'Diagnostico en clinicas' },
    { path: '/dashboard', label: 'Evoluciones' },
  ];
  return (
    <div className="flex flex-col h-dvh overflow-auto">
      <Header />

      <main className="flex-1 p-4 pt-8 bg-[var(--color-secondary)] flex overflow-hidden">
        <div className="flex bg-[var(--color-background)] rounded-[var(--radius-lg)] flex-1">
          <Sidebar title="Adulto" items={menuItems} />
          <div className="bg-[var(--color-background)] flex-1 rounded-[var(--radius-lg)] p-12 flex flex-col gap-10">
            <div className="flex items-center gap-8 text-2xl max-w-[350px]">
              <div>
                <CircleUserRound
                  size={84}
                  strokeWidth={1}
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <h2>
                {patient?.nombre && patient?.apellido
                  ? `${patient.nombre} ${patient.apellido}`
                  : 'Paciente ingresante'}
              </h2>
            </div>
            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HcLayout;
