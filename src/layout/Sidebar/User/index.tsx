'use client';

import { Avatar, Flex, Menu, Menubar, Text, UnstyledButton } from '@mantine/core';
import { LogOut } from 'lucide-react';
import type React from 'react';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import { useUserStore } from '@/stores/userStore';
import styles from './User.module.scss';

export default function User(): React.ReactElement {
  const { user } = useUserStore((state) => state);
  const { handleLogout } = useAuthEmailProvider();

  return (
    <Menubar position="bottom-end">
      <Menubar.Menu
        width={220}
        shadow="md"
        transitionProps={{ transition: 'pop-bottom-right', duration: 200 }}
      >
        <Menubar.Target className={styles.user}>
          <Flex w="100%" align="center" gap="sm" className={styles.user_inner}>
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
          </Flex>
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
