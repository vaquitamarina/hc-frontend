import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchExamenFisico from '../src/services/fetchExamenFisico';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchExamenFisico services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchGeneralExam calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ general: 'ok' }),
    });
    const data = await fetchExamenFisico.fetchGeneralExam('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/examen-general`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ general: 'ok' });
  });

  it('updateGeneralExam calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchExamenFisico.updateGeneralExam({
      idHistory: 'hid',
      data: { test: 1 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/examen-general`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('fetchRegionalExam calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ regional: 'ok' }),
    });
    const data = await fetchExamenFisico.fetchRegionalExam('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/examen-regional`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ regional: 'ok' });
  });

  it('updateRegionalExam calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchExamenFisico.updateRegionalExam({
      idHistory: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/examen-regional`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('fetchExamBoca calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ boca: 'ok' }),
    });
    const data = await fetchExamenFisico.fetchExamBoca('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/examen-boca`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ boca: 'ok' });
  });

  it('updateExamBoca calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchExamenFisico.updateExamBoca({
      idHistory: 'hid',
      data: { test: 3 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/examen-boca`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('fetchHigieneOral calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ higiene: 'ok' }),
    });
    const data = await fetchExamenFisico.fetchHigieneOral('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/higiene`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ higiene: 'ok' });
  });

  it('updateHigieneOral calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchExamenFisico.updateHigieneOral({
      idHistory: 'hid',
      data: { test: 4 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/hid/higiene`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });
});
