import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import type { Habit, HabitCategory } from '@/src/types';
import {
  STAT_KEYS,
  STAT_LABELS,
  CATEGORY_FLAVOR,
  DEFAULT_EMOJIS,
  STAT_COLORS,
} from '@/src/types';
import { colors } from '@/src/constants/theme';

interface HabitFormProps {
  initial?: Habit;
  onSave: (name: string, category: HabitCategory, emoji: string) => void;
  onCancel: () => void;
}

export function HabitForm({ initial, onSave, onCancel }: HabitFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState<HabitCategory>(
    initial?.category ?? 'strength'
  );
  const [emoji, setEmoji] = useState(
    initial?.emoji ?? DEFAULT_EMOJIS.strength
  );

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), category, emoji);
  };

  const selectCategory = (cat: HabitCategory) => {
    setCategory(cat);
    if (!initial) setEmoji(DEFAULT_EMOJIS[cat]);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Quest Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Morning workout"
        placeholderTextColor={colors.textMuted}
        autoFocus
      />

      <Text style={styles.label}>Emoji</Text>
      <TextInput
        style={[styles.input, styles.emojiInput]}
        value={emoji}
        onChangeText={setEmoji}
        maxLength={2}
      />

      <Text style={styles.label}>Train a Stat</Text>
      {STAT_KEYS.map((stat) => (
        <Pressable
          key={stat}
          style={[
            styles.categoryOption,
            category === stat && {
              borderColor: STAT_COLORS[stat],
              backgroundColor: `${STAT_COLORS[stat]}22`,
            },
          ]}
          onPress={() => selectCategory(stat)}
        >
          <Text style={styles.categoryEmoji}>{DEFAULT_EMOJIS[stat]}</Text>
          <View style={styles.categoryInfo}>
            <Text style={[styles.categoryName, { color: STAT_COLORS[stat] }]}>
              Train {STAT_LABELS[stat]}
            </Text>
            <Text style={styles.categoryFlavor}>{CATEGORY_FLAVOR[stat]}</Text>
          </View>
        </Pressable>
      ))}

      <View style={styles.actions}>
        <Pressable style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.saveBtn, !name.trim() && styles.saveDisabled]}
          onPress={handleSave}
          disabled={!name.trim()}
        >
          <Text style={styles.saveText}>{initial ? 'Update' : 'Forge Quest'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    color: colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emojiInput: { fontSize: 28, textAlign: 'center', width: 72 },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 10,
    backgroundColor: colors.surface,
  },
  categoryEmoji: { fontSize: 28, marginRight: 14 },
  categoryInfo: { flex: 1 },
  categoryName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  categoryFlavor: { color: colors.textMuted, fontSize: 13 },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  cancelBtn: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelText: { color: colors.textMuted, fontWeight: '700' },
  saveBtn: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.gold,
    alignItems: 'center',
  },
  saveDisabled: { opacity: 0.5 },
  saveText: { color: colors.background, fontWeight: '800', fontSize: 16 },
});
