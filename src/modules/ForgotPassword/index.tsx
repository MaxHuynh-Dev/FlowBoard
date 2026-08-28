'use client';

import { Center, Flex, Group, Stack, Stepper, Text, Title } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';
import { FORGOT_PASSWORD_STEP } from '@/enums/forgotPasswordStep';
import styles from './ForgotPassword.module.scss';
import NewPassword from './NewPassword';
import RequestLink from './RequestLink';

const STEPPERS = [
  {
    id: FORGOT_PASSWORD_STEP.REQUEST_LINK,
    label: 'Step 1',
    description: 'Send reset link'
  },
  {
    id: FORGOT_PASSWORD_STEP.SET_NEW_PASSWORD,
    label: 'Step 2',
    description: 'New password'
  }
];

export default function ForgotPassword(): React.ReactElement {
  const [stepActive, setStepActive] = useState<FORGOT_PASSWORD_STEP>(
    FORGOT_PASSWORD_STEP.REQUEST_LINK
  );

  return (
    <Flex align="center" className={styles.page} component="main" justify="center">
      <Flex className={styles.shell} direction={{ base: 'column', sm: 'row' }}>
        <Flex
          className={styles.intro}
          component="section"
          direction="column"
          flex={{ base: '0 0 auto', sm: '1 1 40%' }}
          justify="space-between"
          miw={0}
        >
          <Flex align="flex-start" direction="column" mb={40}>
            <Group className={styles.logo} gap={10}>
              <Center className={styles.logoMark} component="span">
                F
              </Center>
              flowboard
            </Group>
            <Text className={styles.eyebrow} component="span">
              Account recovery
            </Text>
            <Title order={1}>Reset in two steps.</Title>
            <Text>
              We&apos;ll email you a secure link, then you pick a new password. Your workspace stays
              exactly where you left it.
            </Text>
          </Flex>
          <Stepper
            active={stepActive}
            allowNextStepsSelect={false}
            onStepClick={setStepActive}
            orientation="vertical"
          >
            {STEPPERS.map((step) => (
              <Stepper.Step key={step.id} description={step.description} label={step.label} />
            ))}
          </Stepper>
        </Flex>

        <Stack
          className={styles.formPanel}
          flex={{ base: '0 0 auto', sm: '1.5 1 60%' }}
          gap={0}
          justify="center"
          miw={0}
        >
          <AnimatePresence mode="wait">
            {stepActive === FORGOT_PASSWORD_STEP.REQUEST_LINK && (
              <motion.div
                key={FORGOT_PASSWORD_STEP.REQUEST_LINK}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <RequestLink
                  onSubmitted={() => setStepActive(FORGOT_PASSWORD_STEP.SET_NEW_PASSWORD)}
                />
              </motion.div>
            )}
            {stepActive === FORGOT_PASSWORD_STEP.SET_NEW_PASSWORD && (
              <motion.div
                key={FORGOT_PASSWORD_STEP.SET_NEW_PASSWORD}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <NewPassword onBack={() => setStepActive(FORGOT_PASSWORD_STEP.REQUEST_LINK)} />
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>
      </Flex>
    </Flex>
  );
}
