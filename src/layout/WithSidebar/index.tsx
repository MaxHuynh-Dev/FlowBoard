import Sidebar from '@Layout/Sidebar';
import { ScrollArea } from '@mantine/core';
import type React from 'react';
import styles from './layout.module.scss';

export default function WithSidebar({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <ScrollArea h={'100%'} type="never" scrollbarSize={6}>
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}
