import type React from 'react';
import type { PropsWithChildren } from 'react';
import WithoutSidebar from '@/layout/WithoutSidebar';

type Props = PropsWithChildren;

export default function Layout({ children }: Props): React.ReactElement {
  return <WithoutSidebar>{children}</WithoutSidebar>;
}
