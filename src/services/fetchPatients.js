export const fetchPatients = async (studentId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${studentId}/patients/adult`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Auth error:', errBody);
    throw new Error(errBody?.message || `Error: ${response.status}`);
  }
  return response.json();
};
