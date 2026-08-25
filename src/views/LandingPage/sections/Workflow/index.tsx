import { Container, Group, Stack, Text, Title } from '@mantine/core';
import { Users } from 'lucide-react';
import type React from 'react';
import { workflowSteps } from '../data';
import styles from './Workflow.module.scss';

export default function Workflow(): React.ReactElement {
  return (
    <section className={styles.workflowSection} id="workflow">
      <Container className={styles.workflowGrid} size="lg">
        <div>
          <Text className={styles.sectionKicker}>A better daily flow</Text>
          <Title order={2}>From scattered thoughts to shared momentum.</Title>
          <Text>
            Make the next step obvious for everyone, whether you&apos;re planning a launch or
            finishing the last 10%.
          </Text>
          <Stack className={styles.steps} gap="lg">
            {workflowSteps.map(([number, title, description]) => (
              <Group align="flex-start" gap="md" key={number}>
                <span className={styles.stepNumber}>{number}</span>
                <div>
                  <Title order={4}>{title}</Title>
                  <Text>{description}</Text>
                </div>
              </Group>
            ))}
          </Stack>
        </div>
        <div className={styles.quotePanel}>
          <div className={styles.quoteMark}>“</div>
          <Text className={styles.quote}>
            FlowBoard gave us the shared language we were missing. Our weekly planning went from a
            meeting everyone endured to a moment everyone uses.
          </Text>
          <Group mt="xl">
            <div className={styles.avatarMock}>
              <Users size={17} />
            </div>
            <div>
              <Text className={styles.quoteName}>Mia Chen</Text>
              <Text className={styles.quoteRole}>Head of Product, Northstar</Text>
            </div>
          </Group>
        </div>
      </Container>
    </section>
  );
}
