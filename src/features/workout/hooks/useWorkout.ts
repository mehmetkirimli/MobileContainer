import { useCallback, useEffect, useMemo, useState } from 'react';

import { container } from '@/core/di';

import type { SaveActivityInput } from '../WorkoutService';
import { createWorkoutService } from '../workoutModule';
import type { WorkoutActivity, WorkoutSettings } from '../types';

/**
 * Scoped lifecycle — hook mount olduğunda service oluşturulur.
 * Service (async) ile React state (sync UI) arasındaki köprü.
 */
export function useWorkout() {
  const service = useMemo(() => createWorkoutService(container.storage), []);
  const [settings, setSettings] = useState<WorkoutSettings | null>(null);
  const [activities, setActivities] = useState<WorkoutActivity[]>([]);
  const [planComplete, setPlanComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  const sync = useCallback(async () => {
    const [nextSettings, nextActivities, complete] = await Promise.all([
      service.getSettings(),
      service.getActivities(),
      service.isPlanComplete(),
    ]);

    setSettings(nextSettings);
    setActivities(nextActivities);
    setPlanComplete(complete);
  }, [service]);

  useEffect(() => {
    let active = true;

    (async () => {
      await sync();  
      if (active) {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [sync]);

  const setWeeklyGoalDays = useCallback(
    async (days: number) => {
      const next = await service.setWeeklyGoalDays(days);
      if (next) {
        setSettings(next);
      }
      await sync();
    },
    [service, sync],
  );

  const saveActivity = useCallback(
    async (input: SaveActivityInput) => {
      const next = await service.saveActivity(input);
      setActivities(next);
      await sync();
    },
    [service, sync],
  );

  const removeActivity = useCallback(
    async (id: string) => {
      const next = await service.removeActivity(id);
      setActivities(next);
      await sync();
    },
    [service, sync],
  );

  const clearActivities = useCallback(async () => {
    await service.clearActivities();
    await sync();
  }, [service, sync]);

  const weeklyGoalDays = settings?.weeklyGoalDays ?? 0;
  const needsSetup = settings === null;
  const needsPlanning = settings !== null && !planComplete;
  const remainingSlots = Math.max(weeklyGoalDays - activities.length, 0);

  return {
    settings,
    activities,
    loading,
    planComplete,
    needsSetup,
    needsPlanning,
    weeklyGoalDays,
    remainingSlots,
    canAddMore: remainingSlots > 0,
    setWeeklyGoalDays,
    saveActivity,
    removeActivity,
    clearActivities,
    refresh: sync,
  };
}
