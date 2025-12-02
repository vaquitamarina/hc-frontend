const API_URL = import.meta.env.VITE_API_URL;

export const fetchEvolucion = async (historyId) => {
  const response = await fetch(`${API_URL}/hc/${historyId}/evolucion`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Error al cargar evoluciones');
  return response.json();
};

export const addEvolucion = async ({ idHistory, data }) => {
  const response = await fetch(`${API_URL}/hc/${idHistory}/evolucion`, {
    method: 'POST', // Usamos POST porque agregamos registros, no editamos uno único
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Error al agregar evolución');
  return response.json();
};
