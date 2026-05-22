export const colors = {
  background: '#F7F6F3',
  surface: '#FFFFFF',
  surfaceMuted: '#EFEEE9',
  border: '#E4E2DC',
  text: '#1A1A18',
  textSecondary: '#5C5C56',
  textMuted: '#8A8A82',
  accent: '#2D2D2A',
  accentSoft: '#E8E6E1',
  success: '#3D7A5C',
  danger: '#B85C5C',
};

export const statColors = {
  vitality: '#5B9A7A',
  strength: '#C17B6B',
  mind: '#6B8EB8',
  spirit: '#8B7BB8',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const typography = {
  largeTitle: { fontSize: 28, fontWeight: '600' as const, letterSpacing: -0.5 },
  title: { fontSize: 20, fontWeight: '600' as const, letterSpacing: -0.3 },
  headline: { fontSize: 17, fontWeight: '500' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  label: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.4 },
};

export const animation = {
  spring: { damping: 20, stiffness: 200 },
  duration: 380,
  stagger: 55,
};
