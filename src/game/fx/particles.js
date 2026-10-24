export function createParticles({ g, state, options, FL, GR, rnd }) {
  function P(x, y, vx, vy, c, l, s, gv) {
    if (!options.blood && c === '#b01818') return;
    state.parts.push({ x, y, vx, vy, c, l: l || 30, s: s || 2, gv: gv === undefined ? .3 : gv });
  }

  function blood(x, y, n, pw) {
    if (!options.blood) return;
    for (let i = 0; i < n; i++) {
      P(x, y, rnd(-2.5, 2.5) * (pw || 1), rnd(-4, 1), '#b01818', rnd(20, 50), rnd(1, 3));
    }
  }

  function updParts() {
    for (let i = state.parts.length; i--;) {
      const p = state.parts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gv;
      p.l--;
      if (p.kf && p.y > FL + GR) {
        state.parts.splice(i, 1);
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
      if (p.l <= 0) state.parts.splice(i, 1);
    }
    for (let i = state.decals.length; i--;) {
      const d = state.decals[i];
      d.t++;
      if (d.t > d.l) state.decals.splice(i, 1);
    }
    if (state.decals.length > 240) state.decals.splice(0, state.decals.length - 240);
    if (state.parts.length > 400) state.parts.splice(0, state.parts.length - 400);
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
