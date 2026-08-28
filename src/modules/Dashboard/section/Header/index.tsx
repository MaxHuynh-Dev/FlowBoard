'use client';

import { ActionIcon, Box, Button, Flex, Group, Text, Title } from '@mantine/core';
import { Bell, Plus } from 'lucide-react';
import type React from 'react';
import { useUserStore } from '@/stores/userStore';
import { dayUtils } from '@/utils/day';
import styles from './Header.module.scss';

function Header(): React.ReactElement {
  const { user } = useUserStore((state) => state);

  return (
    <Flex
      align={{ base: 'flex-start', sm: 'flex-end' }}
      className={styles.header}
      component="header"
      direction={{ base: 'column', sm: 'row' }}
      gap={24}
      justify="space-between"
    >
      <Box>
        <Text className={styles.kicker}>{dayUtils.getCurrentDate()}</Text>
        <Title order={1}>
          Good {dayUtils.getCurrentTimeOfDay()}{' '}
          {user?.user_metadata.name ? `, ${user.user_metadata.name}` : ''}
        </Title>
        <Text className={styles.subtitle}>
          Here&apos;s what&apos;s happening across your workspace.
        </Text>
      </Box>
      <Group className={styles.headerActions} gap="sm">
        <ActionIcon
          aria-label="Notifications"
          className={styles.iconButton}
          size="lg"
          variant="default"
        >
          <Bell size={18} strokeWidth={1.8} />
        </ActionIcon>
        <Button leftSection={<Plus size={17} />}>New project</Button>
      </Group>
    </Flex>
  );
}

export default Header;
