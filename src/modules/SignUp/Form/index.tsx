import { Anchor, Button, Divider, Paper, PasswordInput, TextInput } from '@mantine/core';
import { Github, UserPlus } from 'lucide-react';
import { useActionState } from 'react';
import { ROUTERS } from '@/enums/router';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import useOAuthWithProvider from '@/hooks/useOAuthWithProvider';
import styles from './Form.module.scss';

type SignUpActionState = { error: string | null; success: string | null };

const initialSignUpState: SignUpActionState = { error: null, success: null };

function FormSignUp(): React.ReactElement {
  const { handleSignUp } = useAuthEmailProvider();
  const { loadingProvider, signInWithProvider } = useOAuthWithProvider();
  const [signUpState, signUpAction, emailLoading] = useActionState(
    async (_previousState: SignUpActionState, formData: FormData): Promise<SignUpActionState> => {
      const displayName = String(formData.get('displayName') ?? '').trim();
      const email = String(formData.get('email') ?? '').trim();
      const password = String(formData.get('password') ?? '');
      const confirmPassword = String(formData.get('confirmPassword') ?? '');

      const { error, success } = await handleSignUp({
        email,
        displayName,
        password,
        confirmPassword
      });
      return { error, success };
    },
    initialSignUpState
  );

  return (
    <Paper radius={0} shadow="none">
      <div className={styles.heading}>
        <span className={styles.formEyebrow}>Create account</span>
        <h2>Join FlowBoard</h2>
        <p>Set up your workspace in less than a minute.</p>
      </div>

      <div className={styles.socialButtons}>
        <Button
          className={styles.socialButton}
          disabled={loadingProvider !== null || emailLoading}
          fullWidth
          leftSection={<span className={styles.socialIcon}>G</span>}
          loading={loadingProvider === 'google'}
          onClick={() => signInWithProvider('google')}
          variant="default"
        >
          Google
        </Button>
        <Button
          className={styles.socialButton}
          disabled={loadingProvider !== null || emailLoading}
          fullWidth
          leftSection={<Github size={17} />}
          loading={loadingProvider === 'github'}
          onClick={() => signInWithProvider('github')}
          variant="default"
        >
          GitHub
        </Button>
      </div>

      <Divider label="or sign up with email" labelPosition="center" mb="lg" />

      <form action={signUpAction} className={styles.form}>
        <TextInput
          classNames={{ input: styles.input, label: styles.label }}
          label="Display name"
          name="displayName"
          disabled={loadingProvider !== null || emailLoading}
          placeholder="John Doe"
          required
          type="text"
        />
        <TextInput
          classNames={{ input: styles.input, label: styles.label }}
          label="Email address"
          name="email"
          disabled={loadingProvider !== null || emailLoading}
          placeholder="you@example.com"
          required
          type="email"
        />
        <PasswordInput
          classNames={{ input: styles.input, label: styles.label }}
          label="Password"
          name="password"
          disabled={loadingProvider !== null || emailLoading}
          placeholder="At least 6 characters"
          required
        />
        <PasswordInput
          classNames={{ input: styles.input, label: styles.label }}
          label="Confirm password"
          name="confirmPassword"
          disabled={loadingProvider !== null || emailLoading}
          placeholder="Repeat your password"
          required
        />
        <div className={styles.formActions}>
          <Anchor href={ROUTERS.LOGIN} size="sm">
            Already have an account?
          </Anchor>
          <Button
            className={styles.submit}
            leftSection={<UserPlus size={16} />}
            loading={emailLoading}
            type="submit"
          >
            Create account
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default FormSignUp;
