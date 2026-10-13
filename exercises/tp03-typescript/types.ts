// TP 3 · Étape 1 · Décris les données avec des types.
// Vérifie ton travail avec :
//   npx tsc -p exercises/tp03-typescript

// 1. Crée un type union `NutriScore` qui n'accepte que 'a', 'b', 'c', 'd' ou 'e'.
export type NutriScore = string; // À remplacer

// 2. Crée un type union `NovaGroup` qui n'accepte que 1, 2, 3 ou 4.
export type NovaGroup = number; // À remplacer

// 3. Complète l'interface Product à partir des produits du fichier products.ts :
//    code, name, brand, category (des chaînes), nutriScore (NutriScore),
//    novaGroup (NovaGroup ou null), sugars (nombre ou null).
export interface Product {
  code: string;
  // À compléter
}
