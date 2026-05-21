import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '@/src/store/gameStore';
import { CharacterCard } from '@/src/components/CharacterCard';
import { StatBar } from '@/src/components/StatBar';
import { STAT_KEYS, DEFAULT_EMOJIS } from '@/src/types';
import { colors } from '@/src/constants/theme';

const STAT_ICONS: Record<string, string> = {
  vitality: '❤️',
  strength: '⚔️',
  mind: '📖',
  spirit: '🕯️',
};

export default function CharacterScreen() {
  const character = useGameStore((s) => s.character);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <CharacterCard />
      <Text style={styles.sectionTitle}>Attributes</Text>
      {STAT_KEYS.map((stat) => (
        <StatBar
          key={stat}
          stat={stat}
          value={character.stats[stat]}
          icon={STAT_ICONS[stat] ?? DEFAULT_EMOJIS[stat]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
});
