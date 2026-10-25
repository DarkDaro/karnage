/* global window */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..', '..');
const port = 8713;
const index = `http://127.0.0.1:${port}/dev.html?debug=1`;

let browser;
let page;
let server;
const pageErrors = [];

async function waitForServer() {
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
  await waitForServer();
  browser = await chromium.launch({ headless: true, args: ['--mute-audio'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('pageerror', (error) => pageErrors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') pageErrors.push(message.text());
  });
  await page.addInitScript(() => {
    window.requestAnimationFrame = () => 0;
  });
  await page.goto(index, { waitUntil: 'load' });
  await page.waitForFunction(() => Boolean(window.KARNAGE));
});

after(async () => {
  await browser?.close();
  server?.kill();
});

test('loads title without page errors', async () => {
  const state = await page.evaluate(() => window.KARNAGE.snapshot());
  assert.equal(state.GAME, 'title');
  assert.equal(state.FRAME, 0);
  assert.equal(await page.evaluate(() => window.KARNAGE.AU.on), true);
  const roster = await page.evaluate(() => ({
    fighters: window.KARNAGE.CH.length,
    arenas: window.KARNAGE.AR.length,
    ids: window.KARNAGE.CH.map((fighter) => fighter.id)
  }));
  assert.equal(roster.fighters, 13);
  assert.equal(roster.arenas, 10);
  assert.deepEqual(roster.ids, [...Array(13).keys()]);
  assert.deepEqual(pageErrors, []);
});

test('renders at an internal resolution above the logical world', async () => {
  const canvas = await page.locator('#cv').evaluate((el) => ({
    width: el.width,
    height: el.height,
    ratio: el.width / el.height,
    logicalRatio: 424 / 240
  }));
  assert.ok(canvas.width >= 424 * 4);
  assert.ok(canvas.height >= 240 * 4);
  assert.ok(Math.abs(canvas.ratio - canvas.logicalRatio) < 0.001);
  const scale = await page.evaluate(() => ({
    current: window.KARNAGE.RSCALE,
    min: window.KARNAGE.minRSCALE,
    max: window.KARNAGE.maxRSCALE
  }));
  assert.ok(scale.current >= 4);
  assert.ok(scale.current >= scale.min);
  assert.ok(scale.current <= scale.max);
});

test('adaptive scale rises on steady frames and falls on slow ones', async () => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.evaluate(() => window.dispatchEvent(new window.Event('resize')));
  const before = await page.evaluate(() => window.KARNAGE.RSCALE);
  assert.equal(before, 5);
  const raised = await page.evaluate(() => {
    for (let i = 0; i < 320; i += 1) window.KARNAGE.tuneFrame(16.7);
    return window.KARNAGE.RSCALE;
  });
  assert.equal(raised, 6);
  const lowered = await page.evaluate(() => {
    for (let i = 0; i < 120; i += 1) window.KARNAGE.tuneFrame(16.7);
    for (let i = 0; i < 120; i += 1) window.KARNAGE.tuneFrame(25);
    return window.KARNAGE.RSCALE;
  });
  assert.equal(lowered, 5);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.evaluate(() => window.dispatchEvent(new window.Event('resize')));
  assert.equal(await page.evaluate(() => window.KARNAGE.RSCALE), 5);
});

test('renders every screen', async () => {
  await page.evaluate(() => {
    window.KARNAGE.newBattle(
      0, new window.KARNAGE.Ctrl(window.KARNAGE.KM1),
      1, new window.KARNAGE.Ctrl(window.KARNAGE.KM2),
      6
    );
    const battle = window.KARNAGE.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    window.KARNAGE.setDebug({
      paused: false,
      lastSel: { mode: '2p', c1: 0, c2: 1, diff: 1, ar: 6 },
      contT: 600,
      arcP1: 0
    });
  });

  const screens = ['title', 'menu', 'controls', 'select', 'vs', 'top', 'ending', 'gameover', 'continue', 'rematch'];
  for (const screen of screens) {
    const result = await page.evaluate((name) => {
      window.KARNAGE.setDebug({ GAME: name });
      try {
        window.KARNAGE.render();
        return 'ok';
      } catch (error) {
        return `${error.name}: ${error.message}`;
      }
    }, screen);
    assert.equal(result, 'ok', `screen ${screen}`);
  }

  const fight = await page.evaluate(() => {
    window.KARNAGE.setDebug({ GAME: 'fight', paused: false });
    try {
      window.KARNAGE.render();
      return 'ok';
    } catch (error) {
      return `${error.name}: ${error.message}`;
    }
  });
  assert.equal(fight, 'ok', 'screen fight');

  const pause = await page.evaluate(() => {
    window.KARNAGE.setDebug({ paused: true });
    try {
      window.KARNAGE.render();
      return 'ok';
    } catch (error) {
      return `${error.name}: ${error.message}`;
    } finally {
      window.KARNAGE.setDebug({ paused: false });
    }
  });
  assert.equal(pause, 'ok', 'screen pause');
});

test('draws every fighter in combat states', async () => {
  const states = [
    'idle', 'walk', 'jump', 'dash', 'crouch', 'block', 'hit',
    'cast', 'super', 'win', 'fatal', 'victim', 'grabbed', 'dizzy', 'down',
    'getup', 'frozen', 'net'
  ];
  const errors = await page.evaluate((names) => {
    const out = [];
    for (const def of window.KARNAGE.CH) {
      for (const state of names) {
        try {
          const fighter = new window.KARNAGE.F(def, new window.KARNAGE.Ctrl(window.KARNAGE.KM1));
          fighter.state = state;
          fighter.animT = 10;
          fighter.st = 10;
          if (state === 'frozen') fighter.frozen = 10;
          if (state === 'net') fighter.netT = 10;
          window.KARNAGE.drawF(fighter, 0);
        } catch (error) {
          out.push(`${def.id}/${state}: ${error.name}: ${error.message}`);
        }
      }
    }
    return out;
  }, states);
  assert.deepEqual(errors, []);
});

test('runs every fatality without errors', async () => {
  for (let id = 0; id < 13; id += 1) {
    const result = await page.evaluate((fighterId) => {
      try {
        window.KARNAGE.setDebug({ GAME: 'fight', paused: false });
        window.KARNAGE.newBattle(
          fighterId, new window.KARNAGE.Ctrl(window.KARNAGE.KM1),
          (fighterId + 1) % window.KARNAGE.CH.length,
          new window.KARNAGE.Ctrl(window.KARNAGE.KM2),
          fighterId % 10
        );
        const battle = window.KARNAGE.battle;
        battle.mode = '2p';
        battle.phase = 'fight';
        battle.phaseT = 200;
        battle.p1.ctrl.ai = false;
        battle.p2.ctrl.ai = false;
        battle.p1.wins = 1;
        battle.p2.hp = 0;
        window.KARNAGE.step();
        window.KARNAGE.startFatal(battle.p1, battle.p2);
        for (let i = 0; i < 310; i += 1) {
          window.KARNAGE.step();
          if (i % 10 === 0) window.KARNAGE.render();
        }
        return { phase: battle.phase, winner: battle.winner?.def.id };
      } catch (error) {
        return { error: `${error.name}: ${error.message}` };
      }
    }, id);
    assert.equal(result.error, undefined, `fatality ${id}`);
    assert.equal(result.winner, id, `fatality ${id} winner`);
  }
});
