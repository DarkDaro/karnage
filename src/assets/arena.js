import manifest from './arena-manifest.js';

const base = new URL('assets/arenas/', location.href);

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

async function loadLayer(key, layer) {
  const source = layer.image || `${key}/${layer.file}`;
  const image = await loadImage(new URL(source, base).href);
  return { ...layer, image };
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
        const layers = Array.isArray(definition.layers)
          ? await Promise.all(definition.layers.map((layer) => loadLayer(key, layer)))
          : [];
        return [key, { ...definition, image, props, layers, ready: true }];
      } catch {
        return [key, { ...definition, layers: [], ready: false }];
      }
    })
  );
  return Object.fromEntries(entries);
}
