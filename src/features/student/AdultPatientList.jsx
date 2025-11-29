import { usePatients } from '@hooks/usePatients';
import PatientCard from '@features/patient/PatientCard';
import PropTypes from 'prop-types';

function AdultPatientsList({ studentId }) {
  const { data: patients, isLoading, isError, error } = usePatients(studentId);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#f5f5f5] text-[#666]">
          Cargando pacientes...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#ffebee] text-[#d32f2f]">
          Error al cargar pacientes: {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#f5f5f5] text-[#666]">
          No hay pacientes disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
      {patients.map((patient, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;

        const isEvenRow = row % 2 === 0;
        const type =
          (isEvenRow && col === 0) || (!isEvenRow && col === 1)
            ? 'soft'
            : 'default';

        // Mostrar 'Sin asignar' si no hay datos de paciente
        const nombre = patient.nombre ? patient.nombre : 'Sin asignar';
        const fecha = patient.fecha_nacimiento
          ? formatDate(patient.fecha_nacimiento)
          : 'Sin asignar';

        return (
          <PatientCard
            key={patient.id_historia}
            name={nombre}
            date={fecha}
            type={type}
            idHistory={patient.id_historia}
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
