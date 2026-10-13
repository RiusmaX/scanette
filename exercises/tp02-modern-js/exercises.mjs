// TP 2 · JavaScript moderne (ES6 à ES2017) et asynchrone · CORRIGÉ
import { fetchProductFromApi } from './fakeApi.mjs';

// 1. On déstructure directement dans les paramètres, avec une valeur par défaut.
export const getLabel = ({ name, brand = 'Sans marque' }) => `${name} · ${brand}`;

// 2. Le spread copie toutes les propriétés, puis on ajoute (ou écrase) isFavorite.
export const withFavorite = (product) => ({ ...product, isFavorite: true });

// 3. Même idée pour les tableaux : on recopie puis on ajoute.
export const addProduct = (list, product) => [...list, product];

// 4. filter → copie triée (filter renvoie déjà un nouveau tableau) → slice → map.
export const getTopSugars = (products, count) =>
  products
    .filter((product) => product.sugars !== null)
    .sort((a, b) => b.sugars - a.sugars)
    .slice(0, count)
    .map((product) => product.name);

// 5. On « promisifie » setTimeout : resolve est appelé quand le délai est écoulé.
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 6. await suspend la fonction jusqu'à la réponse ; une promesse rejetée devient une exception.
export const loadProductName = async (code) => {
  try {
    const product = await fetchProductFromApi(code);
    return product.name;
  } catch (error) {
    return 'Produit inconnu';
  }
};

// 7. On lance toutes les promesses d'un coup, puis on attend qu'elles soient toutes résolues.
export const loadProductNames = async (codes) => {
  const products = await Promise.all(codes.map((code) => fetchProductFromApi(code)));
  return products.map((product) => product.name);
};
