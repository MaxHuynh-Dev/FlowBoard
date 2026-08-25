import { Container, Group, Text } from '@mantine/core';
import type React from 'react';
import styles from './TrustBand.module.scss';

const teams = ['northstar', 'ARC / studio', 'kinetic', 'fieldwork', 'daylight'];

export default function TrustBand(): React.ReactElement {
  return (
    <section className={styles.trustBand}>
      <Container size="xl">
        <Text>Trusted by teams who care about how work gets done</Text>
        <Group className={styles.trustNames} justify="space-between">
          {teams.map((team) => (
            <span key={team}>{team}</span>
          ))}
        </Group>
      </Container>
    </section>
  );
}
