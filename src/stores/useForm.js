import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useForm = create(
  persist((set) => ({
    isFormMode: false,
    setFormMode: () => set({ isFormMode: true }),
    setViewMode: () => set({ isFormMode: false }),
  }))
);
