import { Pressable, View, Text, StyleSheet } from 'react-native';
import type { Habit } from '@/src/types';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { colors } from '@/src/constants/theme';

interface QuestCardProps {
  habit: Habit;
  onComplete: () => void;
}

export function QuestCard({ habit, onComplete }: QuestCardProps) {
  const statColor = STAT_COLORS[habit.category];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onComplete}
    >
      <View style={styles.left}>
        <Text style={styles.emoji}>{habit.emoji ?? '⚔️'}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{habit.name}</Text>
          <Text style={[styles.category, { color: statColor }]}>
            {STAT_LABELS[habit.category]} quest
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.streak}>🔥 {habit.streak}</Text>
        <View style={styles.completeBtn}>
          <Text style={styles.completeText}>Complete</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  emoji: { fontSize: 32, marginRight: 14 },
  info: { flex: 1 },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  category: { fontSize: 13, fontWeight: '600' },
  right: { alignItems: 'flex-end' },
  streak: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  completeBtn: {
    backgroundColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completeText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: '800',
  },
});
