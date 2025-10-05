import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login/Login.jsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.jsx';
import ProtectedRoutes from './components/routes/ProtectedRoutes.jsx';
import StudentLayout from './layouts/StudentLayout/StudentLayout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Anamnesis from './pages/hc/Anamnesis/Anamnesis.jsx';
import Filiacion from './pages/hc/Anamnesis/Filiacion/Filiacion.jsx';
import HcLayout from './layouts/HcLayout/HcLayout.jsx';
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
            <Route
              path="/historia/:id"
              element={<Navigate to="/historia/:id/anamnesis" replace />}
            />
            <Route path="/historia/:id/anamnesis" element={<Anamnesis />} />
            <Route
              path="/historia/:id/anamnesis/filiacion"
              element={<Filiacion />}
            />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
