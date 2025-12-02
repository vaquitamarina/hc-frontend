import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvolucion, addEvolucion } from '@services/fetchEvolucion';

export function useEvolucion(historyId) {
  return useQuery({
    queryKey: ['evolucion', historyId],
    queryFn: () => fetchEvolucion(historyId),
    enabled: !!historyId,
    refetchOnWindowFocus: false,
  });
}

export function useAddEvolucion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEvolucion,
    onSuccess: (_, vars) => {
      // Al agregar una nueva, recargamos la lista automáticamente
      queryClient.invalidateQueries({
        queryKey: ['evolucion', vars.idHistory],
      });
    },
  });
}
