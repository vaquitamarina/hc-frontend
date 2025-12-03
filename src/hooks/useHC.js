import { useQuery } from '@tanstack/react-query';
import { fetchHCsByStudent } from '@services/fetchHC';

export function useHCsByStudent(studentId, type = 'adult') {
  return useQuery({
    queryKey: ['hcs', studentId, type],
    queryFn: async () => {
      const result = await fetchHCsByStudent(studentId, type);
      return Array.isArray(result) ? result : [];
    },
    enabled: !!studentId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
