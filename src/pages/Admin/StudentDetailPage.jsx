import { useParams } from 'react-router';
import React from 'react';
import { useHCsByStudent } from '@hooks/useHC';
import { useRegisterHc } from '@hooks/useHistoria';
import { useStudents } from '@hooks/useStudents';

function StudentDetailPage() {
  const { id } = useParams();
  const {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
    error: errorStudents,
  } = useStudents();
  const student = students?.find((s) => s.id_usuario === id);

  const {
    data: hcs,
    isLoading: isLoadingHCs,
    isError: isErrorHCs,
    error: errorHCs,
  } = useHCsByStudent(id);

  const registerHcMutation = useRegisterHc();

  if (isLoadingStudents || isLoadingHCs) {
    return <div>Loading...</div>;
  }

  if (isErrorStudents) {
    return <div>Error loading estudiantes: {errorStudents.message}</div>;
  }

  if (!student) {
    return <div>Estudiante no encontrado.</div>;
  }

  if (isErrorHCs) {
    return <div>Error loading historias clínicas: {errorHCs.message}</div>;
  }

  // Helper para color de estado
  const estadoColor = {
    borrador: 'bg-gray-300 text-gray-800',
    en_proceso: 'bg-blue-200 text-blue-800',
    completada: 'bg-green-200 text-green-800',
    aprobada: 'bg-green-400 text-green-900',
    rechazada: 'bg-red-200 text-red-800',
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Sin fecha';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Detalle del Estudiante: {student?.nombre} {student?.apellido}
      </h1>
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-3">
          Stock de Historias Clínicas
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => registerHcMutation.mutate(id)}
          disabled={registerHcMutation.isPending}
        >
          {registerHcMutation.isPending ? 'Creando...' : 'Crear HC'}
        </button>
      </section>
      <section>
        <h2 className="text-lg font-medium mb-3">
          Historias Clínicas Asignadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hcs && hcs.length > 0 ? (
            hcs.map((hc) => (
              <div
                key={hc.id_historia}
                className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-2"
              >
                <div className="font-bold text-blue-700">
                  HC-{hc.id_historia}
                </div>
                <div className="text-gray-700">
                  Paciente:{' '}
                  <span className="font-medium">
                    {hc.nombre && hc.apellido
                      ? `${hc.nombre} ${hc.apellido}`
                      : 'Sin definir'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  DNI: {hc.dni || 'Sin definir'}
                </div>
                <div className="text-sm text-gray-600">
                  Nacimiento:{' '}
                  {hc.fecha_nacimiento
                    ? formatDate(hc.fecha_nacimiento)
                    : 'Sin definir'}
                </div>
                <div className="text-sm text-gray-600">
                  Elaboración:{' '}
                  {hc.fecha_elaboracion
                    ? formatDate(hc.fecha_elaboracion)
                    : hc.fecha_registro
                      ? formatDate(hc.fecha_registro)
                      : 'Sin fecha'}
                </div>
                {hc.estado && (
                  <div
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${estadoColor[hc.estado] || 'bg-gray-200 text-gray-700'}`}
                  >
                    {hc.estado}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No hay historias clínicas asignadas.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentDetailPage;
