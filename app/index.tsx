import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useRouter } from 'expo-router';

import { getEnabledMiniApps } from '@/core/registry';
import { AppCard, Screen } from '@/shared/components';
import { useTheme } from '@/theme';

const CONTENT_MAX_WIDTH = 520;

export default function LauncherScreen() {
  const router = useRouter();
  const { colors, spacing, typography, radius } = useTheme();
  const { width } = useWindowDimensions();
  const apps = getEnabledMiniApps();
  const contentWidth = Math.min(width - spacing.md * 2, CONTENT_MAX_WIDTH);

  return (
    <Screen>
      <View style={[styles.content, { width: contentWidth, alignSelf: 'center' }]}>
        <View style={styles.hero}>
          <View
            style={[
              styles.logoFrame,
              {
                borderColor: colors.border,
                borderRadius: radius.lg,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Image
              source={require('../assets/icon.png')}
              style={styles.logo}
              accessibilityLabel="Lefoonten logosu"
            />
          </View>
          <Text style={[styles.brand, { color: colors.text, fontSize: typography.title }]}>
            Lefoonten
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.body,
              marginTop: spacing.xs,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            Günlük mini araçlar, tek uygulamada.
          </Text>
        </View>

        <View style={[styles.sectionHeader, { marginBottom: spacing.sm }]}>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.caption,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Uygulamalar
          </Text>
          <View style={[styles.countBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ color: colors.textMuted, fontSize: typography.caption, fontWeight: '600' }}>
              {apps.length}
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {apps.map((app) => (
            <AppCard key={app.id} app={app} onPress={() => router.push(`/mini/${app.id}`)} />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 8,
  },
  logoFrame: {
    borderWidth: 1,
    marginBottom: 14,
    padding: 4,
  },
  logo: {
    height: 72,
    width: 72,
    borderRadius: 14,
  },
  brand: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countBadge: {
    borderRadius: 999,
    borderWidth: 1,
    minWidth: 28,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 32,
  },
});
