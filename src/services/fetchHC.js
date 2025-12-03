// Servicio para obtener las historias clínicas asociadas a un estudiante
export const fetchHCsByStudent = async (studentId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/student/${studentId}/adult-historias`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    throw new Error(errBody?.message || `Error: ${response.status}`);
  }
  const data = await response.json();
  // Si la respuesta no es un array, retorna array vacío
  if (!Array.isArray(data)) return [];
  return data;
};
