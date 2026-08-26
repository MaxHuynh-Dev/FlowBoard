'use client';

import { Anchor, Button, Divider, Paper, PasswordInput, TextInput } from '@mantine/core';
import { ArrowUpRight, Check, Github, LogIn } from 'lucide-react';
import type React from 'react';
import { useActionState } from 'react';
import { ROUTERS } from '@/enums/router';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import useOAuthWithProvider from '@/hooks/useOAuthWithProvider';
import styles from './Login.module.scss';

type LoginActionState = { error: string | null };

const initialLoginState: LoginActionState = { error: null };

export default function Login(): React.ReactElement {
  const { error: oauthError, loadingProvider, signInWithProvider } = useOAuthWithProvider();
  const { handleLogin } = useAuthEmailProvider();

  const [loginState, loginAction, emailLoading] = useActionState(
    async (_previousState: LoginActionState, formData: FormData): Promise<LoginActionState> => {
      const email = String(formData.get('email') ?? '');
      const password = String(formData.get('password') ?? '');
      const { error } = await handleLogin(email, password);
      return { error };
    },
    initialLoginState
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
            <h1>Good work has a rhythm.</h1>
            <p>One focused home for the projects that matter and the people making them happen.</p>
          </div>
          <div className={styles.preview} aria-hidden="true">
            <div className={styles.previewHeader}>
              <span>Q3 product launch</span>
              <ArrowUpRight size={15} />
            </div>
            <div className={styles.progressLine}>
              <span />
            </div>
            <div className={styles.previewMeta}>12 tasks completed this week</div>
            <div className={styles.previewRows}>
              {['Research notes', 'Prototype review', 'Launch checklist'].map((task, index) => (
                <div className={styles.previewRow} key={task}>
                  <span className={index < 2 ? styles.done : styles.todo}>
                    {index < 2 ? <Check size={11} /> : null}
                  </span>
                  <span>{task}</span>
                  <small>{index < 2 ? 'Done' : 'Today'}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Paper className={styles.formPanel} radius={0} shadow="none">
          <div className={styles.heading}>
            <span className={styles.formEyebrow}>Sign in</span>
            <h2>Welcome back</h2>
            <p>Sign in to continue to your workspace.</p>
          </div>

          <div className={styles.socialButtons}>
            <Button
              color="gray"
              className={styles.socialButton}
              disabled={loadingProvider !== null}
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
              disabled={loadingProvider !== null}
              fullWidth
              leftSection={<Github size={17} />}
              loading={loadingProvider === 'github'}
              onClick={() => signInWithProvider('github')}
              variant="default"
            >
              GitHub
            </Button>
          </div>

          <Divider label="or continue with email" labelPosition="center" mb="lg" />

          <form action={loginAction} className={styles.form}>
            <TextInput
              name="email"
              label="Email address"
              classNames={{ input: styles.input, label: styles.label }}
              placeholder="you@example.com"
              required
              type="email"
            />
            <PasswordInput
              name="password"
              label="Password"
              classNames={{ input: styles.input, label: styles.label }}
              placeholder="Your password"
              required
            />
            <div className={styles.formActions}>
              <Anchor href="/forgot-password" size="sm">
                Forgot password?
              </Anchor>
              <Button
                className={styles.submit}
                leftSection={<LogIn size={16} />}
                loading={emailLoading}
                type="submit"
              >
                Sign in
              </Button>
            </div>
            {loginState.error || oauthError ? (
              <div className={styles.error}>{loginState.error ?? oauthError}</div>
            ) : null}
          </form>

          <div className={styles.signup}>
            Don&apos;t have an account? <Anchor href={ROUTERS.SIGN_UP}>Create one</Anchor>
          </div>
        </Paper>
      </div>
    </main>
  );
}
