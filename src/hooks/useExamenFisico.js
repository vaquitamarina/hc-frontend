import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchGeneralExam,
  updateGeneralExam,
  fetchRegionalExam,
  updateRegionalExam,
} from '@services/fetchExamenFisico';

export function useGeneralExam(historyId) {
  return useQuery({
    queryKey: ['examen-general', historyId],
    queryFn: () => fetchGeneralExam(historyId),
    enabled: !!historyId,
    refetchOnWindowFocus: false,
  });
}

export function useMutateGeneralExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGeneralExam,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['examen-general', vars.idHistory],
      });
    },
  });
}

export function useRegionalExam(historyId) {
  return useQuery({
    queryKey: ['examen-regional', historyId],
    queryFn: () => fetchRegionalExam(historyId),
    enabled: !!historyId,
    refetchOnWindowFocus: false,
  });
}

export function useMutateRegionalExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRegionalExam,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['examen-regional', vars.idHistory],
      });
    },
  });
}
