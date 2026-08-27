import { Button, EmptyState } from '@mantine/core';
import { Mail } from 'lucide-react';

function VerifyEmail(): React.ReactElement {
  return (
    <EmptyState
      icon={<Mail />}
      title="Verify your email"
      description="Please check your email for a verification link to complete your account setup."
    >
      {/* <EmptyState.Actions>
        <Button variant="default">Reset filters</Button>
      </EmptyState.Actions> */}
    </EmptyState>
  );
}

export default VerifyEmail;
