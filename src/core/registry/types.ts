import type { ComponentType } from 'react';

export type MiniAppCategory = 'productivity' | 'health' | 'finance' | 'utility' | 'other';

export interface MiniAppProps {
  onBack: () => void;
}

/**
 * Plugin sözleşmesi — her mini-app bu tanımı export eder.
 * Shell sadece registry'yi okur; feature detaylarını bilmez (Open/Closed).
 */
export interface MiniAppDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  category: MiniAppCategory;
  enabled: boolean;
  component: ComponentType<MiniAppProps>;
}
