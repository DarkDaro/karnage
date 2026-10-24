/* global window, localStorage */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..', '..');
const port = 8715;
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
  browser = await chromium.launch({ headless: true });
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

test('special input is relative to facing', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const out = {};
    const fresh = (left) => {
      for (const key in K.keys) K.keys[key] = false;
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = '2p';
      battle.phase = 'fight';
      battle.phaseT = 200;
      battle.p1.x = left ? 500 : 300;
      battle.p2.x = 400;
      battle.p1.face = left ? -1 : 1;
      battle.p2.face = left ? 1 : -1;
      return battle;
    };
    const press = (code) => {
      K.keys[code] = true;
      K.step();
      K.keys[code] = false;
      K.step();
    };
    fresh(true);
    press('KeyS');
    press('KeyA');
    press('KeyJ');
    out.facingLeft = K.battle.p1.state;
    fresh(false);
    press('KeyS');
    press('KeyD');
    press('KeyJ');
    out.facingRight = K.battle.p1.state;
    return out;
  });
  assert.deepEqual(result, { facingLeft: 'cast', facingRight: 'cast' });
});

test('finish lock blocks damage and accepts fatality input', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.ctrl.ai = false;
    battle.p2.ctrl.ai = false;
    battle.p1.wins = 1;
    battle.p2.hp = 0;
    K.step();
    const phaseAfterKo = battle.phase;
    const projectilesAfterKo = K.projs.length;
    battle.p1.x = 100;
    battle.p2.x = 125;
    battle.p1.face = 1;
    const press = (code) => {
      K.keys[code] = true;
      K.step();
      K.keys[code] = false;
      K.step();
    };
    press('KeyJ');
    for (let i = 0; i < 10; i += 1) K.step();
    const afterPunch = { phase: battle.phase, loser: battle.p2.state, hp: battle.p2.hp };
    for (const key in K.keys) K.keys[key] = false;
    battle.p1.ctrl.clear();
    press('KeyD');
    press('KeyD');
    press('KeyA');
    press('KeyJ');
    return {
      phaseAfterKo,
      projectilesAfterKo,
      afterPunch,
      finalPhase: battle.phase
    };
  });
  assert.equal(result.phaseAfterKo, 'finish');
  assert.equal(result.projectilesAfterKo, 0);
  assert.equal(result.afterPunch.phase, 'finish');
  assert.equal(result.afterPunch.loser, 'dizzy');
  assert.equal(result.afterPunch.hp, 0);
  assert.equal(result.finalPhase, 'fatal');
});

test('defeated fighter stays down', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p2.hp = 0;
    K.step();
    for (let i = 0; i < 80; i += 1) K.step();
    return { phase: battle.phase, loser: battle.p2.state, defeated: Boolean(battle.p2.defeated) };
  });
  assert.equal(result.phase, 'ko');
  assert.equal(result.loser, 'down');
  assert.equal(result.defeated, true);
});

test('double KO does not award a win', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.hp = 0;
    battle.p2.hp = 0;
    K.step();
    return {
      phase: battle.phase,
      p1: battle.p1.wins,
      p2: battle.p2.wins
    };
  });
  assert.deepEqual(result, { phase: 'ko', p1: 0, p2: 0 });
});

test('net overlay clears and super damage respects block and dodge', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.x = 300;
    battle.p2.x = 330;
    battle.p2.netT = 95;
    battle.p2.state = 'net';
    K.resolveHit(battle.p1, battle.p2, 3, {});
    const netAfterHit = battle.p2.netT;

    battle.p2.state = 'block';
    battle.p2.hp = 100;
    K.autoHit(battle.p1, 5);
    const block = { hp: battle.p2.hp, state: battle.p2.state };

    battle.p2.state = 'idle';
    battle.p2.dodging = 1;
    battle.p2.hp = 100;
    K.autoHit(battle.p1, 5);
    const dodge = battle.p2.hp;

    battle.p2.dodging = 0;
    battle.p2.hp = 100;
    K.autoHit(battle.p1, 5);
    const hit = { hp: battle.p2.hp, state: battle.p2.state };

    for (let i = 0; i < 30; i += 1) K.step();
    return { netAfterHit, netAfterTick: battle.p2.netT, block, dodge, hit };
  });
  assert.equal(result.netAfterHit, 0);
  assert.equal(result.netAfterTick, 0);
  assert.deepEqual(result.block, { hp: 99, state: 'block' });
  assert.equal(result.dodge, 100);
  assert.equal(result.hit.state, 'hit');
  assert.ok(result.hit.hp < 100);
});

test('three drawn rounds end the match without round four', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    for (let round = 0; round < 3; round += 1) {
      battle.phase = 'fight';
      battle.phaseT = 200;
      battle.timer = 0.0001;
      K.step();
      for (let i = 0; i < 141; i += 1) K.step();
    }
    return {
      round: battle.round,
      phase: battle.phase,
      winner: Boolean(battle.winner),
      wins: battle.p1.wins + battle.p2.wins
    };
  });
  assert.ok(result.round <= 3, String(result.round));
  assert.equal(result.phase, 'finish');
  assert.equal(result.winner, true);
  assert.equal(result.wins, 2);
});

test('bad leaderboard storage does not break the screen', async () => {
  const result = await page.evaluate(() => {
    localStorage.karnageTop = JSON.stringify([
      null,
      { id: 999, step: 5 },
      { id: 0, step: 2 }
    ]);
    window.KARNAGE.setDebug({ GAME: 'top' });
    try {
      window.KARNAGE.render();
      return { ok: true, entries: window.KARNAGE.TOP ? window.KARNAGE.TOP().length : -1 };
    } catch (error) {
      return { ok: false, error: `${error.name}: ${error.message}` };
    } finally {
      localStorage.removeItem('karnageTop');
    }
  });
  assert.equal(result.ok, true);
});

test('interrupted special does not leak spec2go', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.spec2go = 1;
    battle.p1.startSpec(battle.p2);
    for (let i = 0; i < 15; i += 1) K.step();
    return {
      spec2go: battle.p1.spec2go,
      types: K.projs.map((projectile) => projectile.ty)
    };
  });
  assert.equal(result.spec2go, 0);
  assert.deepEqual(result.types, ['fire']);
});
