// Servicio para crear enfermedad actual
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
