/* global window */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..', '..');
const port = 8716;
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

test('effect atlases load', async () => {
  const assets = await page.evaluate(() => {
    const out = {};
    for (const [key, asset] of Object.entries(window.KARNAGE.fxAssets)) {
      out[key] = {
        ready: asset.ready,
        width: asset.image?.width,
        height: asset.image?.height,
        frames: asset.frames
      };
    }
    return out;
  });
  assert.deepEqual(assets, {
    hitLight: { ready: true, width: 384, height: 48, frames: 8 },
    hitHeavy: { ready: true, width: 432, height: 48, frames: 9 },
    dust: { ready: true, width: 288, height: 32, frames: 9 },
    block: { ready: true, width: 192, height: 32, frames: 6 },
    smoke: { ready: true, width: 288, height: 32, frames: 9 },
    dustRun: { ready: true, width: 64, height: 16, frames: 4 },
    fireImpact: { ready: true, width: 384, height: 48, frames: 8 },
    iceImpact: { ready: true, width: 384, height: 48, frames: 8 },
    shadowImpact: { ready: true, width: 384, height: 48, frames: 8 },
    explosion: { ready: true, width: 576, height: 64, frames: 9 }
  });
});

test('hit and landing spawn sprite effects', async () => {
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
    K.resolveHit(battle.p1, battle.p2, 12, {});
    const light = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    K.fx.length = 0;
    battle.p2.hp = 100;
    K.resolveHit(battle.p1, battle.p2, 20, {});
    const heavy = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    battle.p1.y = 213;
    battle.p1.vy = 6;
    battle.p1.state = 'jump';
    for (let i = 0; i < 8; i += 1) K.step();
    const all = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    for (let i = 0; i < 60; i += 1) {
      K.step();
      K.render();
    }
    return { light, heavy, all, remaining: K.fx.filter((effect) => effect.ty === 'sprite').length };
  });
  assert.ok(result.light.includes(384), JSON.stringify(result.light));
  assert.ok(result.heavy.includes(432), JSON.stringify(result.heavy));
  assert.ok(result.all.includes(288), JSON.stringify(result.all));
  assert.equal(result.remaining, 0);
});

test('block, smoke and run dust use their own atlases', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p2.state = 'block';
    battle.p2.hp = 100;
    battle.p1.combo = 0;
    K.resolveHit(battle.p1, battle.p2, 10, {});
    const block = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    K.fx.length = 0;
    K.smoke(300, 160);
    const smoke = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    K.fx.length = 0;
    K.spriteFx('dustRun', 300, 214);
    const run = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    K.fx.length = 0;
    K.impactFx('fire', 300, 160);
    K.impactFx('ice', 300, 160);
    K.impactFx('shadow', 300, 160);
    K.spriteFx('explosion', 300, 214);
    const impacts = K.fx.filter((effect) => effect.ty === 'sprite').map((effect) => effect.img.width);
    return { block, smoke, run, impacts };
  });
  assert.ok(result.block.includes(192), JSON.stringify(result.block));
  assert.ok(result.smoke.includes(288), JSON.stringify(result.smoke));
  assert.ok(result.run.includes(64), JSON.stringify(result.run));
  assert.deepEqual(result.impacts, [384, 384, 384, 576]);
});
