import type { IStorage } from '@/core/storage';

import { TodoRepository } from './TodoRepository';
import { TodoService } from './TodoService';

/**
 * Feature composition root — sadece bu modülün DI grafiği.
 *
 * Backend karşılığı: @Configuration sınıfı ama feature paketinde.
 * Yeni mini-app eklerken AppContainer'a dokunmazsın; buraya benzer dosya eklersin.
 */
export function createTodoService(storage: IStorage): TodoService {
  const repository = new TodoRepository(storage);
  return new TodoService(repository);
}
