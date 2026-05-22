import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '@/src/store/gameStore';
import { QuestCard } from '@/src/components/QuestCard';
import { LevelUpModal } from '@/src/components/LevelUpModal';
import { Screen } from '@/src/components/Screen';
import { FadeInView } from '@/src/components/FadeInView';
import { todayString } from '@/src/lib/dates';
import { isCompletedToday } from '@/src/lib/xp';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { colors, spacing, typography, radius } from '@/src/constants/theme';

type ModalState = {
  visible: boolean;
  leveledUp: boolean;
  newLevel: number;
  xpGained: number;
};

export default function QuestsScreen() {
  const habits = useGameStore((s) => s.habits);
  const completeHabit = useGameStore((s) => s.completeHabit);
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    leveledUp: false,
    newLevel: 1,
    xpGained: 0,
  });

  const today = todayString();
  const pending = habits.filter((h) => !isCompletedToday(h, today));
  const done = habits.filter((h) => isCompletedToday(h, today));

  const handleComplete = useCallback(
    async (id: string) => {
      const result = completeHabit(id);
      if (!result) return;
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setModal({
        visible: true,
        leveledUp: result.leveledUp,
        newLevel: result.newLevel,
        xpGained: result.xpGained,
      });
    },
    [completeHabit]
  );

  return (
    <View style={styles.container}>
      <Screen contentStyle={styles.screenContent}>
        {habits.length === 0 ? (
          <FadeInView style={styles.empty}>
            <Text style={styles.emptyTitle}>Nothing for today</Text>
            <Text style={styles.emptyText}>
              Add a quest from the Habits tab to start.
            </Text>
          </FadeInView>
        ) : (
          <>
            {pending.length > 0 && (
              <>
                <FadeInView>
                  <Text style={styles.sectionTitle}>Today</Text>
                </FadeInView>
                {pending.map((habit, i) => (
                  <QuestCard
                    key={habit.id}
                    habit={habit}
                    index={i + 1}
                    onComplete={() => handleComplete(habit.id)}
                  />
                ))}
              </>
            )}
            {done.length > 0 && (
              <>
                <FadeInView index={pending.length + 1}>
                  <Text style={[styles.sectionTitle, styles.doneSection]}>
                    Completed
                  </Text>
                </FadeInView>
                {done.map((habit, i) => (
                  <Animated.View
                    key={habit.id}
                    entering={FadeIn.duration(300)}
                    layout={Layout.springify()}
                    style={styles.doneCard}
                  >
                    <View
                      style={[
                        styles.doneDot,
                        { backgroundColor: STAT_COLORS[habit.category] },
                      ]}
                    />
                    <View style={styles.doneInfo}>
                      <Text style={styles.doneName}>{habit.name}</Text>
                      <Text style={styles.doneCategory}>
                        {STAT_LABELS[habit.category]} · +{habit.xpReward} XP
                      </Text>
                    </View>
                  </Animated.View>
                ))}
              </>
            )}
            {pending.length === 0 && done.length > 0 && (
              <FadeInView index={done.length + 2} style={styles.allDone}>
                <Text style={styles.allDoneText}>All done for today.</Text>
              </FadeInView>
            )}
          </>
        )}
      </Screen>

      <LevelUpModal
        visible={modal.visible}
        leveledUp={modal.leveledUp}
        level={modal.newLevel}
        xpGained={modal.xpGained}
        onClose={() => setModal((m) => ({ ...m, visible: false }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  screenContent: { paddingTop: spacing.sm },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  doneSection: { marginTop: spacing.lg },
  doneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
  },
  doneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  doneInfo: { flex: 1 },
  doneName: {
    ...typography.body,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  doneCategory: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  allDone: {
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
  },
  allDoneText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  empty: {
    paddingTop: spacing.xxl * 2,
    alignItems: 'center',
  },
  emptyTitle: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
