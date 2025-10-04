import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login/Login.jsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.jsx';
import ProtectedRoutes from './components/routes/ProtectedRoutes.jsx';
import StudentLayout from './layouts/StudentLayout/StudentLayout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Anamnesis from './pages/hc/Anamnesis/Anamnesis.jsx';
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
            <Route path="/historia-clinica/:id" element={<Anamnesis />} />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
