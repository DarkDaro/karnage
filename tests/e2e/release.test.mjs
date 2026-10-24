/* global window */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..', '..');
const entries = {
  root: pathToFileURL(join(root, 'index.html')).href + '?debug=1',
  release: pathToFileURL(join(root, 'release', 'index.html')).href + '?debug=1'
};

for (const [name, entry] of Object.entries(entries)) {
  test(`${name} entry loads from disk`, async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.addInitScript(() => {
        window.requestAnimationFrame = () => 0;
      });
      await page.goto(entry, { waitUntil: 'load' });
      await page.waitForFunction(() => Boolean(window.KARNAGE));
      const state = await page.evaluate(() => ({
        game: window.KARNAGE.snapshot().GAME,
        fighters: window.KARNAGE.CH.length,
        arenas: window.KARNAGE.AR.length,
        fx: Object.values(window.KARNAGE.fxAssets).filter((asset) => asset.ready).length,
        arenaAssets: Object.values(window.KARNAGE.arenaAssets || {}).filter((asset) => asset.ready).length
      }));
      assert.deepEqual(state, { game: 'title', fighters: 13, arenas: 10, fx: 10, arenaAssets: 1 });
      assert.deepEqual(errors, []);
    } finally {
      await browser.close();
    }
  });
}
