'use client';

import { Badge, Card, Divider, Group, Stack, Text, Title } from '@mantine/core';
import type { User } from '@supabase/supabase-js';
import { CalendarDays, Mail, ShieldCheck } from 'lucide-react';
import type React from 'react';
import AvatarUser from '@/components/AvatarUser';
import { useUserStore } from '@/stores/userStore';
import { dayUtils } from '@/utils/day';
import styles from './Profile.module.scss';

function getDisplayName(user: User | null): string {
  return user?.user_metadata.full_name || user?.user_metadata.name || user?.email || 'User';
}

function Profile(): React.ReactElement {
  const { user } = useUserStore((state) => state);

  const displayName = getDisplayName(user);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <Text className={styles.eyebrow}>Account</Text>
          <Title order={1}>Your profile</Title>
        </div>
        <Badge color="teal" leftSection={<ShieldCheck size={14} />} variant="light">
          Authenticated
        </Badge>
      </header>

      <Card className={styles.profileCard} padding="xl" radius="md" withBorder>
        <Group align="center" gap="lg">
          <AvatarUser size={88} radius="sm" />
          <div>
            <Title order={2}>{displayName}</Title>
            <Group c="dimmed" gap="xs" mt={4}>
              <Mail size={15} />
              <Text size="sm">{user?.email || 'No email address'}</Text>
            </Group>
          </div>
        </Group>
      </Card>

      <Card className={styles.detailsCard} padding="xl" radius="md" withBorder>
        <Title order={3}>Account details</Title>
        <Divider my="lg" />
        <Stack gap="md">
          <div className={styles.detailRow}>
            <Text c="dimmed" size="sm">
              User ID
            </Text>
            <Text className={styles.detailValue} size="sm">
              {user?.id}
            </Text>
          </div>
          <div className={styles.detailRow}>
            <Group gap="xs">
              <CalendarDays size={16} />
              <Text c="dimmed" size="sm">
                Joined
              </Text>
            </Group>
            <Text size="sm">
              {user?.created_at ? dayUtils.formatDate(user.created_at) : 'Not available'}
            </Text>
          </div>
          <div className={styles.detailRow}>
            <Text c="dimmed" size="sm">
              Last sign in
            </Text>
            <Text size="sm">
              {user?.last_sign_in_at ? dayUtils.formatDate(user.last_sign_in_at) : 'Not available'}
            </Text>
          </div>
        </Stack>
      </Card>
    </main>
  );
}

export default Profile;
