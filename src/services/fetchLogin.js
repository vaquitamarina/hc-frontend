export const fetchLogin = async (userCode, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userCode, password),
    credentials: 'include',
  });
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Login error:', errBody);
    throw new Error(errBody?.message || `Error: ${response.status}`);
  }
  return response.json();
};

export const fetchAuth = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Auth error:', errBody);
    throw new Error(errBody?.message || `Error: ${response.status}`);
  }
  return response.json();
};
