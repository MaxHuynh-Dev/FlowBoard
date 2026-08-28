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
import { ArrowLeft, Check, KeyRound, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { ROUTERS } from '@/enums/router';
import styles from './NewPassword.module.scss';

const REQUIREMENTS: Array<{ label: string; test: (value: string) => boolean }> = [
  { label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { label: 'One uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { label: 'One number', test: (value) => /\d/.test(value) },
  { label: 'One special character', test: (value) => /[^A-Za-z0-9]/.test(value) }
];

const STRENGTH_TONES = [
  { label: 'Too weak', color: 'red' },
  { label: 'Weak', color: 'orange' },
  { label: 'Fair', color: 'yellow' },
  { label: 'Good', color: 'lime' },
  { label: 'Strong', color: 'teal' }
];

type Props = {
  /** UI only — returns to step 1. */
  onBack: () => void;
};

function NewPassword({ onBack }: Props): React.ReactElement {
  const [password, setPassword] = useState('');
  const metCount = REQUIREMENTS.filter((requirement) => requirement.test(password)).length;
  const strength = STRENGTH_TONES[metCount];

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
        onSubmit={(event) => event.preventDefault()}
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
