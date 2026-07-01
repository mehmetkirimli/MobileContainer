/**
 * Haftanın günleri — UI'da Türkçe etiket, kodda sabit anahtar.
 * Backend'deki enum karşılığı.
 */
export type WorkoutDayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

/** Kullanıcının haftalık spor hedefi (kurulumda bir kez sorulur, sonra güncellenebilir). */
export interface WorkoutSettings {
  /** Haftada kaç gün spor yapılacak — 1 ile 7 arası */
  weeklyGoalDays: number;
}

/**
 * Planlanmış tek bir spor aktivitesi.
 * Kullanıcı "2. aktivite" derken bu kayıttan birini doldurur.
 */
export interface  WorkoutActivity {
  id: string;
  dayOfWeek: WorkoutDayOfWeek;
  /** Örn. "Fitness", "Koşu", "Yüzme" */
  activityType: string;
  /** Örn. "Sırt + göğüs + ön kol" */
  details: string;
}
