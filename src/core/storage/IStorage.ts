/**
 * Port — backend'deki repository interface karşılığı.
 * Infrastructure katmanı bu sözleşmeyi implement eder.
 */
export interface IStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}
