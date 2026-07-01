import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CATEGORY_LABELS, type MiniAppDefinition } from '@/core/registry';
import { useTheme } from '@/theme';

interface AppCardProps {
  app: MiniAppDefinition;
  onPress: () => void;
}

export function AppCard({ app, onPress }: AppCardProps) {
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${app.name} uygulamasını aç`}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surfaceElevated,
          borderColor: pressed ? app.accentColor : colors.border,
          borderRadius: radius.lg,
          padding: spacing.md,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={[styles.accentBar, { backgroundColor: app.accentColor, borderRadius: radius.full }]} />

      <View style={styles.topRow}>
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: `${app.accentColor}22`,
              borderRadius: radius.md,
            },
          ]}
        >
          <Text style={styles.icon}>{app.icon}</Text>
        </View>
        <Text style={[styles.chevron, { color: colors.textMuted }]}>›</Text>
      </View>

      <Text
        style={{
          color: colors.text,
          fontSize: typography.body,
          fontWeight: '600',
          marginTop: spacing.sm,
        }}
        numberOfLines={1}
      >
        {app.name}
      </Text>
      <Text
        style={{
          color: colors.textMuted,
          fontSize: typography.caption,
          marginTop: spacing.xs,
          lineHeight: 18,
        }}
        numberOfLines={2}
      >
        {app.description}
      </Text>
      <Text
        style={{
          color: app.accentColor,
          fontSize: typography.caption,
          fontWeight: '600',
          marginTop: spacing.sm,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}
      >
        {CATEGORY_LABELS[app.category]}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    overflow: 'hidden',
  },
  accentBar: {
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrap: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  icon: {
    fontSize: 24,
  },
  chevron: {
    fontSize: 22,
    fontWeight: '300',
  },
});
