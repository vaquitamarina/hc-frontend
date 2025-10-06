import { useQuery } from '@tanstack/react-query';
import { fetchPatients } from '@services/fetchPatients.js';
import { fetchFiliation } from '@services/fetchFiliation';

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
