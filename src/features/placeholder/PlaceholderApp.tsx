import { StyleSheet, Text, View } from 'react-native';

import type { MiniAppProps } from '@/core/registry';
import { Screen } from '@/shared/components';
import { useTheme } from '@/theme';

export function PlaceholderApp({ onBack }: MiniAppProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Screen title="Demo" onBack={onBack}>
      <View style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={{ color: colors.text, fontSize: typography.title, fontWeight: '700' }}>
          Lefoonten
        </Text>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: typography.body,
            marginTop: spacing.sm,
            lineHeight: 24,
          }}
        >
          Mini-app altyapısı çalışıyor. Registry, DI ve storage katmanları hazır.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
});
