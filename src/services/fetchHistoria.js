export const fetchCreateDraft = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/hc/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Error al crear borrador:', errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }
  return response.json();
};

export const fetchAssignPatient = async ({ idHistory, idPatient }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/assign-patient`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idHistory, idPatient }),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Error al asignar paciente:', errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }
  return response.json();
};

export const fetchPatientByHistory = async (historyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${historyId}/patient`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Error al obtener paciente:', errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }
  return response.json();
};
