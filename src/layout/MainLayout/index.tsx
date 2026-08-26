import { MantineProvider } from '@mantine/core';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <MantineProvider>
      {children}
      <ToastContainer />
    </MantineProvider>
  );
}
