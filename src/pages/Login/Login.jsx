import { useState } from 'react';
import TextInput from '@ui/TextInput';
import Button from '../../components/ui/Button';
import { useLogin } from '@hooks/useAuth';
function Login() {
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const {
    mutate: loginMutation,
    isPending: loading,
    isError: error,
  } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ userCode, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <TextInput
          name="userCode"
          label="Código de Usuario:"
          placeholder="Ingrese su código de usuario"
          onChange={(e) => setUserCode(e.target.value)}
        />
      </div>
      <div>
        <TextInput
          name="password"
          type="password"
          label="Contraseña:"
          placeholder="Ingrese su contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>

      {error && <p style={{ color: 'red' }}>Credenciales invalidas</p>}
    </form>
  );
}

export default Login;
