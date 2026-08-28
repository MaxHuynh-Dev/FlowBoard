import { Box, Container, Flex, Text } from '@mantine/core';
import type React from 'react';
import styles from './TrustBand.module.scss';

const teams = ['northstar', 'ARC / studio', 'kinetic', 'fieldwork', 'daylight'];

export default function TrustBand(): React.ReactElement {
  return (
    <Box className={styles.trustBand} component="section">
      <Container size="xl">
        <Text>Trusted by teams who care about how work gets done</Text>
        <Flex
          className={styles.trustNames}
          gap={{ base: 16, sm: 0 }}
          justify={{ base: 'center', sm: 'space-between' }}
          wrap="wrap"
        >
          {teams.map((team) => (
            <span key={team}>{team}</span>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
