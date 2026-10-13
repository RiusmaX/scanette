import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme/theme';

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
};

const STARS = [1, 2, 3, 4, 5];

// Un champ de formulaire maison : cinq étoiles cliquables.
export function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <View style={styles.row}>
      {STARS.map((star) => (
        <Pressable key={star} onPress={() => onChange(star)} hitSlop={4} accessibilityLabel={`${star} sur 5`}>
          <Text style={[styles.star, star <= value && styles.filled]}>★</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  star: {
    fontSize: 32,
    color: colors.border,
  },
  filled: {
    color: '#F59E0B',
  },
});
