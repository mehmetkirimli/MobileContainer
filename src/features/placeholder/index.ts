import type { MiniAppDefinition } from '@/core/registry';

import { PlaceholderApp } from './PlaceholderApp';

export const placeholderMiniApp: MiniAppDefinition = {
  id: 'placeholder',
  name: 'Demo',
  description: 'Altyapı test ekranı',
  icon: '🎭',
  accentColor: '#7c6cf0',
  category: 'utility',
  enabled: true,
  component: PlaceholderApp,
};
