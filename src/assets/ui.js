import manifest from './ui-manifest.js';

const base = new URL('assets/ui/', location.href);

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function loadUiAssets() {
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
