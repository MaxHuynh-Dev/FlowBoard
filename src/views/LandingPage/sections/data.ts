import { BarChart3, FolderKanban, ListChecks } from 'lucide-react';

export const features = [
  {
    icon: FolderKanban,
    title: 'Projects that stay clear',
    description:
      'Give every initiative a focused home with goals, owners, timelines, and the context people need.'
  },
  {
    icon: ListChecks,
    title: 'Tasks that move forward',
    description:
      'Turn big plans into small, visible next steps so your team always knows what matters now.'
  },
  {
    icon: BarChart3,
    title: 'Progress you can trust',
    description:
      'See momentum at a glance with lightweight reporting that helps teams make better decisions.'
  }
];

export const projects = [
  { name: 'Website redesign', progress: 78, color: 'violet' },
  { name: 'Mobile app launch', progress: 46, color: 'cyan' },
  { name: 'Brand guidelines', progress: 91, color: 'lime' }
];

export const workflowSteps = [
  ['01', 'Capture the plan', 'Give every project a clear brief and a single source of truth.'],
  ['02', 'Shape the work', 'Break goals into tasks with owners, dates, and useful context.'],
  ['03', 'Keep moving', 'Celebrate progress and make the next decision with confidence.']
];
