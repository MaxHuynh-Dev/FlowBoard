import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Progress,
  RingProgress,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  FolderKanban,
  Plus,
  Sparkles,
  Users
} from 'lucide-react';
import type React from 'react';
import styles from './Dashboard.module.scss';

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
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <Text className={styles.kicker}>Tuesday, August 25, 2026</Text>
          <Title order={1}>
            Good morning, Jane <span aria-hidden="true">✦</span>
          </Title>
          <Text className={styles.subtitle}>
            Here&apos;s what&apos;s happening across your workspace.
          </Text>
        </div>
        <Group className={styles.headerActions} gap="sm">
          <ActionIcon
            aria-label="Notifications"
            className={styles.iconButton}
            size="lg"
            variant="default"
          >
            <Bell size={18} strokeWidth={1.8} />
          </ActionIcon>
          <Button leftSection={<Plus size={17} />}>New project</Button>
        </Group>
      </header>

      <section className={styles.stats} aria-label="Workspace overview">
        {stats.map(({ label, value, change, color, Icon }) => (
          <Card className={styles.statCard} key={label} padding="lg">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text className={styles.statLabel}>{label}</Text>
                <Text className={styles.statValue}>{value}</Text>
              </div>
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
          <Group justify="space-between" align="flex-start">
            <div>
              <Text className={styles.statLabel}>Productivity</Text>
              <Text className={styles.statValue}>87%</Text>
            </div>
            <RingProgress sections={[{ value: 87, color: 'lime' }]} size={44} thickness={5} />
          </Group>
          <Text className={styles.statChange}>
            <strong>+4.2%</strong> this week
          </Text>
        </Card>
      </section>

      <section className={styles.contentGrid}>
        <Card className={styles.panel} padding="xl">
          <Group className={styles.panelHeading} justify="space-between">
            <div>
              <Title order={3}>Project pulse</Title>
              <Text className={styles.panelHint}>Keep an eye on your team&apos;s momentum.</Text>
            </div>
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
              <div className={styles.project} key={project.name}>
                <Group justify="space-between" mb={8}>
                  <div>
                    <Text className={styles.projectName}>{project.name}</Text>
                    <Text className={styles.projectTeam}>{project.team}</Text>
                  </div>
                  <Text className={styles.percent}>{project.progress}%</Text>
                </Group>
                <Progress
                  className={styles.progress}
                  color={project.tone}
                  value={project.progress}
                  size="sm"
                />
              </div>
            ))}
          </Stack>
          <div className={styles.insight}>
            <ThemeIcon color="yellow" radius="xl" size="sm" variant="light">
              <Sparkles size={14} />
            </ThemeIcon>
            <Text>
              <strong>Nice pace.</strong> Your team is ahead of schedule on 4 projects.
            </Text>
          </div>
        </Card>

        <Card className={styles.panel} padding="xl">
          <Group className={styles.panelHeading} justify="space-between">
            <div>
              <Title order={3}>My tasks</Title>
              <Text className={styles.panelHint}>4 tasks need your attention.</Text>
            </div>
            <ActionIcon
              aria-label="Open task calendar"
              className={styles.iconButton}
              variant="default"
            >
              <CalendarDays size={17} />
            </ActionIcon>
          </Group>
          <Stack className={styles.taskList} gap={0}>
            {tasks.map((task) => (
              <div className={styles.task} key={task.title}>
                <span className={task.done ? styles.taskCheckDone : styles.taskCheck}>
                  <CircleDashed size={17} />
                </span>
                <div className={styles.taskBody}>
                  <Text className={task.done ? styles.taskDone : styles.taskTitle}>
                    {task.title}
                  </Text>
                  <Text className={styles.taskProject}>{task.project}</Text>
                </div>
                <Badge
                  className={styles.due}
                  color={task.due === 'Today' ? 'orange' : 'gray'}
                  variant="light"
                >
                  {task.due}
                </Badge>
              </div>
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
      </section>

      <section className={styles.bottomGrid}>
        <Card className={styles.panel} padding="xl">
          <Group className={styles.panelHeading} justify="space-between">
            <div>
              <Title order={3}>Recent activity</Title>
              <Text className={styles.panelHint}>The latest updates from your team.</Text>
            </div>
            <Button className={styles.linkButton} variant="subtle">
              See activity
            </Button>
          </Group>
          <Stack gap="lg">
            {activity.map((item) => (
              <Group align="flex-start" gap="sm" key={`${item.name}-${item.detail}`}>
                <Avatar color={item.color} radius="xl">
                  {item.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')}
                </Avatar>
                <div className={styles.activityText}>
                  <Text>
                    <strong>{item.name}</strong> {item.action} <span>{item.detail}</span>
                  </Text>
                  <Text className={styles.time}>
                    <Clock3 size={12} />
                    {item.time}
                  </Text>
                </div>
              </Group>
            ))}
          </Stack>
        </Card>
        <Card className={styles.focusCard} padding="xl">
          <Text className={styles.focusKicker}>Weekly focus</Text>
          <Title order={3}>Make space for deep work.</Title>
          <Text>Protect a little time for the work that moves your biggest project forward.</Text>
          <Button
            className={styles.focusButton}
            rightSection={<ArrowUpRight size={16} />}
            variant="white"
          >
            Plan my week
          </Button>
        </Card>
      </section>
    </div>
  );
}
