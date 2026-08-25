import { DEFAULT_METADATA } from '@Constants/metadata';
import SignUp from '@Modules/SignUp';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Page(): React.ReactElement {
  return <SignUp />;
}
