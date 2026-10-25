/* global window */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..', '..');
const port = 8718;
const entry = `http://127.0.0.1:${port}/dev.html?debug=1`;

let browser;
let page;
let server;

async function ready() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/dev.html`);
      if (response.ok) return;
    } catch {
      // server is still starting
    }
    await delay(100);
  }
  throw new Error('dev server did not start');
}

before(async () => {
  server = spawn(process.execPath, ['tools/serve.mjs'], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  await ready();
  browser = await chromium.launch({ headless: true, args: ['--mute-audio'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.addInitScript(() => {
    window.requestAnimationFrame = () => 0;
  });
  await page.goto(entry, { waitUntil: 'load' });
  await page.waitForFunction(() => Boolean(window.KARNAGE));
});

after(async () => {
  await browser?.close();
  server?.kill();
});

test('every special and super starts through real input', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const key = { D: 'KeyS', U: 'KeyW', L: 'KeyA', R: 'KeyD', P: 'KeyJ', K: 'KeyK' };
    const failures = [];
    const clear = () => { for (const code in K.keys) K.keys[code] = false; };
    const setup = (id) => {
      clear();
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(id, new K.Ctrl(K.KM1), (id + 1) % K.CH.length, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = '2p';
      battle.phase = 'fight';
      battle.phaseT = 200;
      battle.p1.ctrl.ai = false;
      battle.p2.ctrl.ai = false;
      battle.p1.x = 300;
      battle.p2.x = 330;
      battle.p1.y = battle.p2.y = 214;
      battle.p1.face = 1;
      battle.p2.face = -1;
      battle.p1.state = 'idle';
      battle.p1.st = 0;
      battle.p1.atk = null;
      battle.p2.state = 'idle';
      battle.p2.st = 0;
      battle.p2.atk = null;
      battle.p2.hp = 100;
      battle.p2.defeated = 0;
      battle.p1.ctrl.clear();
      battle.p2.ctrl.clear();
      return battle;
    };
    const press = (code) => {
      K.keys[code] = true;
      K.step();
      K.keys[code] = false;
      K.step();
    };
    const input = (command) => {
      for (const symbol of command) press(key[symbol]);
    };
    const snapshot = (battle) => ({
      projs: K.projs.length,
      fx: K.fx.length,
      marks: battle.p1.marks.length,
      invis: battle.p1.invis,
      x: battle.p1.x,
      foeHp: battle.p2.hp,
      foeState: battle.p2.state
    });
    const changed = (before, battle) => (
      K.projs.length > before.projs ||
      K.fx.length > before.fx ||
      battle.p1.marks.length > before.marks ||
      battle.p1.invis > before.invis ||
      Math.abs(battle.p1.x - before.x) > 2 ||
      battle.p2.hp < before.foeHp ||
      battle.p2.state !== before.foeState
    );

    for (const def of K.CH) {
      for (const [kind, command, expected] of [
        ['spec', def.spec, 0],
        ['spec2', def.spec2, 1]
      ]) {
        const battle = setup(def.id);
        const before = snapshot(battle);
        input(command);
        if (battle.p1.state !== 'cast' || battle.p1.spec2go !== expected) {
          failures.push(`${def.id}/${kind}: not cast (${battle.p1.state}, spec2go=${battle.p1.spec2go})`);
          continue;
        }
        for (let frame = 0; frame < 24; frame += 1) K.step();
        if (!changed(before, battle)) failures.push(`${def.id}/${kind}: no visible effect`);
      }

      const battle = setup(def.id);
      const before = snapshot(battle);
      battle.p1.rage = 100;
      input('DDP');
      if (battle.p1.state !== 'super') {
        failures.push(`${def.id}/super: not started (${battle.p1.state})`);
        continue;
      }
      for (let frame = 0; frame < 120; frame += 1) K.step();
      if (!changed(before, battle)) failures.push(`${def.id}/super: no visible effect`);
    }
    return failures;
  });
  assert.deepEqual(result, []);
});

test('command normals and directional U-specials stay usable from the ground', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const failures = [];
    const setup = (id) => {
      for (const code in K.keys) K.keys[code] = false;
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(id, new K.Ctrl(K.KM1), (id + 1) % K.CH.length, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = '2p';
      battle.phase = 'fight';
      battle.phaseT = 200;
      battle.p1.ctrl.ai = false;
      battle.p2.ctrl.ai = false;
      battle.p1.x = 300;
      battle.p2.x = 330;
      battle.p1.y = battle.p2.y = 214;
      battle.p1.face = 1;
      battle.p2.face = -1;
      battle.p1.state = 'idle';
      battle.p1.st = 0;
      battle.p1.atk = null;
      battle.p2.state = 'idle';
      battle.p2.st = 0;
      battle.p2.atk = null;
      battle.p2.hp = 100;
      battle.p2.defeated = 0;
      battle.p1.ctrl.clear();
      battle.p2.ctrl.clear();
      return battle;
    };
    const press = (code) => {
      K.keys[code] = true;
      K.step();
      K.keys[code] = false;
      K.step();
    };
    const input = (command) => {
      const key = { D: 'KeyS', U: 'KeyW', L: 'KeyA', R: 'KeyD', P: 'KeyJ', K: 'KeyK' };
      for (const symbol of command) press(key[symbol]);
    };
    const snapshot = (battle) => ({
      projs: K.projs.length,
      fx: K.fx.length,
      marks: battle.p1.marks.length,
      invis: battle.p1.invis,
      x: battle.p1.x,
      foeHp: battle.p2.hp,
      foeState: battle.p2.state
    });
    const changed = (before, battle) => (
      K.projs.length > before.projs ||
      K.fx.length > before.fx ||
      battle.p1.marks.length > before.marks ||
      battle.p1.invis > before.invis ||
      Math.abs(battle.p1.x - before.x) > 2 ||
      battle.p2.hp < before.foeHp ||
      battle.p2.state !== before.foeState
    );

    for (const def of K.CH) {
      for (const [key, direction, button] of [
        ['fP', 'KeyD', 'KeyJ'],
        ['fK', 'KeyD', 'KeyK'],
        ['bP', 'KeyA', 'KeyJ']
      ]) {
        const battle = setup(def.id);
        K.keys[direction] = true;
        K.step();
        press(button);
        K.keys[direction] = false;
        K.step();
        const started = battle.p1.atk;
        if (battle.p1.state !== 'atk' || !started || started.name !== def.cmd[key].n) {
          failures.push(`${def.id}/${key}: not started`);
          continue;
        }
        for (let frame = 0; frame < 12; frame += 1) K.step();
        if (battle.p2.hp >= 100) failures.push(`${def.id}/${key}: no hit`);
      }

      for (const [kind, command] of [['spec', def.spec], ['spec2', def.spec2]]) {
        if (!command.includes('U')) continue;
        const battle = setup(def.id);
        const before = snapshot(battle);
        input(command);
        const groundExpected = command[0] !== 'U';
        if (battle.p1.state !== 'cast' || (groundExpected && !battle.p1.onGround)) {
          failures.push(`${def.id}/${kind}: cast from air (${battle.p1.state}, y=${Math.round(battle.p1.y)})`);
          continue;
        }
        for (let frame = 0; frame < 24; frame += 1) K.step();
        if (!changed(before, battle)) failures.push(`${def.id}/${kind}: no visible effect`);
      }
    }
    return failures;
  });
  assert.deepEqual(result, []);
});

test('command throws and target combos work for every fighter', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const failures = [];
    const setup = (id) => {
      for (const code in K.keys) K.keys[code] = false;
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(id, new K.Ctrl(K.KM1), (id + 1) % K.CH.length, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = '2p';
      battle.phase = 'fight';
      battle.phaseT = 200;
      battle.p1.ctrl.ai = false;
      battle.p2.ctrl.ai = false;
      battle.p1.x = 300;
      battle.p2.x = 330;
      battle.p1.y = battle.p2.y = 214;
      battle.p1.face = 1;
      battle.p2.face = -1;
      battle.p1.state = 'idle';
      battle.p1.st = 0;
      battle.p1.atk = null;
      battle.p2.state = 'idle';
      battle.p2.st = 0;
      battle.p2.atk = null;
      battle.p2.hp = 100;
      battle.p2.defeated = 0;
      battle.p1.ctrl.clear();
      battle.p2.ctrl.clear();
      return battle;
    };

    for (const def of K.CH) {
      const battle = setup(def.id);
      K.keys.KeyS = true;
      K.step();
      K.keys.KeyJ = true;
      K.keys.KeyK = true;
      K.step();
      K.keys.KeyJ = false;
      K.keys.KeyK = false;
      K.step();
      K.keys.KeyS = false;
      K.step();
      const started = battle.p1.atk;
      if (!started || started.t !== 'throw' || !started.cmdThrow) {
        failures.push(`${def.id}: command throw did not start`);
      } else {
        for (let frame = 0; frame < 30; frame += 1) K.step();
        if (battle.p2.hp >= 100) failures.push(`${def.id}: command throw did not damage`);
      }

      const chainBattle = setup(def.id);
      chainBattle.p1.startAtk('punch');
      for (let frame = 0; frame < 8; frame += 1) K.step();
      chainBattle.p1.startAtk('punch');
      chainBattle.p1.startAtk('kick');
      if (!chainBattle.p1.atk?.target || chainBattle.p1.atk.target.n !== def.target.n) {
        failures.push(`${def.id}: target combo not detected (${chainBattle.p1.chain})`);
      }
    }
    return failures;
  });
  assert.deepEqual(result, []);
});

test('every fatality accepts its command in the finish window', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const key = { D: 'KeyS', U: 'KeyW', L: 'KeyA', R: 'KeyD', P: 'KeyJ', K: 'KeyK' };
    const failures = [];
    const press = (code) => {
      K.keys[code] = true;
      K.step();
      K.keys[code] = false;
      K.step();
    };
    const input = (command) => {
      for (const symbol of command) press(key[symbol]);
    };
    for (const def of K.CH) {
      for (const code in K.keys) K.keys[code] = false;
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(def.id, new K.Ctrl(K.KM1), (def.id + 1) % K.CH.length, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = '2p';
      battle.phase = 'finish';
      battle.phaseT = 0;
      battle.winner = battle.p1;
      battle.loser = battle.p2;
      battle.p1.wins = 2;
      battle.p2.hp = 0;
      battle.p2.defeated = 1;
      battle.p2.state = 'dizzy';
      battle.p2.st = 0;
      battle.p1.ctrl.clear();
      battle.p2.ctrl.clear();
      input(def.fat);
      if (battle.phase !== 'fatal') failures.push(`${def.id}: ${def.fat} did not start fatality`);
    }
    return failures;
  });
  assert.deepEqual(result, []);
});
