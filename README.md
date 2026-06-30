# Lefoonten

Modüler mini-app kutusu — hesapsız, offline-first, Play Store hedefli.

## Geliştirme ortamı

### Gerekenler (PC)

| Araç | Ne işe yarar? |
|------|----------------|
| **Node.js** (LTS) | JavaScript runtime — backend'deki JVM gibi |
| **npm** | Paket yöneticisi — Maven/Gradle gibi |
| **Cursor** | Kod editörü |
| **Expo Go** (telefon) | Derleyici değil — uygulamayı canlı önizler |

> **Önemli:** Telefonda native derleme yapmazsın. PC'de Metro bundler JS bundle üretir; Expo Go bunu çalıştırır.

### Telefonda canlı takip

1. PC ve telefon **aynı Wi-Fi**'da olsun
2. Proje klasöründe: `npm start`
3. Terminalde çıkan **QR kodu** Expo Go ile tara
4. Kod değiştir → kaydet → telefon **otomatik yenilenir** (Fast Refresh)

Alternatif: Tunnel modu (`npm start` sonra `t` tuşu) — farklı ağdaysan.

### Komutlar

```bash
npm start          # Geliştirme sunucusu (Expo)
npm run android    # Android emülatör (Android Studio gerekir)
npm run web        # Tarayıcıda test
npx tsc --noEmit   # TypeScript kontrolü
```

## Solution Explorer (klasör ağacı)

```
lefoonten/
├── app/                          # Shell — sadece navigasyon (Expo Router)
│   ├── _layout.tsx               # Root: tema, stack
│   ├── index.tsx                 # Launcher (grid)
│   └── mini/[id].tsx             # Dinamik mini-app host
│
├── assets/                       # İkon, splash (statik dosyalar)
│
└── src/
    ├── core/                     # Framework — feature'lardan BAĞIMSIZ
    │   ├── di/
    │   │   └── AppContainer.ts   # Singleton: storage
    │   ├── registry/
    │   │   ├── types.ts          # MiniAppDefinition sözleşmesi
    │   │   └── registry.ts       # Plugin listesi (tek ekleme noktası)
    │   └── storage/
    │       ├── IStorage.ts       # Port (interface)
    │       └── AsyncStorageAdapter.ts
    │
    ├── features/                 # Her alt klasör = 1 mini-app modülü
    │   ├── placeholder/          # Basit demo (sadece UI)
    │   └── todo/                 # Tam katmanlı örnek
    │       ├── index.ts          # Public API: miniApp tanımı
    │       ├── TodoApp.tsx       # UI (presentation)
    │       ├── hooks/useTodo.ts  # ViewModel hook
    │       ├── TodoService.ts    # İş kuralları
    │       ├── TodoRepository.ts # Persistans
    │       ├── todoModule.ts     # Feature DI factory
    │       └── types.ts          # Domain tipleri
    │
    ├── shared/                   # Ortak UI bileşenleri (feature'lar arası)
    │   └── components/
    │
    └── theme/                    # Tasarım tokenları + ThemeProvider
```

### Bağımlılık kuralları (makine gibi)

```
app/          → core, shared, theme
core/         → (hiçbir feature'a bağlı değil)
features/X/   → core, shared, theme  (başka feature'a ASLA)
shared/       → theme (gerekirse)
```

Yeni 20. mini-app eklerken **değişen dosyalar:** `features/yeni-app/*` + `registry.ts` içine 1 satır. Shell ve `AppContainer` dokunulmaz.

## SOLID karşılıkları

| Prensip | Lefoonten'de |
|---------|----------------|
| **S**ingle Responsibility | Repository = kayıt, Service = kural, UI = gösterim |
| **O**pen/Closed | Yeni app = yeni klasör + registry satırı; mevcut kodu değiştirme |
| **L**iskov | Her mini-app `MiniAppProps` ile çalışır |
| **I**nterface Segregation | `IStorage` küçük port; feature'lar sadece ihtiyacını kullanır |
| **D**ependency Inversion | Service → Repository interface; storage → `IStorage` port |

## Lifecycle (backend benzetmesi)

| Scope | Örnek | Ne zaman oluşur? |
|-------|-------|------------------|
| **Singleton** | `AppContainer`, `IStorage` | Uygulama açılışı |
| **Scoped** | `TodoService` + `TodoRepository` | Mini-app ekranı mount |
| **Transient** | `useState`, form input | Her render / etkileşim |

## Yeni mini-app eklemek (checklist)

1. `src/features/su-takibi/` klasörü oluştur
2. Şablona uygun dosyaları ekle (aşağıda)
3. `index.ts` içinde `MiniAppDefinition` export et
4. `src/core/registry/registry.ts` → `MINI_APPS` dizisine 1 satır ekle

### Feature şablonu (veri tutan app)

```
features/su-takibi/
  index.ts              # suTakibiMiniApp export
  SuTakibiApp.tsx       # UI — MiniAppProps alır
  hooks/useSuTakibi.ts  # container.storage + createSuTakibiService
  SuTakibiService.ts    # iş kuralları
  SuTakibiRepository.ts # IStorage ile persist
  suTakibiModule.ts     # createSuTakibiService(storage)
  types.ts
```

### Feature şablonu (sadece UI, veri yok)

```
features/hesap-makinesi/
  index.ts
  HesapMakinesiApp.tsx
```

`placeholder/` bu ikinci şablonun örneğidir.

## Mimari akış (özet)

```
Launcher (app/index)
  → registry.getEnabledMiniApps()
  → kullanıcı karta basar
  → /mini/todo
  → registry.getMiniAppById('todo')
  → <TodoApp onBack={...} />
  → useTodo() → createTodoService(container.storage)
  → TodoService → TodoRepository → IStorage
```
