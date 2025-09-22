import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login/Login.jsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.jsx';

import StudentLayout from './layouts/StudentLayout/StudentLayout.jsx';
import StudentDashboard from './pages/student/Dashboard/Dashboard.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
