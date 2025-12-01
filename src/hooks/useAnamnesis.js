import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMotivoConsulta,
  updateMotivoConsulta,
  createMotivoConsulta,
  fetchFiliacion,
  updateFiliacion,
  createFiliacion,
  fetchEnfermedadActual,
  updateEnfermedadActual,
  createEnfermedadActual,
  fetchAntecedentePersonal,
  createAntecedentePersonal,
  updateAntecedentePersonal,
  fetchAntecedenteMedico,
  createAntecedenteMedico,
  updateAntecedenteMedico,
  fetchAntecedenteFamiliar,
  createAntecedenteFamiliar,
  updateAntecedenteFamiliar,
  fetchAntecedenteCumplimiento,
  createAntecedenteCumplimiento,
  updateAntecedenteCumplimiento,
} from '@services/fetchAnamnesis';

export function useCreateFiliacion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFiliacion,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries(['filiacion', variables.id_historia]);
      }
    },
  });
}

export function useFiliacion(idHistoria) {
  return useQuery({
    queryKey: ['filiacion', idHistoria],
    queryFn: () => fetchFiliacion(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false, // No reintentar en 404
    throwOnError: false, // No lanzar error en 404
  });
}

export function useUpdateFiliacion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idHistoria, filiacion }) =>
      updateFiliacion({ idHistoria, filiacion }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['filiacion', variables.idHistoria]);
    },
  });
}

export function useCreateMotivoConsulta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMotivoConsulta,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'motivo-consulta',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useMotivoConsulta(idHistoria) {
  return useQuery({
    queryKey: ['motivo-consulta', idHistoria],
    queryFn: () => fetchMotivoConsulta(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateMotivoConsulta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMotivoConsulta,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['motivo-consulta', variables.idHistoria]);
    },
  });
}

// Hooks para Enfermedad Actual
export function useCreateEnfermedadActual() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEnfermedadActual,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'enfermedad-actual',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useEnfermedadActual(idHistoria) {
  return useQuery({
    queryKey: ['enfermedad-actual', idHistoria],
    queryFn: () => fetchEnfermedadActual(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateEnfermedadActual() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEnfermedadActual,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'enfermedad-actual',
        variables.idHistoria,
      ]);
    },
  });
}

// Hooks para Antecedente Personal
export function useCreateAntecedentePersonal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAntecedentePersonal,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'antecedente-personal',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useAntecedentePersonal(idHistoria) {
  return useQuery({
    queryKey: ['antecedente-personal', idHistoria],
    queryFn: () => fetchAntecedentePersonal(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateAntecedentePersonal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAntecedentePersonal,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'antecedente-personal',
        variables.idHistoria,
      ]);
    },
  });
}

// Hooks para Antecedente Médico
export function useCreateAntecedenteMedico() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAntecedenteMedico,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'antecedente-medico',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useAntecedenteMedico(idHistoria) {
  return useQuery({
    queryKey: ['antecedente-medico', idHistoria],
    queryFn: () => fetchAntecedenteMedico(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateAntecedenteMedico() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAntecedenteMedico,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'antecedente-medico',
        variables.idHistoria,
      ]);
    },
  });
}

// Hooks para Antecedente Familiar
export function useCreateAntecedenteFamiliar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAntecedenteFamiliar,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'antecedente-familiar',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useAntecedenteFamiliar(idHistoria) {
  return useQuery({
    queryKey: ['antecedente-familiar', idHistoria],
    queryFn: () => fetchAntecedenteFamiliar(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateAntecedenteFamiliar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAntecedenteFamiliar,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'antecedente-familiar',
        variables.idHistoria,
      ]);
    },
  });
}

// Hooks para Antecedente Cumplimiento
export function useCreateAntecedenteCumplimiento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAntecedenteCumplimiento,
    onSuccess: (data, variables) => {
      if (variables && variables.id_historia) {
        queryClient.invalidateQueries([
          'antecedente-cumplimiento',
          variables.id_historia,
        ]);
      }
    },
  });
}

export function useAntecedenteCumplimiento(idHistoria) {
  return useQuery({
    queryKey: ['antecedente-cumplimiento', idHistoria],
    queryFn: () => fetchAntecedenteCumplimiento(idHistoria),
    enabled: !!idHistoria,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    throwOnError: false,
  });
}

export function useUpdateAntecedenteCumplimiento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAntecedenteCumplimiento,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'antecedente-cumplimiento',
        variables.idHistoria,
      ]);
    },
  });
}
