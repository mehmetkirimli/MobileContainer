export const colors = {
  background: '#0a0a0f',
  surface: '#14141f',
  surfaceElevated: '#1c1c2a',
  border: '#2a2a3d',
  text: '#f4f4f8',
  textMuted: '#9b9bb0',
  primary: '#7c6cf0',
  primaryMuted: '#5a4fd4',
  danger: '#f07178',
  success: '#4ade80',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

export const typography = {
  title: 28,
  subtitle: 18,
  body: 16,
  caption: 13,
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  typography,
} as const;

export type Theme = typeof theme;
