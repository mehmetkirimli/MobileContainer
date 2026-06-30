import AsyncStorage from '@react-native-async-storage/async-storage';

import type { IStorage } from './IStorage';

/**
 * Adapter — AsyncStorage'ı IStorage port'una bağlar.
 * Yarın SQLite'a geçersen sadece bu sınıf değişir.
 */
export class AsyncStorageAdapter implements IStorage {
  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
