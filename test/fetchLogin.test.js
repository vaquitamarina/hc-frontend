import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fetchLogin from '../src/services/fetchLogin';

const mockFetch = vi.fn();
global.fetch = mockFetch;
const API_URL = 'http://localhost:3000/api';
global.import = { meta: { env: { VITE_API_URL: API_URL } } };

describe('fetchLogin services', () => {
  afterEach(() => {
    mockFetch.mockReset();
  });

  it('fetchLogin calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: 'ok' }),
    });
    const data = await fetchLogin.fetchLogin('user', 'pass');
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/users/login`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(data).toEqual({ user: 'ok' });
  });

  it('fetchLogin handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchLogin.fetchLogin('user', 'pass')).rejects.toThrow(
      'Error'
    );
  });

  it('fetchLogin logs error for 500', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    });
    await expect(fetchLogin.fetchLogin('user', 'pass')).rejects.toThrow(
      'Server error'
    );
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('fetchAuth calls correct endpoint and returns data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: 'auth' }),
    });
    const data = await fetchLogin.fetchAuth();
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/users/me`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ user: 'auth' });
  });

  it('fetchAuth returns null for 401', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });
    const data = await fetchLogin.fetchAuth();
    expect(data).toBeNull();
  });

  it('fetchAuth handles error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Error' }),
    });
    await expect(fetchLogin.fetchAuth()).rejects.toThrow('Error');
  });
});
