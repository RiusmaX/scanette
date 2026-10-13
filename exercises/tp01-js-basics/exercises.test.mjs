// Tests du TP 1 : ne pas modifier ce fichier.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { products } from './products.mjs';
import {
  averageSugars, countByCategory, countProducts, filterByNutriScore,
  findByCode, formatName, getNames, isHealthy, sortByName,
} from './exercises.mjs';

test('1. countProducts', () => {
  assert.equal(countProducts(products), 6);
  assert.equal(countProducts([]), 0);
});

test('2. formatName', () => {
  assert.equal(formatName(products[0]), 'Prince (LU)');
});

test('3. getNames', () => {
  assert.deepEqual(getNames(products), ['Prince', "Flocons d'avoine", 'Nutella', 'Le Nature', 'Chocapic', 'Skyr']);
});

test('4. filterByNutriScore', () => {
  assert.deepEqual(filterByNutriScore(products, 'e').map((p) => p.name), ['Prince', 'Nutella']);
  assert.deepEqual(filterByNutriScore(products, 'c'), []);
});

test('5. findByCode', () => {
  assert.equal(findByCode(products, '3017620422003').name, 'Nutella');
  assert.equal(findByCode(products, '0000000000000'), undefined);
});

test('6. isHealthy', () => {
  assert.equal(isHealthy(products[1]), true); // a, NOVA 1
  assert.equal(isHealthy(products[4]), false); // b, mais NOVA 4
  assert.equal(isHealthy(products[5]), false); // a, mais NOVA inconnu
  assert.equal(isHealthy(products[0]), false); // e
});

test('7. averageSugars', () => {
  assert.equal(averageSugars(products), 22.8);
  assert.equal(averageSugars([]), 0);
});

test('8. countByCategory', () => {
  assert.deepEqual(countByCategory(products), {
    Biscuits: 1, 'Céréales': 2, 'Pâtes à tartiner': 1, Yaourts: 2,
  });
});

test('Bonus. sortByName', () => {
  const sorted = sortByName(products);
  assert.deepEqual(sorted.map((p) => p.name), ['Chocapic', "Flocons d'avoine", 'Le Nature', 'Nutella', 'Prince', 'Skyr']);
  assert.equal(products[0].name, 'Prince', 'le tableau d\'origine ne doit pas bouger');
});
