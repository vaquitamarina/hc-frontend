import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchLogout from '../src/services/fetchLogout';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchLogout service', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchLogout calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ logout: 'ok' }),
    });
    const data = await fetchLogout.fetchLogout();
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/users/logout`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ logout: 'ok' });
  });

  it('fetchLogout handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchLogout.fetchLogout()).rejects.toThrow('Error');
  });
});
