'use client';

import { Box, Stepper, Text } from '@mantine/core';
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
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.intro}>
          <Box className={styles.introTop}>
            <Box className={styles.logo}>
              <span className={styles.logoMark}>F</span>
              <span>flowboard</span>
            </Box>
            <span className={styles.eyebrow}>A clearer way to move work forward</span>
            <h1>Start your best work here.</h1>
            <Text>Create a focused home for your projects, tasks, and team conversations.</Text>
          </Box>
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
        </section>

        <Box className={styles.formPanel}>
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
        </Box>
      </div>
    </main>
  );
}
