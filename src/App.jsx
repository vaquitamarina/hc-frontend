import { Routes, Route } from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import { useState } from 'react';
import TextInput from './components/ui/TextInput/TextInput';
import Header from './components/layout/Header/Header';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
    setError(e.target.value ? '' : 'Este campo es requerido');
  };
  //ejemplo
  return (
    <div>
      <Header />
      <div>
        <TextInput
          label="Nombre de usuario"
          placeholder="Escribe tu nombre"
          value={username}
          onChange={handleChange}
          error={error}
        />
      </div>

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
