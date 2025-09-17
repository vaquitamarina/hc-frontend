import { Routes, Route } from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import { useState } from 'react';
import TextInput from './components/ui/TextInput/TextInput';
import Selector from './components/ui/Selector/Selector';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const handleChange = (e) => {
    setUsername(e.target.value);
    setError(e.target.value ? '' : 'Este campo es requerido');
  };
  //  Opciones para el selector
  const cityOptions = [
    { label: 'Nueva York', value: 'ny' },
    { label: 'Londres', value: 'ld' },
    { label: 'Tokio', value: 'tk' },
  ];
  const handleCityChange = (value) => {
    setSelectedCity(value);
    console.log(`Ciudad seleccionada: ${value}`);
  };
  //ejemplo
  return (
    <div>
      <div>
        <TextInput
          label="Nombre de usuario"
          placeholder="Escribe tu nombre"
          value={username}
          onChange={handleChange}
          error={error}
        />
      </div>
      {/* componente Selector */}
      <div style={{ marginTop: '20px' }}>
        <Selector
          options={cityOptions}
          onChange={handleCityChange}
          defaultValue="ld"
        />
        <p>Ciudad seleccionada: {selectedCity}</p>
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
