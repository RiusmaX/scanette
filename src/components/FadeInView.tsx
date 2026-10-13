import { useEffect, useRef, type ReactNode } from 'react';
import { Animated } from 'react-native';

type FadeInViewProps = {
  children: ReactNode;
  delay?: number;
};

// Fait apparaître son contenu en fondu, avec un léger glissement vers le haut.
export function FadeInView({ children, delay = 0 }: FadeInViewProps) {
  const progress = useRef(new Animated.Value(0)).current;

  // Au montage : on anime la valeur de 0 à 1 en 400 ms.
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true, // l'animation tourne côté natif, sans charger le thread JavaScript
    }).start();
  }, [progress, delay]);

  // interpolate transforme 0 → 1 en 12 → 0 pixels de décalage vertical.
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return <Animated.View style={{ opacity: progress, transform: [{ translateY }] }}>{children}</Animated.View>;
}
