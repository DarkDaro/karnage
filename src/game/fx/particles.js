export function createParticles({ g, state, options, FL, GR, rnd }) {
  const pool = [];// 25.10: переиспользование частиц снижает нагрузку GC в бою
  function P(x, y, vx, vy, c, l, s, gv) {
    if (!options.blood && c === '#b01818') return;
    const p = pool.pop() || {};
    p.x = x; p.y = y; p.vx = vx; p.vy = vy; p.c = c; p.l = l || 30; p.s = s || 2; p.gv = gv === undefined ? .3 : gv;
    p.line = p.horiz = p.kf = 0;
    state.parts.push(p);
  }

  function blood(x, y, n, pw) {
    if (!options.blood) return;
    for (let i = 0; i < n; i++) {
      P(x, y, rnd(-2.5, 2.5) * (pw || 1), rnd(-4, 1), '#b01818', rnd(20, 50), rnd(1, 3));
    }
  }

  function updParts() {
    const parts = state.parts;
    let w = 0;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gv;
      p.l--;
      if (p.kf && p.y > FL + GR) {
        pool.push(p);
        continue;
      }
      if (!p.line && p.y >= FL + GR - 1 && p.gv > 0) {
        if (options.blood && p.c === '#b01818' && Math.random() < .5) {
          state.decals.push({ x: p.x, y: FL + 2 + rnd(0, 4), s: rnd(1, 3), t: 0, l: rnd(480, 900) });
        }
        p.y = FL + GR - 1;
        p.vy *= -.3;
        p.vx *= .6;
      }
      if (p.l <= 0) {
        pool.push(p);
        continue;
      }
      parts[w++] = p;
    }
    parts.length = w;
    const decals = state.decals;
    w = 0;
    for (let i = 0; i < decals.length; i++) {
      const d = decals[i];
      d.t++;
      if (d.t <= d.l) decals[w++] = d;
    }
    decals.length = w;
    if (decals.length > 240) decals.splice(0, decals.length - 240);
    if (parts.length > 400) {
      const drop = parts.length - 400;
      for (let i = 0; i < drop; i++) pool.push(parts[i]);
      parts.splice(0, drop);
    }
  }

  function drawParts(cam) {
    for (const p of state.parts) {
      g.fillStyle = p.c;
      if (p.line) g.fillRect(p.x - cam, p.y, 1, 6);
      else if (p.horiz) g.fillRect(p.x - cam, p.y, p.horiz, 1);
      else g.fillRect(p.x - cam - p.s / 2, p.y - p.s / 2, p.s, p.s);
    }
  }

  function drawDecals(cam) {
    if (!options.blood) return;
    g.fillStyle = '#b01818'; // 08.09: пятна тают в последние 40% жизни
    for (const d of state.decals) {
      const a = d.l ? 1 - Math.max(0, (d.t - d.l * .6) / (d.l * .4)) : 1;
      g.globalAlpha = a;
      g.fillRect(d.x - cam, d.y, d.s, d.s > 2 ? 2 : 1);
    }
    g.globalAlpha = 1;
  }

  return { P, blood, updParts, drawParts, drawDecals };
}
