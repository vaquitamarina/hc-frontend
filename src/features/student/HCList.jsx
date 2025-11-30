// Este archivo ha sido eliminado. El listado de historias clínicas ahora se maneja con HCList.
import { useHCsByStudent } from '@hooks/useHC';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

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

  if (isLoading) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#f5f5f5] text-[#666]">
          Cargando historias clínicas...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#ffebee] text-[#d32f2f]">
          Error al cargar historias clínicas:{' '}
          {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  if (!hcs || hcs.length === 0) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#f5f5f5] text-[#666]">
          No hay historias clínicas disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
      {hcs.map((hc, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const isEvenRow = row % 2 === 0;
        const type =
          (isEvenRow && col === 0) || (!isEvenRow && col === 1)
            ? 'soft'
            : 'default';

        return (
          <div
            key={hc.id_historia}
            className={`border rounded-lg p-4 bg-white shadow type-${type} cursor-pointer hover:bg-blue-50 transition`}
            onClick={() => navigate(`/historia/${hc.id_historia}/anamnesis`)}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              navigate(`/historia/${hc.id_historia}/anamnesis`)
            }
            role="button"
            tabIndex={0}
            title="Ir al llenado de la historia clínica"
          >
            <div className="font-bold mb-2">HC-{hc.id_historia}</div>
            <div>
              <b>Paciente:</b> {hc.nombre_paciente || 'Sin asignar'}
            </div>
            <div>
              <b>Fecha creación:</b> {formatDate(hc.fecha_creacion)}
            </div>
            {/* Puedes agregar más campos relevantes aquí */}
          </div>
        );
      })}
    </div>
  );
}

HCList.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default HCList;
