import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login/Login.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import ProtectedRoutes from './components/routes/ProtectedRoutes.jsx';
import StudentLayout from './layouts/StudentLayout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Anamnesis from './pages/hc/Anamnesis/Anamnesis.jsx';
import Filiation from './pages/hc/Anamnesis/Filiacion/Filiacion.jsx';
import HcLayout from './layouts/HcLayout.jsx';
import ExamenFisicoMenu from './pages/hc/ExamenFisico/ExamenFisicoMenu.jsx';
import ExamenGeneral from './pages/hc/ExamenFisico/ExamenGeneral.jsx';
import ExamenRegional from './pages/hc/ExamenFisico/ExamenRegional.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

          <Route element={<HcLayout />}>
            {/* Rutas de Anamnesis */}
            <Route path="/historia/:id/anamnesis" element={<Anamnesis />} />
            <Route
              path="/historia/:id/anamnesis/filiacion"
              element={<Filiation />}
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
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
