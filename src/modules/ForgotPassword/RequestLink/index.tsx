import { Alert, Anchor, Box, Button, Flex, Group, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArrowLeft, Info, Mail } from 'lucide-react';
import React from 'react';
import { ROUTERS } from '@/enums/router';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import styles from './RequestLink.module.scss';

type Props = {
  onSubmitted: () => void;
};

function RequestLink({ onSubmitted }: Props): React.ReactElement {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const { handleSendEmailResetPassword } = useAuthEmailProvider();
  const [loading, { toggle }] = useDisclosure();

  return (
    <Box>
      <Box className={styles.heading}>
        <Text className={styles.formEyebrow} component="span">
          Reset password
        </Text>
        <Title order={2}>Forgot your password?</Title>
        <Text>
          Enter the email linked to your account and we&apos;ll send you a link to reset it.
        </Text>
      </Box>

      <Flex
        component="form"
        direction="column"
        gap={16}
        onSubmit={(event) => {
          event.preventDefault();
          toggle();
          handleSendEmailResetPassword(emailRef.current?.value || '', () => {
            onSubmitted();
          });
        }}
      >
        <TextInput
          classNames={{ input: styles.input, label: styles.label }}
          label="Email address"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
          ref={emailRef}
        />

        <Alert
          className={styles.hint}
          color="gray"
          icon={<Info size={16} />}
          radius="sm"
          variant="light"
        >
          The link stays valid for 60 minutes. If it expires, just request a new one.
        </Alert>

        <Button
          loading={loading}
          className={styles.submit}
          fullWidth
          leftSection={<Mail size={16} />}
          type="submit"
        >
          Send reset link
        </Button>
      </Flex>

      <Group className={styles.footerActions} gap={4} justify="center" mt={28}>
        <Anchor className={styles.backLink} href={ROUTERS.LOGIN} size="sm">
          <ArrowLeft size={14} /> Back to sign in
        </Anchor>
      </Group>

      <Text className={styles.signup}>
        Don&apos;t have an account?{' '}
        <Anchor href={ROUTERS.SIGN_UP} inherit>
          Create one
        </Anchor>
      </Text>
    </Box>
  );
}

export default RequestLink;
