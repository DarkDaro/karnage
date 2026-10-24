/* global window, document */
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
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true });
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

test('mobile layout exposes touch controls', async () => {
  const state = await page.evaluate(() => ({
    touch: Boolean(document.getElementById('touch')),
    body: document.body.className
  }));
  assert.equal(state.touch, true);
  assert.match(state.body, /touch/);
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
});
