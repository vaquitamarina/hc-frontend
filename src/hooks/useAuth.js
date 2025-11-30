import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLogin, fetchAuth } from '../services/fetchLogin.js';
import { useNavigate } from 'react-router';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchAuth,
    retry: false,
    throwOnError: false, // No lanzar error en 401
    staleTime: Infinity, // nunca se considera "stale"
    cacheTime: Infinity, // lo mantiene en caché todo el tiempo
    refetchOnWindowFocus: false,
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      navigate('/dashboard');
    },
  });
}
