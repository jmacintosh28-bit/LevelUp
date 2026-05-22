import type { QuestPreset } from '@/src/types';

export const PRESET_QUESTS: QuestPreset[] = [
  {
    id: 'morning-walk',
    name: 'Morning walk',
    goal: '20 minutes outside',
    category: 'strength',
    defaultXpReward: 12,
  },
  {
    id: 'hydrate',
    name: 'Stay hydrated',
    goal: '8 glasses of water',
    category: 'vitality',
    defaultXpReward: 10,
  },
  {
    id: 'read',
    name: 'Read',
    goal: '15 minutes with a book',
    category: 'mind',
    defaultXpReward: 14,
  },
  {
    id: 'meditate',
    name: 'Meditate',
    goal: '10 minutes of stillness',
    category: 'spirit',
    defaultXpReward: 12,
  },
  {
    id: 'workout',
    name: 'Workout',
    goal: '30 minutes of movement',
    category: 'strength',
    defaultXpReward: 18,
  },
  {
    id: 'sleep',
    name: 'Sleep well',
    goal: 'In bed by your target time',
    category: 'vitality',
    defaultXpReward: 15,
  },
  {
    id: 'journal',
    name: 'Journal',
    goal: 'Write 3 things you noticed today',
    category: 'spirit',
    defaultXpReward: 10,
  },
  {
    id: 'learn',
    name: 'Learn something new',
    goal: 'One lesson or practice session',
    category: 'mind',
    defaultXpReward: 16,
  },
  {
    id: 'stretch',
    name: 'Stretch',
    goal: '5 minutes of mobility',
    category: 'strength',
    defaultXpReward: 8,
  },
  {
    id: 'screen-free',
    name: 'Screen-free wind down',
    goal: 'No phone 30 min before bed',
    category: 'spirit',
    defaultXpReward: 14,
  },
];

export function getPresetById(id: string): QuestPreset | undefined {
  return PRESET_QUESTS.find((p) => p.id === id);
}
