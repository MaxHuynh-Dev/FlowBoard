import { Button, EmptyState, Flex, Loader } from '@mantine/core';
import { CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ROUTERS } from '@/enums/router';

function AccessDashboard(): React.ReactElement {
  const [loadAuth, setLoadAuth] = React.useState(true);

  return (
    <>
      {loadAuth ? (
        <Flex align={'center'} justify={'center'}>
          <Loader color="blue" size="lg" type="dots" />
        </Flex>
      ) : (
        <EmptyState
          icon={<CircleCheckBig color="green" />}
          title="Welcome to FlowBoard!"
          description="You have successfully created your account. You can now access the dashboard and start using FlowBoard."
        >
          <EmptyState.Actions>
            <Link href={ROUTERS.DASHBOARD}>
              <Button variant="default">Go to Dashboard</Button>
            </Link>
          </EmptyState.Actions>
        </EmptyState>
      )}
    </>
  );
}

export default AccessDashboard;
