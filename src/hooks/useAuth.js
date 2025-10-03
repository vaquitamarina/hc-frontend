import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchLogin, fetchAuth } from '../services/fetchLogin.js';
import { useNavigate } from 'react-router';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchAuth,
    retry: false,
  });
}

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      navigate('/dashboard');
    },
  });
}
