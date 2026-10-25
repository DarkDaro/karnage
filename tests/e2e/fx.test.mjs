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

test('every projectile type leaves a readable impact', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const calls = [
      { ty: 'fire' }, { ty: 'ice' }, { ty: 'shadow' }, { ty: 'bolt' }, { ty: 'wave' }, { ty: 'net' },
      { ty: 'shard', color: '#c8ecff' }, { ty: 'shard', color: '#9adcee' },
      { ty: 'shard', color: '#d82040' }, { ty: 'shard', color: '#7ac83a' },
      { ty: 'shard', color: '#c8a060' }, { ty: 'shard', color: '#b89aff' },
      { ty: 'shard', color: '#f0c850' }, { ty: 'shard', color: '#7a3aa8' },
      { ty: 'shard', color: '#f06020' }, { ty: 'shard', color: '#f8d060' }
    ];
    return calls.map(({ ty, color }) => {
      K.fx.length = 0;
      const ok = K.impactFx(ty, 300, 160, color);
      const sprites = K.fx.filter((effect) => effect.ty === 'sprite');
      return {
        ty,
        color,
        ok,
        sprites: sprites.map((effect) => effect.img.width),
        burst: K.fx.some((effect) => effect.ty === 'impact' || effect.ty === 'slashimpact' || effect.ty === 'boltfx')
      };
    });
  });
  for (const item of result) {
    assert.equal(item.ok, true, JSON.stringify(item));
    assert.ok(item.sprites.length > 0, JSON.stringify(item));
    assert.equal(item.burst, true, JSON.stringify(item));
  }
});

test('cast projectile starts at the casting hand and burst marks the same point', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(6, new K.Ctrl(K.KM1), 0, new K.Ctrl(K.KM2), 7);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.x = 180;
    battle.p2.x = 330;
    battle.p1.face = 1;
    battle.p2.face = -1;
    battle.p1.ctrl.ai = false;
    battle.p2.ctrl.ai = false;
    K.fx.length = 0;
    K.projs.length = 0;
    battle.p1.startSpec(battle.p2);
    for (let i = 0; i < 14; i += 1) K.step();
    const projectile = K.projs.find((item) => item.ty === 'ice');
    const burst = K.fx.find((effect) => effect.ty === 'castburst');
    return {
      projectile: projectile && { x: projectile.x, y: projectile.y, ty: projectile.ty },
      burst: burst && { x: burst.x, y: burst.y },
      dy: projectile ? battle.p1.y - projectile.y : 0,
      dx: projectile ? projectile.x - burst.x : 0
    };
  });
  assert.equal(result.projectile?.ty, 'ice');
  assert.ok(result.dy > 50, JSON.stringify(result));
  assert.ok(result.burst, JSON.stringify(result));
  assert.ok(Math.abs(result.projectile.y - result.burst.y) < 1.5, JSON.stringify(result));
  assert.ok(Math.abs(result.dx) < 8, JSON.stringify(result));
});

test('whiff and super spawn their own effects', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.x = 260;
    battle.p2.x = 330;
    battle.p1.startAtk('kick');
    for (let i = 0; i < 20; i += 1) K.step();
    const whiffs = K.fx.filter((effect) => effect.ty === 'whiff');
    K.fx.length = 0;
    battle.p1.x = 300;
    battle.p2.x = 360;
    battle.p1.startSuper();
    const supers = K.fx.filter((effect) => effect.ty === 'super');
    for (let i = 0; i < 30; i += 1) {
      K.step();
      K.render();
    }
    return {
      whiffs: whiffs.length,
      supers: supers.length,
      whiffLife: whiffs[0]?.life,
      superLife: supers[0]?.life,
      remaining: K.fx.filter((effect) => effect.ty === 'whiff' || effect.ty === 'super').length
    };
  });
  assert.equal(result.whiffs, 1);
  assert.equal(result.supers, 1);
  assert.equal(result.whiffLife, 12);
  assert.equal(result.superLife, 26);
  assert.equal(result.remaining, 0);
});

test('projectile and AoE hits keep a single impact sprite', async () => {
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
    battle.p2.state = 'idle';
    battle.p2.hp = 100;
    battle.p2.invuln = 0;
    battle.p2.armor = 0;
    battle.p2.dodging = 0;
    battle.p2.defeated = 0;
    const names = () => K.fx
      .filter((effect) => effect.ty === 'sprite')
      .map((effect) => effect.img.src.split('/').pop());
    K.fx.length = 0;
    K.projs.length = 0;
    K.projs.push({
      ty: 'fire',
      x: battle.p2.x,
      y: battle.p2.y - battle.p2.def.h * 0.5,
      vx: 0,
      vy: 0,
      o: battle.p1,
      d: 5,
      l: 10
    });
    K.step();
    const projectile = names();
    const hp = battle.p2.hp;
    K.fx.length = 0;
    K.projs.length = 0;
    battle.p2.state = 'idle';
    battle.p2.hp = 100;
    battle.p2.x = 330;
    K.projs.push({ ty: 'meteor', x: 330, y: 220, vx: 0, vy: 0, o: battle.p1, d: 5, l: 10 });
    K.step();
    const aoe = names();
    K.fx.length = 0;
    K.projs.length = 0;
    battle.p2.state = 'block';
    battle.p2.hp = 100;
    battle.p2.x = 330;
    K.projs.push({
      ty: 'ice',
      x: battle.p2.x,
      y: battle.p2.y - battle.p2.def.h * 0.5,
      vx: 0,
      vy: 0,
      o: battle.p1,
      d: 5,
      l: 10
    });
    K.step();
    return { projectile, hp, aoe, block: names() };
  });
  assert.deepEqual(result.projectile, ['fire-impact.png']);
  assert.ok(result.hp < 100, JSON.stringify(result));
  assert.deepEqual(result.aoe, ['explosion.png', 'dust.png']);
  assert.deepEqual(result.block, ['block.png']);
});

test('round reset clears loose particles', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    K.parts.length = 0;
    K.parts.push({ x: 300, y: 100, vx: 0, vy: 0, c: '#fff', l: 30, s: 1, gv: 0 });
    const before = K.parts.length;
    K.startRound();
    return { before, after: K.parts.length };
  });
  assert.equal(result.before, 1);
  assert.equal(result.after, 0);
});

test('snow is culled at the floor', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.setDebug({ GAME: 'fight', paused: false });
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 7);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
    battle.p1.ctrl.ai = false;
    battle.p2.ctrl.ai = false;
    K.parts.length = 0;
    for (let i = 0; i < 12; i += 1) K.step();
    const snow = K.parts.filter((particle) => particle.c === 'rgba(230,240,255,.7)');
    K.parts.push({ x: 300, y: 215, vx: 0, vy: 0.5, c: 'rgba(230,240,255,.7)', l: 60, s: 1, gv: 0, kf: 1 });
    K.step();
    return {
      count: snow.length,
      tagged: snow.length > 0 && snow.every((particle) => particle.kf === 1),
      below: K.parts.some((particle) => particle.c === 'rgba(230,240,255,.7)' && particle.y > 214)
    };
  });
  assert.ok(result.count > 0, JSON.stringify(result));
  assert.equal(result.tagged, true, JSON.stringify(result));
  assert.equal(result.below, false, JSON.stringify(result));
});

test('wave dust stays on the floor', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.fx.length = 0;
    K.impactFx('wave', 300, 160);
    const dust = K.fx.find((effect) => effect.ty === 'sprite');
    return { y: dust?.y };
  });
  assert.equal(result.y, 214);
});

test('sprite atlas uses nearest-neighbor and all frames', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const proto = window.CanvasRenderingContext2D.prototype;
    const original = proto.drawImage;
    const samples = [];
    proto.drawImage = function capture(image, sx) {
      if (image?.src?.endsWith('/hit-light.png')) {
        samples.push({ sx, smoothing: this.imageSmoothingEnabled });
      }
      return original.apply(this, arguments);
    };
    try {
      K.setDebug({ GAME: 'fight', paused: false });
      K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
      const battle = K.battle;
      battle.mode = '2p';
      battle.phase = 'fight';
      battle.phaseT = 200;
      K.fx.length = 0;
      K.spriteFx('hitLight', 300, 160, { duration: 8 });
      for (let i = 0; i < 8; i += 1) {
        K.step();
        K.render();
      }
      return samples;
    } finally {
      proto.drawImage = original;
    }
  });
  assert.equal(result.length, 8, JSON.stringify(result));
  assert.deepEqual(result.map((sample) => sample.sx), [0, 48, 96, 144, 192, 240, 288, 336]);
  assert.ok(result.every((sample) => sample.smoothing === false), JSON.stringify(result));
});
