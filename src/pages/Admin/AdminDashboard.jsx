import StudentPatienList from '@features/student/StudentPatienList';
import { Link } from 'react-router';
function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Panel de Administración</h1>
        <Link
          to="/admin/create-student"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Crear Estudiante
        </Link>
      </div>
      <section>
        <h2 className="text-lg font-medium mb-3">Listado de estudiantes</h2>

        <StudentPatienList />
      </section>
    </div>
  );
}

export default AdminDashboard;
