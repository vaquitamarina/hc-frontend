import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchDiagnostico from '../src/services/fetchDiagnostico';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchDiagnostico services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchDiagnosticoPresuntivo calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ diag: 'presuntivo' }),
    });
    const data = await fetchDiagnostico.fetchDiagnosticoPresuntivo('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/diagnostico-presuntivo`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ diag: 'presuntivo' });
  });

  it('updateDiagnosticoPresuntivo calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchDiagnostico.updateDiagnosticoPresuntivo({
      idHistory: 'hid',
      descripcion: 'desc',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/diagnostico-presuntivo`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('fetchDerivacion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ derivacion: 'data' }),
    });
    const data = await fetchDiagnostico.fetchDerivacion('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/derivacion`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ derivacion: 'data' });
  });

  it('updateDerivacion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchDiagnostico.updateDerivacion({
      idHistory: 'hid',
      data: { test: 1 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/derivacion`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('updateRespuestaDerivacion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchDiagnostico.updateRespuestaDerivacion({
      idHistory: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/derivacion-respuesta`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('fetchDiagnosticoClinicasCompleto calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ clinicas: 'data' }),
    });
    const data = await fetchDiagnostico.fetchDiagnosticoClinicasCompleto('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/diagnostico-clinicas`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ clinicas: 'data' });
  });

  it('updateDiagnosticoClinicasCompleto calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchDiagnostico.updateDiagnosticoClinicasCompleto({
      idHistory: 'hid',
      data: { test: 3 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/diagnostico-clinicas`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });
});
