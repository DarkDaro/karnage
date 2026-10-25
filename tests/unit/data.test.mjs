import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { test } from 'node:test';
import { BOSS, CH } from '../../src/data/characters.js';
import { ENDINGS } from '../../src/data/endings.js';

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
  assert.equal(ENDINGS.length, 13);
  for (const ending of ENDINGS) {
    assert.ok(ending.title && ending.title.length <= 32, ending.title);
    assert.equal(ending.lines.length, 2, ending.title);
    assert.ok(ending.lines.every((line) => line.length > 0 && line.length <= 48), ending.title);
    assert.match(ending.col, /^#[0-9a-f]{6}$/i);
  }
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

test('special and super data is complete and unique', () => {
  for (const fighter of [...CH, BOSS]) {
    for (const field of ['spec', 'spec2', 'fat']) {
      const command = fighter[field];
      assert.match(command, valid, `${fighter.name} ${field}`);
      assert.ok(command.length >= 2 && command.length <= 5, `${fighter.name} ${field}`);
      assert.ok(command.endsWith('P') || command.endsWith('K'), `${fighter.name} ${field}`);
    }
    assert.notEqual(fighter.spec, fighter.spec2, `${fighter.name} spec collision`);
    for (const field of ['specN', 'spec2N', 'sup']) {
      assert.ok(fighter[field] && fighter[field].length <= 28, `${fighter.name} ${field}`);
    }
  }
  const fatalityCommands = CH.map((fighter) => fighter.fat);
  assert.equal(new Set(fatalityCommands).size, fatalityCommands.length, 'fatality commands must be unique');
});

test('normal and command normal data is complete and distinct', () => {
  for (const fighter of [...CH, BOSS]) {
    for (const type of ['punch', 'kick', 'upper', 'sweep', 'rh', 'jkick']) {
      const normal = fighter.norm?.[type];
      assert.ok(normal, `${fighter.name} ${type}`);
      for (const value of Object.values(normal)) assert.ok(Number.isFinite(value), `${fighter.name} ${type}`);
    }
    for (const key of ['fP', 'fK', 'bP']) {
      const command = fighter.cmd?.[key];
      assert.ok(command && command.n && command.t, `${fighter.name} ${key}`);
      assert.ok(command.d > 0 && command.rng > 0, `${fighter.name} ${key}`);
    }
  }
  const names = CH.flatMap((fighter) => ['fP', 'fK', 'bP'].map((key) => fighter.cmd[key].n));
  assert.equal(new Set(names).size, names.length, 'command normal names must be unique');
});

test('every fighter has a named throw finisher', () => {
  for (const fighter of [...CH, BOSS]) {
    assert.ok(fighter.throwN && fighter.throwN.length <= 24, fighter.name);
    assert.ok(fighter.throwT, fighter.name);
    assert.ok(Number.isFinite(fighter.throwD) && fighter.throwD > 0, fighter.name);
    assert.match(fighter.throwC, /^#[0-9a-f]{6}$/i, fighter.name);
  }
});

test('arena indices stay within the stage table', () => {
  for (const arena of arenas) {
    assert.ok(Number.isInteger(arena) && arena >= 0 && arena <= 9, String(arena));
  }
});
