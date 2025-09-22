import React, { useState, useEffect } from 'react';
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
        <label htmlFor="userCode">Código de usuario:</label>
        <input
          id="userCode"
          type="text"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>

      {/* Mensajes en la interfaz de usuario */}
      {data && <p>Inicio de sesión exitoso. ¡Bienvenido!</p>}
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </form>
  );
};

export default Login;
