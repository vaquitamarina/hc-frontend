import StudentPatienList from '@features/student/StudentPatienList';

function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Panel de Administración</h1>
      <section>
        <h2 className="text-lg font-medium mb-3">Listado de estudiantes</h2>
        <StudentPatienList />
      </section>
    </div>
  );
}

export default AdminDashboard;
