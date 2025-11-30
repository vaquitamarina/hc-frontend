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
    const err = new Error(errBody?.error || `Error: ${response.status}`);
    err.status = response.status;
    err.body = errBody;
    throw err;
  }
  return response.json();
};

export const fetchUpdatePatient = async ({ id, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}`,
    {
      method: 'PUT', // Usamos el PUT que acabas de crear
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    const err = new Error(errBody?.error || `Error: ${response.status}`);
    err.status = response.status;
    err.body = errBody;
    throw err;
  }

  return response.json();
};
