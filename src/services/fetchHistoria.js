// Eliminado: fetchCreateDraft

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
    // If the server returns 404, treat it as "no patient associated" and return null.
    if (response.status === 404) {
      // Silencioso: es normal que no haya paciente aún
      return null;
    }
    const errBody = await response.json().catch(() => null);
    console.error('Error al obtener paciente:', errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }

  return response.json();
};

export const registerHc = async (studentId) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/hc/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idStudent: studentId }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Error al registrar historia clinica:', errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }

  return response.json();
};
