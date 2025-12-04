import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser, useLogin } from '../src/hooks/useAuth';

// Mock de servicios y navegación
vi.mock('../src/services/fetchLogin.js', () => ({
  fetchLogin: vi.fn(() => Promise.resolve({ token: 'abc123' })),
  fetchAuth: vi.fn(() => Promise.resolve({ user: { name: 'Test' } })),
}));
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAuth hooks', () => {
  it('useCurrentUser returns user data', async () => {
    const { result } = renderHook(() => useCurrentUser(), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ user: { name: 'Test' } });
    });
  });

  it('useLogin mutation works and navigates', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper });
    await result.current.mutateAsync({ username: 'test', password: '123' });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
