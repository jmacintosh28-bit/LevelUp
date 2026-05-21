import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { getXpProgress } from '@/src/lib/xp';
import { colors } from '@/src/constants/theme';

export function CharacterCard() {
  const character = useGameStore((s) => s.character);
  const habits = useGameStore((s) => s.habits);
  const { current, needed, percent } = getXpProgress(character);
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);

  return (
    <View style={styles.card}>
      <Text style={styles.avatar}>🧙</Text>
      <Text style={styles.title}>Adventurer</Text>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>Lv. {character.level}</Text>
      </View>
      <View style={styles.xpSection}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpLabel}>Experience</Text>
          <Text style={styles.xpValue}>
            {current} / {needed} XP
          </Text>
        </View>
        <View style={styles.xpTrack}>
          <View style={[styles.xpFill, { width: `${Math.min(percent, 100)}%` }]} />
        </View>
      </View>
      <Text style={styles.streakSummary}>
        🔥 {totalStreaks} total streak days across quests
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  avatar: { fontSize: 64, marginBottom: 8 },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  levelText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
  xpSection: { width: '100%' },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  xpValue: {
    color: colors.textMuted,
    fontSize: 13,
  },
  xpTrack: {
    height: 12,
    backgroundColor: colors.surfaceLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: colors.gold,
    borderRadius: 6,
  },
  streakSummary: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 16,
    textAlign: 'center',
  },
});
