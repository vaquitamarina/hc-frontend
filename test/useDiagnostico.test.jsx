import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fetchDiagnostico from '../src/services/fetchDiagnostico';
import {
  useDiagnosticoPresuntivo,
  useMutateDiagnosticoPresuntivo,
  useDerivacion,
  useMutateDerivacion,
  useMutateRespuestaDerivacion,
  useDiagnosticoClinicasCompleto,
  useMutateDiagnosticoClinicasCompleto,
} from '../src/hooks/useDiagnostico';

vi.mock('../src/services/fetchDiagnostico', () => ({
  fetchDiagnosticoPresuntivo: vi.fn(() =>
    Promise.resolve({ diagnostico: 'Presuntivo' })
  ),
  updateDiagnosticoPresuntivo: vi.fn(),
  fetchDerivacion: vi.fn(() => Promise.resolve({ derivacion: 'Derivacion' })),
  updateDerivacion: vi.fn(),
  updateRespuestaDerivacion: vi.fn(),
  fetchDiagnosticoClinicasCompleto: vi.fn(() =>
    Promise.resolve({ clinicas: 'Completo' })
  ),
  updateDiagnosticoClinicasCompleto: vi.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDiagnostico hooks', () => {
  it('useDiagnosticoPresuntivo returns data', async () => {
    const { result } = renderHook(() => useDiagnosticoPresuntivo('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ diagnostico: 'Presuntivo' });
    });
  });

  it('useMutateDiagnosticoPresuntivo mutation works', async () => {
    const { result } = renderHook(() => useMutateDiagnosticoPresuntivo(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistory: '123',
      diagnostico: { diagnostico: 'Presuntivo' },
    });
    expect(fetchDiagnostico.updateDiagnosticoPresuntivo).toHaveBeenCalled();
  });

  it('useDerivacion returns data', async () => {
    const { result } = renderHook(() => useDerivacion('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ derivacion: 'Derivacion' });
    });
  });

  it('useMutateDerivacion mutation works', async () => {
    const { result } = renderHook(() => useMutateDerivacion(), { wrapper });
    await result.current.mutateAsync({
      idHistory: '123',
      derivacion: { derivacion: 'Derivacion' },
    });
    expect(fetchDiagnostico.updateDerivacion).toHaveBeenCalled();
  });

  it('useMutateRespuestaDerivacion mutation works', async () => {
    const { result } = renderHook(() => useMutateRespuestaDerivacion(), {
      wrapper,
    });
    await result.current.mutateAsync({
      idHistory: '123',
      respuesta: { respuesta: 'OK' },
    });
    expect(fetchDiagnostico.updateRespuestaDerivacion).toHaveBeenCalled();
  });

  it('useDiagnosticoClinicasCompleto returns data', async () => {
    const { result } = renderHook(() => useDiagnosticoClinicasCompleto('123'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ clinicas: 'Completo' });
    });
  });

  it('useMutateDiagnosticoClinicasCompleto mutation works', async () => {
    const { result } = renderHook(
      () => useMutateDiagnosticoClinicasCompleto(),
      { wrapper }
    );
    await result.current.mutateAsync({
      idHistory: '123',
      clinicas: { clinicas: 'Completo' },
    });
    expect(
      fetchDiagnostico.updateDiagnosticoClinicasCompleto
    ).toHaveBeenCalled();
  });
});
