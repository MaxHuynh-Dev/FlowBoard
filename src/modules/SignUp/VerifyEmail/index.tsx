import { Button, EmptyState, Flex, Text } from '@mantine/core';
import { Mail, RotateCw } from 'lucide-react';
import { useCallback, useEffect, useState, useTransition } from 'react';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import { useStatusSignUpStore } from '@/stores/statusSignUpStore';
import styles from './VerifyEmail.module.scss';

const RESEND_COOLDOWN_SECONDS = 60;

function VerifyEmail(): React.ReactElement {
  const { handleResendVerifyEmail } = useAuthEmailProvider();
  const { pendingEmail, clearStepActive } = useStatusSignUpStore((state) => state);
  const [cooldown, setCooldown] = useState(0);
  const [isResending, startResend] = useTransition();

  useEffect(() => {
    if (cooldown <= 0) return;

    const timeout = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timeout);
  }, [cooldown]);

  const onResend = useCallback(() => {
    if (!pendingEmail || cooldown > 0) return;

    startResend(async () => {
      const { error } = await handleResendVerifyEmail(pendingEmail);
      if (!error) {
        setCooldown(RESEND_COOLDOWN_SECONDS);
      }
    });
  }, [cooldown, handleResendVerifyEmail, pendingEmail]);

  return (
    <EmptyState
      icon={<Mail />}
      variant="light"
      title="Verify your email"
      description={
        <>
          We sent a verification link to{' '}
          <Text component="span" className={styles.email}>
            {pendingEmail ?? 'your inbox'}
          </Text>
          . Open it to confirm your account and sign in.
        </>
      }
    >
      <Flex direction="column" gap="sm" justify="center" align="center">
        <Flex align={'center'}>
          <Button
            disabled={!pendingEmail || cooldown > 0}
            leftSection={<RotateCw size={16} />}
            loading={isResending}
            onClick={onResend}
            variant="default"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend email'}
          </Button>
          <Button onClick={clearStepActive} variant="subtle">
            Use a different email
          </Button>
        </Flex>
        <Text className={styles.hint}>
          Nothing in your inbox? Check the spam folder before resending.
        </Text>
      </Flex>
    </EmptyState>
  );
}

export default VerifyEmail;
