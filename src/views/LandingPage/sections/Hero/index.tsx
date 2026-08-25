import { Badge, Button, Card, Container, Group, Progress, Stack, Text, Title } from '@mantine/core';
import { ArrowRight, ChevronRight, Circle, Plus, Sparkles } from 'lucide-react';
import type React from 'react';
import { ROUTERS } from '@/enums/router';
import { projects } from '../data';
import styles from './Hero.module.scss';

export default function Hero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <Container className={styles.heroGrid} size="xl">
        <div className={styles.heroCopy}>
          <Badge className={styles.heroBadge} leftSection={<Sparkles size={13} />} variant="light">
            A calmer workspace for ambitious teams
          </Badge>
          <Title className={styles.heroTitle} order={1}>
            The work is complex. Your workspace doesn&apos;t have to be.
          </Title>
          <Text className={styles.heroText}>
            FlowBoard brings projects, tasks, and team momentum into one beautifully focused place.
          </Text>
          <Group className={styles.heroActions} gap="sm">
            <Button
              component="a"
              href={ROUTERS.SIGN_UP}
              className={styles.heroCta}
              rightSection={<ArrowRight size={17} />}
            >
              Start for free
            </Button>
            <Button
              component="a"
              href="#features"
              className={styles.secondaryCta}
              variant="subtle"
              rightSection={<ChevronRight size={16} />}
            >
              See how it works
            </Button>
          </Group>
          <Text className={styles.noCard}>
            No credit card required <span>•</span> Free forever for small teams
          </Text>
        </div>
        <div className={styles.dashboardFrame} role="img" aria-label="FlowBoard dashboard preview">
          <div className={styles.windowBar}>
            <span />
            <span />
            <span />
            <Text>flowboard / overview</Text>
          </div>
          <div className={styles.dashboardPreview}>
            <aside className={styles.miniSidebar}>
              <div className={styles.miniBrand}>
                <span>F</span> flowboard
              </div>
              <div className={styles.miniWorkspace}>DESIGN TEAM</div>
              {['Overview', 'Projects', 'Tasks', 'Calendar'].map((item, index) => (
                <div className={index === 0 ? styles.miniLinkActive : styles.miniLink} key={item}>
                  <Circle size={7} fill="currentColor" />
                  {item}
                </div>
              ))}
            </aside>
            <div className={styles.miniMain}>
              <Group justify="space-between">
                <div>
                  <Text className={styles.miniKicker}>Tuesday, August 25</Text>
                  <Title order={3}>
                    Good morning, Jane <span>✦</span>
                  </Title>
                </div>
                <Button className={styles.miniButton} size="xs">
                  <Plus size={13} /> New project
                </Button>
              </Group>
              <div className={styles.miniStats}>
                {[
                  ['12', 'Active projects'],
                  ['84', 'Tasks completed'],
                  ['87%', 'Productivity']
                ].map(([value, label]) => (
                  <div className={styles.miniStat} key={label}>
                    <Text>{value}</Text>
                    <small>{label}</small>
                  </div>
                ))}
              </div>
              <Card className={styles.miniPanel} padding="md">
                <Group justify="space-between" mb="md">
                  <div>
                    <Text className={styles.miniPanelTitle}>Project pulse</Text>
                    <small>Team momentum at a glance</small>
                  </div>
                  <ArrowRight size={14} />
                </Group>
                <Stack gap="sm">
                  {projects.map((project) => (
                    <div key={project.name}>
                      <Group justify="space-between" mb={5}>
                        <Text className={styles.miniProject}>{project.name}</Text>
                        <small>{project.progress}%</small>
                      </Group>
                      <Progress color={project.color} value={project.progress} size="xs" />
                    </div>
                  ))}
                </Stack>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
