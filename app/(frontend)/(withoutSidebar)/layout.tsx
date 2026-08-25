import type React from 'react';
import type { PropsWithChildren } from 'react';
import WithoutFooter from '@/layout/WithoutSidebar';

type Props = PropsWithChildren;

export default function Layout({ children }: Props): React.ReactElement {
  return <WithoutFooter>{children}</WithoutFooter>;
}
