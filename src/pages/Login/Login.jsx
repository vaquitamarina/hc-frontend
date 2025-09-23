import React, { useState, useEffect } from 'react';
import TextInput from '../../components/ui/TextInput/TextInput';
import Button from '../../components/ui/Button/Button';
import useLogin from '../../hooks/useLogin';
const Login = () => {
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const { data, loading, error, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userCode, password);
  };

  useEffect(() => {
    if (data) {
      console.log('¡Inicio de sesión exitoso!');
      console.log('Datos del usuario:', data);
    }
  }, [data]); // El efecto se ejecuta cada vez que 'data' cambia

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <TextInput
          id="userCode"
          value={userCode}
          label="Código de Usuario:"
          placeholder="Ingrese su código de usuario"
          onChange={(e) => setUserCode(e.target.value)}
        />
      </div>
      <div>
        <TextInput
          id="password"
          type="password"
          value={password}
          label="Contraseña:"
          placeholder="Ingrese su contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        Iniciar Sesión
      </Button>

      {/* Mensajes en la interfaz de usuario */}
      {data && <p>Inicio de sesión exitoso. ¡Bienvenido!</p>}
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </form>
  );
};

export default Login;
