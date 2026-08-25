import { DEFAULT_METADATA } from '@Constants/metadata';
import type { Metadata } from 'next';
import type React from 'react';
import Login from '@/modules/Login';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Page(): React.ReactElement {
  return <Login />;
}
