import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMotivoConsulta,
  updateMotivoConsulta,
  createMotivoConsulta,
  fetchFiliacion,
  updateFiliacion,
  createFiliacion,
  fetchEnfermedadActual,
  updateEnfermedadActual,
  createEnfermedadActual,
} from '@services/fetchAnamnesis';

export function useCreateFiliacion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFiliacion,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries(['filiacion', variables.id_historia]);
      }
    },
  });
}

export function useFiliacion(idHistoria) {
  return useQuery({
    queryKey: ['filiacion', idHistoria],
    queryFn: () => fetchFiliacion(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false, // No reintentar en 404
    throwOnError: false, // No lanzar error en 404
  });
}

export function useUpdateFiliacion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idHistoria, filiacion }) =>
      updateFiliacion({ idHistoria, filiacion }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['filiacion', variables.idHistoria]);
    },
  });
}

export function useCreateMotivoConsulta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMotivoConsulta,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'motivo-consulta',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useMotivoConsulta(idHistoria) {
  return useQuery({
    queryKey: ['motivo-consulta', idHistoria],
    queryFn: () => fetchMotivoConsulta(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateMotivoConsulta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMotivoConsulta,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['motivo-consulta', variables.idHistoria]);
    },
  });
}

// Hooks para Enfermedad Actual
export function useCreateEnfermedadActual() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEnfermedadActual,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'enfermedad-actual',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useEnfermedadActual(idHistoria) {
  return useQuery({
    queryKey: ['enfermedad-actual', idHistoria],
    queryFn: () => fetchEnfermedadActual(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateEnfermedadActual() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEnfermedadActual,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'enfermedad-actual',
        variables.idHistoria,
      ]);
    },
  });
}
