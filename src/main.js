import { loadArenaAssets } from './assets/arena.js';
import { loadFxAssets } from './assets/fx.js';
import { loadUiAssets } from './assets/ui.js';
import { startKarnage } from './game/karnage.js';

Promise.all([
  loadFxAssets().catch(() => ({})),
  loadArenaAssets().catch(() => ({})),
  loadUiAssets().catch(() => ({}))
])
  .then(([fxAssets, arenaAssets, uiAssets]) => startKarnage(fxAssets, arenaAssets, uiAssets))
  .catch(() => startKarnage({}, {}, {}));
