import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchPatients from '../src/services/fetchPatients';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchPatients service', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchAdultPatients calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }],
    });
    const data = await fetchPatients.fetchAdultPatients('sid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/student/sid/adult-historias`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual([{ id: 1 }]);
  });

  it('fetchAdultPatients handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchPatients.fetchAdultPatients('sid')).rejects.toThrow(
      'Error'
    );
  });
});
