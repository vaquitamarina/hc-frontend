export const fetchCreatePatient = async (patientData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData),
    credentials: 'include',
  });
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Error al crear paciente:', errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }
  return response.json();
};
