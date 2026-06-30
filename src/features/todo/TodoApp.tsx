import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { MiniAppProps } from '@/core/registry';
import { Button, Screen } from '@/shared/components';
import { useTheme } from '@/theme';

import { useTodo } from './hooks/useTodo';

export function TodoApp({ onBack }: MiniAppProps) {
  const { colors, spacing, typography, radius } = useTheme();
  const { items, loading, add, toggle, remove, canAddMore } = useTodo();
  const [text, setText] = useState('');

  const handleAdd = async () => {
    await add(text);
    setText('');
  };

  return (
    <Screen title="Yapılacaklar" onBack={onBack}>
      <Text style={{ color: colors.textMuted, marginBottom: spacing.md }}>
        En fazla 5 madde — sade ve odaklı.
      </Text>

      <View style={styles.row}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Yeni madde..."
          placeholderTextColor={colors.textMuted}
          editable={canAddMore}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.md,
              color: colors.text,
              flex: 1,
              marginRight: spacing.sm,
              paddingHorizontal: spacing.md,
            },
          ]}
          onSubmitEditing={handleAdd}
        />
        <Button label="Ekle" onPress={handleAdd} disabled={!canAddMore || !text.trim()} />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.lg }} />
      ) : items.length === 0 ? (
        <Text style={{ color: colors.textMuted, marginTop: spacing.lg }}>Henüz madde yok.</Text>
      ) : (
        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggle(item.id)}
              onLongPress={() => remove(item.id)}
              style={[
                styles.item,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                  borderRadius: radius.md,
                  padding: spacing.md,
                },
              ]}
            >
              <Text
                style={{
                  color: item.done ? colors.textMuted : colors.text,
                  fontSize: typography.body,
                  textDecorationLine: item.done ? 'line-through' : 'none',
                }}
              >
                {item.done ? '✓ ' : '○ '}
                {item.text}
              </Text>
              <Text style={{ color: colors.textMuted, fontSize: typography.caption, marginTop: 4 }}>
                Uzun bas → sil
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    height: 44,
  },
  item: {
    borderWidth: 1,
  },
});
