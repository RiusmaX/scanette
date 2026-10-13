// TP 1 · Les bases de JavaScript · CORRIGÉ

// 1. La propriété length d'un tableau donne son nombre d'éléments.
export function countProducts(products) {
  return products.length;
}

// 2. Gabarit de chaîne (template literal) : les accolades insèrent une valeur.
export function formatName(product) {
  return `${product.name} (${product.brand})`;
}

// 3. map crée un nouveau tableau en transformant chaque élément.
export function getNames(products) {
  return products.map((product) => product.name);
}

// 4. filter garde les éléments pour lesquels la fonction renvoie true.
export function filterByNutriScore(products, grade) {
  return products.filter((product) => product.nutriScore === grade);
}

// 5. find renvoie le premier élément trouvé, ou undefined.
export function findByCode(products, code) {
  return products.find((product) => product.code === code);
}

// 6. On vérifie que novaGroup n'est pas null AVANT de le comparer.
export function isHealthy(product) {
  const goodScore = product.nutriScore === 'a' || product.nutriScore === 'b';
  const lowProcessing = product.novaGroup !== null && product.novaGroup <= 2;
  return goodScore && lowProcessing;
}

// 7. Boucle classique : on additionne et on compte seulement les valeurs connues.
export function averageSugars(products) {
  let total = 0;
  let count = 0;
  for (const product of products) {
    if (product.sugars !== null) {
      total += product.sugars;
      count++;
    }
  }
  if (count === 0) {
    return 0;
  }
  // Arrondi à une décimale : on multiplie par 10, on arrondit, on divise par 10.
  return Math.round((total / count) * 10) / 10;
}

// 8. Un objet sert de dictionnaire : la clé est la catégorie, la valeur le compteur.
export function countByCategory(products) {
  const counts = {};
  for (const product of products) {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
  }
  return counts;
}

// Bonus. sort modifie le tableau sur place : on trie donc une copie.
export function sortByName(products) {
  return [...products].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}
