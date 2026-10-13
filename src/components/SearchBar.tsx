import { StyleSheet, TextInput, View } from 'react-native';

import { colors, fontSizes, radius, spacing } from '@/theme/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

// Champ « contrôlé » : sa valeur vient du parent, et chaque frappe remonte au parent.
export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Rechercher un produit ou une marque"
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
        clearButtonMode="while-editing" // croix d'effacement, iOS seulement
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.body,
    color: colors.text,
  },
});
