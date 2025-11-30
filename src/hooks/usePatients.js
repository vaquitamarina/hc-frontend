import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAdultPatients } from '@services/fetchPatients.js';
// Removed filiation services — this hook file focuses only on patients
import { fetchCreatePatient, fetchUpdatePatient } from '@services/fetchPatient';

export function useAdultPatients(studentId) {
  return useQuery({
    queryKey: ['patients', 'adult', studentId],
    queryFn: () => fetchAdultPatients(studentId),
    enabled: !!studentId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// NOTE: filiation-related hooks were removed. If you still need filiation
// behavior, reintroduce them in a dedicated hook file or restore imports.

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

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdatePatient,
    onSuccess: () => {
      // Invalidamos para que se refresquen los datos en la UI
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient-by-history'] });
    },
  });
}
