import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fetchHC from '../src/services/fetchHC';
import { useHCsByStudent } from '../src/hooks/useHC';

vi.mock('../src/services/fetchHC', () => ({
  fetchHCsByStudent: vi.fn(() =>
    Promise.resolve([{ id: 'hc1' }, { id: 'hc2' }])
  ),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useHCsByStudent hook', () => {
  it('returns array of HCs', async () => {
    const { result } = renderHook(() => useHCsByStudent('stu1', 'adult'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual([{ id: 'hc1' }, { id: 'hc2' }]);
    });
  });

  it('returns empty array if result is not array', async () => {
    fetchHC.fetchHCsByStudent.mockResolvedValueOnce(null);
    const { result } = renderHook(() => useHCsByStudent('stu1', 'adult'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });
});
