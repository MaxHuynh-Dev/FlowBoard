import type React from 'react';

export default function WithoutSidebar({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
