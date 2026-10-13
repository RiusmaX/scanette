// Une fausse API qui imite le réseau : elle répond après un délai, et parfois elle échoue.
// Elle évite d'envoyer 8 stagiaires × 10 requêtes à Open Food Facts en même temps.
import { products } from './products.mjs';

// Renvoie une promesse résolue avec le produit au bout de `delay` millisecondes,
// ou rejetée avec une erreur si le code-barres est inconnu.
export function fetchProductFromApi(code, delay = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.code === code);
      if (product) {
        resolve(product);
      } else {
        reject(new Error(`Produit ${code} introuvable`));
      }
    }, delay);
  });
}
