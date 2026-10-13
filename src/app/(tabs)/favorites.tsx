import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/theme';

// Écran provisoire : les favoris partagés arrivent au TP 12.
export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tes favoris arriveront au TP 12.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textMuted,
  },
});
