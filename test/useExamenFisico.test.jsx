import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fetchExamenFisico from '../src/services/fetchExamenFisico';
import {
  useGeneralExam,
  useMutateGeneralExam,
  useRegionalExam,
  useMutateRegionalExam,
  useExamBoca,
  useMutateExamBoca,
  useHigieneOral,
  useMutateHigieneOral,
} from '../src/hooks/useExamenFisico';

vi.mock('../src/services/fetchExamenFisico', () => ({
  fetchGeneralExam: vi.fn(() => Promise.resolve({ general: 'Normal' })),
  updateGeneralExam: vi.fn(),
  fetchRegionalExam: vi.fn(() =>
    Promise.resolve({ regional: 'Sin hallazgos' })
  ),
  updateRegionalExam: vi.fn(),
  fetchExamBoca: vi.fn(() => Promise.resolve({ boca: 'Sana' })),
  updateExamBoca: vi.fn(),
  fetchHigieneOral: vi.fn(() => Promise.resolve({ higiene: 'Buena' })),
  updateHigieneOral: vi.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useExamenFisico hooks', () => {
  it('useGeneralExam returns data', async () => {
    const { result } = renderHook(() => useGeneralExam('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ general: 'Normal' });
    });
  });

  it('useMutateGeneralExam mutation works', async () => {
    const { result } = renderHook(() => useMutateGeneralExam(), { wrapper });
    await result.current.mutateAsync({
      idHistory: '123',
      general: { general: 'Normal' },
    });
    expect(fetchExamenFisico.updateGeneralExam).toHaveBeenCalled();
  });

  it('useRegionalExam returns data', async () => {
    const { result } = renderHook(() => useRegionalExam('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ regional: 'Sin hallazgos' });
    });
  });

  it('useMutateRegionalExam mutation works', async () => {
    const { result } = renderHook(() => useMutateRegionalExam(), { wrapper });
    await result.current.mutateAsync({
      idHistory: '123',
      regional: { regional: 'Sin hallazgos' },
    });
    expect(fetchExamenFisico.updateRegionalExam).toHaveBeenCalled();
  });

  it('useExamBoca returns data', async () => {
    const { result } = renderHook(() => useExamBoca('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ boca: 'Sana' });
    });
  });

  it('useMutateExamBoca mutation works', async () => {
    const { result } = renderHook(() => useMutateExamBoca(), { wrapper });
    await result.current.mutateAsync({
      idHistory: '123',
      boca: { boca: 'Sana' },
    });
    expect(fetchExamenFisico.updateExamBoca).toHaveBeenCalled();
  });

  it('useHigieneOral returns data', async () => {
    const { result } = renderHook(() => useHigieneOral('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ higiene: 'Buena' });
    });
  });

  it('useMutateHigieneOral mutation works', async () => {
    const { result } = renderHook(() => useMutateHigieneOral(), { wrapper });
    await result.current.mutateAsync({
      idHistory: '123',
      higiene: { higiene: 'Buena' },
    });
    expect(fetchExamenFisico.updateHigieneOral).toHaveBeenCalled();
  });
});
