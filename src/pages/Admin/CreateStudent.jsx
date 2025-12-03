import { useState } from 'react';
import { createUser } from '../../services/fetchCreateUser';

export default function CreateStudent() {
  const [form, setForm] = useState({
    userCode: '',
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createUser({ ...form, role: 'estudiante' });
      setSuccess('Estudiante creado correctamente');
      setForm({
        userCode: '',
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
        password: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-[var(--color-surface)]">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2 bg-white rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-[var(--color-primary-soft)]">
            Registrar Estudiante
          </h2>
          <label className="font-semibold">
            Código de usuario
            <input
              name="userCode"
              value={form.userCode}
              onChange={handleChange}
              placeholder="Ej: 20231234"
              required
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          <label className="font-semibold">
            Nombres
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Nombres del estudiante"
              required
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          <label className="font-semibold">
            Apellidos
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Apellidos del estudiante"
              required
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          <label className="font-semibold">
            DNI
            <input
              name="dni"
              value={form.dni}
              onChange={handleChange}
              placeholder="Número de DNI"
              required
              maxLength={8}
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          <label className="font-semibold">
            Correo electrónico
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          <label className="font-semibold">
            Contraseña
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña segura"
              required
              className="border p-2 rounded w-full mt-1"
            />
          </label>
          {error && (
            <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm mt-2 text-center">
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
