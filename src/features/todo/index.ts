import type { MiniAppDefinition } from '@/core/registry';

import { TodoApp } from './TodoApp';

export const todoMiniApp: MiniAppDefinition = {
  id: 'todo',
  name: 'Yapılacaklar',
  description: 'Günlük 5 maddelik liste',
  icon: '✅',
  accentColor: '#4ade80',
  category: 'productivity',
  enabled: true,
  component: TodoApp,
};
