// TP 2 · JavaScript moderne (ES6 à ES2017) et asynchrone
// Lance les tests avec :
//   node --test "exercises/tp02-modern-js/*.test.mjs"
// Toutes les fonctions s'écrivent en fonctions fléchées si tu veux t'entraîner.
import { fetchProductFromApi } from './fakeApi.mjs';

// 1. Déstructuration avec valeur par défaut.
//    Renvoie « Prince · LU ». Si la marque est absente : « Prince · Sans marque ».
//    Écris la signature avec une déstructuration : ({ name, brand = ... }) => ...
export const getLabel = (product) => {
  // À toi de jouer
};

// 2. Spread d'objet : renvoie un NOUVEL objet identique au produit, avec isFavorite: true.
//    Le produit d'origine ne doit pas être modifié.
export const withFavorite = (product) => {
  // À toi de jouer
};

// 3. Spread de tableau : renvoie un NOUVEAU tableau avec le produit ajouté à la fin.
export const addProduct = (list, product) => {
  // À toi de jouer
};

// 4. Chaînage : renvoie les noms des `count` produits les plus sucrés, du plus sucré au moins sucré.
//    Ignore les produits dont `sugars` est null. Pense à trier une copie.
export const getTopSugars = (products, count) => {
  // À toi de jouer
};

// 5. Promesse : renvoie une promesse qui se résout (sans valeur) après `ms` millisecondes.
export const wait = (ms) => {
  // À toi de jouer
};

// 6. async / await : renvoie le nom du produit récupéré avec fetchProductFromApi(code).
//    Si l'API rejette (produit introuvable), renvoie « Produit inconnu ». Utilise try / catch.
export const loadProductName = async (code) => {
  // À toi de jouer
};

// 7. En parallèle : récupère tous les produits des `codes` EN MÊME TEMPS et renvoie leurs noms.
//    Indice : Promise.all. Le test vérifie que ça prend moins de 2 appels successifs.
export const loadProductNames = async (codes) => {
  // À toi de jouer
};
