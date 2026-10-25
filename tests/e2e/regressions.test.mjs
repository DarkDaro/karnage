/* global window, localStorage, document */
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
  browser = await chromium.launch({ headless: true, args: ['--mute-audio'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.addInitScript(() => {
    window.requestAnimationFrame = () => 0;
  });
  await page.goto(entry, { waitUntil: 'load' });
  await page.waitForFunction(() => Boolean(window.KARNAGE), null, { polling: 100 });
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
    battle.p1.face = -1;
    battle.phaseT = 500;
    press('KeyA');
    press('KeyA');
    press('KeyD');
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

test('finish window accepts a throw without ending the fatality window', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const b = K.battle;
    b.mode = '2p';
    b.phase = 'finish';
    b.phaseT = 0;
    b.winner = b.p1;
    b.loser = b.p2;
    b.fatalFace = 1;
    b.p1.wins = 2;
    b.p1.x = 300;
    b.p2.x = 330;
    b.p1.face = 1;
    b.p2.face = -1;
    b.p1.state = 'idle';
    b.p1.st = 0;
    b.p1.atk = null;
    b.p1.ctrl.clear();
    b.p2.state = 'dizzy';
    b.p2.st = 0;
    b.p2.atk = null;
    b.p2.hp = 0;
    b.p2.defeated = 1;
    b.p2.ctrl.clear();
    K.keys.KeyJ = true;
    K.step();
    K.keys.KeyJ = false;
    for (let i = 0; i < 6; i += 1) K.step();
    K.keys.KeyK = true;
    K.step();
    K.keys.KeyK = false;
    const started = b.p1.atk?.t || '';
    let grabbed = false;
    for (let i = 0; i < 40; i += 1) {
      K.step();
      if (b.p2.state === 'grabbed') grabbed = true;
    }
    return { started, grabbed, phase: b.phase, state: b.p2.state, hp: b.p2.hp, defeated: b.p2.defeated };
  });
  assert.equal(result.started, 'throw');
  assert.equal(result.grabbed, true);
  assert.equal(result.phase, 'finish');
  assert.equal(result.state, 'dizzy');
  assert.equal(result.hp, 0);
  assert.equal(result.defeated, 1);
});

test('fatality direction is fixed for the finish window and the final button may be K', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const key = { D: 'KeyS', U: 'KeyW', L: 'KeyA', R: 'KeyD', P: 'KeyJ', K: 'KeyK' };
    const press = (code) => {
      K.keys[code] = true;
      K.step();
      K.keys[code] = false;
      K.step();
    };
    const setup = () => {
      for (const code in K.keys) K.keys[code] = false;
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
      const b = K.battle;
      b.mode = '2p';
      b.phase = 'finish';
      b.phaseT = 0;
      b.winner = b.p1;
      b.loser = b.p2;
      b.fatalFace = 1;
      b.p1.wins = 2;
      b.p1.x = 330;
      b.p2.x = 300;
      b.p1.face = -1;
      b.p2.face = 1;
      b.p1.state = 'idle';
      b.p1.st = 0;
      b.p1.atk = null;
      b.p1.ctrl.clear();
      b.p2.state = 'dizzy';
      b.p2.st = 0;
      b.p2.atk = null;
      b.p2.hp = 0;
      b.p2.defeated = 1;
      b.p2.ctrl.clear();
      return b;
    };
    const b1 = setup();
    for (const ch of 'RRLP') press(key[ch]);
    const b2 = setup();
    for (const ch of 'RRLK') press(key[ch]);
    return { fixed: b1.phase, kFinal: b2.phase };
  });
  assert.equal(result.fixed, 'fatal');
  assert.equal(result.kFinal, 'fatal');
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

test('low and overhead attacks respect block height', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    const p1 = battle.p1;
    const p2 = battle.p2;
    const hit = (opts, low) => {
      p2.hp = 100;
      p2.state = 'block';
      p2.blockLow = low;
      p2.invuln = 0;
      K.resolveHit(p1, p2, 10, opts);
      return { hp: p2.hp, state: p2.state };
    };
    return {
      standingLow: hit({ low: 1 }, 0),
      crouchLow: hit({ low: 1 }, 1),
      crouchOverhead: hit({ overhead: 1 }, 1)
    };
  });
  assert.ok(result.standingLow.hp < 100);
  assert.deepEqual(result.crouchLow, { hp: 99, state: 'block' });
  assert.ok(result.crouchOverhead.hp < 100);
});

test('fatal cutscene can be skipped', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.wins = 1;
    battle.p2.hp = 0;
    K.step();
    K.startFatal(battle.p1, battle.p2);
    for (let i = 0; i < 40; i += 1) K.step();
    K.onKey('KeyJ');
    return { phase: battle.phase, winner: battle.winner?.def.id };
  });
  assert.deepEqual(result, { phase: 'over', winner: 0 });
});

test('round curtain waits for the fight screen', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'vs', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    K.setDebug({ GAME: 'vs' });
    const before = { wipe: K.wipe, announce: K.announce?.t };
    for (let i = 0; i < 30; i += 1) K.step();
    const held = { wipe: K.wipe, announce: K.announce?.t };
    K.setDebug({ GAME: 'fight' });
    K.step();
    const after = { wipe: K.wipe, announce: K.announce?.t };
    return { before, held, after };
  });
  assert.deepEqual(result.before, { wipe: 24, announce: 0 });
  assert.deepEqual(result.held, { wipe: 24, announce: 0 });
  assert.ok(result.after.wipe < 24);
  assert.ok(result.after.announce > 0);
});

test('render does not spawn explosion particles', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: true });
    K.fx.length = 0;
    K.fx.push({ ty: 'boom', x: 300, y: 100, t: 3 });
    const before = K.parts.length;
    for (let i = 0; i < 20; i += 1) K.render();
    return { before, after: K.parts.length };
  });
  assert.deepEqual(result, { before: 0, after: 0 });
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

test('arcade leaderboard keeps one best entry per fighter', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    localStorage.karnageTop = JSON.stringify([
      { id: 0, step: 2 },
      { id: 0, step: 5 },
      { id: 1, step: 3 },
      { id: 0, step: 5 }
    ]);
    const top = K.TOP();
    K.addTop(0, 4, '2026-10-25');
    const lower = K.TOP();
    K.addTop(2, 7, '2026-10-26');
    const added = K.TOP();
    localStorage.removeItem('karnageTop');
    return { top, lower, added };
  });
  assert.deepEqual(result.top, [
    { id: 0, step: 5 },
    { id: 1, step: 3 }
  ]);
  assert.deepEqual(result.lower, result.top);
  assert.deepEqual(result.added, [
    { id: 2, step: 7, date: '2026-10-26' },
    { id: 0, step: 5 },
    { id: 1, step: 3 }
  ]);
});

test('arcade saves progress, resumes and ends with final boss', async () => {
  await page.evaluate(() => {
    const K = window.KARNAGE;
    localStorage.clear();
    K.startLadder(0);
    K.setDebug({ GAME: 'fight', paused: false });
    const battle = K.battle;
    battle.mode = 'arcade';
    battle.phase = 'over';
    battle.phaseT = 200;
    battle.winner = battle.p1;
    K.step();
  });
  const saved = await page.evaluate(() => window.KARNAGE.loadArcRun());
  assert.equal(saved.c1, 0);
  assert.equal(saved.step, 1);
  assert.equal(saved.ladder.length, 11);

  await page.reload({ waitUntil: 'load' });
  await page.waitForFunction(() => Boolean(window.KARNAGE), null, { polling: 100 });
  const resumed = await page.evaluate(() => {
    const K = window.KARNAGE;
    const run = K.loadArcRun();
    const ok = K.resumeSavedArcade();
    return { run, ok, game: K.GAME, step: K.lStep, opponent: K.battle.p2.def.name };
  });
  assert.equal(resumed.ok, true);
  assert.equal(resumed.game, 'vs');
  assert.equal(resumed.step, 1);
  assert.equal(resumed.run.step, 1);

  const boss = await page.evaluate(() => {
    const K = window.KARNAGE;
    const win = () => {
      K.setDebug({ GAME: 'fight', paused: false });
      const battle = K.battle;
      battle.mode = 'arcade';
      battle.phase = 'over';
      battle.phaseT = 200;
      battle.winner = battle.p1;
      K.step();
    };
    for (let i = 0; i < 10; i += 1) win();
    return {
      step: K.lStep,
      game: K.GAME,
      boss: K.battle.p2.def.boss === true,
      name: K.battle.p2.def.name,
      ai: K.battle.aiLvl,
      total: K.arcTotal,
      savedStep: K.loadArcRun()?.step
    };
  });
  assert.deepEqual(boss, {
    step: 11,
    game: 'vs',
    boss: true,
    name: 'КАЙЗЕР-ПРАЙМ',
    ai: 7,
    total: 12,
    savedStep: 11
  });

  const bossMoves = await page.evaluate(() => {
    const K = window.KARNAGE;
    const battle = K.battle;
    K.setDebug({ GAME: 'fight', paused: false });
    battle.phase = 'fight';
    battle.phaseT = 200;
    const boss = battle.p2;
    const foe = battle.p1;
    const count = () => K.snapshot().projs;
    const beforeSpec = count();
    boss.fireSpec(foe);
    const spec = count() - beforeSpec;
    const beforeSpec2 = count();
    boss.fireSpec2(foe);
    const spec2 = count() - beforeSpec2;
    const beforeSuper = count();
    boss.startSuper();
    for (let i = 0; i < 80; i += 1) {
      boss.st += 1;
      boss.updSuper();
    }
    const superCount = count() - beforeSuper;
    const armor = boss.armor;
    boss.state = 'idle';
    boss.st = 0;
    return { spec, spec2, superCount, armor };
  });
  assert.deepEqual(bossMoves, { spec: 3, spec2: 5, superCount: 8, armor: 20 });

  const finish = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    const battle = K.battle;
    battle.mode = 'arcade';
    battle.phase = 'over';
    battle.phaseT = 200;
    battle.winner = battle.p1;
    K.step();
    const out = {
      game: K.GAME,
      saved: K.loadArcRun(),
      top: K.TOP(),
      arc: localStorage.karnageArc,
      endingTitle: K.arcEnding().ending.title
    };
    localStorage.removeItem('karnageTop');
    localStorage.removeItem('karnageArc');
    localStorage.removeItem('karnageArcRun');
    return out;
  });
  assert.equal(finish.game, 'ending');
  assert.equal(finish.saved, null);
  assert.deepEqual(finish.top.map(({ id, step }) => ({ id, step })), [{ id: 0, step: 12 }]);
  assert.match(finish.top[0].date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(finish.arc, '12');
  assert.equal(finish.endingTitle, 'ПЕПЕЛ НА ВЕТРУ');
});

test('arcade difficulty is chosen before the series and saved', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    localStorage.clear();
    K.toLobby('menu');
    K.setDebug({
      GAME: 'select',
      sel: { mode: 'arcade', c1: 0, c2: 1, ph: 0, l1: false, l2: false, diff: 1, ar: -1, row: 0 }
    });
    K.onKey('Enter');
    const setup = { game: K.GAME, ph: K.sel.ph, diff: K.sel.diff };
    K.onKey('KeyA');
    const changed = { diff: K.sel.diff, game: K.GAME };
    K.onKey('Enter');
    const started = {
      game: K.GAME,
      diff: K.arcDiff,
      ai: K.battle.aiLvl,
      saved: K.loadArcRun()?.diff
    };
    localStorage.removeItem('karnageArcRun');
    return { setup, changed, started };
  });
  assert.deepEqual(result.setup, { game: 'select', ph: 2, diff: 1 });
  assert.deepEqual(result.changed, { diff: 0, game: 'select' });
  assert.deepEqual(result.started, { game: 'vs', diff: 0, ai: 0, saved: 0 });
});

test('long combos shorten hitstun', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    const hitStun = (combo) => {
      battle.p1.combo = combo;
      battle.p1.comboT = 0;
      battle.p2.hp = 100;
      battle.p2.state = 'idle';
      battle.p2.defeated = 0;
      battle.p2.invuln = 0;
      K.resolveHit(battle.p1, battle.p2, 5, {});
      return battle.p2.hitStun;
    };
    return { first: hitStun(0), long: hitStun(4) };
  });
  assert.deepEqual(result, { first: 18, long: 12 });
});

test('blocked punch can be canceled into a throw', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const code in K.keys) K.keys[code] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.x = 300;
    battle.p2.x = 330;
    battle.p1.face = 1;
    battle.p2.face = -1;
    battle.p1.state = 'idle';
    battle.p2.state = 'idle';
    battle.p1.ctrl.clear();
    battle.p2.ctrl.clear();
    K.keys.KeyP = true;
    K.step();
    K.keys.KeyJ = true;
    K.step();
    K.keys.KeyJ = false;
    let blocked = false;
    for (let i = 0; i < 7; i += 1) {
      K.step();
      if (battle.p1.atk?.blocked) blocked = true;
    }
    K.keys.KeyK = true;
    K.step();
    K.keys.KeyK = false;
    const converted = battle.p1.atk?.t;
    for (let i = 0; i < 10; i += 1) K.step();
    const grabbed = battle.p2.state;
    K.keys.KeyP = false;
    return { blocked, converted, grabbed };
  });
  assert.equal(result.blocked, true);
  assert.equal(result.converted, 'throw');
  assert.equal(result.grabbed, 'grabbed');
});

test('main menu offers continue for a saved arcade run', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    localStorage.clear();
    K.startLadder(0);
    K.toLobby('menu');
    K.onKey('Enter');
    const out = {
      game: K.GAME,
      step: K.lStep,
      player: K.battle.p1.def.id,
      saved: K.loadArcRun()?.step
    };
    localStorage.removeItem('karnageArcRun');
    localStorage.removeItem('karnageTop');
    localStorage.removeItem('karnageArc');
    return out;
  });
  assert.deepEqual(result, { game: 'vs', step: 0, player: 0, saved: 0 });
});

test('training mode uses a passive dummy with endless resources', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    localStorage.clear();
    K.toLobby('menu');
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    K.onKey('Enter');
    const selected = K.GAME;
    K.onKey('Enter');
    const b = K.battle;
    const started = {
      game: K.GAME,
      mode: b.mode,
      dummy: b.p2.def.name,
      ai: b.p2.ctrl.ai,
      axes: Object.keys(b.p2.ctrl.ax).length,
      timer: b.timer,
      phase: b.phase
    };
    K.onKey('KeyT');
    K.step();
    const block = { on: b.trainBlock, ax: b.p2.ctrl.ax.B, state: b.p2.state };
    K.onKey('KeyT');
    K.step();
    b.p1.x = 352;
    b.p1.startAtk('punch');
    for (let i = 0; i < 12; i += 1) K.step();
    const hit = { combo: b.p1.combo, hp: b.p2.hp, phase: b.phase };
    K.keys.KeyJ = true;
    K.step();
    K.keys.KeyJ = false;
    const input = b.p1.ctrl.buf.some((entry) => entry.k === 'P');
    b.timer = 0;
    b.p2.hp = 0;
    K.step();
    const safe = { timer: b.timer, hp: b.p2.hp, defeated: b.p2.defeated, phase: b.phase, p1hp: b.p1.hp, rage: b.p1.rage };
    K.onKey('KeyR');
    const reset = { x: b.p1.x, p2x: b.p2.x, hp: b.p2.hp, timer: b.timer, phase: b.phase, block: b.trainBlock };
    let render = 'ok';
    try {
      K.render();
      K.setDebug({ paused: true });
      K.render();
      K.setDebug({ paused: false });
    } catch (error) {
      render = `${error.name}: ${error.message}`;
    }
    return { selected, started, block, hit, input, safe, reset, render };
  });
  assert.equal(result.selected, 'select');
  assert.equal(result.started.game, 'fight');
  assert.equal(result.started.mode, 'training');
  assert.equal(result.started.dummy, 'МАНЕКЕН');
  assert.equal(result.started.ai, true);
  assert.equal(result.started.axes, 0);
  assert.equal(result.started.timer, 99);
  assert.equal(result.started.phase, 'fight');
  assert.deepEqual(result.block, { on: true, ax: true, state: 'block' });
  assert.ok(result.hit.combo >= 1);
  assert.equal(result.hit.hp, 100);
  assert.equal(result.input, true);
  assert.equal(result.safe.timer, 99);
  assert.equal(result.safe.hp, 100);
  assert.equal(result.safe.defeated, 0);
  assert.equal(result.safe.phase, 'fight');
  assert.equal(result.safe.p1hp, 100);
  assert.equal(result.safe.rage, 100);
  assert.deepEqual(result.reset, { x: 300, p2x: 380, hp: 100, timer: 99, phase: 'fight', block: false });
  assert.equal(result.render, 'ok');
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

test('settings open from the main menu and persist video toggles', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    localStorage.removeItem('karnageArcRun');
    K.toLobby('menu');
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    K.onKey('Enter');
    const opened = K.GAME;
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    const before = K.OPT.crt;
    K.onKey('Enter');
    const after = K.OPT.crt;
    const display = document.getElementById('crt').style.display;
    const saved = JSON.parse(localStorage.karnageOpts || '{}');
    K.onKey('Enter');
    K.onKey('Escape');
    return {
      opened,
      before,
      after,
      display,
      savedCrt: saved.crt,
      restored: K.OPT.crt,
      closed: K.GAME
    };
  });
  assert.equal(result.opened, 'settings');
  assert.notEqual(result.after, result.before);
  assert.equal(result.display, result.after ? 'block' : 'none');
  assert.equal(result.savedCrt, result.after);
  assert.equal(result.restored, result.before);
  assert.equal(result.closed, 'menu');
});

test('combo damage scales and resets with the combo window', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    const hit = (combo, comboT) => {
      battle.p1.combo = combo;
      battle.p1.comboT = comboT;
      battle.p2.hp = 100;
      battle.p2.state = 'idle';
      battle.p2.defeated = 0;
      battle.p2.invuln = 0;
      battle.p2.frozen = 0;
      K.resolveHit(battle.p1, battle.p2, 10, {});
      return 100 - battle.p2.hp;
    };
    return {
      first: hit(0, 99),
      third: hit(2, 0),
      long: hit(8, 0),
      reset: hit(5, 60)
    };
  });
  assert.equal(result.first, 10);
  assert.ok(result.third < result.first && result.third > result.long);
  assert.equal(result.long, 5.5);
  assert.equal(result.reset, 10);
});

test('throws beat block and catch crouching targets', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.x = 300;
    battle.p2.x = 330;
    battle.p1.face = 1;
    battle.p2.face = -1;
    const reset = (state) => {
      battle.p1.combo = 0;
      battle.p1.comboT = 99;
      battle.p2.hp = 100;
      battle.p2.state = state;
      battle.p2.defeated = 0;
      battle.p2.invuln = 0;
      battle.p2.blockLow = 0;
      battle.p2.y = 214;
      battle.p2.vy = 0;
    };
    reset('block');
    const blockResult = K.resolveHit(battle.p1, battle.p2, 12, { throw: 1, knock: 1 });
    const blocked = { result: blockResult, hp: battle.p2.hp, state: battle.p2.state };
    reset('block');
    const normal = K.resolveHit(battle.p1, battle.p2, 12, {});
    const normalBlock = { result: normal, hp: battle.p2.hp, state: battle.p2.state };
    reset('crouch');
    battle.p1.startAtk('throw');
    for (let i = 0; i < 8; i += 1) battle.p1.update(100 + i, battle.p2);
    const crouch = { hp: battle.p2.hp, state: battle.p2.state, hit: battle.p1.atk?.hit || 0 };
    reset('crouch');
    battle.p1.startCmdThrow();
    for (let i = 0; i < 8; i += 1) battle.p1.update(140 + i, battle.p2);
    const crouchCmd = { hp: battle.p2.hp, state: battle.p2.state, hit: battle.p1.atk?.hit || 0 };
    reset('idle');
    battle.p1.startAtk('throw');
    for (let i = 0; i < 8; i += 1) battle.p1.update(120 + i, battle.p2);
    const standing = { hp: battle.p2.hp, state: battle.p2.state, hit: battle.p1.atk?.hit || 0 };
    return { blocked, normalBlock, crouch, crouchCmd, standing };
  });
  assert.deepEqual(result.blocked, { result: 'hit', hp: 88, state: 'down' });
  assert.deepEqual(result.normalBlock, { result: 'block', hp: 99, state: 'block' });
  assert.equal(result.crouch.hit, 1);
  assert.equal(result.crouch.state, 'grabbed');
  assert.ok(result.crouch.hp < 100);
  assert.equal(result.crouchCmd.hit, 1);
  assert.equal(result.crouchCmd.state, 'grabbed');
  assert.ok(result.crouchCmd.hp < 100);
  assert.ok(result.standing.hp < 100);
  assert.equal(result.standing.hit, 1);
});

test('throw armor absorbs a poke and turns it into a grab', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const b = K.battle;
    b.mode = '2p';
    b.phase = 'fight';
    b.phaseT = 200;
    b.p1.ctrl.ai = false;
    b.p2.ctrl.ai = false;
    b.p1.x = 300;
    b.p2.x = 330;
    b.p1.y = b.p2.y = 214;
    b.p1.face = 1;
    b.p2.face = -1;
    b.p1.state = 'idle';
    b.p1.st = 0;
    b.p1.atk = null;
    b.p1.ctrl.clear();
    b.p2.state = 'atk';
    b.p2.st = 0;
    b.p2.atk = { t: 'punch', A: K.ATK.punch, hit: 0, blocked: 0, connected: 0 };
    b.p2.ctrl.clear();
    b.p1.startAtk('throw');
    for (let i = 0; i < 14; i += 1) K.step();
    return {
      grabbed: b.p2.state,
      armorHit: b.p1.armorHit,
      throwType: b.p1.atk?.t || '',
      p1hp: b.p1.hp
    };
  });
  assert.equal(result.grabbed, 'grabbed');
  assert.equal(result.armorHit, 1);
  assert.equal(result.throwType, 'throw');
  assert.equal(result.p1hp, 100);
});

test('throw grabs, holds and finishes with character combo', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.ctrl.ai = false;
    battle.p2.ctrl.ai = false;
    battle.p1.x = 300;
    battle.p2.x = 330;
    battle.p1.face = 1;
    battle.p2.face = -1;
    K.keys.KeyJ = true;
    K.keys.KeyK = true;
    K.step();
    K.keys.KeyJ = false;
    K.keys.KeyK = false;
    K.step();
    const started = { type: battle.p1.atk?.t || '', name: battle.p1.def.throwN };
    for (let i = 0; i < 8; i += 1) K.step();
    const grabbed = { state: battle.p2.state, hp: battle.p2.hp, combo: battle.p1.combo };
    for (let i = 0; i < 20; i += 1) K.step();
    return { started, grabbed, final: { hp: battle.p2.hp, state: battle.p2.state, combo: battle.p1.combo } };
  });
  assert.equal(result.started.type, 'throw');
  assert.ok(result.started.name);
  assert.deepEqual(result.grabbed, { state: 'grabbed', hp: 99, combo: 1 });
  assert.ok(result.final.hp < 99);
  assert.equal(result.final.state, 'down');
  assert.equal(result.final.combo, 2);
});

test('throw input forgives sequential P and K and shows feedback', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
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
    const gaps = [];
    for (const idle of [0, 1, 3]) {
      const battle = setup(0);
      press('KeyJ');
      for (let i = 0; i < idle; i += 1) K.step();
      press('KeyK');
      gaps.push({ idle, type: battle.p1.atk?.t || '', cmd: !!battle.p1.atk?.cmdThrow });
    }

    const reverseBattle = setup(0);
    press('KeyK');
    press('KeyJ');
    const reverse = reverseBattle.p1.atk?.t || '';

    const commandBattle = setup(0);
    K.keys.KeyS = true;
    K.step();
    K.step();
    press('KeyJ');
    press('KeyK');
    K.keys.KeyS = false;
    K.step();
    const command = { type: commandBattle.p1.atk?.t || '', cmd: !!commandBattle.p1.atk?.cmdThrow };

    const signatureBattle = setup(3);
    K.keys.KeyD = true;
    K.step();
    K.step();
    press('KeyJ');
    press('KeyK');
    K.keys.KeyD = false;
    K.step();
    const signature = { type: signatureBattle.p1.atk?.t || '', cmd: !!signatureBattle.p1.atk?.cmdThrow };

    const grabBattle = setup(0);
    press('KeyJ');
    press('KeyK');
    const labels = [];
    let held = false;
    for (let i = 0; i < 50; i += 1) {
      K.step();
      if (grabBattle.p2.state === 'grabbed') held = true;
      for (const fx of K.fx) if (fx.ty === 'name') labels.push(fx.txt);
    }

    const missBattle = setup(0);
    missBattle.p2.x = 390;
    press('KeyJ');
    press('KeyK');
    const missLabels = [];
    for (let i = 0; i < 30; i += 1) {
      K.step();
      for (const fx of K.fx) if (fx.ty === 'name') missLabels.push(fx.txt);
    }

    return {
      gaps,
      reverse,
      command,
      signature,
      finisher: grabBattle.p1.def.throwN,
      held,
      labels,
      missLabels
    };
  });
  for (const item of result.gaps) {
    assert.equal(item.type, 'throw', `P then K with ${item.idle} idle frames`);
    assert.equal(item.cmd, false);
  }
  assert.equal(result.reverse, 'throw');
  assert.deepEqual(result.command, { type: 'throw', cmd: true });
  assert.deepEqual(result.signature, { type: 'throw', cmd: true });
  assert.equal(result.held, true);
  assert.ok(result.labels.includes('ЗАХВАТ!'), 'grab label');
  assert.ok(result.labels.includes(result.finisher), 'throw finisher label');
  assert.ok(result.missLabels.includes('ПРОМАХ'), 'whiff label');
});

test('every fighter completes a named throw combo', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const out = [];
    for (let id = 0; id < K.CH.length; id += 1) {
      for (const key in K.keys) K.keys[key] = false;
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
      battle.p1.face = 1;
      battle.p2.face = -1;
      K.keys.KeyJ = true;
      K.keys.KeyK = true;
      K.step();
      K.keys.KeyJ = false;
      K.keys.KeyK = false;
      K.step();
      for (let i = 0; i < 30; i += 1) K.step();
      out.push({ id, name: battle.p1.def.throwN, hp: battle.p2.hp, state: battle.p2.state });
    }
    return out;
  });
  for (const item of result) {
    assert.ok(item.name, `fighter ${item.id} has no throw name`);
    assert.ok(item.hp < 100, `fighter ${item.id} throw did not damage`);
    assert.notEqual(item.state, 'grabbed', `fighter ${item.id} throw did not release`);
  }
});

test('specials share a cooldown and blocked casts show feedback', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    for (const key in K.keys) K.keys[key] = false;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const b = K.battle;
    b.mode = '2p';
    b.phase = 'fight';
    b.phaseT = 200;
    b.p1.ctrl.ai = false;
    b.p2.ctrl.ai = false;
    b.p1.x = 300;
    b.p2.x = 330;
    b.p1.face = 1;
    b.p2.face = -1;
    b.p1.state = 'idle';
    b.p1.st = 0;
    b.p1.ctrl.clear();
    b.p2.ctrl.clear();
    const first = b.p1.startSpec(b.p2);
    const cooldown = b.p1.specCd;
    const blocked = b.p1.startSpec2(b.p2);
    const label = K.fx.some((effect) => effect.ty === 'name' && effect.txt === 'ПЕРЕЗАРЯДКА');
    for (let i = 0; i < 300 && b.p1.specCd > 0; i += 1) K.step();
    const ready = b.p1.startSpec2(b.p2);
    return { first, cooldown, blocked, label, ready, max: b.p1.specCdMax };
  });
  assert.equal(result.first, true);
  assert.equal(result.blocked, false);
  assert.equal(result.label, true);
  assert.equal(result.ready, true);
  assert.equal(result.cooldown, 90);
  assert.equal(result.max, 90);
});

test('CPU leaves a gap between special casts', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const b = K.battle;
    b.mode = 'cpu';
    b.aiLvl = 7;
    b.phase = 'fight';
    b.phaseT = 200;
    b.timer = 999;
    b.p1.ctrl.ai = true;
    b.p2.ctrl.ai = false;
    b.p1.x = 180;
    b.p2.x = 580;
    b.p1.face = 1;
    b.p2.face = -1;
    b.p1.state = 'idle';
    b.p2.state = 'idle';
    b.p1.st = 0;
    b.p2.st = 0;
    b.p1.hp = 1000;
    b.p2.hp = 1000;
    b.p1.hpLag = 1000;
    b.p2.hpLag = 1000;
    b.p1.ctrl.clear();
    b.p2.ctrl.clear();
    const random = Math.random;
    K.setSeed(4242);
    const casts = [];
    let prev = false;
    for (let frame = 0; frame < 1200 && b.phase === 'fight'; frame += 1) {
      b.p1.x = 180;
      b.p1.vx = 0;
      b.p2.x = 580;
      b.p2.vx = 0;
      K.step();
      const now = b.p1.state === 'cast';
      if (now && !prev) casts.push(frame);
      prev = now;
    }
    Math.random = random;
    const gaps = casts.slice(1).map((frame, i) => frame - casts[i]);
    return { casts: casts.length, minGap: gaps.length ? Math.min(...gaps) : 0, phase: b.phase };
  });
  assert.ok(result.casts >= 2, `CPU cast ${result.casts} specials`);
  assert.ok(result.minGap >= 145, `CPU special gap ${result.minGap}`);
});

test('special cancel works only after a connected hit', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.x = 300;
    battle.p2.x = 330;
    battle.p1.face = 1;
    battle.p2.state = 'idle';
    const run = (connected, blocked) => {
      battle.p1.state = 'atk';
      battle.p1.st = K.ATK.punch.wd + K.ATK.punch.ac + 2;
      battle.p1.atk = {
        t: 'punch',
        A: K.ATK.punch,
        hit: 1,
        blocked,
        connected,
        cancel: 0
      };
      battle.p1.ctrl.buf = [
        { k: 'D', t: 100 },
        { k: 'R', t: 102 },
        { k: 'P', t: 104 }
      ];
      battle.p1.update(110, battle.p2);
      return battle.p1.state;
    };
    return {
      hit: run(1, 0),
      block: run(0, 1),
      whiff: run(0, 0)
    };
  });
  assert.equal(result.hit, 'cast');
  assert.equal(result.block, 'atk');
  assert.equal(result.whiff, 'atk');
});

test('sound setting toggles and persists', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.toLobby('settings');
    const before = K.AU.on;
    K.onKey('Enter');
    const after = K.AU.on;
    const saved = localStorage.karnageSnd;
    K.onKey('Enter');
    return { before, after, saved, restored: K.AU.on };
  });
  assert.notEqual(result.after, result.before);
  assert.equal(result.saved, result.after ? '1' : '0');
  assert.equal(result.restored, result.before);
});

test('settings load from storage on reload', async () => {
  await page.evaluate(() => {
    localStorage.setItem('karnageOpts', JSON.stringify({ crt: false, blood: false, shake: false, reduce: true }));
    localStorage.setItem('karnageSnd', '1');
  });
  await page.reload({ waitUntil: 'load' });
  await page.waitForFunction(() => Boolean(window.KARNAGE), null, { polling: 100 });
  const result = await page.evaluate(() => ({
    options: window.KARNAGE.OPT,
    crt: document.getElementById('crt').style.display,
    sound: window.KARNAGE.AU.on
  }));
  assert.deepEqual(result.options, { crt: false, blood: false, shake: false, reduce: true });
  assert.equal(result.crt, 'none');
  assert.equal(result.sound, true);
  await page.evaluate(() => {
    localStorage.removeItem('karnageOpts');
    localStorage.removeItem('karnageSnd');
  });
});

test('several CPU fights finish without stalls', async () => {
  const matches = await page.evaluate(() => {
    const K = window.KARNAGE;
    const pairs = [[0, 3], [1, 4], [2, 12], [5, 6], [7, 9], [8, 10], [11, 0]];
    const out = [];
    for (const [a, b] of pairs) {
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(a, new K.Ctrl(K.KM1), b, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = 'cpu';
      battle.aiLvl = 4;
      battle.phase = 'fight';
      battle.phaseT = 200;
      battle.timer = 20;
      battle.p1.ctrl.ai = true;
      battle.p2.ctrl.ai = true;
      battle.p1.wins = 0;
      battle.p2.wins = 0;
      battle.p1.x = 180;
      battle.p2.x = 580;
      battle.p1.face = 1;
      battle.p2.face = -1;
      battle.p1.state = 'idle';
      battle.p2.state = 'idle';
      battle.p1.st = 0;
      battle.p2.st = 0;
      battle.p1.atk = null;
      battle.p2.atk = null;
      let frames = 0;
      while (battle.phase === 'fight' && frames < 1800) {
        K.step();
        frames += 1;
      }
      out.push({
        pair: `${a}-${b}`,
        frames,
        phase: battle.phase,
        hp1: battle.p1.hp,
        hp2: battle.p2.hp,
        damage: (battle.p1.damageTaken || 0) + (battle.p2.damageTaken || 0),
        timer: battle.timer
      });
    }
    return out;
  });
  assert.equal(matches.length, 7);
  for (const match of matches) {
    assert.notEqual(match.phase, 'fight', `${match.pair}: CPU fight did not finish`);
    assert.ok(match.frames < 1800, `${match.pair}: too many frames`);
    assert.ok(Number.isFinite(match.hp1) && Number.isFinite(match.hp2), `${match.pair}: hp is not finite`);
  }
  assert.ok(matches.some((match) => match.damage > 0), 'CPU fights did not trade damage');
});
