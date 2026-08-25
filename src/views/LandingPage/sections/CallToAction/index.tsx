import { Button, Container, Text, Title } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import type React from 'react';
import styles from './CallToAction.module.scss';

export default function CallToAction(): React.ReactElement {
  return (
    <section className={styles.ctaSection} id="pricing">
      <Container className={styles.cta} size="lg">
        <div>
          <Text className={styles.sectionKicker}>Your next chapter starts here</Text>
          <Title order={2}>Make good work feel lighter.</Title>
          <Text>Bring your team into focus with FlowBoard.</Text>
        </div>
        <Button
          component="a"
          href="/sign-up"
          className={styles.heroCta}
          rightSection={<ArrowRight size={17} />}
        >
          Create your workspace
        </Button>
      </Container>
    </section>
  );
}
