import { loadArenaAssets } from './assets/arena.js';
import { loadFxAssets } from './assets/fx.js';
import { startKarnage } from './game/karnage.js';

Promise.all([
  loadFxAssets().catch(() => ({})),
  loadArenaAssets().catch(() => ({}))
])
  .then(([fxAssets, arenaAssets]) => startKarnage(fxAssets, arenaAssets))
  .catch(() => startKarnage({}, {}));
