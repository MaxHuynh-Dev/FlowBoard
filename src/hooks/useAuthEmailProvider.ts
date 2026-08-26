import { toast } from 'react-toastify';
import { ROUTERS } from '@/enums/router';
import { useUserStore } from '@/stores/userStore';
import { createClient } from '@/utils/supabase/client';

type UseAuthEmailProvider = {
  handleLogin: (email: string, password: string) => Promise<{ error: string | null }>;
  handleSignUp: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{ error: string | null; success: string | null }>;
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

  const handleSignUp = async (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ error: string | null; success: string | null }> => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return { error: 'Passwords do not match', success: null };
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return { error: 'Password must be at least 6 characters.', success: null };
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${ROUTERS.DASHBOARD}`
      }
    });

    if (authError) {
      return { error: authError.message, success: null };
    }

    if (!data.session) {
      toast.success('Account created. Check your email to confirm your account.');
      window.location.assign(ROUTERS.LOGIN);

      return {
        error: null,
        success: 'Account created. Check your email to confirm your account.'
      };
    }

    return { error: null, success: null };
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
