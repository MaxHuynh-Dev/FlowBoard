'use client';

import {
  Activity,
  CalendarDays,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import styles from './Sidebar.module.scss';

type SidebarLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  links?: SidebarLink[];
};

const links: SidebarLink[] = [
  { label: 'Overview', href: '#overview', icon: LayoutDashboard },
  {
    label: 'Projects',
    href: '#projects',
    icon: FolderKanban,
    links: [
      { label: 'Active projects', href: '#active-projects', icon: FolderKanban },
      { label: 'Archived projects', href: '#archived-projects', icon: FolderKanban }
    ]
  },
  { label: 'Tasks', href: '#tasks', icon: ListTodo },
  { label: 'Calendar', href: '#calendar', icon: CalendarDays },
  { label: 'Activity', href: '#activity', icon: Activity },
  { label: 'Members', href: '#members', icon: Users },
  { label: 'Settings', href: '#settings', icon: Settings }
];

function SidebarLinkItem({ item, pathname }: { item: SidebarLink; pathname: string }) {
  const hasChildren = Boolean(item.links?.length);
  const [opened, setOpened] = useState(true);
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <li className={styles.item}>
      <div className={styles.linkRow}>
        <Link className={`${styles.link} ${isActive ? styles.active : ''}`} href={item.href}>
          <Icon size={18} strokeWidth={1.8} />
          <span>{item.label}</span>
        </Link>
        {hasChildren ? (
          <button
            aria-label={`${opened ? 'Collapse' : 'Expand'} ${item.label}`}
            aria-expanded={opened}
            className={styles.chevronButton}
            onClick={() => setOpened((value) => !value)}
            type="button"
          >
            <ChevronRight className={opened ? styles.chevronOpened : ''} size={16} />
          </button>
        ) : null}
      </div>
      {hasChildren && opened ? (
        <ul className={styles.nested}>
          {item.links?.map((child) => (
            <SidebarLinkItem item={child} key={child.href} pathname={pathname} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function Sidebar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <aside aria-label="Workspace navigation" className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>F</span>
        <span>FlowBoard</span>
      </div>
      <div className={styles.workspace}>
        <span className={styles.workspaceLabel}>Workspace</span>
        <strong>Design team</strong>
      </div>
      <nav>
        <ul className={styles.links}>
          {links.map((item) => (
            <SidebarLinkItem item={item} key={item.href} pathname={pathname} />
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>Version 1.0</div>
    </aside>
  );
}
