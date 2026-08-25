'use client';

import { Image } from '@mantine/core';
import {
  Activity,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  MoreVertical,
  Settings,
  Users
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import type React from 'react';
import styles from './Sidebar.module.scss';
import SidebarLinkItem, { type SidebarLink } from './SidebarLinkItem';

const links: SidebarLink[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
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
        {/* <span className={styles.brandMark}>F</span> */}
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
      <button className={styles.user} title="Open user menu" type="button">
        <span aria-hidden="true" className={styles.avatar}>
          <Image
            className="m_11f8ac07 mantine-Avatar-image"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            alt="Harriette Spoonlicker"
          />
        </span>
        <span className={styles.userInfo}>
          <strong>Jane Doe</strong>
          <span>jane.doe@example.com</span>
        </span>
        <MoreVertical aria-hidden="true" size={17} />
      </button>
    </aside>
  );
}
