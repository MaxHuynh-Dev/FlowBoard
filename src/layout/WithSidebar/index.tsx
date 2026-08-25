import Sidebar from '@Layout/Sidebar';
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
      <main className={styles.main}>{children}</main>
    </div>
  );
}
