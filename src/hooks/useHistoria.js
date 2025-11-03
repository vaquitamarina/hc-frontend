import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCreateDraft,
  fetchAssignPatient,
  fetchPatientByHistory,
} from '@services/fetchHistoria';

/**
 * Hook para crear o obtener borrador de historia clínica
 * Devuelve el ID del borrador (nuevo o existente)
 */
export function useCreateDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreateDraft,
    onSuccess: () => {
      // Invalidar queries relacionadas si es necesario
      queryClient.invalidateQueries({ queryKey: ['historias'] });
    },
  });
}

/**
 * Hook para asignar paciente a historia clínica en borrador
 */
export function useAssignPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchAssignPatient,
    onSuccess: (data, variables) => {
      // Invalidar la query del paciente por historia
      queryClient.invalidateQueries({
        queryKey: ['patient-by-history', variables.idHistory],
      });
      // Invalidar la lista de historias
      queryClient.invalidateQueries({ queryKey: ['historias'] });
    },
  });
}

/**
 * Hook para obtener datos del paciente asociado a una historia clínica
 * @param {string} historyId - UUID de la historia clínica
 */
export function usePatientByHistory(historyId) {
  return useQuery({
    queryKey: ['patient-by-history', historyId],
    queryFn: () => fetchPatientByHistory(historyId),
    enabled: !!historyId, // Solo ejecutar si hay historyId
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1, // Reintentar solo una vez en caso de error
  });
}
