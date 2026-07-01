import type { MiniAppDefinition } from '@/core/registry';

import { WorkoutApp } from './WorkoutApp';

export const workoutMiniApp: MiniAppDefinition = {
  id: 'workout',
  name: 'Spor Planı',
  description: 'Haftalık antrenman günlerini planla',
  icon: '💪',
  accentColor: '#f97316',
  category: 'health',
  enabled: true,
  component: WorkoutApp,
};
