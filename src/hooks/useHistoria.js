import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  // fetchCreateDraft,
  fetchAssignPatient,
  fetchPatientByHistory,
  registerHc,
} from '@services/fetchHistoria';
//import { useHistoriaStore } from '@stores/historiaStore';

/**
 * Hook para crear o obtener borrador de historia clínica
 * Devuelve el ID del borrador (nuevo o existente)
 */
// Eliminado: useCreateDraft

/**
 * Hook para asignar paciente a historia clínica en borrador
 */
export function useAssignPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchAssignPatient,
    onSuccess: (data, variables) => {
      // Invalidar la query del paciente por historia
      queryClient.invalidateQueries({
        queryKey: ['patient-by-history', variables.idHistory],
      });
      // Invalidar la lista de historias
      queryClient.invalidateQueries({ queryKey: ['historias'] });
    },
  });
}

/**
 * Hook para obtener datos del paciente asociado a una historia clínica
 * @param {string} historyId - UUID de la historia clínica
 */
export function usePatientByHistory(historyId) {
  return useQuery({
    queryKey: ['patient-by-history', historyId],
    queryFn: () => fetchPatientByHistory(historyId),
    enabled: !!historyId, // Solo ejecutar si hay historyId
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false, // No reintentar en 404
    throwOnError: false, // No lanzar error en 404
  });
}

/**
 * Hook para crear una historia clínica
 * Llama al servicio registerHc
 */
export function useCreateHistoriaClinica() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studentId) => registerHc(studentId),
    onSuccess: () => {
      // Puedes invalidar queries relacionadas aquí si es necesario
      queryClient.invalidateQueries({ queryKey: ['historias'] });
      toast.success('Historia Clínica creada con éxito');
    },
    onError: (error) => {
      toast.error(`Error al crear Historia Clínica: ${error.message}`);
    },
  });
}

/**
 * Hook para registrar una historia clínica usando el endpoint /hc/register
 */
export function useRegisterHc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studentId) => registerHc(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historias'] });
      toast.success('Historia Clínica registrada con éxito');
    },
    onError: (error) => {
      toast.error(`Error al registrar Historia Clínica: ${error.message}`);
    },
  });
}
