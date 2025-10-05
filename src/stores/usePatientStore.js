import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCurrentPatientStore = create(
  persist(
    (set) => ({
      currentPatient: null,
      setCurrentPatient: (patient) => set({ currentPatient: patient }),
      removeCurrentPatient: () => set({ currentPatient: null }),
    }),
    {
      name: 'current-patient-storage', // clave en localStorage
    }
  )
);
