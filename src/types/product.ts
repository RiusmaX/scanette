// Types partagés par toute l'application Scanette.

// Les notes Nutri-Score possibles, de « a » (la meilleure) à « e ».
export type NutriScore = 'a' | 'b' | 'c' | 'd' | 'e';

// Le groupe NOVA mesure le degré de transformation d'un aliment :
// 1 = brut ou peu transformé, 4 = ultra-transformé.
export type NovaGroup = 1 | 2 | 3 | 4;

// Valeurs nutritionnelles pour 100 g.
// `null` quand Open Food Facts ne connaît pas la valeur : on ne l'invente pas.
export interface Nutriments {
  energyKcal: number | null;
  fat: number | null;
  saturatedFat: number | null;
  sugars: number | null;
  salt: number | null;
  proteins: number | null;
}

// Un produit tel que l'application le manipule.
// On ne garde que les champs utiles, pas les 300 champs renvoyés par l'API.
export interface Product {
  code: string; // code-barres EAN-13, toujours une chaîne (il peut commencer par 0)
  name: string;
  brand: string;
  quantity: string | null;
  category: string;
  nutriScore: NutriScore | null; // certains produits n'ont pas encore de note
  novaGroup: NovaGroup | null;
  imageUrl: string | null;
  ingredients: string | null;
  allergens: string[];
  nutriments: Nutriments;
}
