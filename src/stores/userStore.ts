import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { ROUTERS } from '@/enums/router';
import { createClient } from '@/utils/supabase/client';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  handleLogout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  handleLogout: async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      set({ user: null });
      window.location.href = ROUTERS.LOGIN;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}));
