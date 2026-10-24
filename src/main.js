import { loadFxAssets } from './assets/fx.js';
import { startKarnage } from './game/karnage.js';

loadFxAssets()
  .then((assets) => startKarnage(assets))
  .catch(() => startKarnage({}));
