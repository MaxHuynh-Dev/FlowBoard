import { toast } from 'react-toastify';
import { ROUTERS } from '@/enums/router';
import { buildVerifyEmailRedirect, SIGN_UP_STEP } from '@/enums/signUpStep';
import { useStatusSignUpStore } from '@/stores/statusSignUpStore';
import { useUserStore } from '@/stores/userStore';
import { createClient } from '@/utils/supabase/client';

type TSignUpField = {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
};

type UseAuthEmailProvider = {
  handleLogin: (email: string, password: string) => Promise<{ error: string | null }>;
  handleSignUp: (
    signUpField: TSignUpField
  ) => Promise<{ error: string | null; success: string | null }>;
  handleResendVerifyEmail: (email: string) => Promise<{ error: string | null }>;
  handleLogout: () => Promise<{ error: string | null }>;
};

const useAuthEmailProvider = (): UseAuthEmailProvider => {
  const supabase = createClient();
  const { clearUser } = useUserStore((state) => state);
  const { setStepActive, setPendingEmail } = useStatusSignUpStore((state) => state);

  const handleLogin = async (email: string, password: string) => {
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      return { error: authError.message };
    }

    window.location.assign(ROUTERS.DASHBOARD);
    return { error: null };
  };

  const handleSignUp = async (
    signUpField: TSignUpField
  ): Promise<{ error: string | null; success: string | null }> => {
    const { email, displayName, password, confirmPassword } = signUpField;

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
        emailRedirectTo: buildVerifyEmailRedirect(window.location.origin),
        data: {
          display_name: displayName
        }
      }
    });

    if (authError) {
      toast.error(authError.message);
      return { error: authError.message, success: null };
    }

    setPendingEmail(email);

    if (!data.session) {
      const success = 'Account created. Check your email to confirm your account.';
      toast.success(success);
      setStepActive(SIGN_UP_STEP.VERIFY_EMAIL);

      return { error: null, success };
    }

    window.location.assign(ROUTERS.DASHBOARD);
    return { error: null, success: 'Account created.' };
  };

  const handleResendVerifyEmail = async (email: string) => {
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: buildVerifyEmailRedirect(window.location.origin)
      }
    });

    if (resendError) {
      toast.error(resendError.message);
      return { error: resendError.message };
    }

    toast.success('Verification email sent again.');
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

  return { handleLogin, handleSignUp, handleResendVerifyEmail, handleLogout };
};

export default useAuthEmailProvider;
