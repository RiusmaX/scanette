// Tests du TP 2 : ne pas modifier ce fichier.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { products } from './products.mjs';
import {
  addProduct, getLabel, getTopSugars, loadProductName, loadProductNames, wait, withFavorite,
} from './exercises.mjs';

test('1. getLabel', () => {
  assert.equal(getLabel(products[0]), 'Prince · LU');
  assert.equal(getLabel({ name: 'Pain maison' }), 'Pain maison · Sans marque');
});

test('2. withFavorite', () => {
  const result = withFavorite(products[0]);
  assert.equal(result.isFavorite, true);
  assert.equal(result.name, 'Prince');
  assert.notEqual(result, products[0], 'il faut un nouvel objet');
  assert.equal(products[0].isFavorite, undefined, "le produit d'origine ne doit pas changer");
});

test('3. addProduct', () => {
  const list = [products[0]];
  const result = addProduct(list, products[1]);
  assert.equal(result.length, 2);
  assert.equal(list.length, 1, "le tableau d'origine ne doit pas changer");
});

test('4. getTopSugars', () => {
  assert.deepEqual(getTopSugars(products, 2), ['Nutella', 'Prince']);
  assert.equal(products[0].name, 'Prince', "le tableau d'origine ne doit pas être trié");
});

test('5. wait', async () => {
  const start = Date.now();
  await wait(100);
  assert.ok(Date.now() - start >= 90);
});

test('6. loadProductName', async () => {
  assert.equal(await loadProductName('3017620422003'), 'Nutella');
  assert.equal(await loadProductName('0000000000000'), 'Produit inconnu');
});

test('7. loadProductNames', async () => {
  const start = Date.now();
  const names = await loadProductNames(['7622210449283', '3017620422003', '3387390123210']);
  assert.deepEqual(names, ['Prince', 'Nutella', 'Chocapic']);
  assert.ok(Date.now() - start < 400, 'les appels doivent partir en parallèle');
});
