import { Text, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { CharacterCard } from '@/src/components/CharacterCard';
import { StatBar } from '@/src/components/StatBar';
import { Screen } from '@/src/components/Screen';
import { FadeInView } from '@/src/components/FadeInView';
import { STAT_KEYS } from '@/src/types';
import { colors, spacing, typography } from '@/src/constants/theme';

export default function CharacterScreen() {
  const character = useGameStore((s) => s.character);

  return (
    <Screen>
      <CharacterCard />
      <FadeInView index={1}>
        <Text style={styles.sectionTitle}>Stats</Text>
      </FadeInView>
      {STAT_KEYS.map((stat, i) => (
        <StatBar
          key={stat}
          stat={stat}
          value={character.stats[stat]}
          index={i + 2}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
});
