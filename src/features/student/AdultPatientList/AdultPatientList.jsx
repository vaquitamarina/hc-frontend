import { usePatients } from '../../hooks/usePatients';
import PatientCard from '../../features/patient/PatientCard/PatientCard';
import './AdultPatientsList.css';
import PropTypes from 'prop-types';

/**
 * Componente para listar pacientes adultos de un estudiante
 * @param {string} studentId - ID del estudiante
 */
function AdultPatientsList({ studentId }) {
  const { data: patients, isLoading, isError, error } = usePatients(studentId);

  /**
   * Formatea una fecha ISO a formato dd/mm/yyyy
   * @param {string} isoDate - Fecha en formato ISO
   * @returns {string} - Fecha formateada
   */
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="adult-patients-list">
        <p className="adult-patients-list__loading">Cargando pacientes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="adult-patients-list">
        <p className="adult-patients-list__error">
          Error al cargar pacientes: {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="adult-patients-list">
        <p className="adult-patients-list__empty">
          No hay pacientes disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="adult-patients-list">
      <div className="adult-patients-list__container">
        {patients.map((patient) => (
          <PatientCard
            key={patient.idPatient}
            name={patient.name}
            date={formatDate(patient.lastUpdate)}
            img="" // Imagen por defecto o placeholder
          />
        ))}
      </div>
    </div>
  );
}

AdultPatientsList.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default AdultPatientsList;
