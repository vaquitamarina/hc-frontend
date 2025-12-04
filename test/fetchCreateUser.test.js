import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchCreateUser from '../src/services/fetchCreateUser';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchCreateUser service', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('createUser calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: 'created' }),
    });
    const data = await fetchCreateUser.createUser({ name: 'Test' });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/users/register`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ user: 'created' });
  });

  it('createUser handles error response with detail', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error', detail: 'Detalles' }),
    });
    await expect(fetchCreateUser.createUser({ name: 'Test' })).rejects.toThrow(
      'Error: Detalles'
    );
  });

  it('createUser handles error response without detail', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error' }),
    });
    await expect(fetchCreateUser.createUser({ name: 'Test' })).rejects.toThrow(
      'Error'
    );
  });
});
