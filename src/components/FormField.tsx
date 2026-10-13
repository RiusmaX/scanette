import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, spacing } from '@/theme/theme';

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

// Enveloppe commune à tous les champs : libellé au-dessus, message d'erreur en dessous.
export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
  error: {
    color: colors.danger,
    fontSize: fontSizes.small,
  },
});
