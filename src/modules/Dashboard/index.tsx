import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  GridCol,
  Group,
  Progress,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  FolderKanban,
  Sparkles,
  Users
} from 'lucide-react';
import type React from 'react';
import styles from './Dashboard.module.scss';
import Header from './section/Header';

const projects = [
  { name: 'Website redesign', team: 'Product & design', progress: 78, tone: 'violet' },
  { name: 'Mobile app launch', team: 'Engineering', progress: 46, tone: 'cyan' },
  { name: 'Brand guidelines', team: 'Marketing', progress: 91, tone: 'lime' }
];

const tasks = [
  { title: 'Review new homepage concepts', project: 'Website redesign', due: 'Today', done: false },
  {
    title: 'Prepare sprint planning notes',
    project: 'Mobile app launch',
    due: 'Tomorrow',
    done: false
  },
  { title: 'Share brand assets with team', project: 'Brand guidelines', due: 'Aug 28', done: true },
  { title: 'Update onboarding checklist', project: 'Website redesign', due: 'Aug 29', done: false }
];

const activity = [
  {
    name: 'Mia Chen',
    action: 'completed a task',
    detail: 'Review copy deck',
    time: '12 min ago',
    color: 'violet'
  },
  {
    name: 'Noah Williams',
    action: 'commented on',
    detail: 'Mobile app launch',
    time: '1 hour ago',
    color: 'cyan'
  },
  {
    name: 'You',
    action: 'created a project',
    detail: 'Brand guidelines',
    time: '3 hours ago',
    color: 'lime'
  }
];

const stats: Array<{
  label: string;
  value: string;
  change: string;
  color: string;
  Icon: LucideIcon;
}> = [
  { label: 'Active projects', value: '12', change: '+2', color: 'violet', Icon: FolderKanban },
  { label: 'Tasks completed', value: '84', change: '+18%', color: 'cyan', Icon: Check },
  { label: 'Team members', value: '24', change: '3', color: 'orange', Icon: Users }
];

export default function Dashboard(): React.ReactElement {
  return (
    <Box className={styles.page}>
      <Header />

      <Box aria-label="Workspace overview" component="section">
        <SimpleGrid className={styles.stats} cols={{ base: 2, md: 4 }} spacing={16}>
          {stats.map(({ label, value, change, color, Icon }) => (
            <Card className={styles.statCard} key={label} padding="lg">
              <Group align="flex-start" justify="space-between">
                <Box>
                  <Text className={styles.statLabel}>{label}</Text>
                  <Text className={styles.statValue}>{value}</Text>
                </Box>
                <ThemeIcon className={styles.statIcon} color={color} variant="light">
                  <Icon size={19} />
                </ThemeIcon>
              </Group>
              <Text className={styles.statChange}>
                <strong>{change}</strong>{' '}
                {label === 'Team members' ? 'new this month' : 'from last week'}
              </Text>
            </Card>
          ))}
          <Card className={styles.statCard} padding="lg">
            <Group align="flex-start" justify="space-between">
              <Box>
                <Text className={styles.statLabel}>Productivity</Text>
                <Text className={styles.statValue}>87%</Text>
              </Box>
              <RingProgress sections={[{ value: 87, color: 'lime' }]} size={44} thickness={5} />
            </Group>
            <Text className={styles.statChange}>
              <strong>+4.2%</strong> this week
            </Text>
          </Card>
        </SimpleGrid>
      </Box>

      <Box component="section">
        <Grid className={styles.contentGrid} columns={50} gap={16}>
          <GridCol span={{ base: 50, md: 27 }}>
            <Card className={styles.panel} h="100%" padding="xl">
              <Group align="flex-start" className={styles.panelHeading} justify="space-between">
                <Box>
                  <Title order={3}>Project pulse</Title>
                  <Text className={styles.panelHint}>
                    Keep an eye on your team&apos;s momentum.
                  </Text>
                </Box>
                <Button
                  className={styles.linkButton}
                  rightSection={<ArrowUpRight size={15} />}
                  variant="subtle"
                >
                  View all
                </Button>
              </Group>
              <Stack gap="xl">
                {projects.map((project) => (
                  <Box key={project.name}>
                    <Group justify="space-between" mb={8}>
                      <Box>
                        <Text className={styles.projectName}>{project.name}</Text>
                        <Text className={styles.projectTeam}>{project.team}</Text>
                      </Box>
                      <Text className={styles.percent}>{project.progress}%</Text>
                    </Group>
                    <Progress
                      className={styles.progress}
                      color={project.tone}
                      size="sm"
                      value={project.progress}
                    />
                  </Box>
                ))}
              </Stack>
              <Group align="center" className={styles.insight} gap={9} wrap="nowrap">
                <ThemeIcon color="yellow" radius="xl" size="sm" variant="light">
                  <Sparkles size={14} />
                </ThemeIcon>
                <Text inherit>
                  <strong>Nice pace.</strong> Your team is ahead of schedule on 4 projects.
                </Text>
              </Group>
            </Card>
          </GridCol>

          <GridCol span={{ base: 50, md: 23 }}>
            <Card className={styles.panel} h="100%" padding="xl">
              <Group align="flex-start" className={styles.panelHeading} justify="space-between">
                <Box>
                  <Title order={3}>My tasks</Title>
                  <Text className={styles.panelHint}>4 tasks need your attention.</Text>
                </Box>
                <ActionIcon aria-label="Open task calendar" variant="default">
                  <CalendarDays size={17} />
                </ActionIcon>
              </Group>
              <Stack gap={0}>
                {tasks.map((task) => (
                  <Flex align="center" className={styles.task} gap={11} key={task.title}>
                    <Center
                      className={task.done ? styles.taskCheckDone : styles.taskCheck}
                      component="span"
                      flex="0 0 18px"
                    >
                      <CircleDashed size={17} />
                    </Center>
                    <Box flex={1} miw={0}>
                      <Text className={task.done ? styles.taskDone : styles.taskTitle}>
                        {task.title}
                      </Text>
                      <Text className={styles.taskProject}>{task.project}</Text>
                    </Box>
                    <Badge
                      className={styles.due}
                      color={task.due === 'Today' ? 'orange' : 'gray'}
                      variant="light"
                    >
                      {task.due}
                    </Badge>
                  </Flex>
                ))}
              </Stack>
              <Button
                className={styles.fullLink}
                rightSection={<ChevronRight size={15} />}
                variant="subtle"
              >
                Open task list
              </Button>
            </Card>
          </GridCol>
        </Grid>
      </Box>

      <Box component="section">
        <Grid className={styles.bottomGrid} columns={50} gap={16}>
          <GridCol span={{ base: 50, md: 27 }}>
            <Card className={styles.panel} h="100%" padding="xl">
              <Group align="flex-start" className={styles.panelHeading} justify="space-between">
                <Box>
                  <Title order={3}>Recent activity</Title>
                  <Text className={styles.panelHint}>The latest updates from your team.</Text>
                </Box>
                <Button className={styles.linkButton} variant="subtle">
                  See activity
                </Button>
              </Group>
              <Stack gap="lg">
                {activity.map((item) => (
                  <Group
                    align="flex-start"
                    gap="sm"
                    key={`${item.name}-${item.detail}`}
                    wrap="nowrap"
                  >
                    <Avatar color={item.color} radius="xl">
                      {item.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')}
                    </Avatar>
                    <Box className={styles.activityText} flex={1} miw={0}>
                      <Text inherit>
                        <strong>{item.name}</strong> {item.action} <span>{item.detail}</span>
                      </Text>
                      <Group align="center" gap={5} mt={4}>
                        <Clock3 size={12} />
                        <Text className={styles.time}>{item.time}</Text>
                      </Group>
                    </Box>
                  </Group>
                ))}
              </Stack>
            </Card>
          </GridCol>
          <GridCol span={{ base: 50, md: 23 }}>
            <Card className={styles.focusCard} h="100%" padding="xl">
              <Stack flex={1} gap={0} justify="space-between">
                <Box>
                  <Text className={styles.focusKicker}>Weekly focus</Text>
                  <Title order={3}>Make space for deep work.</Title>
                  <Text>
                    Protect a little time for the work that moves your biggest project forward.
                  </Text>
                </Box>
                <Button
                  className={styles.focusButton}
                  rightSection={<ArrowUpRight size={16} />}
                  variant="white"
                >
                  Plan my week
                </Button>
              </Stack>
            </Card>
          </GridCol>
        </Grid>
      </Box>
    </Box>
  );
}
