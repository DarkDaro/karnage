import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..', '..');
const source = readFileSync(join(root, 'src', 'data', 'characters.js'), 'utf8');
const valid = /^[DURLPK]+$/;

const base = source.match(/const CH\s*=\s*\[(.*?)\];/s)?.[1] ?? '';
const entries = [...base.matchAll(/\{id:(\d+),([^{}]*)\}/g)];
const pushes = [...source.matchAll(/CH\.push\(\{id:(\d+),([^{}]*)\}\)/g)];
const ids = [...entries, ...pushes].map((entry) => Number(entry[1]));
const specs = [...entries, ...pushes].map((entry) => entry[2].match(/\bspec:'([^']+)'/)?.[1] ?? '');
const fats = [...entries, ...pushes].map((entry) => entry[2].match(/\bfat:'([^']+)'/)?.[1] ?? '');
const arenas = [...entries, ...pushes].map((entry) => Number(entry[2].match(/\barena:(\d+)/)?.[1]));

test('roster ids are sequential', () => {
  assert.deepEqual(ids, [...Array(ids.length).keys()]);
  assert.equal(ids.length, 13);
});

test('combos use the command alphabet', () => {
  assert.equal(specs.length, 13);
  assert.equal(fats.length, 13);
  for (const combo of [...specs, ...fats]) {
    assert.match(combo, valid);
  }
});

test('fatalities end with an attack button', () => {
  for (const combo of fats) {
    assert.ok(combo.endsWith('P') || combo.endsWith('K'), combo);
  }
});

test('arena indices stay within the stage table', () => {
  for (const arena of arenas) {
    assert.ok(Number.isInteger(arena) && arena >= 0 && arena <= 9, String(arena));
  }
});
