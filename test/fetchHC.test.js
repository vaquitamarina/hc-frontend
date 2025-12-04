import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchHC from '../src/services/fetchHC';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchHCsByStudent service', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchHCsByStudent returns array data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }, { id: 2 }],
    });
    const data = await fetchHC.fetchHCsByStudent('sid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/student/sid/adult-historias`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('fetchHCsByStudent returns empty array if not array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ not: 'array' }),
    });
    const data = await fetchHC.fetchHCsByStudent('sid');
    expect(data).toEqual([]);
  });

  it('fetchHCsByStudent handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchHC.fetchHCsByStudent('sid')).rejects.toThrow('Error');
  });
});
