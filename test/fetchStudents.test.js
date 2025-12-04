import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchStudents from '../src/services/fetchStudents';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchStudents services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchStudents calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }],
    });
    const data = await fetchStudents.fetchStudents();
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/student-users/`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual([{ id: 1 }]);
  });

  it('fetchStudents handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchStudents.fetchStudents()).rejects.toThrow('Error');
  });

  it('fetchStudentById calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });
    const data = await fetchStudents.fetchStudentById(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/student-users/1`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ id: 1 });
  });

  it('fetchStudentById handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchStudents.fetchStudentById(1)).rejects.toThrow('Error');
  });
});
