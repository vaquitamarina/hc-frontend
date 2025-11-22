export const fetchStudents = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/student-users/`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    console.error('Error fetching students:', errBody);
    throw new Error(errBody?.message || `Error: ${response.status}`);
  }

  return response.json();
};
