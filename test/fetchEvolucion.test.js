import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchEvolucion from '../src/services/fetchEvolucion';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchEvolucion services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchEvolucion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ evoluciones: ['ev1'] }),
    });
    const data = await fetchEvolucion.fetchEvolucion('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/evolucion`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ evoluciones: ['ev1'] });
  });

  it('addEvolucion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ added: true }),
    });
    const data = await fetchEvolucion.addEvolucion({
      idHistory: 'hid',
      data: { test: 1 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/evolucion`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ added: true });
  });
});
