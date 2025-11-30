import { useQuery } from '@tanstack/react-query';
import { fetchHCsByStudent } from '@services/fetchHC';

export function useHCsByStudent(studentId) {
  return useQuery({
    queryKey: ['hcs', studentId],
    queryFn: () => fetchHCsByStudent(studentId),
    enabled: !!studentId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
