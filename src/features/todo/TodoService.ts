import type { TodoRepository } from './TodoRepository';
import type { TodoItem } from './types';

const MAX_ITEMS = 5;

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Application Service — iş kuralları burada (backend Service katmanı).
 */
export class TodoService {
  constructor(private readonly repository: TodoRepository) {}

  async list(): Promise<TodoItem[]> {
    return this.repository.getAll();
  }

  async add(text: string): Promise<TodoItem[]> {
    const trimmed = text.trim();
    if (!trimmed) {
      return this.repository.getAll();
    }

    const items = await this.repository.getAll();
    if (items.length >= MAX_ITEMS) {
      return items;
    }

    const next: TodoItem[] = [
      {
        id: createId(),
        text: trimmed,
        done: false,
        createdAt: new Date().toISOString(),
      },
      ...items,
    ];

    await this.repository.save(next);
    return next;
  }

  async toggle(id: string): Promise<TodoItem[]> {
    const items = await this.repository.getAll();
    const next = items.map((item) => (item.id === id ? { ...item, done: !item.done } : item));
    await this.repository.save(next);
    return next;
  }

  async remove(id: string): Promise<TodoItem[]> {
    const items = await this.repository.getAll();
    const next = items.filter((item) => item.id !== id);
    await this.repository.save(next);
    return next;
  }
}
