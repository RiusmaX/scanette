import { StyleSheet, Text, View } from 'react-native';

import { catalog } from '@/data/catalog';

// Écran d'accueil de départ : il vérifie que le catalogue est bien chargé.
// C'est ici que commence le TP 4.
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanette</Text>
      <Text>{catalog.length} produits dans le catalogue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
