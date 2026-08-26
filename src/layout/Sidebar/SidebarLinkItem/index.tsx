'use client';

import { Text } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import styles from './SidebarLinkItem.module.scss';
export type SidebarLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  links?: SidebarLink[];
};

type SidebarLinkItemProps = {
  item: SidebarLink;
  pathname: string;
};

export default function SidebarLinkItem({
  item,
  pathname
}: SidebarLinkItemProps): React.ReactElement {
  const hasChildren = Boolean(item.links?.length);
  const [opened, setOpened] = useState(true);
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  console.log(pathname, item.href);
  return (
    <li className={styles.item}>
      <div className={styles.linkRow}>
        <Link className={`${styles.link} ${isActive ? styles.active : ''}`} href={item.href}>
          <Icon size={20} strokeWidth={1.8} />
          <Text size="md">{item.label}</Text>
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
