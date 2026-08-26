'use client';

import { Avatar, Flex, Menu, Menubar, Text, UnstyledButton } from '@mantine/core';
import { LogOut } from 'lucide-react';
import type React from 'react';
import { useUserStore } from '@/stores/userStore';
import styles from './User.module.scss';

export default function User(): React.ReactElement {
  const { user, handleLogout } = useUserStore((state) => state);

  return (
    <Menubar position="bottom-end">
      <Menubar.Menu width={220}>
        <Menubar.Target>
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
        </Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item onClick={handleLogout}>
            <Flex gap="md" justify="flex-start" align="center" wrap="wrap">
              <LogOut size={24} />
              <Text size="sm" fw={500}>
                Log out
              </Text>
            </Flex>
          </Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}
