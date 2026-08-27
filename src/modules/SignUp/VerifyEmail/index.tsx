import { EmptyState } from '@mantine/core';
import { Mail } from 'lucide-react';

function VerifyEmail(): React.ReactElement {
  return (
    <EmptyState
      icon={<Mail color="red" />}
      title="Verify your email"
      description="Please check your email for a verification link to complete your account setup."
    />
  );
}

export default VerifyEmail;
