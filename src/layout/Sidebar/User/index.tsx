'use client';

import { Avatar as AvatarDicebear, Style } from '@dicebear/core';
import lorelei from '@dicebear/styles/micah.json' with { type: 'json' };
import { Avatar, Flex, Menu, Menubar, Text } from '@mantine/core';
import { LogOut } from 'lucide-react';
import type React from 'react';
import useAuthEmailProvider from '@/hooks/useAuthEmailProvider';
import { useUserStore } from '@/stores/userStore';
import styles from './User.module.scss';

const style = new Style(lorelei);

export default function User(): React.ReactElement {
  const { user } = useUserStore((state) => state);
  const { handleLogout } = useAuthEmailProvider();
  const dataUri = new AvatarDicebear(style, {
    seed: user?.user_metadata.full_name,
    size: 228,
    backgroundColorFill: 'linear',
    backgroundColor: ['#ddd8d8']
  }).toDataUri();

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
              src={user?.user_metadata.avatar_url || dataUri}
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
