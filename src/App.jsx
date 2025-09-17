import { Routes, Route } from 'react-router';
import Login from './pages/Login/Login.jsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
