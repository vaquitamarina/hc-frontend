import { useHCsByStudent } from '@hooks/useHC';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import './HCList.css';

function HCList({ studentId }) {
  const { data: hcs, isLoading, isError, error } = useHCsByStudent(studentId);
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getPatientName = (hc) => {
    if (hc.nombre && hc.apellido) {
      return `${hc.nombre} ${hc.apellido}`;
    }
    return 'Sin asignar';
  };

  const getInitials = (hc) => {
    const name = getPatientName(hc);
    if (name === 'Sin asignar') return '?';
    return name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="hc-loading">
        <p>Cargando historias clínicas...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="hc-error">
        <p>
          Error al cargar historias clínicas:{' '}
          {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  if (!hcs || hcs.length === 0) {
    return (
      <div className="hc-empty">
        <p>No hay historias clínicas disponibles</p>
      </div>
    );
  }

  return (
    <div className="hc-list">
      {hcs.map((hc) => (
        <div
          key={hc.id_historia}
          className={`patient-card ${!hc.nombre && !hc.apellido ? 'patient-card--unassigned' : ''}`}
          onClick={() => navigate(`/historia/${hc.id_historia}/anamnesis`)}
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            navigate(`/historia/${hc.id_historia}/anamnesis`)
          }
          role="button"
          tabIndex={0}
          title="Ir al llenado de la historia clínica"
        >
          <div className="patient-card__header">
            <div className="patient-card__avatar">{getInitials(hc)}</div>
            <div className="patient-card__content">
              <p className="patient-card__name">{getPatientName(hc)}</p>
              <p className="patient-card__date">
                {hc.fecha_registro
                  ? formatDate(hc.fecha_registro)
                  : 'Sin fecha'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

HCList.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default HCList;
