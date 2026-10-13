import { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { colors } from '@/theme/theme';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

// Un cœur qui « bat » quand on appuie dessus.
export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  // Une valeur animée garde l'échelle du cœur. useRef : la même valeur d'un rendu à l'autre.
  const scale = useRef(new Animated.Value(1)).current;

  function handlePress() {
    onToggle();
    // Deux ressorts à la suite : le cœur grossit puis revient à sa taille.
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.5, useNativeDriver: true, speed: 50 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 3 }),
    ]).start();
  }

  return (
    <Pressable onPress={handlePress} hitSlop={8} accessibilityRole="button">
      {/* Animated.Text accepte des styles dont les valeurs sont animées. */}
      <Animated.Text style={[styles.heart, isFavorite && styles.active, { transform: [{ scale }] }]}>
        {isFavorite ? '♥' : '♡'}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heart: {
    fontSize: 26,
    color: colors.textMuted,
  },
  active: {
    color: colors.favorite,
  },
});
