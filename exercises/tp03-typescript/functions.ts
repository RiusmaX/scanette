// TP 3 · Étapes 2 à 4 · CORRIGÉ
import type { NutriScore, Product } from './types.ts';

export function formatName(product: Product): string {
  return `${product.name} (${product.brand})`;
}

export function filterByNutriScore(products: Product[], grade: NutriScore): Product[] {
  return products.filter((product) => product.nutriScore === grade);
}

// find peut ne rien trouver : le type de retour le dit.
export function findByCode(products: Product[], code: string): Product | undefined {
  return products.find((product) => product.code === code);
}

// T est un paramètre de type : il prend la valeur du type des éléments à l'appel.
export function firstOrNull<T>(items: T[]): T | null {
  return items.length > 0 ? items[0] : null;
}

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
    case 'e':
      return 'Qualité nutritionnelle mauvaise';
  }
}
