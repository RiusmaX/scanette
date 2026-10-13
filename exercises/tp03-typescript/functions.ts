// TP 3 · Étape 2 · Type les fonctions.
// Ces fonctions marchent déjà (ce sont celles du TP 1), mais leurs paramètres
// n'ont pas de type : TypeScript en mode strict refuse les `any` implicites.
// Ajoute les types des paramètres ET des valeurs de retour.
// Contrôle : npx tsc -p exercises/tp03-typescript  puis  node --test "exercises/tp03-typescript/*.test.ts"
import type { NutriScore, Product } from './types.ts';

export function formatName(product) {
  return `${product.name} (${product.brand})`;
}

export function filterByNutriScore(products, grade) {
  return products.filter((product) => product.nutriScore === grade);
}

export function findByCode(products, code) {
  return products.find((product) => product.code === code);
}

// TP 3 · Étape 3 · Un générique.
// Renvoie le premier élément d'un tableau, ou null s'il est vide.
// Elle doit marcher pour un tableau de n'importe quel type : firstOrNull<T>(...).
export function firstOrNull(items) {
  return items.length > 0 ? items[0] : null;
}

// TP 3 · Étape 4 · Une union exhaustive.
// Renvoie un libellé lisible pour chaque Nutri-Score.
// Ajoute le cas manquant : TypeScript doit refuser de compiler tant qu'il manque.
export function describeNutriScore(grade: NutriScore): string {
  switch (grade) {
    case 'a':
      return 'Très bonne qualité nutritionnelle';
    case 'b':
      return 'Bonne qualité nutritionnelle';
    case 'c':
      return 'Qualité nutritionnelle moyenne';
    case 'd':
      return 'Qualité nutritionnelle médiocre';
  }
}
