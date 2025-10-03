import { useQuery } from '@tanstack/react-query';
import { fetchPatients } from '../services/fetchPatients';

/**
 * Hook para obtener la lista de pacientes adultos de un estudiante
 * @param {string} studentId - ID del estudiante
 * @returns {Object} - Objeto con los datos de React Query (data, isLoading, isError, error)
 */
export const usePatients = (studentId) => {
  return useQuery({
    queryKey: ['patients', 'adult', studentId],
    queryFn: () => fetchPatients(studentId),
    enabled: !!studentId, // Solo ejecutar la query si studentId existe
  });
};
