import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useCatalog,
  useBloodType,
  useCatalogNameById,
} from '../src/hooks/useCatalog';

// Mock servicios
vi.mock('../src/services/fetchCatalog.js', () => ({
  fetchCatalog: vi.fn((name) =>
    Promise.resolve([{ id: 1, name: name + '_item' }])
  ),
  fetchCatalogNameById: vi.fn((name, id) =>
    Promise.resolve(name + '_name_' + id)
  ),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCatalog hooks', () => {
  it('useCatalog returns catalog data', async () => {
    const { result } = renderHook(() => useCatalog('testCatalog'), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual([
        { id: 1, name: 'testCatalog_item' },
      ]);
    });
  });

  it('useBloodType returns blood type catalog', async () => {
    const { result } = renderHook(() => useBloodType(), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual([
        { id: 1, name: 'catalogo_grupo_sanguineo_item' },
      ]);
    });
  });

  it('useCatalogNameById returns catalog name by id', async () => {
    const { result } = renderHook(() => useCatalogNameById('testCatalog', 5), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toBe('testCatalog_name_5');
    });
  });
});
