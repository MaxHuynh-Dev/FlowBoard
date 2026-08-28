import { Box, Button, Container, Flex, Text, Title } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import type React from 'react';
import { ROUTERS } from '@/enums/router';
import styles from './CallToAction.module.scss';

export default function CallToAction(): React.ReactElement {
  return (
    <Box className={styles.ctaSection} component="section" id="pricing">
      <Container size="lg">
        <Flex
          align={{ base: 'flex-start', sm: 'center' }}
          className={styles.cta}
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 25, sm: 32 }}
          justify="space-between"
        >
          <Box>
            <Text className={styles.sectionKicker}>Your next chapter starts here</Text>
            <Title order={2}>Make good work feel lighter.</Title>
            <Text>Bring your team into focus with FlowBoard.</Text>
          </Box>
          <Button
            className={styles.heroCta}
            component="a"
            href={ROUTERS.LOGIN}
            rightSection={<ArrowRight size={17} />}
          >
            Create your workspace
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
