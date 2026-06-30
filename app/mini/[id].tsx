import { Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getMiniAppById } from '@/core/registry';
import { Screen } from '@/shared/components';
import { useTheme } from '@/theme';

export default function MiniAppScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const miniApp = typeof id === 'string' ? getMiniAppById(id) : undefined;

  if (!miniApp) {
    return (
      <Screen title="Bulunamadı" onBack={() => router.back()}>
        <Text style={{ color: colors.textMuted }}>Bu mini-app mevcut değil.</Text>
      </Screen>
    );
  }

  const MiniAppComponent = miniApp.component;

  return <MiniAppComponent onBack={() => router.back()} />;
}
