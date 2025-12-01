/**
 * Fetch para obtener catálogos de la base de datos
 */

export const fetchCatalog = async (catalogName) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/catalogo/${catalogName}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error(`Error fetching catalog ${catalogName}:`, errBody);
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }

  return response.json();
};

export const fetchBloodType = async () => {
  return fetchCatalog('catalogo_grupo_sanguineo');
};

// Nuevo fetch para obtener el nombre por id de catálogo
export const fetchCatalogNameById = async (catalogName, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/catalogo/${catalogName}/${id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error(
      `Error fetching catalog name for ${catalogName} id ${id}:`,
      errBody
    );
    throw new Error(errBody?.error || `Error: ${response.status}`);
  }
  return response.json();
};
