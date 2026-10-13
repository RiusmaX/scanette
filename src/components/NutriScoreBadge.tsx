import { StyleSheet, Text, View } from 'react-native';

import type { NutriScore } from '@/types/product';

// Les props sont décrites par un type : TypeScript refusera <NutriScoreBadge grade="z" />.
type NutriScoreBadgeProps = {
  grade: NutriScore | null;
};

// Couleurs officielles du Nutri-Score, de A (vert foncé) à E (rouge).
const GRADE_COLORS: Record<NutriScore, string> = {
  a: '#038141',
  b: '#85BB2F',
  c: '#FECB02',
  d: '#EE8100',
  e: '#E63E11',
};

export function NutriScoreBadge({ grade }: NutriScoreBadgeProps) {
  // Produit sans note : on affiche un badge gris avec un point d'interrogation.
  const backgroundColor = grade ? GRADE_COLORS[grade] : '#9E9E9E';
  const label = grade ? grade.toUpperCase() : '?';

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
