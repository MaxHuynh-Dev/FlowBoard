import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SIGN_UP_STEP } from '@/enums/signUpStep';

interface StatusSignUpStore {
  stepActive: SIGN_UP_STEP;
  pendingEmail: string | null;
  setStepActive: (stepActive: SIGN_UP_STEP) => void;
  setPendingEmail: (pendingEmail: string | null) => void;
  clearStepActive: () => void;
}

export const useStatusSignUpStore = create<StatusSignUpStore>()(
  persist(
    (set) => ({
      stepActive: SIGN_UP_STEP.CREATE_ACCOUNT,
      pendingEmail: null,
      setStepActive: (stepActive) => set({ stepActive }),
      setPendingEmail: (pendingEmail) => set({ pendingEmail }),
      clearStepActive: () => set({ stepActive: SIGN_UP_STEP.CREATE_ACCOUNT, pendingEmail: null })
    }),
    {
      name: 'flowboard-sign-up-status',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true
    }
  )
);
