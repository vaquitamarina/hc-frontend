import { usePatients } from '@hooks/usePatients';
import PatientCard from '@features/patient/PatientCard/PatientCard';
import './AdultPatientList.css';
import PropTypes from 'prop-types';
import { useCurrentPatientStore } from '@stores/usePatientStore';

function AdultPatientsList({ studentId }) {
  const { data: patients, isLoading, isError, error } = usePatients(studentId);
  const { setCurrentPatient } = useCurrentPatientStore();
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
    <div className="adult-patients-list__container">
      {patients.map((patient, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;

        const isEvenRow = row % 2 === 0;
        const type =
          (isEvenRow && col === 0) || (!isEvenRow && col === 1)
            ? 'soft'
            : 'default';

        return (
          <PatientCard
            key={patient.idPatient}
            name={patient.name}
            date={formatDate(patient.lastUpdate)}
            type={type}
            idHistory={patient.idHistory}
            handleClick={() => setCurrentPatient(patient)}
          />
        );
      })}
    </div>
  );
}

AdultPatientsList.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default AdultPatientsList;
