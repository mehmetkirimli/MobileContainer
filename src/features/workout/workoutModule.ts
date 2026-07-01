import type { IStorage } from '@/core/storage';

import { WorkoutRepository } from './WorkoutRepository';
import { WorkoutService } from './WorkoutService';

/**
 * Feature composition root — sadece bu modülün DI grafiği.
 *
 * Backend karşılığı: @Configuration sınıfı ama feature paketinde.
 * AppContainer'a dokunmadan workout bağımlılıkları burada birleşir.
 */
export function createWorkoutService(storage: IStorage): WorkoutService {
  const repository = new WorkoutRepository(storage);
  return new WorkoutService(repository);
}
