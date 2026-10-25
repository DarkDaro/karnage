import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AR } from '../../src/data/arenas.js';
import { BOSS, CH } from '../../src/data/characters.js';
import { ENDINGS } from '../../src/data/endings.js';

const broken = /[\u0000-\u001f\u007f\ufffd]|undefined|\bNaN\b/;
const command = /^[DURLPK]+$/;

function cleanText(value, label) {
  assert.equal(typeof value, 'string', label);
  assert.ok(value.trim().length > 0, label);
  assert.equal(value, value.trim(), `${label}: пробелы по краям`);
  assert.ok(!broken.test(value), `${label}: битый символ`);
  assert.ok(!/\s{2,}/.test(value), `${label}: двойной пробел`);
}

test('player-facing fighter text is complete', () => {
  for (const fighter of [...CH, BOSS]) {
    for (const field of ['name', 'en', 'specN', 'spec2N', 'sup', 'throwN']) {
      cleanText(fighter[field], `${fighter.id}:${field}`);
    }
    for (const field of ['spec', 'spec2', 'fat']) {
      assert.match(fighter[field], command, `${fighter.name}:${field}`);
      assert.ok(/[PK]$/.test(fighter[field]), `${fighter.name}:${field} без ударной кнопки`);
    }
  }
});

test('arena and ending text has no empty or broken lines', () => {
  for (const arena of AR) cleanText(arena.n, 'arena');
  for (const ending of ENDINGS) {
    cleanText(ending.title, 'ending title');
    assert.equal(ending.lines.length, 2);
    for (const line of ending.lines) cleanText(line, ending.title);
  }
});
