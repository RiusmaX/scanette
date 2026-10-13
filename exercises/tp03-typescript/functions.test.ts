// Tests du TP 3 : ne pas modifier ce fichier.
// Node 24 exécute directement le TypeScript (il retire les types avant d'exécuter).
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { products } from './products.ts';
import { describeNutriScore, filterByNutriScore, findByCode, firstOrNull, formatName } from './functions.ts';

test('formatName', () => {
  assert.equal(formatName(products[0]), 'Prince (LU)');
});

test('filterByNutriScore', () => {
  assert.equal(filterByNutriScore(products, 'a').length, 3);
});

test('findByCode', () => {
  assert.equal(findByCode(products, '3017620422003')?.name, 'Nutella');
});

test('firstOrNull', () => {
  assert.equal(firstOrNull([1, 2, 3]), 1);
  assert.equal(firstOrNull([]), null);
});

test('describeNutriScore', () => {
  assert.equal(describeNutriScore('e'), 'Qualité nutritionnelle mauvaise');
});
