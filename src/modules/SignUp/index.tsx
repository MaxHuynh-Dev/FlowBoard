'use client';

import { Stepper } from '@mantine/core';
import type React from 'react';
import { useState } from 'react';
import AccessDashboard from './AccessDashboard';
import FormSignUp from './Form';
import styles from './SignUp.module.scss';
import VerifyEmail from './VerifyEmail';

export default function SignUp(): React.ReactElement {
  const [active, setActive] = useState(0);

  function handleStepChange(step: number): React.ReactElement {
    switch (step) {
      case 0:
        return <FormSignUp />;
      case 1:
        return <VerifyEmail />;
      case 2:
        return <AccessDashboard />;
      default:
        return <FormSignUp />;
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.intro}>
          <div className={styles.introTop}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>F</span>
              <span>flowboard</span>
            </div>
            <span className={styles.eyebrow}>A clearer way to move work forward</span>
            <h1>Start your best work here.</h1>
            <p>Create a focused home for your projects, tasks, and team conversations.</p>
          </div>
          <Stepper active={active} onStepClick={setActive} orientation="vertical">
            <Stepper.Step label="Step 1" description="Create an account" />
            <Stepper.Step label="Step 2" description="Verify email" />
            <Stepper.Step label="Step 3" description="Get full access" />
          </Stepper>
        </section>

        {handleStepChange(active)}
      </div>
    </main>
  );
}
