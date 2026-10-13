import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ElasticImage } from '@/components/ElasticImage';
import { NutriScoreBadge } from '@/components/NutriScoreBadge';
import { NutrimentsTable } from '@/components/NutrimentsTable';
import { catalog } from '@/data/catalog';
import { colors, fontSizes, monospaceFont, spacing } from '@/theme/theme';

// Les crochets du nom de fichier font de « code » un paramètre de route : /product/3017620422003.
export default function ProductScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const product = catalog.find((item) => item.code === code);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: 'Introuvable' }} />
        <Text>Aucun produit avec le code {code}.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Le titre de l'en-tête prend le nom du produit. */}
      <Stack.Screen options={{ title: product.name }} />

      {product.imageUrl ? <ElasticImage uri={product.imageUrl} /> : null}

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>
            {product.brand}
            {product.quantity ? ` · ${product.quantity}` : ''}
          </Text>
          <Text style={styles.code}>{product.code}</Text>
        </View>
        <NutriScoreBadge grade={product.nutriScore} />
      </View>

      {product.novaGroup ? <Text style={styles.nova}>Groupe NOVA {product.novaGroup} sur 4</Text> : null}

      <NutrimentsTable nutriments={product.nutriments} />

      {product.ingredients ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Ingrédients</Text>
          <Text style={styles.blockText}>{product.ingredients}</Text>
        </View>
      ) : null}

      {product.allergens.length > 0 ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Allergènes</Text>
          <Text style={styles.blockText}>{product.allergens.join(', ')}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
  },
  brand: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
  },
  code: {
    fontFamily: monospaceFont,
    color: colors.textMuted,
  },
  nova: {
    color: colors.text,
  },
  block: {
    gap: spacing.xs,
  },
  blockTitle: {
    fontSize: fontSizes.title,
    fontWeight: '600',
    color: colors.text,
  },
  blockText: {
    color: colors.text,
    lineHeight: 21,
  },
});
