import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useGameStore } from '@/src/store/gameStore';
import { STAT_LABELS, STAT_COLORS } from '@/src/types';
import { colors } from '@/src/constants/theme';

export default function HabitsScreen() {
  const habits = useGameStore((s) => s.habits);
  const deleteHabit = useGameStore((s) => s.deleteHabit);

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>⚒️</Text>
            <Text style={styles.emptyTitle}>No habits forged</Text>
            <Text style={styles.emptyText}>
              Tap + to create your first daily quest.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/habit-form',
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.category, { color: STAT_COLORS[item.category] }]}>
                {STAT_LABELS[item.category]} · 🔥 {item.streak}
              </Text>
            </View>
            <Pressable
              style={styles.deleteBtn}
              onPress={(e) => {
                e.stopPropagation?.();
                deleteHabit(item.id);
              }}
              hitSlop={8}
            >
              <Text style={styles.deleteText}>✕</Text>
            </Pressable>
          </Pressable>
        )}
      />
      <Pressable
        style={styles.fab}
        onPress={() => router.push('/habit-form')}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 20, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emoji: { fontSize: 32, marginRight: 14 },
  info: { flex: 1 },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  category: { fontSize: 13, fontWeight: '600' },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: { color: colors.danger, fontSize: 16, fontWeight: '700' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    color: colors.background,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 34,
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
  },
});
