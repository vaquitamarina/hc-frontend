import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPatients } from '@services/fetchPatients.js';
import { fetchFiliation, fetchUpdateFiliation } from '@services/fetchFiliation';
import { fetchCreatePatient, fetchUpdatePatient } from '@services/fetchPatient';

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

export function useMutateFiliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateFiliation,
    onSuccess: (_, variables) => {
      // Al guardar con éxito, invalidamos la cache para que se refresquen los datos
      queryClient.invalidateQueries({
        queryKey: ['filiation', variables.idHistory],
      });
      console.log('Filiación actualizada correctamente');
    },
    onError: (error) => {
      console.error('Error al actualizar filiación:', error);
      alert(`Error: ${error.message}`); // Feedback básico
    },
  });
}

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
