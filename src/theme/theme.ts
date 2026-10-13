import { Platform } from 'react-native';

// Le thème centralise les valeurs de style partagées par tous les écrans.
// On change une couleur ici, toute l'application suit.
export const colors = {
  primary: '#0F766E',
  primaryLight: '#CCFBF1',
  favorite: '#DB2777',
  background: '#F5F5F4',
  surface: '#FFFFFF',
  text: '#1C1917',
  textMuted: '#78716C',
  border: '#E7E5E4',
  danger: '#DC2626',
} as const;

// Une échelle d'espacements : on évite les valeurs « au hasard » (13, 17, 22…).
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  full: 999,
} as const;

export const fontSizes = {
  small: 13,
  body: 15,
  title: 18,
  heading: 28,
} as const;

// Une police à chasse fixe pour afficher les codes-barres : le nom diffère selon la plateforme.
export const monospaceFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});
