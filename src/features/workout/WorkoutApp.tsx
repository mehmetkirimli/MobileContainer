import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { MiniAppProps } from '@/core/registry';
import { Button, Screen } from '@/shared/components';
import { useTheme } from '@/theme';

import { getDayLabel, WORKOUT_DAYS } from './dayLabels';
import { useWorkout } from './hooks/useWorkout';
import type { WorkoutDayOfWeek } from './types';

export function WorkoutApp({ onBack }: MiniAppProps) {
  const { colors, spacing, typography, radius } = useTheme();
  const {
    activities,
    loading,
    needsSetup,
    needsPlanning,
    weeklyGoalDays,
    setWeeklyGoalDays,
    saveActivity,
    removeActivity,
    clearActivities,
  } = useWorkout();

  const [goalInput, setGoalInput] = useState('');
  const [selectedDay, setSelectedDay] = useState<WorkoutDayOfWeek | null>(null);
  const [activityType, setActivityType] = useState('');
  const [details, setDetails] = useState('');

  const usedDays = new Set(activities.map((activity) => activity.dayOfWeek));
  const currentSlot = activities.length + 1;

  const resetPlanningForm = () => {
    setSelectedDay(null);
    setActivityType('');
    setDetails('');
  };

  const handleSaveGoal = async () => {
    const days = Number.parseInt(goalInput, 10);
    if (Number.isNaN(days)) {
      return;
    }
    await setWeeklyGoalDays(days);
    setGoalInput('');
  };

  const handleSaveActivity = async () => {
    if (!selectedDay || !activityType.trim() || !details.trim()) {
      return;
    }
    await saveActivity({
      dayOfWeek: selectedDay,
      activityType,
      details,
    });
    resetPlanningForm();
  };

  const inputStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.body,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  } as const;

  if (loading) {
    return (
      <Screen title="Spor Planı" onBack={onBack}>
        <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.lg }} />
      </Screen>
    );
  }

  if (needsSetup) {
    return (
      <Screen title="Spor Planı" onBack={onBack}>
        <Text style={{ color: colors.textMuted, fontSize: typography.body, lineHeight: 22 }}>
          Bu hafta kaç gün spor aktiviten var?
        </Text>
        <TextInput
          value={goalInput}
          onChangeText={setGoalInput}
          placeholder="1 – 7 arası"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          style={[inputStyle, { marginTop: spacing.md }]}
        />
        <View style={{ marginTop: spacing.md }}>
          <Button
            label="Devam et"
            onPress={handleSaveGoal}
            disabled={!goalInput.trim()}
          />
        </View>
        <View style={[styles.quickRow, { marginTop: spacing.lg, gap: spacing.sm }]}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <Pressable
              key={day}
              onPress={() => setGoalInput(String(day))}
              style={[
                styles.quickChip,
                {
                  backgroundColor: colors.surfaceElevated,
                  borderColor: colors.border,
                  borderRadius: radius.md,
                },
              ]}
            >
              <Text style={{ color: colors.text, fontWeight: '600' }}>{day}</Text>
            </Pressable>
          ))}
        </View>
      </Screen>
    );
  }

  if (needsPlanning) {
    return (
      <Screen title="Spor Planı" onBack={onBack}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ color: colors.textMuted, fontSize: typography.body, lineHeight: 22 }}>
            Haftada {weeklyGoalDays} gün — {currentSlot}. aktiviteyi planla.
          </Text>

          {activities.length > 0 && (
            <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
              {activities.map((activity, index) => (
                <View
                  key={activity.id}
                  style={[
                    styles.card,
                    {
                      backgroundColor: colors.surfaceElevated,
                      borderColor: colors.border,
                      borderRadius: radius.md,
                      padding: spacing.md,
                    },
                  ]}
                >
                  <Text style={{ color: colors.primary, fontSize: typography.caption, fontWeight: '700' }}>
                    {index + 1}. aktivite
                  </Text>
                  <Text style={{ color: colors.text, fontSize: typography.body, marginTop: 4 }}>
                    {getDayLabel(activity.dayOfWeek)} · {activity.activityType}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: typography.caption, marginTop: 4 }}>
                    {activity.details}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <Text
            style={{
              color: colors.text,
              fontSize: typography.subtitle,
              fontWeight: '700',
              marginTop: spacing.lg,
              marginBottom: spacing.sm,
            }}
          >
            Gün seç
          </Text>
          <View style={[styles.dayGrid, { gap: spacing.sm }]}>
            {WORKOUT_DAYS.map((day) => {
              const taken = usedDays.has(day.value);
              const selected = selectedDay === day.value;
              return (
                <Pressable
                  key={day.value}
                  disabled={taken}
                  onPress={() => setSelectedDay(day.value)}
                  style={[
                    styles.dayChip,
                    {
                      backgroundColor: selected ? colors.primary : colors.surface,
                      borderColor: selected ? colors.primary : colors.border,
                      borderRadius: radius.md,
                      opacity: taken ? 0.4 : 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: selected ? colors.text : colors.textMuted,
                      fontSize: typography.caption,
                      fontWeight: '600',
                    }}
                  >
                    {day.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={[styles.label, { color: colors.text, marginTop: spacing.lg }]}>Aktivite türü</Text>
          <TextInput
            value={activityType}
            onChangeText={setActivityType}
            placeholder="Örn. Fitness, Koşu"
            placeholderTextColor={colors.textMuted}
            style={inputStyle}
          />

          <Text style={[styles.label, { color: colors.text, marginTop: spacing.md }]}>Detay</Text>
          <TextInput
            value={details}
            onChangeText={setDetails}
            placeholder="Örn. Sırt + göğüs + ön kol"
            placeholderTextColor={colors.textMuted}
            multiline
            style={[inputStyle, styles.multiline]}
          />

          <View style={{ marginTop: spacing.lg, marginBottom: spacing.xl }}>
            <Button
              label={`${currentSlot}. aktiviteyi kaydet`}
              onPress={handleSaveActivity}
              disabled={!selectedDay || !activityType.trim() || !details.trim()}
            />
          </View>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen title="Haftalık Plan" onBack={onBack}>
      <Text style={{ color: colors.textMuted, fontSize: typography.body, marginBottom: spacing.md }}>
        Haftada {weeklyGoalDays} gün spor — planın hazır.
      </Text>

      <View style={{ gap: spacing.sm }}>
        {activities.map((activity, index) => (
          <Pressable
            key={activity.id}
            onLongPress={() => removeActivity(activity.id)}
            style={[
              styles.card,
              {
                backgroundColor: colors.surfaceElevated,
                borderColor: colors.border,
                borderRadius: radius.md,
                padding: spacing.md,
              },
            ]}
          >
            <Text style={{ color: '#f97316', fontSize: typography.caption, fontWeight: '700' }}>
              {index + 1}. aktivite · {getDayLabel(activity.dayOfWeek)}
            </Text>
            <Text style={{ color: colors.text, fontSize: typography.body, fontWeight: '600', marginTop: 6 }}>
              {activity.activityType}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: typography.caption, marginTop: 4, lineHeight: 18 }}>
              {activity.details}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={{ color: colors.textMuted, fontSize: typography.caption, marginTop: spacing.md }}>
        Uzun bas → aktiviteyi sil
      </Text>

      <View style={{ marginTop: spacing.lg }}>
        <Button label="Planı sıfırla" variant="ghost" onPress={clearActivities} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickChip: {
    alignItems: 'center',
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayChip: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  card: {
    borderWidth: 1,
  },
});
