import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { MiniAppDefinition } from '@/core/registry';
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
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: spacing.md,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
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
        }}
        numberOfLines={2}
      >
        {app.description}
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
});
