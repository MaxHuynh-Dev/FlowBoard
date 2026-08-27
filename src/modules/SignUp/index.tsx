'use client';

import { Box, Stepper, Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { useStatusSignUpStore } from '@/stores/statusSignUpStore';
import AccessDashboard from './AccessDashboard';
import FormSignUp from './Form';
import styles from './SignUp.module.scss';
import VerifyEmail from './VerifyEmail';

const STEPPERS = [
  { id: 0, label: 'Step 1', content: <FormSignUp />, description: 'Create an account' },
  { id: 1, label: 'Step 2', content: <VerifyEmail />, description: 'Verify email' },
  { id: 2, label: 'Step 3', content: <AccessDashboard />, description: 'Get full access' }
];

export default function SignUp(): React.ReactElement {
  const { stepActive, setStepActive } = useStatusSignUpStore((state) => state);

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
          <Stepper active={stepActive} onStepClick={setStepActive} orientation="vertical">
            {STEPPERS.map((step) => (
              <Stepper.Step key={step.id} label={step.label} description={step.description} />
            ))}
          </Stepper>
        </section>

        <Box className={styles.formPanel}>
          <AnimatePresence mode="wait">
            {STEPPERS.map(
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
