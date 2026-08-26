'use client';

import {
  Activity,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  Users
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { ROUTERS } from '@/enums/router';
import styles from './Sidebar.module.scss';
import SidebarLinkItem, { type SidebarLink } from './SidebarLinkItem';
import User from './User';

const links: SidebarLink[] = [
  { label: 'Dashboard', href: ROUTERS.DASHBOARD, icon: LayoutDashboard },
  {
    label: 'Projects',
    href: '/projects',
    icon: FolderKanban,
    links: [
      { label: 'Active projects', href: '/projects/active', icon: FolderKanban },
      { label: 'Archived projects', href: '/projects/archived', icon: FolderKanban }
    ]
  },
  { label: 'Tasks', href: '/tasks', icon: ListTodo },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Activity', href: '/activity', icon: Activity },
  { label: 'Members', href: '/members', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings }
];

export default function Sidebar(): React.ReactElement {
  const pathname = usePathname();
  return (
    <aside aria-label="Workspace navigation" className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>F</span>
        <span>FlowBoard</span>
      </div>
      {/* <div className={styles.workspace}>
        <span className={styles.workspaceLabel}>Workspace</span>
        <strong>Design team</strong>
      </div> */}
      <nav>
        <ul className={styles.links}>
          {links.map((item) => (
            <SidebarLinkItem item={item} key={item.href} pathname={pathname} />
          ))}
        </ul>
      </nav>
      <User />
    </aside>
  );
}
