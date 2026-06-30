import { placeholderMiniApp } from '@/features/placeholder';
import { todoMiniApp } from '@/features/todo';

import type { MiniAppDefinition } from './types';

/**
 * Merkezi plugin listesi — yeni app eklemek için buraya 1 satır yeter.
 */
export const MINI_APPS: MiniAppDefinition[] = [placeholderMiniApp, todoMiniApp];

export function getMiniAppById(id: string): MiniAppDefinition | undefined {
  return MINI_APPS.find((app) => app.id === id && app.enabled);
}

export function getEnabledMiniApps(): MiniAppDefinition[] {
  return MINI_APPS.filter((app) => app.enabled);
}
