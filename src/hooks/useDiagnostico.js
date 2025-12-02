import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDiagnosticoPresuntivo,
  updateDiagnosticoPresuntivo,
  fetchDerivacion,
  updateDerivacion,
  updateRespuestaDerivacion,
  fetchDiagnosticoClinicasCompleto,
  updateDiagnosticoClinicasCompleto,
} from '@services/fetchDiagnostico';

// --- HOOKS DIAGNÓSTICO PRESUNTIVO ---
export function useDiagnosticoPresuntivo(historyId) {
  return useQuery({
    queryKey: ['diagnostico-presuntivo', historyId],
    queryFn: () => fetchDiagnosticoPresuntivo(historyId),
    enabled: !!historyId,
    refetchOnWindowFocus: false,
  });
}

export function useMutateDiagnosticoPresuntivo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDiagnosticoPresuntivo,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['diagnostico-presuntivo', vars.idHistory],
      });
    },
  });
}

// --- HOOKS DERIVACIÓN (SECCIÓN IV y V) ---
export function useDerivacion(historyId) {
  return useQuery({
    queryKey: ['derivacion', historyId],
    queryFn: () => fetchDerivacion(historyId),
    enabled: !!historyId,
    refetchOnWindowFocus: false,
  });
}

export function useMutateDerivacion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDerivacion,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['derivacion', vars.idHistory],
      });
    },
  });
}

export function useMutateRespuestaDerivacion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRespuestaDerivacion,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['derivacion', vars.idHistory],
      });
    },
  });
}

export function useDiagnosticoClinicasCompleto(historyId) {
  return useQuery({
    queryKey: ['diagnostico-clinicas-full', historyId],
    queryFn: () => fetchDiagnosticoClinicasCompleto(historyId),
    enabled: !!historyId,
    refetchOnWindowFocus: false,
  });
}

export function useMutateDiagnosticoClinicasCompleto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDiagnosticoClinicasCompleto,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['diagnostico-clinicas-full', vars.idHistory],
      });
    },
  });
}
