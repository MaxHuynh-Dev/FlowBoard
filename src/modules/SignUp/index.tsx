'use client';

import { Anchor, Button, Divider, Paper, PasswordInput, TextInput } from '@mantine/core';
import { ArrowUpRight, Check, Github, UserPlus } from 'lucide-react';
import type React from 'react';
import { useActionState } from 'react';
import useOAuthWithProvider from '@/hooks/useOAuthWithProvider';
import { createClient } from '@/utils/supabase/client';
import styles from '../Login/Login.module.scss';

type SignUpActionState = { error: string | null; success: string | null };

const initialSignUpState: SignUpActionState = { error: null, success: null };

export default function SignUp(): React.ReactElement {
  const { error: oauthError, loadingProvider, signInWithProvider } = useOAuthWithProvider();

  const [signUpState, signUpAction, emailLoading] = useActionState(
    async (_previousState: SignUpActionState, formData: FormData): Promise<SignUpActionState> => {
      const email = String(formData.get('email') ?? '').trim();
      const password = String(formData.get('password') ?? '');
      const confirmPassword = String(formData.get('confirmPassword') ?? '');

      if (password !== confirmPassword) {
        return { error: 'Passwords do not match.', success: null };
      }

      if (password.length < 6) {
        return { error: 'Password must be at least 6 characters.', success: null };
      }

      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`
        }
      });

      if (authError) {
        return { error: authError.message, success: null };
      }

      if (!data.session) {
        return {
          error: null,
          success: 'Account created. Check your email to confirm your account.'
        };
      }

      window.location.assign('/dashboard');
      return initialSignUpState;
    },
    initialSignUpState
  );

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.intro}>
          <div className={styles.introTop}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>F</span>
              <span>flowboard</span>
            </div>
            <span className={styles.eyebrow}>A clearer way to move work forward</span>
            <h1>Start your best work here.</h1>
            <p>Create a focused home for your projects, tasks, and team conversations.</p>
          </div>
          <div className={styles.preview} aria-hidden="true">
            <div className={styles.previewHeader}>
              <span>Your workspace is waiting</span>
              <ArrowUpRight size={15} />
            </div>
            <div className={styles.progressLine}>
              <span />
            </div>
            <div className={styles.previewMeta}>A calmer way to get things done</div>
            <div className={styles.previewRows}>
              {['Plan your first project', 'Invite your team', 'Make progress together'].map(
                (item) => (
                  <div className={styles.previewRow} key={item}>
                    <span className={styles.done}>
                      <Check size={11} />
                    </span>
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <Paper className={styles.formPanel} radius={0} shadow="none">
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
              label="Email address"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
            <PasswordInput
              classNames={{ input: styles.input, label: styles.label }}
              label="Password"
              name="password"
              placeholder="At least 6 characters"
              required
            />
            <PasswordInput
              classNames={{ input: styles.input, label: styles.label }}
              label="Confirm password"
              name="confirmPassword"
              placeholder="Repeat your password"
              required
            />
            <div className={styles.formActions}>
              <Anchor href="/login" size="sm">
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
            {signUpState.error || oauthError ? (
              <div className={styles.error}>{signUpState.error ?? oauthError}</div>
            ) : null}
            {signUpState.success ? (
              <div className={styles.success}>{signUpState.success}</div>
            ) : null}
          </form>
        </Paper>
      </div>
    </main>
  );
}
