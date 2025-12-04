import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fetchAnamnesis from '../src/services/fetchAnamnesis';
import {
  useFiliacion,
  useMotivoConsulta,
  useEnfermedadActual,
  useAntecedentePersonal,
  useAntecedenteMedico,
  useAntecedenteFamiliar,
  useAntecedenteCumplimiento,
  useCreateFiliacion,
  useUpdateFiliacion,
  useCreateMotivoConsulta,
  useUpdateMotivoConsulta,
  useCreateEnfermedadActual,
  useUpdateEnfermedadActual,
  useCreateAntecedentePersonal,
  useUpdateAntecedentePersonal,
  useCreateAntecedenteMedico,
  useUpdateAntecedenteMedico,
  useCreateAntecedenteFamiliar,
  useUpdateAntecedenteFamiliar,
  useCreateAntecedenteCumplimiento,
  useUpdateAntecedenteCumplimiento,
} from '../src/hooks/useAnamnesis';

// Mock fetch and mutation functions
vi.mock('../src/services/fetchAnamnesis', () => ({
  fetchFiliacion: vi.fn(() => Promise.resolve({ nombre: 'Juan' })),
  fetchMotivoConsulta: vi.fn(() => Promise.resolve({ motivo: 'Dolor' })),
  fetchEnfermedadActual: vi.fn(() => Promise.resolve({ enfermedad: 'Caries' })),
  fetchAntecedentePersonal: vi.fn(() =>
    Promise.resolve({ personal: 'Ninguno' })
  ),
  fetchAntecedenteMedico: vi.fn(() => Promise.resolve({ medico: 'Ninguno' })),
  fetchAntecedenteFamiliar: vi.fn(() =>
    Promise.resolve({ familiar: 'Ninguno' })
  ),
  fetchAntecedenteCumplimiento: vi.fn(() =>
    Promise.resolve({ cumplimiento: 'Bueno' })
  ),
  createFiliacion: vi.fn(),
  updateFiliacion: vi.fn(),
  createMotivoConsulta: vi.fn(),
  updateMotivoConsulta: vi.fn(),
  createEnfermedadActual: vi.fn(),
  updateEnfermedadActual: vi.fn(),
  createAntecedentePersonal: vi.fn(),
  updateAntecedentePersonal: vi.fn(),
  createAntecedenteMedico: vi.fn(),
  updateAntecedenteMedico: vi.fn(),
  createAntecedenteFamiliar: vi.fn(),
  updateAntecedenteFamiliar: vi.fn(),
  createAntecedenteCumplimiento: vi.fn(),
  updateAntecedenteCumplimiento: vi.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAnamnesis hooks', () => {
  // Consulta
  it('useFiliacion returns data', async () => {
    const { result } = renderHook(() => useFiliacion('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ nombre: 'Juan' });
    });
  });

  it('useMotivoConsulta returns data', async () => {
    const { result } = renderHook(() => useMotivoConsulta('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ motivo: 'Dolor' });
    });
  });

  it('useEnfermedadActual returns data', async () => {
    const { result } = renderHook(() => useEnfermedadActual('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ enfermedad: 'Caries' });
    });
  });

  it('useAntecedentePersonal returns data', async () => {
    const { result } = renderHook(() => useAntecedentePersonal('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ personal: 'Ninguno' });
    });
  });

  it('useAntecedenteMedico returns data', async () => {
    const { result } = renderHook(() => useAntecedenteMedico('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ medico: 'Ninguno' });
    });
  });

  it('useAntecedenteFamiliar returns data', async () => {
    const { result } = renderHook(() => useAntecedenteFamiliar('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ familiar: 'Ninguno' });
    });
  });

  it('useAntecedenteCumplimiento returns data', async () => {
    const { result } = renderHook(() => useAntecedenteCumplimiento('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ cumplimiento: 'Bueno' });
    });
  });

  // Mutaciones
  it('useCreateFiliacion mutation works', async () => {
    const { result } = renderHook(() => useCreateFiliacion(), { wrapper });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { nombre: 'Juan' },
    });
    expect(fetchAnamnesis.createFiliacion).toHaveBeenCalled();
  });

  it('useUpdateFiliacion mutation works', async () => {
    const { result } = renderHook(() => useUpdateFiliacion(), { wrapper });
    await result.current.mutateAsync({
      idHistoria: '123',
      filiacion: { nombre: 'Juan' },
    });
    expect(fetchAnamnesis.updateFiliacion).toHaveBeenCalled();
  });

  it('useCreateMotivoConsulta mutation works', async () => {
    const { result } = renderHook(() => useCreateMotivoConsulta(), { wrapper });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { motivo: 'Dolor' },
    });
    expect(fetchAnamnesis.createMotivoConsulta).toHaveBeenCalled();
  });

  it('useUpdateMotivoConsulta mutation works', async () => {
    const { result } = renderHook(() => useUpdateMotivoConsulta(), { wrapper });
    await result.current.mutateAsync({
      idHistoria: '123',
      motivoConsulta: { motivo: 'Dolor' },
    });
    expect(fetchAnamnesis.updateMotivoConsulta).toHaveBeenCalled();
  });

  it('useCreateEnfermedadActual mutation works', async () => {
    const { result } = renderHook(() => useCreateEnfermedadActual(), {
      wrapper,
    });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { enfermedad: 'Caries' },
    });
    expect(fetchAnamnesis.createEnfermedadActual).toHaveBeenCalled();
  });

  it('useUpdateEnfermedadActual mutation works', async () => {
    const { result } = renderHook(() => useUpdateEnfermedadActual(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistoria: '123',
      enfermedadActual: { enfermedad: 'Caries' },
    });
    expect(fetchAnamnesis.updateEnfermedadActual).toHaveBeenCalled();
  });

  it('useCreateAntecedentePersonal mutation works', async () => {
    const { result } = renderHook(() => useCreateAntecedentePersonal(), {
      wrapper,
    });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { personal: 'Ninguno' },
    });
    expect(fetchAnamnesis.createAntecedentePersonal).toHaveBeenCalled();
  });

  it('useUpdateAntecedentePersonal mutation works', async () => {
    const { result } = renderHook(() => useUpdateAntecedentePersonal(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistoria: '123',
      antecedentePersonal: { personal: 'Ninguno' },
    });
    expect(fetchAnamnesis.updateAntecedentePersonal).toHaveBeenCalled();
  });

  it('useCreateAntecedenteMedico mutation works', async () => {
    const { result } = renderHook(() => useCreateAntecedenteMedico(), {
      wrapper,
    });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { medico: 'Ninguno' },
    });
    expect(fetchAnamnesis.createAntecedenteMedico).toHaveBeenCalled();
  });

  it('useUpdateAntecedenteMedico mutation works', async () => {
    const { result } = renderHook(() => useUpdateAntecedenteMedico(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistoria: '123',
      antecedenteMedico: { medico: 'Ninguno' },
    });
    expect(fetchAnamnesis.updateAntecedenteMedico).toHaveBeenCalled();
  });

  it('useCreateAntecedenteFamiliar mutation works', async () => {
    const { result } = renderHook(() => useCreateAntecedenteFamiliar(), {
      wrapper,
    });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { familiar: 'Ninguno' },
    });
    expect(fetchAnamnesis.createAntecedenteFamiliar).toHaveBeenCalled();
  });

  it('useUpdateAntecedenteFamiliar mutation works', async () => {
    const { result } = renderHook(() => useUpdateAntecedenteFamiliar(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistoria: '123',
      antecedenteFamiliar: { familiar: 'Ninguno' },
    });
    expect(fetchAnamnesis.updateAntecedenteFamiliar).toHaveBeenCalled();
  });

  it('useCreateAntecedenteCumplimiento mutation works', async () => {
    const { result } = renderHook(() => useCreateAntecedenteCumplimiento(), {
      wrapper,
    });
    await result.current.mutateAsync({
      id_historia: '123',
      data: { cumplimiento: 'Bueno' },
    });
    expect(fetchAnamnesis.createAntecedenteCumplimiento).toHaveBeenCalled();
  });

  it('useUpdateAntecedenteCumplimiento mutation works', async () => {
    const { result } = renderHook(() => useUpdateAntecedenteCumplimiento(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistoria: '123',
      antecedenteCumplimiento: { cumplimiento: 'Bueno' },
    });
    expect(fetchAnamnesis.updateAntecedenteCumplimiento).toHaveBeenCalled();
  });
});
