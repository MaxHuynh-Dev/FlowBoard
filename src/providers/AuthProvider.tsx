'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect } from 'react';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/constants/envs';
import { useUserStore } from '@/stores/userStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Initialize Supabase client
    const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

    // Get current session on initial load
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth state changes (login, logout)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
