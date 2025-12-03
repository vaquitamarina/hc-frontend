// Servicio para crear usuario (estudiante)
export const createUser = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // Muestra el mensaje principal y el detalle si existe
    let msg = errorData.error || 'No se pudo crear el usuario';
    if (errorData.detail) msg += `: ${errorData.detail}`;
    throw new Error(msg);
  }
  return response.json();
};
