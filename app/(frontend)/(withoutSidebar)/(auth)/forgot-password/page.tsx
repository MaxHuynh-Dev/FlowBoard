import { DEFAULT_METADATA } from '@Constants/metadata';
import ForgotPassword from '@Modules/ForgotPassword';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Page(): React.ReactElement {
  return <ForgotPassword />;
}
