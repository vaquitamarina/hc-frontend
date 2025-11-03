import { create } from 'zustand';

/**
 * Store para manejar el estado del draft de historia clínica
 *
 * Flujo:
 * 1. Usuario inicia nueva HC → se crea borrador → guardamos ID aquí
 * 2. Usuario navega a /historia/:id con el ID del borrador
 * 3. Usuario llena form de paciente → se asigna paciente al borrador
 * 4. Al completar, limpiamos el draft ID
 *
 * IMPORTANTE: Este estado NO persiste entre sesiones (se pierde al refrescar)
 * Esto es intencional: si el usuario refresca, debe retomar desde la lista.
 */
export const useHistoriaStore = create((set) => ({
  // ID del borrador actual (null si no hay borrador activo)
  draftHistoriaId: null,

  // Guardar el ID del borrador recién creado
  setDraftHistoriaId: (id) => set({ draftHistoriaId: id }),

  // Limpiar el borrador (cuando se completa o se cancela)
  clearDraftHistoriaId: () => set({ draftHistoriaId: null }),

  // Verificar si hay un borrador activo
  hasDraft: () => {
    const state = useHistoriaStore.getState();
    return state.draftHistoriaId !== null;
  },
}));
