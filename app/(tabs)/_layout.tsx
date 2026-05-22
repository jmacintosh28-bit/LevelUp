import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { colors, typography } from '@/src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.2,
        },
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          ...typography.title,
          fontSize: 17,
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Progress', tabBarLabel: 'Progress' }}
      />
      <Tabs.Screen
        name="quests"
        options={{ title: 'Today', tabBarLabel: 'Today' }}
      />
      <Tabs.Screen
        name="habits"
        options={{ title: 'Quests', tabBarLabel: 'Quests' }}
      />
    </Tabs>
  );
}
