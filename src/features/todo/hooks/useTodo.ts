import { useCallback, useEffect, useMemo, useState } from 'react';

import { container } from '@/core/di';

import type { TodoItem } from '../types';
import { createTodoService } from '../todoModule';

/**
 * Scoped lifecycle — hook mount olduğunda service oluşturulur.
 * Backend'deki @RequestScope benzeri: ekran açıkken yaşar.
 */
export function useTodo() {
  const service = useMemo(() => createTodoService(container.storage), []);
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await service.list();
    setItems(data);
  }, [service]);

  useEffect(() => {
    let active = true;

    (async () => {
      const data = await service.list();
      if (active) {
        setItems(data);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [service]);

  const add = useCallback(
    async (text: string) => {
      const next = await service.add(text);
      setItems(next);
    },
    [service],
  );

  const toggle = useCallback(
    async (id: string) => {
      const next = await service.toggle(id);
      setItems(next);
    },
    [service],
  );

  const remove = useCallback(
    async (id: string) => {
      const next = await service.remove(id);
      setItems(next);
    },
    [service],
  );

  return {
    items,
    loading,
    add,
    toggle,
    remove,
    refresh,
    canAddMore: items.length < 5,
  };
}
