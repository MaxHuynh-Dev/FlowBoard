import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  PasswordInput,
  SimpleGrid,
  Text,
  TextInput,
  Title
} from '@mantine/core';
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
  const [, signUpAction, emailLoading] = useActionState(
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

  const disabled = loadingProvider !== null || emailLoading;

  return (
    <Box>
      <Box className={styles.heading}>
        <Text className={styles.formEyebrow} component="span">
          Create account
        </Text>
        <Title order={2}>Join FlowBoard</Title>
        <Text>Set up your workspace in less than a minute.</Text>
      </Box>

      <SimpleGrid className={styles.socialButtons} cols={2} mb={26} spacing={10}>
        <Button
          className={styles.socialButton}
          disabled={disabled}
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
          disabled={disabled}
          fullWidth
          leftSection={<Github size={17} />}
          loading={loadingProvider === 'github'}
          onClick={() => signInWithProvider('github')}
          variant="default"
        >
          GitHub
        </Button>
      </SimpleGrid>

      <Divider label="or sign up with email" labelPosition="center" mb="lg" />

      <Flex action={signUpAction} component="form" direction="column" gap={16}>
        <TextInput
          classNames={{ input: styles.input, label: styles.label }}
          disabled={disabled}
          label="Display name"
          name="displayName"
          placeholder="John Doe"
          required
          type="text"
        />
        <TextInput
          classNames={{ input: styles.input, label: styles.label }}
          disabled={disabled}
          label="Email address"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <PasswordInput
          classNames={{ input: styles.input, label: styles.label }}
          disabled={disabled}
          label="Password"
          name="password"
          placeholder="At least 6 characters"
          required
        />
        <PasswordInput
          classNames={{ input: styles.input, label: styles.label }}
          disabled={disabled}
          label="Confirm password"
          name="confirmPassword"
          placeholder="Repeat your password"
          required
        />
        <Group gap={12} justify="space-between" mt={2}>
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
        </Group>
      </Flex>
    </Box>
  );
}

export default FormSignUp;
