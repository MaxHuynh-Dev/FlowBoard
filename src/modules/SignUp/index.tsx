'use client';

import { Center, Flex, Group, Stack, Stepper, Text, Title } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { useEffect, useState } from 'react';
import { SIGN_UP_STEP } from '@/enums/signUpStep';
import { useStatusSignUpStore } from '@/stores/statusSignUpStore';
import FormSignUp from './Form';
import styles from './SignUp.module.scss';
import VerifyEmail from './VerifyEmail';

const STEPPERS = [
  {
    id: SIGN_UP_STEP.CREATE_ACCOUNT,
    label: 'Step 1',
    description: 'Create an account',
    content: <FormSignUp />
  },
  {
    id: SIGN_UP_STEP.VERIFY_EMAIL,
    label: 'Step 2',
    description: 'Verify email',
    content: <VerifyEmail />
  }
];

export default function SignUp(): React.ReactElement {
  const { stepActive, setStepActive } = useStatusSignUpStore((state) => state);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = async (): Promise<void> => {
      await useStatusSignUpStore.persist.rehydrate();
      setHydrated(true);
    };

    void sync();
  }, []);

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
              <Text component="span" inherit>
                flowboard
              </Text>
            </Group>
            <Text className={styles.eyebrow} component="span">
              A clearer way to move work forward
            </Text>
            <Title order={1}>Start your best work here.</Title>
            <Text>Create a focused home for your projects, tasks, and team conversations.</Text>
          </Flex>
          <Stepper
            active={stepActive}
            allowNextStepsSelect={false}
            onStepClick={setStepActive}
            orientation="vertical"
          >
            {STEPPERS.map((step) => (
              <Stepper.Step
                key={step.id}
                description={step.description}
                label={step.label}
                loading={stepActive === SIGN_UP_STEP.VERIFY_EMAIL && step.id === stepActive}
              />
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
            {hydrated &&
              STEPPERS.map(
                (tab) =>
                  stepActive === tab.id && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tab.content}
                    </motion.div>
                  )
              )}
          </AnimatePresence>
        </Stack>
      </Flex>
    </Flex>
  );
}
