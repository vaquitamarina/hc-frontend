import { useStudents } from '../../hooks/useStudents';

function StudentPatienList() {
  const { data: students, isLoading, isError, error } = useStudents();

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString('es-PE');
    } catch {
      return isoDate;
    }
  };

  const getFullName = (s) => {
    if (!s) return 'Sin nombre';
    if (s.nombre_completo) return s.nombre_completo;
    const parts = [s.nombre, s.apellido].filter(Boolean);
    if (parts.length) return parts.join(' ');
    if (s.email) return s.email;
    return 'Sin nombre';
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#f5f5f5] text-[#666]">
          Cargando estudiantes...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#ffebee] text-[#d32f2f]">
          Error al cargar estudiantes: {error?.message || 'Error desconocido'}
        </p>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="w-full">
        <p className="p-8 text-center rounded-lg bg-[#f5f5f5] text-[#666]">
          No hay estudiantes disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {students.map((student, index) => {
        const name = getFullName(student);
        const code =
          student.codigo || student.user_code || student.username || '';
        const email = student.email || '';
        const created = formatDate(
          student.created_at ||
            student.fecha_creacion ||
            student.ultima_modificacion ||
            student.last_login
        );

        return (
          <div
            key={student.id || student.id_usuario || index}
            className="rounded-lg p-4 bg-[var(--color-secondary-soft)] flex flex-col gap-2"
          >
            <div className="font-medium">{name}</div>
            {code && <div className="text-sm text-[#666]">Código: {code}</div>}
            {email && <div className="text-sm text-[#666]">{email}</div>}
            {created && (
              <div className="text-sm text-[#666]">Creado: {created}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StudentPatienList;
