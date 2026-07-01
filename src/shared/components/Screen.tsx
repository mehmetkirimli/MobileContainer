import { Pressable, StyleSheet, Text, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

interface ScreenProps extends ViewProps {
  title?: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export function Screen({ title, onBack, children, style, ...props }: ScreenProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={[styles.container, style]} {...props}>
        {(title || onBack) && (
          <View style={[styles.header, { marginBottom: spacing.md, borderBottomColor: colors.border }]}>
            {onBack ? (
              <Pressable onPress={onBack} hitSlop={12}>
                <Text style={{ color: colors.primary, fontSize: typography.body, fontWeight: '600' }}>
                  ← Geri
                </Text>
              </Pressable>
            ) : (
              <View />
            )}
            {title ? (
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.subtitle,
                  fontWeight: '700',
                  marginTop: onBack ? spacing.sm : 0,
                }}
              >
                {title}
              </Text>
            ) : null}
          </View>
        )}
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
  },
});
