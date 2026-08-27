import { create } from 'zustand';

interface StatusSignUpStore {
  stepActive: number;
  setStepActive: (stepActive: number) => void;
  clearStepActive: () => void;
}

export const useStatusSignUpStore = create<StatusSignUpStore>((set) => ({
  stepActive: 0,
  setStepActive: (stepActive) => set({ stepActive }),
  clearStepActive: () => set({ stepActive: 0 })
}));
