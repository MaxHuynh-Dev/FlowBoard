import { Button, Container, Group } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { ROUTERS } from '@/enums/router';
import styles from './Navbar.module.scss';

export default function Navbar(): React.ReactElement {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <Container className={styles.navInner} size="xl">
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>F</span>
          <span>flowboard</span>
        </Link>
        <Group className={styles.navLinks} gap="xl">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#pricing">Pricing</a>
        </Group>
        <Group gap="sm">
          <Button
            component="a"
            href={ROUTERS.LOGIN}
            className={styles.loginButton}
            variant="subtle"
          >
            Log in
          </Button>
          <Button component="a" href={ROUTERS.SIGN_UP} className={styles.navCta}>
            Get started <ArrowRight size={15} />
          </Button>
        </Group>
      </Container>
    </nav>
  );
}
