import { Box, Center, Container, Flex, Group, Text } from '@mantine/core';
import Link from 'next/link';
import type React from 'react';
import styles from './Footer.module.scss';

export default function Footer(): React.ReactElement {
  return (
    <Box className={styles.footer} component="footer">
      <Container size="xl">
        <Flex
          align={{ base: 'flex-start', sm: 'center' }}
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 15, sm: 'md' }}
          justify="space-between"
        >
          <Link href="/">
            <Group className={styles.brand} gap={9} wrap="nowrap">
              <Center className={styles.brandMark} component="span">
                F
              </Center>
              <span>flowboard</span>
            </Group>
          </Link>
          <Text>© 2026 FlowBoard. Work, in focus.</Text>
        </Flex>
      </Container>
    </Box>
  );
}
