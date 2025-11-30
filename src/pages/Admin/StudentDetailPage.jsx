import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useHCsByStudent } from '@hooks/useHC';
import { useRegisterHc } from '@hooks/useHistoria';

function StudentDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Get student data from the cache populated by the useStudents hook
  const students = queryClient.getQueryData(['students']);
  const student = students?.find((s) => s.id_usuario === id);

  const {
    data: hcs,
    isLoading: isLoadingHCs,
    isError: isErrorHCs,
    error: errorHCs,
  } = useHCsByStudent(id);

  const registerHcMutation = useRegisterHc();

  if (isLoadingHCs) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Estudiante no encontrado.</div>;
  }

  if (isErrorHCs) {
    return <div>Error loading historias clínicas: {errorHCs.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Detalle del Estudiante: {student?.nombre} {student?.apellido}
      </h1>
      <section>
        <h2 className="text-lg font-medium mb-3">
          Historias Clínicas Asignadas
        </h2>
        {hcs && hcs.length > 0 ? (
          <ul>
            {hcs.map((hc) => (
              <li key={hc.id_historia}>
                HC-{hc.id_historia}{' '}
                {hc.nombre_paciente ? `- Paciente: ${hc.nombre_paciente}` : ''}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay historias clínicas asignadas.</p>
        )}
      </section>
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
    </div>
  );
}

export default StudentDetailPage;
