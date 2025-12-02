// --- EXAMEN GENERAL ---
export const fetchGeneralExam = async (historyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${historyId}/examen-general`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al cargar examen general');
  return response.json();
};

export const updateGeneralExam = async ({ idHistory, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${idHistory}/examen-general`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar examen general');
  return response.json();
};

// --- EXAMEN REGIONAL ---
export const fetchRegionalExam = async (historyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${historyId}/examen-regional`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al cargar examen regional');
  return response.json();
};

export const updateRegionalExam = async ({ idHistory, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${idHistory}/examen-regional`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar examen regional');
  return response.json();
};

// --- EXAMEN BOCA ---
export const fetchExamBoca = async (historyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${historyId}/examen-boca`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al cargar examen de boca');
  return response.json();
};

export const updateExamBoca = async ({ idHistory, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${idHistory}/examen-boca`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar examen de boca');
  return response.json();
};

// --- HIGIENE BUCAL ---
export const fetchHigieneOral = async (historyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${historyId}/higiene`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al cargar higiene bucal');
  return response.json();
};

export const updateHigieneOral = async ({ idHistory, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${idHistory}/higiene`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar higiene bucal');
  return response.json();
};
