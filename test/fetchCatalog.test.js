import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchCatalog from '../src/services/fetchCatalog';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchCatalog services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchCatalog calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [1, 2, 3] }),
    });
    const data = await fetchCatalog.fetchCatalog('catalogo_test');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/catalogo/catalogo_test`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ items: [1, 2, 3] });
  });

  it('fetchCatalog handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not found' }),
    });
    await expect(fetchCatalog.fetchCatalog('catalogo_test')).rejects.toThrow(
      'Not found'
    );
  });

  it('fetchBloodType calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ bloodTypes: ['A', 'B'] }),
    });
    const data = await fetchCatalog.fetchBloodType();
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/catalogo/catalogo_grupo_sanguineo`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ bloodTypes: ['A', 'B'] });
  });

  it('fetchCatalogNameById calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Test' }),
    });
    const data = await fetchCatalog.fetchCatalogNameById('catalogo_test', 123);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/catalogo/catalogo_test/123`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ name: 'Test' });
  });

  it('fetchCatalogNameById handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not found' }),
    });
    await expect(
      fetchCatalog.fetchCatalogNameById('catalogo_test', 123)
    ).rejects.toThrow('Not found');
  });
});
