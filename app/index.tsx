import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { getEnabledMiniApps } from '@/core/registry';
import { AppCard } from '@/shared/components';
import { Screen } from '@/shared/components';
import { useTheme } from '@/theme';

export default function LauncherScreen() {
  const router = useRouter();
  const { colors, spacing, typography } = useTheme();
  const apps = getEnabledMiniApps();

  return (
    <Screen>
      <View style={styles.hero}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={[styles.brand, { color: colors.text, fontSize: typography.title }]}>
          Lefoonten
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: typography.body, marginTop: spacing.xs }}>
          Günlük mini araçlar, tek uygulamada.
        </Text>
      </View>

      <Text
        style={{
          color: colors.textMuted,
          fontSize: typography.caption,
          marginBottom: spacing.sm,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Uygulamalar
      </Text>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onPress={() => router.push(`/mini/${app.id}`)}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  logo: {
    height: 72,
    width: 72,
    borderRadius: 16,
    marginBottom: 12,
  },
  brand: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 32,
  },
});
