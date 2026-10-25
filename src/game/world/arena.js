const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);

function rgba(hex, alpha) {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function createArenaView({ g, view, RH, FL, AR, assets, shade, mix }) {
  function drawLayer(layer, cam, opacity = 1) {
    const image = layer.image;
    if (!image) return;
    const maxSource = Math.max(0, image.width - view.RW);
    const sourceX = clamp(Math.round(cam * (layer.scroll ?? 1)), 0, maxSource);
    const height = Math.min(layer.height ?? RH, RH);
    const y = layer.y ?? 0;
    g.save();
    g.globalAlpha = (layer.alpha ?? 1) * opacity;
    g.imageSmoothingEnabled = false;
    if (layer.blend) g.globalCompositeOperation = layer.blend;
    g.drawImage(image, sourceX, 0, view.RW, height, 0, y, view.RW, height);
    g.restore();
  }

  function drawFog(asset, cam, time) {
    if (!asset.fog) return;
    const color = asset.fogColor || '#b8a4e8';
    for (let i = 0; i < 3; i++) {
      const x = ((i * 174 - cam * 0.24 + time * 0.18) % (view.RW + 260) + view.RW + 260) % (view.RW + 260) - 130;
      const horizon = g.createRadialGradient(x, FL - 18, 8, x, FL - 18, 94);
      horizon.addColorStop(0, rgba(color, 0.15));
      horizon.addColorStop(1, rgba(color, 0));
      g.fillStyle = horizon;
      g.fillRect(x - 94, FL - 112, 188, 112);
    }
    const haze = g.createLinearGradient(0, FL - 40, 0, FL);
    haze.addColorStop(0, rgba(color, 0));
    haze.addColorStop(0.68, rgba(color, 0.14));
    haze.addColorStop(1, rgba(color, 0.03));
    g.fillStyle = haze;
    g.fillRect(0, FL - 40, view.RW, 40);
  }

  function drawGround(A, asset, cam, time) {
    const gr = g.createLinearGradient(0, FL, 0, RH);
    gr.addColorStop(0, A.gr);
    gr.addColorStop(1, shade(A.gr, 0.55));
    g.fillStyle = gr;
    g.fillRect(0, FL, view.RW, RH - FL);

    g.fillStyle = mix(A.gr, '#ffffff', 0.14);
    g.fillRect(0, FL, view.RW, 1);
    g.fillStyle = 'rgba(0,0,0,.25)';
    g.fillRect(0, FL, view.RW, 2);

    const horizon = g.createLinearGradient(0, FL - 12, 0, FL);
    horizon.addColorStop(0, 'rgba(178,188,208,0)');
    horizon.addColorStop(1, 'rgba(178,188,208,.08)');
    g.fillStyle = horizon;
    g.fillRect(0, FL - 12, view.RW, 12);

    g.strokeStyle = 'rgba(0,0,0,.15)';
    g.lineWidth = 1;
    const vanishX = view.RW / 2 - (cam - view.RW / 2) * 0.35;
    for (let i = -8; i <= 8; i++) {
      g.beginPath();
      g.moveTo(vanishX + i * 26, FL + 2);
      g.lineTo(vanishX + i * 72, RH);
      g.stroke();
    }
    for (const y of [FL + 5, FL + 14, FL + 26]) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(view.RW, y);
      g.stroke();
    }

    if (Array.isArray(A.rb)) {
      g.fillStyle = A.gr2;
      for (const rb of A.rb) {
        const x = Math.round(((rb.x - cam) % (view.RW + 40) + view.RW + 40) % (view.RW + 40) - 20);
        g.globalAlpha = rb.a;
        g.fillRect(x, rb.y, rb.w, 2);
      }
      g.globalAlpha = 1;
    }

    if (asset.wet) {
      const sheen = g.createLinearGradient(0, FL, 0, FL + 26);
      sheen.addColorStop(0, 'rgba(150,190,210,.12)');
      sheen.addColorStop(1, 'rgba(150,190,210,0)');
      g.fillStyle = sheen;
      g.fillRect(0, FL, view.RW, 26);
      for (const light of asset.lights || []) {
        if (light.y < FL - 40) continue;
        const x = light.x - cam * 0.82;
        if (x < -20 || x > view.RW + 20) continue;
        const reflection = g.createLinearGradient(0, FL, 0, Math.min(RH, FL + 30));
        reflection.addColorStop(0, rgba(light.color, 0.16));
        reflection.addColorStop(1, rgba(light.color, 0));
        g.fillStyle = reflection;
        g.fillRect(x - 7, FL, 14, Math.min(RH, FL + 30) - FL);
      }
    }

    g.fillStyle = 'rgba(0,0,0,.25)';
    g.fillRect(0, FL, view.RW, 2);
    if (asset.wet) {
      const ripple = 0.06 + Math.sin(time * 0.08) * 0.02;
      g.fillStyle = `rgba(190,220,235,${ripple})`;
      g.fillRect(0, FL + 3, view.RW, 1);
    }
  }

  function drawLights(asset, cam, time) {
    if (!Array.isArray(asset.lights)) return;
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const light of asset.lights) {
      const x = light.x - cam * 0.82;
      if (x < -light.radius || x > view.RW + light.radius) continue;
      const flicker = 0.88 + Math.sin(time * 0.07 + light.x * 0.5) * 0.12;
      const halo = g.createRadialGradient(x, light.y, 2, x, light.y, light.radius);
      halo.addColorStop(0, rgba(light.color, light.alpha * flicker));
      halo.addColorStop(1, rgba(light.color, 0));
      g.fillStyle = halo;
      g.fillRect(x - light.radius, light.y - light.radius, light.radius * 2, light.radius * 2);
    }
    g.restore();
  }

  function draw(ai, cam, time) {
    const asset = assets[ai];
    if (!asset || !asset.ready || !Array.isArray(asset.layers) || !asset.layers.length) return false;
    const A = AR[ai] || AR[0];
    for (const layer of asset.layers) {
      if (!layer.foreground) drawLayer(layer, cam);
    }
    drawFog(asset, cam, time);
    drawGround(A, asset, cam, time);
    drawLights(asset, cam, time);
    return true;
  }

  function foreground(ai, cam) {
    const asset = assets[ai];
    if (!asset || !asset.ready || !Array.isArray(asset.layers)) return false;
    let drawn = false;
    for (const layer of asset.layers) {
      if (!layer.foreground) continue;
      drawLayer(layer, cam, 0.7);
      drawn = true;
    }
    return drawn;
  }

  function hasForeground(ai) {
    const asset = assets[ai];
    return Boolean(asset && asset.ready && Array.isArray(asset.layers) && asset.layers.some((layer) => layer.foreground));
  }

  function post() {
    const vignette = g.createRadialGradient(view.RW * 0.5, FL * 0.52, 80, view.RW * 0.5, FL * 0.52, 310);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(0.72, 'rgba(0,0,0,.03)');
    vignette.addColorStop(1, 'rgba(0,0,0,.18)');
    g.fillStyle = vignette;
    g.fillRect(0, 0, view.RW, RH);
    const top = g.createLinearGradient(0, 0, 0, 26);
    top.addColorStop(0, 'rgba(0,0,0,.16)');
    top.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = top;
    g.fillRect(0, 0, view.RW, 26);
  }

  function ambient({ arena, cam, frame, parts }) {
    const asset = assets[arena];
    if (!asset || !asset.ready || !Array.isArray(asset.ambient) || !asset.ambient.length) return false;
    for (const item of asset.ambient) {
      const every = Math.max(1, item.every || 1);
      if (frame % every !== 0) continue;
      if (item.type === 'rain') {
        parts.push({
          x: cam + Math.random() * (view.RW + 50) - 20,
          y: -6,
          vx: item.wind ?? -0.5,
          vy: 7,
          c: 'rgba(170,190,215,.28)',
          l: 60,
          s: 1,
          gv: 0,
          line: 1,
          kf: 1,
        });
      } else if (item.type === 'snow') {
        parts.push({
          x: cam + Math.random() * view.RW,
          y: -4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: 0.32 + Math.random() * 0.35,
          c: item.color || 'rgba(230,240,255,.7)',
          l: 420,
          s: 1 + Math.random(),
          gv: 0,
          kf: 1,
        });
      } else if (item.type === 'sand') {
        parts.push({
          x: cam + view.RW + 10,
          y: FL - Math.random() * 158,
          vx: -1.6 - Math.random() * 1.2,
          vy: 0.04,
          c: item.color || 'rgba(220,180,110,.2)',
          l: 80,
          s: 1,
          gv: 0,
          horiz: 3 + Math.random() * 5,
        });
      } else if (item.type === 'ember') {
        parts.push({
          x: cam + Math.random() * view.RW,
          y: FL + Math.random() * 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.4 - Math.random() * 0.6,
          c: item.color || 'rgba(240,110,40,.8)',
          l: 60 + Math.random() * 60,
          s: 1 + Math.random(),
          gv: -0.01,
        });
      } else if (item.type === 'motes') {
        parts.push({
          x: cam + Math.random() * view.RW,
          y: FL - Math.random() * 145,
          vx: (Math.random() - 0.5) * 0.24,
          vy: -0.06 - Math.random() * 0.16,
          c: item.color || 'rgba(180,170,220,.2)',
          l: 110 + Math.random() * 170,
          s: 1 + Math.random() * 1.6,
          gv: 0,
        });
      } else if (item.type === 'fog') {
        // Full-screen fog is a separate pass; see drawFog().
      }
    }
    return true;
  }

  return { draw, foreground, hasForeground, ambient, post };
}
