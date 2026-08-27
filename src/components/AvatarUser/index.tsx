'use client';

import { Avatar as AvatarDicebear, Style } from '@dicebear/core';
import lorelei from '@dicebear/styles/micah.json' with { type: 'json' };
import { Avatar } from '@mantine/core';
import { useUserStore } from '@/stores/userStore';

const style = new Style(lorelei);

type Props = {
  size?: number;
  radius?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
};

function AvatarUser({ size = 35, radius = 'xl' }: Props): React.JSX.Element {
  const { user } = useUserStore((state) => state);
  const dataUri = new AvatarDicebear(style, {
    seed: user?.user_metadata.full_name,
    size: 228,
    backgroundColorFill: 'linear',
    backgroundColor: ['#ddd8d8']
  }).toDataUri();

  return (
    <Avatar
      src={user?.user_metadata.avatar_url || dataUri}
      radius={radius}
      size={size}
      alt={user?.user_metadata.full_name || 'Guest User'}
    />
  );
}

export default AvatarUser;
