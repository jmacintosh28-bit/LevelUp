# LevelUp Habits

A mobile RPG habit tracker built with Expo. Complete daily habits to earn XP, level up your character, and boost your stats — all stored locally on your device.

## Features

- **Character dashboard** — Level, XP bar, and four RPG stats (Vitality, Strength, Mind, Spirit)
- **Daily quest board** — Complete habits to earn XP with streak bonuses
- **Habit management** — Create, edit, and delete daily quests tied to stat categories
- **Local persistence** — Progress saved with AsyncStorage via Zustand

## Getting started

```bash
cd ~/Projects/levelup-habits
npm install
npx expo start
```

Then press **i** for iOS Simulator, **a** for Android emulator, or scan the QR code with Expo Go on your phone.

## Game mechanics

| Action | Reward |
|--------|--------|
| Complete a habit | +10 XP base |
| Streak bonus | +2 XP per streak day (max +20) |
| Stat boost | +1 to the habit's linked stat |
| Level up | Every `100 × current level` XP |

## Tech stack

- Expo 52 + React Native
- expo-router (file-based tabs)
- Zustand + AsyncStorage
- expo-haptics
