import { useQuery } from '@tanstack/react-query';
import { fetchHCsByStudent } from '@services/fetchHC';

export function useHCsByStudent(studentId, type = 'adult') {
  return useQuery({
    queryKey: ['hcs', studentId, type],
    queryFn: () => fetchHCsByStudent(studentId, type),
    enabled: !!studentId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
