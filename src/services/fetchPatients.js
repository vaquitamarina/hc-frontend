export const fetchPatients = async (studentId) => {
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
  return response.json();
};
