import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchAnamnesis from '../src/services/fetchAnamnesis';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchAnamnesis services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('createAntecedentePersonal calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createAntecedentePersonal({ test: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-personal`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchAntecedentePersonal returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ personal: 'Ninguno' }),
    });
    const data = await fetchAnamnesis.fetchAntecedentePersonal('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-personal/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ personal: 'Ninguno' });
  });

  it('updateAntecedentePersonal calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateAntecedentePersonal({
      idHistoria: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-personal/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('createAntecedenteMedico calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createAntecedenteMedico({ test: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-medico`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchAntecedenteMedico returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ medico: 'Ninguno' }),
    });
    const data = await fetchAnamnesis.fetchAntecedenteMedico('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-medico/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ medico: 'Ninguno' });
  });

  it('updateAntecedenteMedico calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateAntecedenteMedico({
      idHistoria: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-medico/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  // ...similar tests for familiar, cumplimiento, enfermedad actual, filiacion, motivo consulta
  it('createAntecedenteFamiliar calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createAntecedenteFamiliar({ test: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-familiar`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchAntecedenteFamiliar returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ familiar: 'Ninguno' }),
    });
    const data = await fetchAnamnesis.fetchAntecedenteFamiliar('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-familiar/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ familiar: 'Ninguno' });
  });

  it('updateAntecedenteFamiliar calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateAntecedenteFamiliar({
      idHistoria: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-familiar/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('createAntecedenteCumplimiento calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createAntecedenteCumplimiento({
      test: 1,
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-cumplimiento`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchAntecedenteCumplimiento returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ cumplimiento: 'Ninguno' }),
    });
    const data = await fetchAnamnesis.fetchAntecedenteCumplimiento('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-cumplimiento/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ cumplimiento: 'Ninguno' });
  });

  it('updateAntecedenteCumplimiento calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateAntecedenteCumplimiento({
      idHistoria: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/antecedente-cumplimiento/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('createEnfermedadActual calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createEnfermedadActual({ test: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/enfermedad-actual`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchEnfermedadActual returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ enfermedad: 'Ninguno' }),
    });
    const data = await fetchAnamnesis.fetchEnfermedadActual('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/enfermedad-actual/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ enfermedad: 'Ninguno' });
  });

  it('updateEnfermedadActual calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateEnfermedadActual({
      idHistoria: 'hid',
      data: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/enfermedad-actual/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('createFiliacion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createFiliacion({ test: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/filiacion`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchFiliacion returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { filiacion: 'Ninguno' } }),
    });
    const data = await fetchAnamnesis.fetchFiliacion('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/filiacion/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ filiacion: 'Ninguno' });
  });

  it('updateFiliacion calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateFiliacion({
      idHistoria: 'hid',
      filiacion: { test: 2 },
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/filiacion/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });

  it('createMotivoConsulta calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'ok' }),
    });
    const data = await fetchAnamnesis.createMotivoConsulta({ test: 1 });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/motivo-consulta`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ result: 'ok' });
  });

  it('fetchMotivoConsulta returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ motivo: 'Ninguno' }),
    });
    const data = await fetchAnamnesis.fetchMotivoConsulta('hid');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/motivo-consulta/historia/hid`,
      expect.objectContaining({ credentials: 'include' })
    );
    expect(data).toEqual({ motivo: 'Ninguno' });
  });

  it('updateMotivoConsulta calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ updated: true }),
    });
    const data = await fetchAnamnesis.updateMotivoConsulta({
      idHistoria: 'hid',
      motivo: 'Dolor',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/hc/motivo-consulta/historia/hid`,
      expect.objectContaining({ method: 'PUT' })
    );
    expect(data).toEqual({ updated: true });
  });
});
