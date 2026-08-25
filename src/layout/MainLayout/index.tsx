import Header from '@Layout/Header';
import { MantineProvider } from '@mantine/core';
import type React from 'react';
import type { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <MantineProvider>
      <Header />
      {children}
    </MantineProvider>
  );
}
