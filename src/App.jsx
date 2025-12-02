import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login/Login.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import ProtectedRoutes from './components/routes/ProtectedRoutes.jsx';
import StudentLayout from './layouts/StudentLayout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Anamnesis from './pages/hc/Anamnesis/Anamnesis.jsx';
import Filiation from './pages/hc/Anamnesis/Filiacion/Filiacion.jsx';
import Motivo_Consulta from './pages/hc/Anamnesis/Motivo_Consulta/Motivo_Consulta.jsx';
import Enfermedad_Actual from './pages/hc/Anamnesis/Enfermedad_Actual/Enfermedad_Actual.jsx';
import AntecedentePersonal from './pages/hc/Anamnesis/Antecedente/Antecedente.jsx';
import HcLayout from './layouts/HcLayout.jsx';
import ExamenFisicoMenu from './pages/hc/ExamenFisico/ExamenFisicoMenu.jsx';
import ExamenGeneral from './pages/hc/ExamenFisico/ExamenGeneral.jsx';
import ExamenRegional from './pages/hc/ExamenFisico/ExamenRegional.jsx';
import ExamenBoca from './pages/hc/ExamenFisico/ExamenBoca.jsx';
import ExamenHigiene from './pages/hc/ExamenFisico/ExamenHigiene.jsx';
import DiagnosticoPresuntivo from './pages/hc/Diagnostico/DiagnosticoPresuntivo.jsx';
import DerivacionClinicas from './pages/hc/Diagnostico/DerivacionClinicas.jsx';
import DiagnosticoClinicas from './pages/hc/Diagnostico/DiagnosticoClinicas.jsx';
import Evolucion from './pages/hc/Evolucion/Evolucion.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import StudentDetailPage from './pages/Admin/StudentDetailPage.jsx';
import Odonto from './pages/hc/ExamenFisico/odonto.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<StudentLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/student/:id" element={<StudentDetailPage />} />
          </Route>

          <Route element={<HcLayout />}>
            {/* Rutas de Anamnesis */}
            <Route path="/historia/:id/anamnesis" element={<Anamnesis />} />
            <Route
              path="/historia/:id/anamnesis/antecedente-personal"
              element={<AntecedentePersonal />}
            />
            <Route
              path="/historia/:id/anamnesis/filiacion"
              element={<Filiation />}
            />
            <Route
              path="/historia/:id/anamnesis/motivo-consulta"
              element={<Motivo_Consulta />}
            />
            <Route
              path="/historia/:id/anamnesis/enfermedad-actual"
              element={<Enfermedad_Actual />}
            />

            {/* NUEVAS RUTAS DE EXAMEN FÍSICO */}
            <Route
              path="/historia/:id/examen-fisico"
              element={<ExamenFisicoMenu />}
            />
            <Route
              path="/historia/:id/examen-fisico/general"
              element={<ExamenGeneral />}
            />
            <Route
              path="/historia/:id/examen-fisico/regional"
              element={<ExamenRegional />}
            />
            <Route
              path="/historia/:id/examen-fisico/boca"
              element={<ExamenBoca />}
            />
            <Route
              path="/historia/:id/examen-fisico/higiene"
              element={<ExamenHigiene />}
            />
            <Route
              path="/historia/:id/examen-fisico/odonto"
              element={<Odonto />}
            />
            <Route
              path="/historia/:id/diagnostico-presuntivo"
              element={<DiagnosticoPresuntivo />}
            />
            <Route
              path="/historia/:id/derivacion-clinicas"
              element={<DerivacionClinicas />}
            />
            <Route
              path="/historia/:id/diagnostico-clinicas"
              element={<DiagnosticoClinicas />}
            />
            <Route path="/historia/:id/evolucion" element={<Evolucion />} />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
