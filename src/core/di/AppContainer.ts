import { AsyncStorageAdapter, type IStorage } from '@/core/storage';

/**
 * Composition Root — uygulama genelindeki singleton'lar.
 *
 * Backend karşılığı: Spring @Configuration (sadece infra bean'leri).
 * Feature servisleri burada DEĞİL — her modül kendi factory'sine sahip (Open/Closed).
 *
 * Lifecycle:
 * - Singleton: container, storage
 * - Scoped: feature hook mount → feature factory çağrılır
 * - Transient: React useState (ekran içi UI state)
 */
export class AppContainer {
  private static instance: AppContainer | null = null;

  readonly storage: IStorage;

  private constructor() {
    this.storage = new AsyncStorageAdapter();
  }

  static getInstance(): AppContainer {
    if (!AppContainer.instance) {
      AppContainer.instance = new AppContainer();
    }
    return AppContainer.instance;
  }
}

export const container = AppContainer.getInstance();
