import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPatients } from '@services/fetchPatients.js';
import { fetchFiliation } from '@services/fetchFiliation';
import { fetchCreatePatient } from '@services/fetchPatient';

export const usePatients = (studentId) => {
  return useQuery({
    queryKey: ['patients', 'adult', studentId],
    queryFn: () => fetchPatients(studentId),
    enabled: !!studentId, // Solo ejecutar la query si studentId existe
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export function useFiliation(historyId) {
  return useQuery({
    queryKey: ['filiation', historyId],
    queryFn: () => fetchFiliation(historyId),
    enabled: !!historyId, // Solo ejecutar la query si historyId existe
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useMutateFiliation() {}

/**
 * Hook para crear un nuevo paciente
 */
export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreatePatient,
    onSuccess: () => {
      // Invalidar la lista de pacientes para refrescar
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}
