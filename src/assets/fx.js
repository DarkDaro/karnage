import manifest from './fx-manifest.js';

const base = new URL('assets/fx/', location.href);

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      let settled = false;
      const ready = () => {
        if (settled) return;
        settled = true;
        resolve(image);
      };
      if (image.decode) {
        try {
          const decoded = image.decode();
          if (decoded && decoded.then) decoded.then(ready, ready);
          else ready();
        } catch {
          ready();
        }
        setTimeout(ready, 300);
      } else ready();
    };
    image.onerror = reject;
    image.src = src;
  });
}

export async function loadFxAssets() {
  const entries = await Promise.all(
    Object.entries(manifest).map(async ([key, definition]) => {
      try {
        const image = await loadImage(new URL(definition.image, base).href);
        return [key, { ...definition, image, ready: true }];
      } catch {
        return [key, { ...definition, ready: false }];
      }
    })
  );
  return Object.fromEntries(entries);
}
