// TP 1 · Les bases de JavaScript
// Complète chaque fonction, puis lance les tests :
//   node --test exercises/tp01-js-basics/
// Un test vert = exercice réussi. Commence par le 1, ils sont rangés du plus simple au plus riche.
// Le mot-clé `export` rend la fonction visible depuis un autre fichier (on le détaille cet après-midi).

// 1. Renvoie le nombre de produits du tableau.
export function countProducts(products) {
  // À toi de jouer
}

// 2. Renvoie le nom suivi de la marque entre parenthèses : « Prince (LU) ».
export function formatName(product) {
  // À toi de jouer
}

// 3. Renvoie un tableau contenant uniquement les noms des produits.
export function getNames(products) {
  // À toi de jouer
}

// 4. Renvoie les produits dont le Nutri-Score vaut `grade` (« a », « b »…).
export function filterByNutriScore(products, grade) {
  // À toi de jouer
}

// 5. Renvoie le produit dont le code-barres vaut `code`, ou `undefined` s'il n'existe pas.
export function findByCode(products, code) {
  // À toi de jouer
}

// 6. Un produit est « sain » si son Nutri-Score est « a » ou « b »
//    ET si son groupe NOVA est connu et inférieur ou égal à 2.
export function isHealthy(product) {
  // À toi de jouer
}

// 7. Renvoie la moyenne des sucres (en g pour 100 g), arrondie à une décimale.
//    Les produits dont `sugars` vaut null sont ignorés. Tableau vide ou sans valeur : renvoie 0.
export function averageSugars(products) {
  // À toi de jouer
}

// 8. Renvoie un objet qui compte les produits par catégorie :
//    { 'Biscuits': 1, 'Céréales': 2, ... }
export function countByCategory(products) {
  // À toi de jouer
}

// Bonus. Renvoie une COPIE du tableau triée par nom (ordre alphabétique français),
//        sans modifier le tableau d'origine. Indice : localeCompare.
export function sortByName(products) {
  // À toi de jouer
}
