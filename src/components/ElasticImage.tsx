import { useRef } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';

import { colors, radius } from '@/theme/theme';

type ElasticImageProps = {
  uri: string;
};

// Bonus du TP 9 : une image qu'on peut tirer du doigt et qui revient en place comme un élastique.
export function ElasticImage({ uri }: ElasticImageProps) {
  const position = useRef(new Animated.ValueXY()).current;

  // PanResponder reçoit les gestes du Gesture Responder System.
  const panResponder = useRef(
    PanResponder.create({
      // On veut répondre dès que le doigt touche l'image.
      onStartShouldSetPanResponder: () => true,
      // Pendant le geste : le déplacement du doigt (dx, dy) pilote la position.
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false,
      }),
      // Doigt levé : retour à la position d'origine avec un ressort.
      onPanResponderRelease: () => {
        Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false, friction: 4 }).start();
      },
    }),
  ).current;

  return (
    <Animated.Image
      source={{ uri }}
      style={[styles.image, { transform: position.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },
});
