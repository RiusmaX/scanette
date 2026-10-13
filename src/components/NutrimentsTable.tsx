import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme/theme';
import type { Nutriments } from '@/types/product';

type NutrimentsTableProps = {
  nutriments: Nutriments;
};

// Les lignes du tableau : la clé dans l'objet Nutriments, le libellé et l'unité affichés.
// `keyof Nutriments` garantit qu'on ne se trompe pas de nom de propriété.
const ROWS: { key: keyof Nutriments; label: string; unit: string }[] = [
  { key: 'energyKcal', label: 'Énergie', unit: 'kcal' },
  { key: 'fat', label: 'Matières grasses', unit: 'g' },
  { key: 'saturatedFat', label: 'dont acides gras saturés', unit: 'g' },
  { key: 'sugars', label: 'Sucres', unit: 'g' },
  { key: 'salt', label: 'Sel', unit: 'g' },
  { key: 'proteins', label: 'Protéines', unit: 'g' },
];

export function NutrimentsTable({ nutriments }: NutrimentsTableProps) {
  return (
    <View style={styles.table}>
      <Text style={styles.caption}>Pour 100 g</Text>
      {ROWS.map(({ key, label, unit }) => {
        const value = nutriments[key];
        return (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {value === null ? '?' : `${value.toLocaleString('fr-FR')} ${unit}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  caption: {
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.text,
  },
  value: {
    fontWeight: '600',
    color: colors.text,
  },
});
