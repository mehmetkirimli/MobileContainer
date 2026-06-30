import { Pressable, Text, type PressableProps } from 'react-native';

import { useTheme } from '@/theme';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'ghost';
}

export function Button({ label, variant = 'primary', style, ...props }: ButtonProps) {
  const { colors, radius, spacing, typography } = useTheme();

  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => {
        const base = {
          backgroundColor: isPrimary ? colors.primary : 'transparent',
          borderColor: isPrimary ? colors.primary : colors.border,
          borderRadius: radius.md,
          paddingVertical: spacing.sm + 2,
          paddingHorizontal: spacing.md,
          opacity: pressed ? 0.85 : 1,
          borderWidth: 1,
        } as const;

        if (typeof style === 'function') {
          return [base, style({ pressed })];
        }

        return [base, style];
      }}
      {...props}
    >
      <Text
        style={{
          color: isPrimary ? colors.text : colors.textMuted,
          fontSize: typography.body,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
