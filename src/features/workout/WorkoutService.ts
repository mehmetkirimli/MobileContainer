import type { WorkoutRepository } from './WorkoutRepository';
import type { WorkoutActivity, WorkoutDayOfWeek, WorkoutSettings } from './types';

const MIN_WEEKLY_DAYS = 1;
const MAX_WEEKLY_DAYS = 7;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export interface SaveActivityInput {
  id?: string;
  dayOfWeek: WorkoutDayOfWeek;
  activityType: string;
  details: string;
}

/**
 * Application Service — iş kuralları burada (backend @Service katmanı).
 */
export class WorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}

  async getSettings(): Promise<WorkoutSettings | null> {
    return this.repository.getSettings();
  }

  async getActivities(): Promise<WorkoutActivity[]> {
    return this.repository.getActivities();
  }

  /** Kurulum yapılmadı — "kaç gün?" sorusu göster */
  async needsSetup(): Promise<boolean> {
    return (await this.repository.getSettings()) === null;
  }

  /** Hedef gün sayısı var ama plan henüz tam değil */
  async needsPlanning(): Promise<boolean> {
    const settings = await this.repository.getSettings();
    if (!settings) {
      return false;
    }

    return !(await this.isPlanComplete());
  }

  /** Tüm aktivite slotları dolu ve geçerli mi? */
  async isPlanComplete(): Promise<boolean> {
    const settings = await this.repository.getSettings();
    if (!settings) {
      return false;
    }

    const activities = await this.repository.getActivities();
    if (activities.length !== settings.weeklyGoalDays) {
      return false;
    }

    return activities.every(
      (activity) => activity.activityType.trim().length > 0 && activity.details.trim().length > 0,
    );
  }

  /**
   * Haftalık hedef gün sayısını kaydet (1–7).
   * Hedef düşürülürse fazla aktiviteler kesilir.
   */
  async setWeeklyGoalDays(days: number): Promise<WorkoutSettings | null> {
    const normalized = Math.floor(days);
    if (normalized < MIN_WEEKLY_DAYS || normalized > MAX_WEEKLY_DAYS) {
      return this.repository.getSettings();
    }

    const settings: WorkoutSettings = { weeklyGoalDays: normalized };
    await this.repository.saveSettings(settings);

    const activities = await this.repository.getActivities();
    if (activities.length > normalized) {
      await this.repository.saveActivities(activities.slice(0, normalized));
    }

    return settings;
  }

  /**
   * Yeni aktivite ekle veya mevcut olanı güncelle.
   * Aynı gün iki kez planlanamaz.
   */
  async saveActivity(input: SaveActivityInput): Promise<WorkoutActivity[]> {
    const settings = await this.repository.getSettings();
    if (!settings) {
      return this.repository.getActivities();
    }

    const activityType = input.activityType.trim();
    const details = input.details.trim();
    if (!activityType || !details) {
      return this.repository.getActivities();
    }

    const activities = await this.repository.getActivities();
    const duplicateDay = activities.find(
      (activity) => activity.dayOfWeek === input.dayOfWeek && activity.id !== input.id,
    );
    if (duplicateDay) {
      return activities;
    }

    if (input.id) {
      const index = activities.findIndex((activity) => activity.id === input.id);
      if (index === -1) {
        return activities;
      }

      const next = [...activities];
      next[index] = {
        id: input.id,
        dayOfWeek: input.dayOfWeek,
        activityType,
        details,
      };
      await this.repository.saveActivities(next);
      return next;
    }

    if (activities.length >= settings.weeklyGoalDays) {
      return activities;
    }

    const next: WorkoutActivity[] = [
      ...activities,
      {
        id: createId(),  
        dayOfWeek: input.dayOfWeek,
        activityType,
        details,
      },
    ];

    await this.repository.saveActivities(next);
    return next;  
  }

  async removeActivity(id: string): Promise<WorkoutActivity[]> {
    const activities = await this.repository.getActivities();
    const next = activities.filter((activity) => activity.id !== id);
    await this.repository.saveActivities(next);
    return next;
  }

  /** Sadece planı sıfırla — hedef gün sayısı kalır */
  async clearActivities(): Promise<void> {
    await this.repository.saveActivities([]);
  }
}
