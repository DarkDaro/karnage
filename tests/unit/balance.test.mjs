import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CH } from '../../src/data/characters.js';

const NORMALS = ['punch', 'kick', 'upper', 'sweep', 'rh', 'jkick'];

test('normal, command and throw values stay inside balance bounds', () => {
  const moves = [];
  for (const fighter of CH) {
    for (const key of NORMALS) {
      const move = fighter.norm[key];
      moves.push({
        id: fighter.id,
        key,
        damage: move.d * fighter.dmg,
        range: move.rng * fighter.bulk,
        startup: move.wd,
        total: move.wd + move.ac + move.rc,
        dps: (move.d * fighter.dmg) / (move.wd + move.ac + move.rc)
      });
    }
    for (const [key, move] of Object.entries(fighter.cmd)) {
      moves.push({
        id: fighter.id,
        key,
        damage: move.d * fighter.dmg,
        range: move.rng * fighter.bulk,
        startup: move.wd,
        total: move.wd + move.ac + move.rc,
        dps: (move.d * fighter.dmg) / (move.wd + move.ac + move.rc)
      });
    }
  }

  for (const move of moves) {
    assert.ok(move.damage > 0 && move.damage <= 20, `${move.id}/${move.key}: damage ${move.damage}`);
    assert.ok(move.range >= 18 && move.range <= 56, `${move.id}/${move.key}: range ${move.range}`);
    assert.ok(move.startup >= 3 && move.startup <= 12, `${move.id}/${move.key}: startup ${move.startup}`);
    assert.ok(move.total >= 12 && move.total <= 40, `${move.id}/${move.key}: total ${move.total}`);
    assert.ok(move.dps <= 0.72, `${move.id}/${move.key}: dps ${move.dps}`);
  }

  for (const fighter of CH) {
    assert.ok(fighter.spd >= 1.5 && fighter.spd <= 2.8, `${fighter.name}: speed ${fighter.spd}`);
    assert.ok(fighter.dmg >= 0.85 && fighter.dmg <= 1.25, `${fighter.name}: damage multiplier ${fighter.dmg}`);
    assert.ok(!fighter.throwCmdD || fighter.throwCmdD <= 18, `${fighter.name}: command throw ${fighter.throwCmdD}`);
  }
});
