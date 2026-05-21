import { View, Text, StyleSheet } from 'react-native';
import type { StatKey } from '@/src/types';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { STAT_CAP } from '@/src/lib/xp';
import { colors } from '@/src/constants/theme';

interface StatBarProps {
  stat: StatKey;
  value: number;
  icon: string;
}

export function StatBar({ stat, value, icon }: StatBarProps) {
  const percent = (value / STAT_CAP) * 100;
  const statColor = STAT_COLORS[stat];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{STAT_LABELS[stat]}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, backgroundColor: statColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: { fontSize: 18, marginRight: 8 },
  label: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  value: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  track: {
    height: 10,
    backgroundColor: colors.surfaceLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
});
