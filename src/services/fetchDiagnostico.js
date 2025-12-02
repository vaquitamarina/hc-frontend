const API_URL = import.meta.env.VITE_API_URL;

// --- SECCIÓN III: DIAGNÓSTICO PRESUNTIVO ---
export const fetchDiagnosticoPresuntivo = async (historyId) => {
  const response = await fetch(
    `${API_URL}/hc/${historyId}/diagnostico-presuntivo`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al cargar diagnóstico presuntivo');
  return response.json();
};

export const updateDiagnosticoPresuntivo = async ({
  idHistory,
  descripcion,
}) => {
  const response = await fetch(
    `${API_URL}/hc/${idHistory}/diagnostico-presuntivo`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion }),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar diagnóstico presuntivo');
  return response.json();
};

// --- SECCIÓN IV y V: DERIVACIÓN Y RESPUESTA ---
export const fetchDerivacion = async (historyId) => {
  const response = await fetch(`${API_URL}/hc/${historyId}/derivacion`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Error al cargar derivaciones');
  return response.json();
};

export const updateDerivacion = async ({ idHistory, data }) => {
  const response = await fetch(`${API_URL}/hc/${idHistory}/derivacion`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Error al guardar derivación');
  return response.json();
};

export const updateRespuestaDerivacion = async ({ idHistory, data }) => {
  const response = await fetch(
    `${API_URL}/hc/${idHistory}/derivacion-respuesta`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar respuesta de clínica');
  return response.json();
};

// --- SECCIÓN V + PLAN DE TRABAJO (UNIFICADO) ---
export const fetchDiagnosticoClinicasCompleto = async (historyId) => {
  const response = await fetch(
    `${API_URL}/hc/${historyId}/diagnostico-clinicas-completo`,
    { credentials: 'include' }
  );
  if (!response.ok) throw new Error('Error al cargar diagnóstico clínico');
  return response.json();
};

export const updateDiagnosticoClinicasCompleto = async ({
  idHistory,
  data,
}) => {
  const response = await fetch(
    `${API_URL}/hc/${idHistory}/diagnostico-clinicas-completo`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Error al guardar diagnóstico clínico');
  return response.json();
};
