import { catalog } from '@/data/catalog';
import type { Product } from '@/types/product';

// Simule un appel réseau : le catalogue arrive après un délai, comme s'il venait d'un serveur.
// `failRate` (entre 0 et 1) permet de provoquer des erreurs pour tester l'affichage d'erreur.
export function fetchCatalog(delay = 800, failRate = 0): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('Le serveur ne répond pas'));
      } else {
        resolve(catalog);
      }
    }, delay);
  });
}
