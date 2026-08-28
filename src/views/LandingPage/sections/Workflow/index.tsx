import { Box, Center, Container, Grid, GridCol, Group, Stack, Text, Title } from '@mantine/core';
import { Users } from 'lucide-react';
import type React from 'react';
import { workflowSteps } from '../data';
import styles from './Workflow.module.scss';

export default function Workflow(): React.ReactElement {
  return (
    <Box className={styles.workflowSection} component="section" id="workflow">
      <Container size="lg">
        <Grid align="center" className={styles.workflowGrid} gap={{ base: 60, md: 100 }}>
          <GridCol className={styles.workflowCopy} span={{ base: 12, md: 6 }}>
            <Text className={styles.sectionKicker}>A better daily flow</Text>
            <Title order={2}>From scattered thoughts to shared momentum.</Title>
            <Text>
              Make the next step obvious for everyone, whether you&apos;re planning a launch or
              finishing the last 10%.
            </Text>
            <Stack className={styles.steps} gap="lg">
              {workflowSteps.map(([number, title, description]) => (
                <Group align="flex-start" gap="md" key={number} wrap="nowrap">
                  <span className={styles.stepNumber}>{number}</span>
                  <Box>
                    <Title order={4}>{title}</Title>
                    <Text>{description}</Text>
                  </Box>
                </Group>
              ))}
            </Stack>
          </GridCol>
          <GridCol className={styles.quotePanel} span={{ base: 12, md: 6 }}>
            <Box className={styles.quoteMark}>“</Box>
            <Text className={styles.quote}>
              FlowBoard gave us the shared language we were missing. Our weekly planning went from a
              meeting everyone endured to a moment everyone uses.
            </Text>
            <Group mt="xl">
              <Center className={styles.avatarMock}>
                <Users size={17} />
              </Center>
              <Box>
                <Text className={styles.quoteName}>Mia Chen</Text>
                <Text className={styles.quoteRole}>Head of Product, Northstar</Text>
              </Box>
            </Group>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}
