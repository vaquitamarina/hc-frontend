export const fetchFiliation = async (historyId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/hc/${historyId}/filiacion`,
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
