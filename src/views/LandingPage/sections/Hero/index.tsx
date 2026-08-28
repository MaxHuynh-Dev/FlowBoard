import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { ArrowRight, ChevronRight, Circle, Plus, Sparkles } from 'lucide-react';
import type React from 'react';
import { ROUTERS } from '@/enums/router';
import { projects } from '../data';
import styles from './Hero.module.scss';

const MINI_LINKS = ['Overview', 'Projects', 'Tasks', 'Calendar'];

const MINI_STATS = [
  ['12', 'Active projects'],
  ['84', 'Tasks completed'],
  ['87%', 'Productivity']
];

export default function Hero(): React.ReactElement {
  return (
    <Box className={styles.hero} component="section">
      <Container size="xl">
        <Grid align="center" columns={24} gap={{ base: 50, md: 64 }}>
          <GridCol className={styles.heroCopy} span={{ base: 24, md: 10 }}>
            <Badge
              className={styles.heroBadge}
              leftSection={<Sparkles size={13} />}
              variant="light"
            >
              A calmer workspace for ambitious teams
            </Badge>
            <Title className={styles.heroTitle} order={1}>
              The work is complex. Your workspace doesn&apos;t have to be.
            </Title>
            <Text className={styles.heroText}>
              FlowBoard brings projects, tasks, and team momentum into one beautifully focused
              place.
            </Text>
            <Group className={styles.heroActions} gap="sm">
              <Button
                className={styles.heroCta}
                component="a"
                href={ROUTERS.SIGN_UP}
                rightSection={<ArrowRight size={17} />}
              >
                Start for free
              </Button>
              <Button
                className={styles.secondaryCta}
                component="a"
                href="#features"
                rightSection={<ChevronRight size={16} />}
                variant="subtle"
              >
                See how it works
              </Button>
            </Group>
            <Text className={styles.noCard}>
              No credit card required <span>•</span> Free forever for small teams
            </Text>
          </GridCol>

          <GridCol
            aria-label="FlowBoard dashboard preview"
            className={styles.dashboardFrame}
            role="img"
            span={{ base: 24, md: 14 }}
          >
            <Group className={styles.windowBar} gap={6} wrap="nowrap">
              <span />
              <span />
              <span />
              <Text>flowboard / overview</Text>
            </Group>
            <Flex className={styles.dashboardPreview}>
              <Box className={styles.miniSidebar} component="aside" flex="0 0 auto">
                <Group className={styles.miniBrand} gap={6} wrap="nowrap">
                  <Center className={styles.miniBrandMark} component="span">
                    F
                  </Center>
                  flowboard
                </Group>
                <Box className={styles.miniWorkspace}>DESIGN TEAM</Box>
                {MINI_LINKS.map((item, index) => (
                  <Group
                    className={index === 0 ? styles.miniLinkActive : styles.miniLink}
                    gap={8}
                    key={item}
                    wrap="nowrap"
                  >
                    <Circle size={7} fill="currentColor" />
                    {item}
                  </Group>
                ))}
              </Box>
              <Box className={styles.miniMain} flex={1} miw={0}>
                <Group justify="space-between">
                  <Box>
                    <Text className={styles.miniKicker}>Tuesday, August 25</Text>
                    <Title order={3}>
                      Good morning, Jane <span>✦</span>
                    </Title>
                  </Box>
                  <Button className={styles.miniButton} leftSection={<Plus size={13} />} size="xs">
                    New project
                  </Button>
                </Group>
                <SimpleGrid className={styles.miniStats} cols={3} spacing={9}>
                  {MINI_STATS.map(([value, label]) => (
                    <Box className={styles.miniStat} key={label}>
                      <Text>{value}</Text>
                      <small>{label}</small>
                    </Box>
                  ))}
                </SimpleGrid>
                <Card className={styles.miniPanel} padding="md">
                  <Group justify="space-between" mb="md">
                    <Box>
                      <Text className={styles.miniPanelTitle}>Project pulse</Text>
                      <small>Team momentum at a glance</small>
                    </Box>
                    <ArrowRight size={14} />
                  </Group>
                  <Stack gap="sm">
                    {projects.map((project) => (
                      <Box key={project.name}>
                        <Group justify="space-between" mb={5}>
                          <Text className={styles.miniProject}>{project.name}</Text>
                          <small>{project.progress}%</small>
                        </Group>
                        <Progress color={project.color} size="xs" value={project.progress} />
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Box>
            </Flex>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}
