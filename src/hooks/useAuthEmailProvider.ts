import { ROUTERS } from '@/enums/router';
import { useUserStore } from '@/stores/userStore';
import { createClient } from '@/utils/supabase/client';

type UseAuthEmailProvider = {
  handleLogin: (email: string, password: string) => Promise<{ error: string | null }>;
  handleSignUp: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{ error: string | null }>;
  handleLogout: () => Promise<{ error: string | null }>;
};

const useAuthEmailProvider = (): UseAuthEmailProvider => {
  const supabase = createClient();
  const { clearUser } = useUserStore((state) => state);

  const handleLogin = async (email: string, password: string) => {
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      return { error: authError.message };
    }

    window.location.assign(ROUTERS.DASHBOARD);
    return { error: null };
  };

  const handleSignUp = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' };
    }

    const { error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      return { error: authError.message };
    }

    return { error: null };
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = ROUTERS.LOGIN;
      clearUser();

      return { error: null };
    } catch (error) {
      console.error('Error logging out:', error);
      return { error: 'Error logging out' };
    }
  };

  return { handleLogin, handleSignUp, handleLogout };
};

export default useAuthEmailProvider;
