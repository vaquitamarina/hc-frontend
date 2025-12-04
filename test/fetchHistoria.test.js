import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchHistoria from '../src/services/fetchHistoria';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchHistoria services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchAssignPatient calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ assigned: true }),
    });
    const data = await fetchHistoria.fetchAssignPatient({
      idHistory: 'hid',
      idPatient: 'pid',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/assign-patient`,
      expect.objectContaining({ method: 'PATCH' })
    );
    expect(data).toEqual({ assigned: true });
  });

  it('fetchAssignPatient handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error' }),
    });
    await expect(
      fetchHistoria.fetchAssignPatient({ idHistory: 'hid', idPatient: 'pid' })
    ).rejects.toThrow('Error');
  });

  it('fetchPatientByHistory returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ patient: 'data' }),
    });
    const data = await fetchHistoria.fetchPatientByHistory('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/patient`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ patient: 'data' });
  });

  it('fetchPatientByHistory returns null for 404', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const data = await fetchHistoria.fetchPatientByHistory('hid');
    expect(data).toBeNull();
  });

  it('fetchPatientByHistory handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Error' }),
    });
    await expect(fetchHistoria.fetchPatientByHistory('hid')).rejects.toThrow(
      'Error'
    );
  });

  it('registerHc calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ registered: true }),
    });
    const data = await fetchHistoria.registerHc('sid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/register`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ registered: true });
  });

  it('registerHc handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error' }),
    });
    await expect(fetchHistoria.registerHc('sid')).rejects.toThrow('Error');
  });
});
