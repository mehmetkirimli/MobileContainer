import type { IStorage } from '@/core/storage';

import type { TodoItem } from './types';

const STORAGE_KEY = 'lefoonten:todo:items';

/**
 * Repository — sadece persistans sorumluluğu (Single Responsibility).
 */
export class TodoRepository {
  constructor(private readonly storage: IStorage) {}

  async getAll(): Promise<TodoItem[]> {
    return (await this.storage.get<TodoItem[]>(STORAGE_KEY)) ?? [];
  }

  async save(items: TodoItem[]): Promise<void> {
    await this.storage.set(STORAGE_KEY, items);
  }
}
