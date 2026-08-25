import type { Metadata } from 'next';
import type React from 'react';
import { DEFAULT_METADATA } from '@/constants/metadata';
import LandingPage from '@/views/LandingPage';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Page(): React.ReactElement {
  return <LandingPage />;
}
