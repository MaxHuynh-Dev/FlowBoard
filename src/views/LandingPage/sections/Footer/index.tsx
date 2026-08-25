import { Container, Group, Text } from '@mantine/core';
import Link from 'next/link';
import type React from 'react';
import styles from './Footer.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <Container size="xl">
        <Group justify="space-between">
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark}>F</span>
            <span>flowboard</span>
          </Link>
          <Text>© 2026 FlowBoard. Work, in focus.</Text>
        </Group>
      </Container>
    </footer>
  );
}
