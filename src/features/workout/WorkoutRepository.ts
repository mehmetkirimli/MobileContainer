import type { IStorage } from '@/core/storage';

import type { WorkoutActivity, WorkoutSettings } from './types';

const SETTINGS_KEY = 'lefoonten:workout:settings';
const ACTIVITIES_KEY = 'lefoonten:workout:activities';

/**
 * Repository — sadece okuma/yazma (Single Responsibility).
 * İş kuralı yok: "kaç gün geçerli?" gibi kontroller Service'te yapılır.
 */
export class WorkoutRepository {
  constructor(private readonly storage: IStorage) {}

  async getSettings(): Promise<WorkoutSettings | null> {
    return this.storage.get<WorkoutSettings>(SETTINGS_KEY);
  }

  async saveSettings(settings: WorkoutSettings): Promise<void> {
    await this.storage.set(SETTINGS_KEY, settings);
  }

  async getActivities(): Promise<WorkoutActivity[]> {
    return (await this.storage.get<WorkoutActivity[]>(ACTIVITIES_KEY)) ?? [];
  }

  async saveActivities(activities: WorkoutActivity[]): Promise<void> {
    await this.storage.set(ACTIVITIES_KEY, activities);
  }
}
