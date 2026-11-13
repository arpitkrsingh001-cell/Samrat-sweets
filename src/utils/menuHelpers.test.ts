import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  filterMenuCategories,
  formatInrPrice,
  getDietaryType,
  getSignatureDishes,
  getTotalItemCount,
  hasHalfFullPricing,
  slugifyCategory,
  splitTextByQuery,
  toTelHref,
  validateMenuDataShape,
} from './menuHelpers';
import { menuData } from '../data/menuData';

test('bundled menu JSON exactly matches the supplied public asset JSON', () => {
  const publicJsonPath = path.resolve(
    process.cwd(),
    'public/assets/aistudio/samrat_sweets_menu_data_ae3b02ee.json'
  );
  const publicJson = JSON.parse(fs.readFileSync(publicJsonPath, 'utf-8'));
  assert.deepEqual(menuData, publicJson);
});

test('menu dataset passes structural validation with all 21 categories', () => {
  const result = validateMenuDataShape(menuData);
  assert.equal(result.valid, true);
  assert.equal(result.categoryCount, 21);
  assert.ok(result.itemCount > 180);
});

test('formatInrPrice formats integer and decimal INR prices accurately', () => {
  assert.equal(formatInrPrice(120), '₹120');
  assert.equal(formatInrPrice(18), '₹18');
  assert.equal(formatInrPrice(19.05), '₹19.05');
  assert.equal(formatInrPrice(61.9), '₹61.90');
  assert.equal(formatInrPrice(33.33), '₹33.33');
});

test('hasHalfFullPricing identifies Half/Full items vs single-price items', () => {
  const cheesePizza = menuData.categories[1].items[0];
  const tomatoSoup = menuData.categories[0].items[0];
  assert.equal(hasHalfFullPricing(cheesePizza), true);
  assert.equal(hasHalfFullPricing(tomatoSoup), false);
});

test('filterMenuCategories filters by category and search query accurately', () => {
  const all = filterMenuCategories(menuData.categories, {
    selectedCategory: 'all',
    searchQuery: '',
  });
  assert.equal(all.length, 21);

  const pizzaOnly = filterMenuCategories(menuData.categories, {
    selectedCategory: 'Pizza',
    searchQuery: '',
  });
  assert.equal(pizzaOnly.length, 1);
  assert.equal(pizzaOnly[0].items.length, 7);

  const paneerSearch = filterMenuCategories(menuData.categories, {
    selectedCategory: 'all',
    searchQuery: 'paneer',
  });
  assert.ok(paneerSearch.length >= 5);
  const totalPaneerMatches = getTotalItemCount(paneerSearch);
  assert.ok(totalPaneerMatches > 15);

  const descriptionSearch = filterMenuCategories(menuData.categories, {
    selectedCategory: 'all',
    searchQuery: 'pickle',
  });
  assert.equal(descriptionSearch.length, 1);
  assert.equal(descriptionSearch[0].name, 'Special Thalis');

  const noResults = filterMenuCategories(menuData.categories, {
    selectedCategory: 'all',
    searchQuery: 'nonexistentdish999',
  });
  assert.equal(noResults.length, 0);
});

test('getSignatureDishes returns exact Samrat house signature items from JSON', () => {
  const signatures = getSignatureDishes(menuData.categories);
  assert.equal(signatures.length, 5);
  assert.deepEqual(
    signatures.map((s) => s.item.name),
    [
      'Samrat Special Pizza',
      'Samrat Special Chowmein',
      'Samrat Special Dosa',
      'Samrat Eco Thali',
      'Samrat SPL Thali',
    ]
  );
});

test('splitTextByQuery safely splits text with case-insensitive matching and special chars', () => {
  assert.deepEqual(splitTextByQuery('Paneer Butter Masala', ''), [
    { text: 'Paneer Butter Masala', matched: false },
  ]);

  assert.deepEqual(splitTextByQuery('Paneer Butter Masala', 'paneer'), [
    { text: 'Paneer', matched: true },
    { text: ' Butter Masala', matched: false },
  ]);

  assert.deepEqual(splitTextByQuery('Samosa (1 Pc.)', '(1 Pc.)'), [
    { text: 'Samosa ', matched: false },
    { text: '(1 Pc.)', matched: true },
  ]);

  assert.deepEqual(splitTextByQuery('Chilli Paneer Pizza', 'P'), [
    { text: 'Chilli ', matched: false },
    { text: 'P', matched: true },
    { text: 'aneer ', matched: false },
    { text: 'P', matched: true },
    { text: 'izza', matched: false },
  ]);

  assert.deepEqual(splitTextByQuery('Paneer Pizza Paneer', 'paneer'), [
    { text: 'Paneer', matched: true },
    { text: ' Pizza ', matched: false },
    { text: 'Paneer', matched: true },
  ]);
});

test('slugifyCategory and toTelHref produce clean anchors and phone URIs', () => {
  assert.equal(slugifyCategory('Snacks – All Day'), 'snacks-all-day');
  assert.equal(slugifyCategory('Ice Cream & Shakes'), 'ice-cream-and-shakes');
  assert.equal(toTelHref('+91 85868 89025'), 'tel:+918586889025');
});

test('getDietaryType classifies all current menu items and handles explicit or non-veg items', () => {
  for (const category of menuData.categories) {
    for (const item of category.items) {
      assert.equal(
        getDietaryType(item),
        'veg',
        `Expected "${item.name}" in "${category.name}" to classify as veg`
      );
    }
  }

  assert.equal(getDietaryType({ name: 'Chicken Tikka', price: 280 }), 'non-veg');
  assert.equal(getDietaryType({ name: 'Egg Curry', price: 190 }), 'non-veg');
  assert.equal(getDietaryType({ name: 'Eggplant Bharta', price: 180 }), 'veg');
  assert.equal(getDietaryType({ name: 'Chef Special', price: 250, dietary: 'non-veg' }), 'non-veg');
  assert.equal(getDietaryType({ name: 'Mock Chicken Chap', price: 210, dietary: 'veg' }), 'veg');
});

test('filterMenuCategories filters by Veg and Non-Veg accurately including search combinations', () => {
  const vegOnlyMenu = filterMenuCategories(menuData.categories, {
    selectedCategory: 'all',
    searchQuery: '',
    dietaryFilter: 'veg',
  });
  assert.equal(vegOnlyMenu.length, 21);
  assert.equal(getTotalItemCount(vegOnlyMenu), 193);

  const nonVegMenu = filterMenuCategories(menuData.categories, {
    selectedCategory: 'all',
    searchQuery: '',
    dietaryFilter: 'non-veg',
  });
  assert.equal(nonVegMenu.length, 0);

  const mixedCategories = [
    {
      name: 'Pizza',
      items: [
        { name: 'Paneer Pizza', price: 200 },
        { name: 'Chicken Tikka Pizza', price: 280 },
      ],
    },
    {
      name: 'Starters',
      items: [
        { name: 'Veg Seek Kebab', price: 205 },
        { name: 'Mutton Seek Kebab', price: 320 },
      ],
    },
  ];

  const mixedVeg = filterMenuCategories(mixedCategories, {
    selectedCategory: 'all',
    searchQuery: '',
    dietaryFilter: 'veg',
  });
  assert.deepEqual(
    mixedVeg.map((c) => c.items.map((i) => i.name)),
    [['Paneer Pizza'], ['Veg Seek Kebab']]
  );

  const mixedNonVegPizzaSearch = filterMenuCategories(mixedCategories, {
    selectedCategory: 'all',
    searchQuery: 'Pizza',
    dietaryFilter: 'non-veg',
  });
  assert.equal(mixedNonVegPizzaSearch.length, 1);
  assert.deepEqual(
    mixedNonVegPizzaSearch[0].items.map((i) => i.name),
    ['Chicken Tikka Pizza']
  );
});


