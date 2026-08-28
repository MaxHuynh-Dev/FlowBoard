'use client';
import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  PasswordInput,
  Progress,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArrowLeft, Check, KeyRound, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ROUTERS } from '@/enums/router';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import { REQUIREMENTS, STRENGTH_TONES } from '@/utils/global';
import styles from './NewPassword.module.scss';

type Props = {
  onBack: () => void;
};

function NewPassword({ onBack }: Props): React.ReactElement {
  const [password, setPassword] = useState('');
  const metCount = REQUIREMENTS.filter((requirement) => requirement.test(password)).length;
  const strength = STRENGTH_TONES[metCount];
  const router = useRouter();
  const [loading, { toggle }] = useDisclosure();
  const { handleResetPasswordForEmail } = useAuthEmailProvider();

  function handleSubmitForm() {
    toggle();

    if (password) {
      toast.warning('Please type your password');
    }

    handleResetPasswordForEmail(password, () => {
      toast.success('Cập nhật mật khẩu thành công! Đang chuyển hướng...', {
        delay: 2000
      });
      setTimeout(() => {
        router.push(ROUTERS.LOGIN);
        toggle();
      }, 1000);
    });
  }

  return (
    <Box>
      <Box className={styles.heading}>
        <Text className={styles.formEyebrow} component="span">
          Almost there
        </Text>
        <Title order={2}>Set a new password</Title>
        <Text>Choose a password you haven&apos;t used on this account before.</Text>
      </Box>

      <Flex
        component="form"
        direction="column"
        gap={16}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitForm();
        }}
      >
        <PasswordInput
          classNames={{ input: styles.input, label: styles.label }}
          label="New password"
          name="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="At least 8 characters"
          required
          value={password}
        />

        <Box className={styles.strength}>
          <Group gap={6} justify="space-between" mb={8}>
            <Text className={styles.strengthLabel}>Password strength</Text>
            <Text className={styles.strengthValue} c={strength.color}>
              {password ? strength.label : '—'}
            </Text>
          </Group>
          <Progress
            color={strength.color}
            radius="xl"
            size={5}
            value={password ? (metCount / REQUIREMENTS.length) * 100 : 0}
          />
          <Stack className={styles.requirements} gap={7} mt={14}>
            {REQUIREMENTS.map((requirement) => {
              const met = requirement.test(password);
              return (
                <Group gap={8} key={requirement.label} wrap="nowrap">
                  <Box className={met ? styles.checkMet : styles.checkPending} component="span">
                    {met ? <Check size={12} /> : <X size={12} />}
                  </Box>
                  <Text className={met ? styles.requirementMet : styles.requirement}>
                    {requirement.label}
                  </Text>
                </Group>
              );
            })}
          </Stack>
        </Box>

        <PasswordInput
          classNames={{ input: styles.input, label: styles.label }}
          label="Confirm new password"
          name="confirmPassword"
          placeholder="Repeat your new password"
          required
        />

        <Button
          className={styles.submit}
          fullWidth
          loading={loading}
          leftSection={<KeyRound size={16} />}
          type="submit"
        >
          Update password
        </Button>
      </Flex>

      <Group gap={16} justify="center" mt={28}>
        <Anchor className={styles.backLink} component="button" onClick={onBack} type="button">
          <ArrowLeft size={14} /> Use a different email
        </Anchor>
        <Text className={styles.divider} component="span">
          •
        </Text>
        <Anchor className={styles.backLink} href={ROUTERS.LOGIN}>
          Back to sign in
        </Anchor>
      </Group>
    </Box>
  );
}

export default NewPassword;
