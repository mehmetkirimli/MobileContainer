import type { WorkoutDayOfWeek } from './types';

export const WORKOUT_DAYS: { value: WorkoutDayOfWeek; label: string }[] = [
  { value: 'monday', label: 'Pazartesi' },
  { value: 'tuesday', label: 'Salı' },
  { value: 'wednesday', label: 'Çarşamba' },
  { value: 'thursday', label: 'Perşembe' },
  { value: 'friday', label: 'Cuma' },
  { value: 'saturday', label: 'Cumartesi' },
  { value: 'sunday', label: 'Pazar' },
];

export function getDayLabel(day: WorkoutDayOfWeek): string {
  return WORKOUT_DAYS.find((item) => item.value === day)?.label ?? day;
}
