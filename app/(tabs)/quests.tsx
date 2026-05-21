import { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '@/src/store/gameStore';
import { QuestCard } from '@/src/components/QuestCard';
import { LevelUpModal } from '@/src/components/LevelUpModal';
import { todayString } from '@/src/lib/dates';
import { isCompletedToday } from '@/src/lib/xp';
import { colors } from '@/src/constants/theme';

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
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
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
      <ScrollView contentContainerStyle={styles.content}>
        {habits.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🗺️</Text>
            <Text style={styles.emptyTitle}>No quests yet</Text>
            <Text style={styles.emptyText}>
              Forge a habit in the Habits tab to begin your adventure.
            </Text>
          </View>
        ) : (
          <>
            {pending.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Today's Quests</Text>
                {pending.map((habit) => (
                  <QuestCard
                    key={habit.id}
                    habit={habit}
                    onComplete={() => handleComplete(habit.id)}
                  />
                ))}
              </>
            )}
            {done.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, styles.doneSection]}>
                  Completed Today
                </Text>
                {done.map((habit) => (
                  <View key={habit.id} style={styles.doneCard}>
                    <Text style={styles.doneEmoji}>{habit.emoji}</Text>
                    <Text style={styles.doneName}>{habit.name}</Text>
                    <Text style={styles.doneCheck}>✓</Text>
                  </View>
                ))}
              </>
            )}
            {pending.length === 0 && done.length > 0 && (
              <View style={styles.allDone}>
                <Text style={styles.allDoneEmoji}>🏆</Text>
                <Text style={styles.allDoneText}>
                  All quests complete! Rest well, adventurer.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

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
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  doneSection: { marginTop: 20, color: colors.textMuted },
  doneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    opacity: 0.7,
    borderWidth: 1,
    borderColor: colors.border,
  },
  doneEmoji: { fontSize: 24, marginRight: 12 },
  doneName: { flex: 1, color: colors.textMuted, fontSize: 15 },
  doneCheck: { color: colors.success, fontSize: 20, fontWeight: '800' },
  allDone: { alignItems: 'center', marginTop: 24, padding: 20 },
  allDoneEmoji: { fontSize: 48, marginBottom: 12 },
  allDoneText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
