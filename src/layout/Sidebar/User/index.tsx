'use client';

import { Avatar, Text, UnstyledButton } from '@mantine/core';
import type React from 'react';
import { useUserStore } from '@/stores/userStore';
import styles from './User.module.scss';

export default function User(): React.ReactElement {
  const user = useUserStore((state) => state.user);

  return (
    <UnstyledButton className={styles.user}>
      <div className={styles.user_inner}>
        <Avatar
          src={user?.user_metadata.avatar_url || '/default-avatar.png'}
          radius="xl"
          size={35}
          alt={user?.user_metadata.full_name || 'Guest User'}
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.user_metadata.full_name || 'Guest User'}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
          </Text>
        </div>
      </div>
    </UnstyledButton>
  );
}
