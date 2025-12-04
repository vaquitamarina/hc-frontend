import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fetchEvolucion from '../src/services/fetchEvolucion';
import { useEvolucion, useAddEvolucion } from '../src/hooks/useEvolucion';

vi.mock('../src/services/fetchEvolucion', () => ({
  fetchEvolucion: vi.fn(() => Promise.resolve([{ evolucion: 'Primera' }])),
  addEvolucion: vi.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useEvolucion hooks', () => {
  it('useEvolucion returns data', async () => {
    const { result } = renderHook(() => useEvolucion('123'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual([{ evolucion: 'Primera' }]);
    });
  });

  it('useAddEvolucion mutation works', async () => {
    const { result } = renderHook(() => useAddEvolucion(), { wrapper });
    await result.current.mutateAsync({
      idHistory: '123',
      evolucion: { evolucion: 'Nueva' },
    });
    expect(fetchEvolucion.addEvolucion).toHaveBeenCalled();
  });
});
