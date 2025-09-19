import Button from '../../components/ui/Button/Button';
import TextInput from '../../components/ui/TextInput/TextInput';
function Login() {
  return (
    <>
      <h1>Iniciar Sesion</h1>
      <TextInput>email</TextInput>
      <TextInput>contraseña</TextInput>
      <Button>Ingresar</Button>
    </>
  );
}

export default Login;
