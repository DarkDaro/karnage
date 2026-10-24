import manifest from './arena-manifest.js';

const base = new URL('assets/arenas/', location.href);

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function loadArenaAssets() {
  const entries = await Promise.all(
    Object.entries(manifest).map(async ([key, definition]) => {
      try {
        const image = await loadImage(new URL(definition.image, base).href);
        let props = null;
        if (definition.props) {
          try {
            props = await loadImage(new URL(definition.props, base).href);
          } catch {
            props = null;
          }
        }
        return [key, { ...definition, image, props, ready: true }];
      } catch {
        return [key, { ...definition, ready: false }];
      }
    })
  );
  return Object.fromEntries(entries);
}
