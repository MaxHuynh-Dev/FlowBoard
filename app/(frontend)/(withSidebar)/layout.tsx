import type React from 'react';
import type { PropsWithChildren } from 'react';
import WithSidebar from '@/layout/WithSidebar';

type Props = PropsWithChildren;

export default function Layout({ children }: Props): React.ReactElement {
  return <WithSidebar>{children}</WithSidebar>;
}
