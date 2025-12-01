import { Outlet, useParams, useLocation, useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';
import Header from '@cmlayout/Header';
import Sidebar from '@cmlayout/Sidebar';
import { CircleUserRound } from 'lucide-react';
import { usePatientByHistory } from '@hooks/useHistoria';

function HcLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { data: patient } = usePatientByHistory(id);

  // Determine whether this view was opened as a newly created draft
  // The creator of a draft can either navigate with `?new=1` or pass
  // `state: { createdDraft: true }` so we can show "Paciente Nuevo" only
  // in that case. Otherwise, if there's no patient, show "Paciente No asignado".
  const isNewDraft =
    searchParams.get('new') === '1' ||
    (location.state && location.state.createdDraft === true);

  const menuItems = [
    { path: `/historia/${id}/anamnesis`, label: 'Anamnesis' },
    { path: `/historia/${id}/examen-fisico`, label: 'Examen Fisico' },
    { path: `/dashboard`, label: 'Diagnosticos presuntivos' },
    { path: '/dashboard', label: 'Derivado a clinicas' },
    { path: '/dashboard', label: 'Diagnostico en clinicas' },
    { path: '/dashboard', label: 'Evoluciones' },
  ];

  const showDashboardButton =
    location.pathname === `/historia/${id}/anamnesis` ||
    location.pathname === `/historia/${id}/examen-fisico`;

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header />

      {/* min-h-0 es vital para que el flex anidado permita scroll */}
      <main className="flex-1 p-4 pt-8 bg-[var(--color-secondary)] flex min-h-0">
        <div className="flex bg-[var(--color-background)] rounded-[var(--radius-lg)] flex-1 overflow-hidden">
          <Sidebar title="Adulto" items={menuItems} />

          {/* Habilitamos scroll SOLO en esta sección derecha */}
          <div
            className="flex-1 p-12 flex flex-col gap-10 overflow-y-auto h-full"
            style={{ position: 'relative' }}
          >
            {/* Botón Volver al Dashboard solo en la pantalla de selección de formulario */}
            {showDashboardButton && (
              <div
                style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
              >
                <button
                  type="button"
                  style={{
                    backgroundColor: '#f3f8fa',
                    color: '#11557c',
                    border: '2px solid #11557c',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    borderRadius: '16px',
                    padding: '0.25rem 2rem',
                    margin: '1rem',
                    cursor: 'pointer',
                    boxShadow: 'none',
                    outline: 'none',
                  }}
                  onClick={() => navigate('/dashboard')}
                >
                  Volver al Dashboard
                </button>
              </div>
            )}
            <div className="flex items-center gap-8 text-2xl max-w-[350px] flex-shrink-0">
              <div>
                <CircleUserRound
                  size={84}
                  strokeWidth={1}
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <h2>
                {patient?.nombre || patient?.apellido
                  ? `${patient?.nombre ?? ''} ${patient?.apellido ?? ''}`.trim()
                  : isNewDraft
                    ? 'Paciente Nuevo'
                    : 'Paciente No asignado'}
              </h2>
            </div>

            {/* Padding bottom extra para proteger el botón de guardar al final */}
            <div className="pb-20">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HcLayout;
