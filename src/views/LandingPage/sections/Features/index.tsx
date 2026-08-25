import { Card, Container, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import type React from 'react';
import { features } from '../data';
import styles from './Features.module.scss';

export default function Features(): React.ReactElement {
  return (
    <section className={styles.section} id="features">
      <Container size="lg">
        <div className={styles.sectionIntro}>
          <Text className={styles.sectionKicker}>Everything in rhythm</Text>
          <Title order={2}>Less hunting. More making.</Title>
          <Text>
            FlowBoard gives your team the clarity to spend less time coordinating work and more time
            doing it.
          </Text>
        </div>
        <SimpleGrid className={styles.featureGrid} cols={{ base: 1, sm: 3 }} spacing="lg">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card className={styles.featureCard} key={feature.title} padding="xl">
                <ThemeIcon className={styles.featureIcon} size={48} variant="light">
                  <Icon size={22} strokeWidth={1.7} />
                </ThemeIcon>
                <Title order={3}>{feature.title}</Title>
                <Text>{feature.description}</Text>
                <a href="#workflow">
                  Learn more about {feature.title} <ArrowRight size={14} />
                </a>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </section>
  );
}
