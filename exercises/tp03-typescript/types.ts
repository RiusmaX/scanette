// TP 3 · Étape 1 · CORRIGÉ

// Un type union de littéraux : seules ces cinq chaînes sont acceptées.
export type NutriScore = 'a' | 'b' | 'c' | 'd' | 'e';

export type NovaGroup = 1 | 2 | 3 | 4;

export interface Product {
  code: string;
  name: string;
  brand: string;
  category: string;
  nutriScore: NutriScore;
  novaGroup: NovaGroup | null; // null = valeur inconnue
  sugars: number | null;
}
