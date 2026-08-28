'use client';

import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  PasswordInput,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { ArrowUpRight, Check, Github, LogIn } from 'lucide-react';
import type React from 'react';
import { useActionState } from 'react';
import { ROUTERS } from '@/enums/router';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import useOAuthWithProvider from '@/hooks/useOAuthWithProvider';
import styles from './Login.module.scss';

type LoginActionState = { error: string | null };

const initialLoginState: LoginActionState = { error: null };

const PREVIEW_TASKS = ['Research notes', 'Prototype review', 'Launch checklist'];

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
    <Flex align="center" className={styles.page} component="main" justify="center">
      <Flex className={styles.shell} direction={{ base: 'column', sm: 'row' }}>
        <Flex
          className={styles.intro}
          component="section"
          direction="column"
          flex={{ base: '0 0 auto', sm: '1.05 1 0' }}
          justify="space-between"
          miw={0}
        >
          <Flex align="flex-start" direction="column">
            <Group className={styles.logo} gap={10}>
              <Center className={styles.logoMark} component="span">
                F
              </Center>
              <Text component="span" inherit>
                flowboard
              </Text>
            </Group>
            <Text className={styles.eyebrow} component="span">
              A clearer way to move work forward
            </Text>
            <Title order={1}>Good work has a rhythm.</Title>
            <Text>
              One focused home for the projects that matter and the people making them happen.
            </Text>
          </Flex>

          <Box aria-hidden="true" className={styles.preview} visibleFrom="sm">
            <Group className={styles.previewHeader} gap="xs" justify="space-between" wrap="nowrap">
              <Text component="span" inherit>
                Q3 product launch
              </Text>
              <ArrowUpRight size={15} />
            </Group>
            <Progress.Root bg="rgba(248, 250, 246, 0.14)" mb={9} mt={18} radius="xl" size={5}>
              <Progress.Section color="blue.6" value={68} />
            </Progress.Root>
            <Text className={styles.previewMeta} component="div">
              12 tasks completed this week
            </Text>
            <Stack className={styles.previewRows} gap={11}>
              {PREVIEW_TASKS.map((task, index) => (
                <Group className={styles.previewRow} gap={9} key={task} wrap="nowrap">
                  <Center
                    className={index < 2 ? styles.done : styles.todo}
                    component="span"
                    flex="0 0 auto"
                  >
                    {index < 2 ? <Check size={11} /> : null}
                  </Center>
                  <Text component="span" inherit>
                    {task}
                  </Text>
                  <Text className={styles.previewTag} component="small">
                    {index < 2 ? 'Done' : 'Today'}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Box>
        </Flex>

        <Stack
          className={styles.formPanel}
          flex={{ base: '0 0 auto', sm: '0 1 440px' }}
          gap={0}
          justify="center"
          miw={{ base: 0, sm: 360 }}
        >
          <Box className={styles.heading}>
            <Text className={styles.formEyebrow} component="span">
              Sign in
            </Text>
            <Title order={2}>Welcome back</Title>
            <Text>Sign in to continue to your workspace.</Text>
          </Box>

          <SimpleGrid className={styles.socialButtons} cols={2} mb={26} spacing={10}>
            <Button
              className={styles.socialButton}
              color="gray"
              disabled={loadingProvider !== null}
              fullWidth
              leftSection={
                <Text className={styles.socialIcon} component="span">
                  G
                </Text>
              }
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
          </SimpleGrid>

          <Divider label="or continue with email" labelPosition="center" mb="lg" />

          <Flex action={loginAction} component="form" direction="column" gap={16}>
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
              placeholder="Your password"
              required
            />
            <Group gap={12} justify="space-between" mt={2}>
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
            </Group>
            {loginState.error || oauthError ? (
              <Alert color="red" radius="sm" variant="light">
                {loginState.error ?? oauthError}
              </Alert>
            ) : null}
          </Flex>

          <Text className={styles.signup}>
            Don&apos;t have an account? <Anchor href={ROUTERS.SIGN_UP}>Create one</Anchor>
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}
