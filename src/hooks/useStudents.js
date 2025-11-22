import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '@services/fetchStudents.js';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
