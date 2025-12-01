// Servicio para crear enfermedad actual
// Servicio para crear antecedente personal
export const createAntecedentePersonal = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-personal`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error al crear antecedente personal:', errorData);
    throw new Error(
      errorData.error || 'No se pudo crear el antecedente personal'
    );
  }
  return response.json();
};

// Servicio para obtener antecedente personal
export const fetchAntecedentePersonal = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-personal/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener el antecedente personal');
  }
  return response.json();
};

// Servicio para actualizar antecedente personal
export const updateAntecedentePersonal = async ({ idHistoria, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-personal/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo actualizar el antecedente personal');
  }
  return response.json();
};

// Servicio para crear antecedente médico
export const createAntecedenteMedico = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-medico`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error al crear antecedente médico:', errorData);
    throw new Error(
      errorData.error || 'No se pudo crear el antecedente médico'
    );
  }
  return response.json();
};

// Servicio para obtener antecedente médico
export const fetchAntecedenteMedico = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-medico/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener el antecedente médico');
  }
  return response.json();
};

// Servicio para actualizar antecedente médico
export const updateAntecedenteMedico = async ({ idHistoria, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-medico/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo actualizar el antecedente médico');
  }
  return response.json();
};

// Servicio para crear antecedente familiar
export const createAntecedenteFamiliar = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-familiar`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error al crear antecedente familiar:', errorData);
    throw new Error(
      errorData.error || 'No se pudo crear el antecedente familiar'
    );
  }
  return response.json();
};

// Servicio para obtener antecedente familiar
export const fetchAntecedenteFamiliar = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-familiar/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener el antecedente familiar');
  }
  return response.json();
};

// Servicio para actualizar antecedente familiar
export const updateAntecedenteFamiliar = async ({ idHistoria, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-familiar/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo actualizar el antecedente familiar');
  }
  return response.json();
};

// Servicio para crear antecedente cumplimiento
export const createAntecedenteCumplimiento = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-cumplimiento`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error al crear antecedente cumplimiento:', errorData);
    throw new Error(
      errorData.error || 'No se pudo crear el antecedente cumplimiento'
    );
  }
  return response.json();
};

// Servicio para obtener antecedente cumplimiento
export const fetchAntecedenteCumplimiento = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-cumplimiento/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener el antecedente cumplimiento');
  }
  return response.json();
};

// Servicio para actualizar antecedente cumplimiento
export const updateAntecedenteCumplimiento = async ({ idHistoria, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/antecedente-cumplimiento/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo actualizar el antecedente cumplimiento');
  }
  return response.json();
};
export const createEnfermedadActual = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/enfermedad-actual`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo crear la enfermedad actual');
  }
  return response.json();
};

// Servicio para obtener enfermedad actual
export const fetchEnfermedadActual = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/enfermedad-actual/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener la enfermedad actual');
  }
  return response.json();
};

// Servicio para actualizar enfermedad actual
export const updateEnfermedadActual = async ({ idHistoria, data }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/enfermedad-actual/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo actualizar la enfermedad actual');
  }
  return response.json();
};

// Servicio para crear la filiación de una historia clínica
export const createFiliacion = async (filiacion) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/hc/filiacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filiacion),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('No se pudo crear la filiación');
  }
  return response.json();
};
// Servicio para obtener y actualizar la filiación de una historia clínica

export const fetchFiliacion = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/filiacion/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    // 404 es normal cuando aún no se ha creado la filiación
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener la filiación');
  }
  return response.json();
};

export const updateFiliacion = async ({ idHistoria, filiacion }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/filiacion/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filiacion),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo guardar la filiación');
  }
  return response.json();
};

// Servicio para crear motivo de consulta
export const createMotivoConsulta = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/motivo-consulta`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo crear el motivo de consulta');
  }
  return response.json();
};

// Servicio para obtener y actualizar el motivo de consulta de una historia clínica

export const fetchMotivoConsulta = async (idHistoria) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/motivo-consulta/historia/${idHistoria}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) {
    // 404 es normal cuando aún no se ha creado
    if (response.status === 404) {
      return null;
    }
    throw new Error('No se pudo obtener el motivo de consulta');
  }
  return response.json();
};

export const updateMotivoConsulta = async ({ idHistoria, motivo }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/motivo-consulta/historia/${idHistoria}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motivo }),
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('No se pudo guardar el motivo de consulta');
  }
  return response.json();
};
