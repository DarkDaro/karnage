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
    for (const field of ['specN', 'spec2N', 'sup', 'fatN']) {
      assert.ok(fighter[field] && fighter[field].length <= 28, `${fighter.name} ${field}`);
    }
    assert.ok(fighter.fatT, `${fighter.name} fatality type`);
    assert.match(fighter.fatC, /^#[0-9a-f]{6}$/i, `${fighter.name} fatality colour`);
  }
  const fatalityCommands = CH.map((fighter) => fighter.fat);
  assert.equal(new Set(fatalityCommands).size, fatalityCommands.length, 'fatality commands must be unique');
  const mirrors = fatalityCommands.map((command) => command.replace(/[LR]/g, (side) => side === 'L' ? 'R' : 'L'));
  assert.equal(new Set([...fatalityCommands, ...mirrors]).size, fatalityCommands.length * 2, 'fatality commands must not mirror each other');
  const fatalityNames = CH.map((fighter) => fighter.fatN);
  assert.equal(new Set(fatalityNames).size, fatalityNames.length, 'fatality names must be unique');
  const fatalityTypes = CH.map((fighter) => fighter.fatT);
  assert.equal(new Set(fatalityTypes).size, fatalityTypes.length, 'fatality effects must be unique');
  const superNames = CH.map((fighter) => fighter.sup);
  assert.equal(new Set(superNames).size, superNames.length, 'super names must be unique');
  const superTypes = CH.map((fighter) => fighter.supT);
  assert.equal(new Set(superTypes).size, superTypes.length, 'super mechanics must be unique');
  assert.ok(superTypes.every(Boolean), 'every fighter needs a super mechanic');
});

test('normal and command normal data is complete and distinct', () => {
  const statuses = new Set(['stagger', 'launch', 'low', 'overhead', 'knockdown']);
  for (const fighter of [...CH, BOSS]) {
    for (const type of ['punch', 'kick', 'upper', 'sweep', 'rh', 'jkick']) {
      const normal = fighter.norm?.[type];
      assert.ok(normal, `${fighter.name} ${type}`);
      for (const [key, value] of Object.entries(normal)) {
        if (key !== 'status') assert.ok(Number.isFinite(value), `${fighter.name} ${type}.${key}`);
      }
      assert.ok(statuses.has(normal.status), `${fighter.name} ${type}.status`);
      assert.ok(normal.wd >= 3 && normal.rc >= 5 && normal.rng > 0, `${fighter.name} ${type} timings`);
      assert.ok(normal.hw > 0 && normal.hh > 0 && normal.kb > 0, `${fighter.name} ${type} hitbox`);
    }
    for (const key of ['fP', 'fK', 'bP']) {
      const command = fighter.cmd?.[key];
      assert.ok(command && command.n && command.t, `${fighter.name} ${key}`);
      for (const field of ['d', 'wd', 'ac', 'rc', 'rng', 'hw', 'hh', 'kb']) assert.ok(command[field] > 0, `${fighter.name} ${key}.${field}`);
      assert.ok(statuses.has(command.status), `${fighter.name} ${key}.status`);
    }
  }
  const names = CH.flatMap((fighter) => ['fP', 'fK', 'bP'].map((key) => fighter.cmd[key].n));
  assert.equal(new Set(names).size, names.length, 'command normal names must be unique');
  assert.ok(new Set(CH.map((fighter) => fighter.norm.upper.wd)).size >= 4, 'startup must differ by fighter');
  assert.ok(new Set(CH.map((fighter) => fighter.norm.rh.rng)).size >= 6, 'range must differ by fighter');
});

test('grapplers have stronger command throws and every fighter has role answers', () => {
  const grapplers = CH.filter((fighter) => fighter.grappler);
  assert.deepEqual(grapplers.map((fighter) => fighter.id), [3, 7]);
  for (const fighter of grapplers) {
    assert.ok(fighter.throwCmdD > fighter.throwD, fighter.name);
    assert.ok(fighter.throwCmdT, fighter.name);
  }
  for (const fighter of [...CH, BOSS]) {
    for (const role of ['zone', 'jump', 'pressure']) {
      const pick = fighter.roles?.[role];
      assert.ok(pick, `${fighter.name} ${role}`);
      if (pick === 'spec' || pick === 'spec2') assert.ok(fighter[pick], `${fighter.name} ${role}`);
      else if (pick === 'upper' || pick === 'rh') assert.ok(fighter.norm[pick], `${fighter.name} ${role}`);
      else assert.ok(fighter.cmd[pick], `${fighter.name} ${role}`);
    }
  }
});

test('command throws and target combos are complete', () => {
  for (const fighter of [...CH, BOSS]) {
    assert.ok(fighter.throwCmdN, `${fighter.name} command throw`);
    assert.match(fighter.target.seq, /^[PK]{2,3}$/, `${fighter.name} target sequence`);
    assert.ok(fighter.target.n, `${fighter.name} target name`);
  }
  for (const field of ['throwCmdN', 'target']) {
    const values = CH.map((fighter) => field === 'target' ? fighter.target.n : fighter[field]);
    assert.equal(new Set(values).size, values.length, `${field} must be unique`);
  }
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
