/* global window, document, CanvasRenderingContext2D */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..', '..');
const port = 8717;
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
  page = await browser.newPage({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true });
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

test('mobile layout exposes touch controls and fills landscape width', async () => {
  const state = await page.evaluate(() => {
    const canvas = document.getElementById('cv').getBoundingClientRect();
    return {
      touch: Boolean(document.getElementById('touch')),
      body: document.body.className,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      canvas: { width: canvas.width, height: canvas.height },
      rw: window.KARNAGE.RW,
      rh: window.KARNAGE.RH,
      baseRW: window.KARNAGE.baseRW
    };
  });
  assert.equal(state.touch, true);
  assert.match(state.body, /touch/);
  assert.ok(state.rw > state.baseRW);
  assert.ok(Math.abs(state.canvas.width - state.viewport.width) <= 1);
  assert.ok(Math.abs(state.canvas.height - state.viewport.height) <= 1);
  assert.ok(Math.abs(state.rw / state.rh - state.viewport.width / state.viewport.height) < .01);
});

test('touch controls navigate the menu and hold fight buttons', async () => {
  await page.evaluate(() => window.KARNAGE.toLobby('menu'));
  await page.locator('[data-key="d"]').tap();
  await page.locator('[data-key="d"]').tap();
  await page.locator('[data-key="d"]').tap();
  await page.locator('[data-key="P"]').tap();
  const game = await page.evaluate(() => window.KARNAGE.snapshot().GAME);
  assert.equal(game, 'settings');

  await page.evaluate(() => {
    const K = window.KARNAGE;
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
  });
  await page.locator('[data-key="P"]').dispatchEvent('pointerdown', { pointerId: 1, pointerType: 'touch' });
  const held = await page.evaluate(() => window.KARNAGE.TOUCH.P);
  await page.locator('[data-key="P"]').dispatchEvent('pointerup', { pointerId: 1, pointerType: 'touch' });
  const released = await page.evaluate(() => window.KARNAGE.TOUCH.P);
  assert.equal(held, 1);
  assert.equal(released, 0);

  const throwButton = page.locator('[data-keys="P K"]');
  await throwButton.dispatchEvent('pointerdown', { pointerId: 2, pointerType: 'touch' });
  const chord = await page.evaluate(() => ({ P: window.KARNAGE.TOUCH.P, K: window.KARNAGE.TOUCH.K }));
  const chordStarted = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.step();
    return Boolean(K.battle.p1.atk?.A?.throw);
  });
  await throwButton.dispatchEvent('pointerup', { pointerId: 2, pointerType: 'touch' });
  const chordReleased = await page.evaluate(() => ({ P: window.KARNAGE.TOUCH.P, K: window.KARNAGE.TOUCH.K }));
  assert.deepEqual(chord, { P: 1, K: 1 });
  assert.equal(chordStarted, true);
  assert.deepEqual(chordReleased, { P: 0, K: 0 });

  await page.evaluate(() => {
    const K = window.KARNAGE;
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    K.battle.mode = '2p';
    K.battle.phase = 'fight';
    K.battle.phaseT = 200;
  });
  const cmdThrowButton = page.locator('[data-keys="d P K"]');
  await cmdThrowButton.dispatchEvent('pointerdown', { pointerId: 3, pointerType: 'touch' });
  const cmdChord = await page.evaluate(() => ({
    d: window.KARNAGE.TOUCH.d,
    P: window.KARNAGE.TOUCH.P,
    K: window.KARNAGE.TOUCH.K
  }));
  const cmdStarted = await page.evaluate(() => {
    const K = window.KARNAGE;
    K.step();
    return Boolean(K.battle.p1.atk?.cmdThrow);
  });
  await cmdThrowButton.dispatchEvent('pointerup', { pointerId: 3, pointerType: 'touch' });
  const cmdReleased = await page.evaluate(() => ({
    d: window.KARNAGE.TOUCH.d,
    P: window.KARNAGE.TOUCH.P,
    K: window.KARNAGE.TOUCH.K
  }));
  assert.deepEqual(cmdChord, { d: 1, P: 1, K: 1 });
  assert.equal(cmdStarted, true);
  assert.deepEqual(cmdReleased, { d: 0, P: 0, K: 0 });
});

test('touch menu hides 2P and training hints use touch buttons', async () => {
  const result = await page.evaluate(() => {
    const K = window.KARNAGE;
    const capture = (draw) => {
      const proto = CanvasRenderingContext2D.prototype;
      const original = proto.fillText;
      const texts = [];
      proto.fillText = function (text, ...args) { texts.push(String(text)); return original.call(this, text, ...args); };
      try {
        draw();
      } finally {
        proto.fillText = original;
      }
      return texts;
    };
    K.toLobby('menu');
    const menu = capture(() => K.render());
    K.onKey('ArrowDown');
    K.onKey('ArrowDown');
    K.onKey('Enter');
    K.onKey('Enter');
    const battle = K.battle;
    const training = capture(() => K.render());
    return { mode: battle && battle.mode, menu, training };
  });
  assert.equal(result.mode, 'training');
  assert.equal(result.menu.some((text) => text.includes('БОЙ НА ДВОИХ')), false);
  assert.ok(result.training.some((text) => text.includes('B — БЛОК')));
  assert.ok(result.training.some((text) => text.includes('Ⅱ — ПРИЁМЫ')));
  assert.equal(result.training.some((text) => text.includes('T — БЛОК') || text.includes('R — СБРОС') || text.includes('ESC')), false);
});

test('touch button releases when pointerup lands outside it', async () => {
  await page.evaluate(() => {
    const K = window.KARNAGE;
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
  });
  const button = page.locator('[data-key="P"]');
  await button.dispatchEvent('pointerdown', { pointerId: 7, pointerType: 'touch' });
  const held = await page.evaluate(() => window.KARNAGE.TOUCH.P);
  await page.evaluate(() => {
    window.dispatchEvent(new window.PointerEvent('pointerup', { pointerId: 7, pointerType: 'touch', bubbles: true }));
  });
  const released = await page.evaluate(() => ({
    touch: window.KARNAGE.TOUCH.P,
    on: document.querySelector('[data-key="P"]').classList.contains('on')
  }));
  assert.equal(held, 1);
  assert.equal(released.touch, 0);
  assert.equal(released.on, false);
});

test('touch button releases when pointer is canceled or capture is lost', async () => {
  await page.evaluate(() => {
    const K = window.KARNAGE;
    K.newBattle(0, new K.Ctrl(K.KM1), 1, new K.Ctrl(K.KM2), 9);
    const battle = K.battle;
    battle.mode = '2p';
    battle.phase = 'fight';
    battle.phaseT = 200;
  });
  const button = page.locator('[data-key="P"]');
  await button.dispatchEvent('pointerdown', { pointerId: 21, pointerType: 'touch' });
  const held = await page.evaluate(() => window.KARNAGE.TOUCH.P);
  await button.dispatchEvent('pointercancel', { pointerId: 21, pointerType: 'touch' });
  const canceled = await page.evaluate(() => ({
    touch: window.KARNAGE.TOUCH.P,
    on: document.querySelector('[data-key="P"]').classList.contains('on')
  }));
  await button.dispatchEvent('pointerdown', { pointerId: 22, pointerType: 'touch' });
  await button.dispatchEvent('lostpointercapture', { pointerId: 22, pointerType: 'touch' });
  const lost = await page.evaluate(() => ({
    touch: window.KARNAGE.TOUCH.P,
    on: document.querySelector('[data-key="P"]').classList.contains('on')
  }));
  assert.equal(held, 1);
  assert.deepEqual(canceled, { touch: 0, on: false });
  assert.deepEqual(lost, { touch: 0, on: false });
});

test('portrait touch layout keeps controls inside the viewport', async () => {
  const portrait = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3
  });
  await portrait.addInitScript(() => {
    window.requestAnimationFrame = () => 0;
  });
  try {
    await portrait.goto(entry, { waitUntil: 'load' });
    await portrait.waitForFunction(() => Boolean(window.KARNAGE), null, { polling: 100 });
    const layout = await portrait.evaluate(() => {
      const rect = (selector) => {
        const box = document.querySelector(selector).getBoundingClientRect();
        return { left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height };
      };
      return {
        body: document.body.className,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        canvas: rect('#cv'),
        dpad: ['l', 'r', 'u', 'd', 'pause'].map((key) => rect(`[data-key="${key}"]`)),
        actions: [
          '[data-key="P"]',
          '[data-key="K"]',
          '[data-key="B"]',
          '[data-keys="P K"]',
          '[data-keys="d P K"]'
        ].map((selector) => rect(selector)),
        overflow: document.documentElement.scrollWidth - window.innerWidth
      };
    });
    assert.match(layout.body, /touch/);
    assert.match(layout.body, /portrait/);
    assert.ok(layout.canvas.width <= layout.viewport.width);
    assert.ok(layout.overflow <= 1);
    for (const control of layout.dpad) {
      assert.ok(control.width >= 38 && control.height >= 38, JSON.stringify(control));
    }
    for (const control of layout.actions) {
      assert.ok(control.width >= 44 && control.height >= 44, JSON.stringify(control));
    }
    for (const control of [...layout.dpad, ...layout.actions]) {
      assert.ok(control.left >= 0 && control.top >= 0, JSON.stringify(control));
      assert.ok(control.right <= layout.viewport.width && control.bottom <= layout.viewport.height, JSON.stringify(control));
    }
  } finally {
    await portrait.close();
  }
});
