import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchPatient from '../src/services/fetchPatient';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchPatient services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchCreatePatient calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ patient: 'created' }),
    });
    const data = await fetchPatient.fetchCreatePatient({ name: 'Test' });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/patients`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ patient: 'created' });
  });

  it('fetchCreatePatient handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Error' }),
    });
    await expect(
      fetchPatient.fetchCreatePatient({ name: 'Test' })
    ).rejects.toThrow('Error');
  });

  it('fetchUpdatePatient calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchPatient.fetchUpdatePatient({
      id: 1,
      data: { name: 'Test' },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/patients/1`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('fetchUpdatePatient handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Error' }),
    });
    await expect(
      fetchPatient.fetchUpdatePatient({ id: 1, data: { name: 'Test' } })
    ).rejects.toThrow('Error');
  });
});
