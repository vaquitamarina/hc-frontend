import { Routes, Route } from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
