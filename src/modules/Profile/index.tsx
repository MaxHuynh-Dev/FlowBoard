'use client';

import { Badge, Box, Card, Divider, Flex, Group, Stack, Text, Title } from '@mantine/core';
import type { User } from '@supabase/supabase-js';
import { CalendarDays, Mail, ShieldCheck } from 'lucide-react';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import AvatarUser from '@/components/AvatarUser';
import { useUserStore } from '@/stores/userStore';
import { dayUtils } from '@/utils/day';
import styles from './Profile.module.scss';

function getDisplayName(user: User | null): string {
  return user?.user_metadata.display_name || 'Guest User';
}

function DetailRow({ children }: PropsWithChildren): React.ReactElement {
  return (
    <Flex
      align={{ base: 'flex-start', xs: 'center' }}
      direction={{ base: 'column', xs: 'row' }}
      gap={{ base: 4, xs: 24 }}
      justify="space-between"
    >
      {children}
    </Flex>
  );
}

function Profile(): React.ReactElement {
  const { user } = useUserStore((state) => state);
  const displayName = getDisplayName(user);

  return (
    <Box className={styles.page} component="main">
      <Flex
        align="flex-start"
        className={styles.header}
        component="header"
        direction={{ base: 'column', xs: 'row' }}
        gap={24}
        justify="space-between"
      >
        <Box>
          <Text className={styles.eyebrow}>Account</Text>
          <Title order={1}>Your profile</Title>
        </Box>
        <Badge color="teal" leftSection={<ShieldCheck size={14} />} variant="light">
          Authenticated
        </Badge>
      </Flex>

      <Card className={styles.profileCard} padding="xl" radius="md" withBorder>
        <Group align="center" gap="lg">
          <AvatarUser size={88} radius="sm" />
          <Box>
            <Title order={2}>{displayName}</Title>
            <Group c="dimmed" gap="xs" mt={4}>
              <Mail size={15} />
              <Text size="sm">{user?.email || 'No email address'}</Text>
            </Group>
          </Box>
        </Group>
      </Card>

      <Card className={styles.detailsCard} padding="xl" radius="md" withBorder>
        <Title order={3}>Account details</Title>
        <Divider my="lg" />
        <Stack gap="md">
          <DetailRow>
            <Text c="dimmed" size="sm">
              User ID
            </Text>
            <Text className={styles.detailValue} size="sm">
              {user?.id}
            </Text>
          </DetailRow>
          <DetailRow>
            <Group gap="xs">
              <CalendarDays size={16} />
              <Text c="dimmed" size="sm">
                Joined
              </Text>
            </Group>
            <Text size="sm">
              {user?.created_at ? dayUtils.formatDate(user.created_at) : 'Not available'}
            </Text>
          </DetailRow>
          <DetailRow>
            <Text c="dimmed" size="sm">
              Last sign in
            </Text>
            <Text size="sm">
              {user?.last_sign_in_at ? dayUtils.formatDate(user.last_sign_in_at) : 'Not available'}
            </Text>
          </DetailRow>
        </Stack>
      </Card>
    </Box>
  );
}

export default Profile;
