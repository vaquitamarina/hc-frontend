export async function fetchLogout() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    throw new Error(errBody?.message || `Error: ${response.status}`);
  }
  return response.json();
}
