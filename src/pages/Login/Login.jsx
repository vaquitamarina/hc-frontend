import Button from '../../components/ui/Button/Button';
import TextInput from '../../components/ui/TextInput/TextInput';
function Login() {
  return (
    <div>
      <h1>Iniciar Sesion</h1>
      <TextInput>email</TextInput>
      <TextInput>contraseña</TextInput>

      <Button variant="primary" to="/student/dashboard">
        Entrar
      </Button>
    </div>
  );
}

export default Login;
