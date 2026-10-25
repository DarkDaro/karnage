// 25.10: снаряды, аура каста и заряд рисуются отдельно от бойцов.
// Модуль только читает S и f, ничего не обновляет.
const TAU = Math.PI * 2;
const ACC = {
  0: '#f0a032', 1: '#9fb4bd', 2: '#f8f860', 3: '#c8a060',
  4: '#7ac83a', 5: '#c8a060', 6: '#c8ecff', 7: '#d84a2a',
  8: '#a050d0', 9: '#f0c850', 10: '#e02040', 11: '#9adcee', 12: '#b89aff'
};

export function createAbilityFx({ g, S, FL, GR, lerp, rnd, mix }) {
  const GROUND = FL + GR;

  function at(x, y, r, col, alpha) {
    if (r <= 0 || alpha <= 0) return;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(255,255,255,.95)');
    gr.addColorStop(.34, col);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.globalAlpha = alpha;
    g.fillStyle = gr;
    g.beginPath();
    g.arc(x, y, r, 0, TAU);
    g.fill();
  }

  function groundAt(x, y, r, col, alpha) {
    if (y >= GROUND - 1 || alpha <= 0) return;
    const h = Math.min(1, (GROUND - y) / 150);
    g.save();
    g.translate(x, GROUND);
    g.scale(1, .28);
    at(0, 0, r * (1.18 - h * .32), col, alpha * (1 - h * .45));
    g.restore();
  }

  function groundShadow(x, y, r, alpha) {
    if (y >= GROUND - 2 || alpha <= 0) return;
    const h = Math.min(1, (GROUND - y) / 160);
    g.save();
    g.globalAlpha = alpha * (1 - h * .5);
    g.fillStyle = '#000';
    g.beginPath();
    g.ellipse(x, GROUND - 1, r * (1.2 - h * .3), 3.1, 0, 0, TAU);
    g.fill();
    g.restore();
  }

  function poly(points) {
    g.beginPath();
    g.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) g.lineTo(points[i][0], points[i][1]);
    g.closePath();
    g.fill();
  }

  function line(points) {
    g.beginPath();
    g.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) g.lineTo(points[i][0], points[i][1]);
    g.stroke();
  }

  function diamond(x, y, rx, ry, col, alpha) {
    g.globalAlpha = alpha;
    g.fillStyle = col;
    poly([[x, y - ry], [x + rx, y], [x, y + ry], [x - rx, y]]);
  }

  function trail(p, x, y, col, kind) {
    const sp = Math.hypot(p.vx, p.vy) || 1;
    const n = p.ty === 'shard' ? 4 : 5;
    for (let i = 1; i <= n; i++) {
      const k = i * 3.2;
      const tx = x - p.vx / sp * k;
      const ty = y - p.vy / sp * k;
      const a = .30 * (1 - i / (n + 1));
      if (kind === 'diamond') diamond(tx, ty, 1.5 + (n - i) * .22, 3 + (n - i) * .35, col, a);
      else if (kind === 'square') {
        g.globalAlpha = a;
        g.fillStyle = col;
        g.fillRect(tx - 1, ty - 1, 2, 2);
      } else {
        g.globalAlpha = a;
        g.fillStyle = col;
        g.beginPath();
        g.arc(tx, ty, 1.5 + (n - i) * .55, 0, TAU);
        g.fill();
      }
    }
  }

  function drawFire(p, x, y) {
    groundAt(x, y, 25, '#f06020', .20);
    g.save();
    g.globalCompositeOperation = 'lighter';
    trail(p, x, y, '#f06020', 'circle');
    const flick = Math.sin(S.FRAME * .45 + p.l * .7) * 1.5;
    const dir = p.vx < 0 ? 1 : -1;
    at(x, y, 18 + flick, '#f06020', .50);
    g.globalAlpha = .85;
    g.fillStyle = '#a03010';
    poly([[x + dir * 2, y - 4], [x + dir * (13 + flick), y - 9 + flick], [x + dir * 10, y - 2], [x + dir * (16 + flick), y], [x + dir * 9, y + 4], [x + dir * 12, y + 8], [x + dir * 2, y + 5]]);
    g.fillStyle = '#f06020';
    poly([[x + dir * 2, y - 3], [x + dir * (9 + flick), y - 5], [x + dir * 6, y], [x + dir * 10, y + 3], [x + dir * 2, y + 4]]);
    g.globalAlpha = 1;
    g.fillStyle = '#3a1008';
    g.beginPath();
    g.arc(x, y, 7, 0, TAU);
    g.fill();
    g.fillStyle = '#f06020';
    g.beginPath();
    g.arc(x, y, 6, 0, TAU);
    g.fill();
    g.fillStyle = '#f8d060';
    g.beginPath();
    g.arc(x + .5, y - .5, 3.6, 0, TAU);
    g.fill();
    g.fillStyle = '#fff8d0';
    g.fillRect(x - 1, y - 2, 2, 2);
    for (let i = 0; i < 4; i++) {
      const a = S.FRAME * .12 + i * 1.7;
      g.globalAlpha = .55;
      g.fillStyle = i % 2 ? '#f8d060' : '#f06020';
      g.fillRect(x + Math.cos(a) * (9 + i), y + Math.sin(a) * (7 + i * .5), 1.5, 1.5);
    }
    g.restore();
  }

  function drawIce(p, x, y) {
    groundAt(x, y, 20, '#88c8f0', .16);
    const ang = Math.atan2(p.vy, p.vx) || (p.vx < 0 ? Math.PI : 0);
    g.save();
    g.globalCompositeOperation = 'lighter';
    trail(p, x, y, '#9adcee', 'diamond');
    at(x, y, 15, '#88c8f0', .42);
    g.restore();
    g.save();
    g.translate(x, y);
    g.rotate(ang + Math.sin(S.FRAME * .09) * .08);
    g.fillStyle = '#2a5068';
    poly([[12, 0], [2, -5], [-9, -3], [-6, 0], [-9, 3], [2, 5]]);
    g.fillStyle = '#88c8f0';
    poly([[10, 0], [2, -3.8], [-6, -2.2], [-3, 0], [-6, 2.2], [2, 3.8]]);
    g.fillStyle = '#e8f8ff';
    poly([[7, 0], [1, -1.8], [-2, -1], [0, 0], [-2, 1], [1, 1.8]]);
    g.strokeStyle = '#d8f4ff';
    g.lineWidth = .7;
    g.beginPath();
    g.moveTo(-1, -1.2);
    g.lineTo(4, -.2);
    g.stroke();
    g.restore();
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.strokeStyle = 'rgba(220,248,255,.8)';
    g.lineWidth = .8;
    for (let i = 0; i < 3; i++) {
      const a = S.FRAME * .11 + i * 2.1;
      const sx = x + Math.cos(a) * (8 + i * 2);
      const sy = y + Math.sin(a) * (6 + i);
      g.beginPath();
      g.moveTo(sx - 2, sy);
      g.lineTo(sx + 2, sy);
      g.moveTo(sx, sy - 2);
      g.lineTo(sx, sy + 2);
      g.stroke();
    }
    g.restore();
  }

  function drawShadow(p, x, y) {
    groundAt(x, y, 22, '#7a3aa8', .16);
    g.save();
    g.globalCompositeOperation = 'lighter';
    trail(p, x, y, '#7a3aa8', 'circle');
    at(x, y, 19, '#7a3aa8', .38);
    g.strokeStyle = 'rgba(160,80,210,.55)';
    g.lineWidth = 1.4;
    const dir = p.vx < 0 ? 1 : -1;
    for (let i = 0; i < 3; i++) {
      const wob = Math.sin(S.FRAME * .16 + i * 2) * 3;
      g.beginPath();
      g.moveTo(x, y);
      g.bezierCurveTo(x + dir * 7, y - 7 + wob, x + dir * (14 + i * 3), y + 7 - wob, x + dir * (9 + i * 2), y + 12 + wob);
      g.stroke();
    }
    g.restore();
    g.fillStyle = '#180a24';
    g.beginPath();
    g.arc(x, y, 7.2, 0, TAU);
    g.fill();
    g.fillStyle = '#3a1a5a';
    g.beginPath();
    g.arc(x, y, 5.8, 0, TAU);
    g.fill();
    g.fillStyle = '#7a3aa8';
    g.beginPath();
    g.arc(x - 1, y - 1, 3.2, 0, TAU);
    g.fill();
    g.fillStyle = '#d8b0ff';
    g.fillRect(x - 1, y - 2, 1.5, 1.5);
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 3; i++) {
      const a = S.FRAME * .1 + i * 2.1;
      g.globalAlpha = .55;
      g.fillStyle = '#a050d0';
      g.beginPath();
      g.arc(x + Math.cos(a) * (9 + i * 1.5), y + Math.sin(a) * (6 + i), 1.7, 0, TAU);
      g.fill();
    }
    g.restore();
  }

  function drawBolt(x1, y1, x2, y2, opts = {}) {
    const amp = opts.amp || 5;
    const col = opts.col || '#f8f860';
    const segs = opts.segs || 7;
    const pts = [[x1, y1]];
    for (let i = 1; i < segs; i++) {
      const t = i / segs;
      pts.push([lerp(x1, x2, t) + rnd(-amp, amp), lerp(y1, y2, t) + rnd(-amp * .35, amp * .35)]);
    }
    pts.push([x2, y2]);
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    g.strokeStyle = 'rgba(248,248,96,.14)';
    g.lineWidth = 9;
    line(pts);
    g.strokeStyle = col;
    g.lineWidth = 2.4;
    line(pts);
    g.strokeStyle = '#fffce0';
    g.lineWidth = .9;
    line(pts);
    g.lineWidth = 1;
    g.strokeStyle = 'rgba(248,248,96,.7)';
    for (let i = 2; i < pts.length - 2; i += 2) {
      if (Math.random() < .7) {
        const bx = pts[i][0] + rnd(-13, 13);
        const by = pts[i][1] + rnd(-8, 8);
        g.beginPath();
        g.moveTo(pts[i][0], pts[i][1]);
        g.lineTo(bx, by);
        g.stroke();
      }
    }
    g.restore();
  }

  function drawWave(p, x) {
    const id = p.o && p.o.def ? p.o.def.id : -1;
    const col = id === 3 ? '#a07840' : id === 9 ? '#c8d060' : (p.c || '#a07840');
    const dark = mix(col, '#000000', .78);
    const mid = mix(col, '#000000', .42);
    const light = mix(col, '#ffffff', id === 3 ? .24 : .38);
    const base = GROUND;
    const dir = p.vx < 0 ? -1 : 1;
    g.save();
    g.globalAlpha = .34;
    g.fillStyle = '#1a120a';
    g.beginPath();
    g.ellipse(x, base + 1, 27, 4.2, 0, 0, TAU);
    g.fill();
    g.globalAlpha = .22;
    g.fillStyle = '#8a7a5c';
    for (let i = 0; i < 5; i++) {
      const a = i * 1.7 + S.FRAME * .07;
      g.beginPath();
      g.arc(x - dir * (10 + i * 4) + Math.cos(a) * 3, base - 3 + Math.sin(a) * 4, 3 + i * .7, 0, TAU);
      g.fill();
    }
    g.globalAlpha = 1;
    g.fillStyle = dark;
    poly([[x - dir * 22, base], [x - dir * 16, base - 16], [x - dir * 9, base - 26], [x + dir * 2, base - 30], [x + dir * 12, base - 18], [x + dir * 18, base]]);
    for (let k = -3; k <= 3; k++) {
      const h = 30 - Math.abs(k) * 4.8 + Math.sin(S.FRAME * .34 + k + .4) * 2;
      const ox = x + k * 5.6 + dir * h * .12;
      g.fillStyle = dark;
      poly([[ox - 7, base], [ox - 5, base - h * .38], [ox - 2, base - h], [ox + 2, base - h * .74], [ox + 3, base - h * .30], [ox + 7, base]]);
      g.fillStyle = mid;
      poly([[ox - 5, base - 1], [ox - 3, base - h * .42], [ox - 1, base - h * .86], [ox + 1, base - h * .52], [ox + 4, base - 1]]);
      g.fillStyle = light;
      g.globalAlpha = .5;
      poly([[ox - 2, base - h * .18], [ox - 1, base - h * .72], [ox + 1, base - h * .44]]);
      g.globalAlpha = 1;
    }
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = .65;
    g.strokeStyle = light;
    g.lineWidth = 1.4;
    g.beginPath();
    g.moveTo(x + dir * 6, base - 3);
    g.lineTo(x + dir * 13, base - 17);
    g.lineTo(x + dir * 9, base - 30);
    g.stroke();
    g.globalAlpha = .16;
    g.fillStyle = col;
    g.beginPath();
    g.ellipse(x, base - 8, 27, 8, 0, 0, TAU);
    g.fill();
    g.globalAlpha = .9;
    g.fillStyle = mid;
    for (let i = 0; i < 4; i++) {
      const bx = x + dir * (15 + i * 5) + Math.sin(S.FRAME * .2 + i) * 2;
      const by = base - 10 - i * 4 + Math.cos(S.FRAME * .25 + i) * 2;
      g.save();
      g.translate(bx, by);
      g.rotate(S.FRAME * .08 + i);
      g.fillRect(-2, -1.5, 4, 3);
      g.restore();
    }
    g.globalAlpha = .75;
    g.fillStyle = light;
    for (let i = 0; i < 4; i++) {
      const a = i * 1.9 + S.FRAME * .11;
      g.fillRect(x + Math.cos(a) * (14 + i * 3), base - 8 - Math.sin(a) * 12, 1.5, 1.5);
    }
    g.restore();
    g.fillStyle = '#5a4a38';
    for (let i = 0; i < 5; i++) {
      const a = i * 1.7 + S.FRAME * .08;
      g.globalAlpha = .65;
      g.fillRect(x + Math.cos(a) * (15 + i * 2), base - 5 + Math.sin(a) * 7, 2, 2);
    }
    g.globalAlpha = 1;
    g.strokeStyle = 'rgba(40,30,20,.55)';
    g.lineWidth = 1;
    for (let i = -2; i <= 2; i += 2) {
      g.beginPath();
      g.moveTo(x + i * 6, base);
      g.lineTo(x + i * 11, base + 3);
      g.lineTo(x + i * 8, base + 5);
      g.stroke();
    }
  }

  function drawMeteor(p, x, y) {
    groundShadow(x, y, 14, .35);
    groundAt(x, y, 28, '#f06020', .34);
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (let i = 1; i <= 5; i++) {
      const ty = y - i * 5.5;
      g.globalAlpha = .34 - i * .045;
      g.fillStyle = i < 3 ? '#f8d060' : '#f06020';
      g.beginPath();
      g.arc(x + Math.sin(S.FRAME * .1 + i) * 1.5, ty, 6 - i * .65, 0, TAU);
      g.fill();
    }
    at(x, y, 22, '#f06020', .48);
    g.restore();
    g.save();
    g.translate(x, y);
    g.rotate(Math.sin(p.l * .09) * .35);
    g.fillStyle = '#2a1810';
    poly([[-10, -6], [-5, -12], [3, -10], [9, -4], [7, 6], [0, 10], [-8, 6]]);
    g.fillStyle = '#6a4a32';
    poly([[-8, -5], [-3, -9], [3, -8], [7, -3], [5, 5], [0, 8], [-6, 5]]);
    g.fillStyle = '#9a7a5a';
    poly([[-5, -5], [-1, -7], [2, -6], [0, -2], [-4, -1]]);
    g.strokeStyle = '#f06020';
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(-3, -4);
    g.lineTo(2, 0);
    g.lineTo(-1, 5);
    g.moveTo(3, -5);
    g.lineTo(5, -1);
    g.stroke();
    g.restore();
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.fillStyle = '#f8d060';
    poly([[x - 5, y - 9], [x - 2, y - 19 + Math.sin(S.FRAME * .4) * 3], [x + 1, y - 10]]);
    g.fillStyle = '#f06020';
    poly([[x + 1, y - 8], [x + 5, y - 16], [x + 7, y - 7]]);
    g.restore();
  }

  function drawRocket(p, x, y) {
    groundShadow(x, y, 11, .30);
    groundAt(x, y, 17, '#d84030', .18);
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (let i = 1; i <= 4; i++) {
      g.globalAlpha = .26 - i * .045;
      g.fillStyle = i < 3 ? '#f8d060' : '#d84030';
      g.beginPath();
      g.arc(x + Math.sin(S.FRAME * .1 + i) * 1.2, y - 10 - i * 5, 4 - i * .5, 0, TAU);
      g.fill();
    }
    g.fillStyle = '#f8d060';
    poly([[x - 2.5, y - 7], [x, y - 19 + Math.sin(S.FRAME * .5) * 3], [x + 2.5, y - 7]]);
    g.restore();
    g.save();
    g.translate(x, y);
    g.rotate(Math.sin(S.FRAME * .12) * .04);
    g.fillStyle = '#1a1a20';
    g.fillRect(-4, -7, 8, 17);
    g.fillStyle = '#7a8088';
    g.fillRect(-3, -7, 6, 16);
    g.fillStyle = '#b8c0c8';
    g.fillRect(-2, -6, 2, 14);
    g.fillStyle = '#8a2020';
    g.beginPath();
    g.moveTo(-3, 9);
    g.lineTo(0, 14);
    g.lineTo(3, 9);
    g.fill();
    g.fillStyle = '#d84030';
    g.fillRect(-2, 7, 4, 3);
    g.fillStyle = '#3a3a42';
    poly([[-3, -4], [-8, -10], [-3, -8], [-2, -4]]);
    poly([[3, -4], [8, -10], [3, -8], [2, -4]]);
    g.restore();
  }

  function drawBomb(p, x, y) {
    groundShadow(x, y, 9, .24);
    g.save();
    g.globalCompositeOperation = 'lighter';
    trail(p, x, y, '#6a5a44', 'circle');
    for (let i = 1; i <= 3; i++) {
      g.globalAlpha = .2 - i * .04;
      g.fillStyle = '#6a5a44';
      g.beginPath();
      g.arc(x - p.vx * i * 1.2, y - p.vy * i * 1.2, 3 + i, 0, TAU);
      g.fill();
    }
    g.restore();
    g.save();
    g.translate(x, y);
    g.rotate(p.l * .12);
    g.fillStyle = '#17120e';
    g.beginPath();
    g.arc(0, 0, 6.2, 0, TAU);
    g.fill();
    g.fillStyle = '#2a2018';
    g.beginPath();
    g.arc(0, 0, 5.2, 0, TAU);
    g.fill();
    g.fillStyle = '#5a4a3a';
    g.fillRect(-3.5, -4, 5, 1.5);
    g.fillStyle = '#8a7a5a';
    g.fillRect(-2, -3, 2, 1);
    g.fillStyle = '#3a3028';
    g.fillRect(3, -6, 3, 2);
    g.restore();
    const spark = 1 + (S.FRAME % 6 < 3 ? 1 : 0);
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.fillStyle = '#f0a030';
    g.fillRect(x + 5, y - 7 + Math.sin(S.FRAME * .4), spark + 1, spark);
    g.fillStyle = '#fff0a0';
    g.fillRect(x + 6, y - 7, 1, 1);
    g.restore();
  }

  function drawNet(p, x, y) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    trail(p, x, y, '#c8c8a0', 'square');
    at(x, y, 14, '#c8c8a0', .24);
    g.restore();
    g.save();
    g.translate(x, y);
    g.rotate(S.FRAME * .035);
    const s = 9 + (120 - p.l) * .05;
    g.strokeStyle = '#8a8a68';
    g.lineWidth = 1.4;
    g.beginPath();
    g.moveTo(0, -s);
    g.lineTo(s, 0);
    g.lineTo(0, s);
    g.lineTo(-s, 0);
    g.closePath();
    g.stroke();
    g.strokeStyle = '#d8d8b0';
    g.lineWidth = .75;
    for (let i = -2; i <= 2; i++) {
      const d = i * s / 2.6;
      g.beginPath();
      g.moveTo(d, -s + Math.abs(d) * .55);
      g.lineTo(d, s - Math.abs(d) * .55);
      g.moveTo(-s + Math.abs(d) * .55, d);
      g.lineTo(s - Math.abs(d) * .55, d);
      g.stroke();
    }
    g.fillStyle = '#c8c8a0';
    for (const [wx, wy] of [[0, -s], [s, 0], [0, s], [-s, 0]]) {
      g.fillRect(wx - 1.2, wy - 1.2, 2.4, 2.4);
    }
    g.restore();
  }

  function drawShard(p, x, y) {
    const col = p.c || '#f8d060';
    const ang = Math.atan2(p.vy, p.vx) || (p.vx < 0 ? Math.PI : 0);
    const size = p.s || 4;
    const hot = col === '#f06020' || col === '#f8d060' || col === '#f0c850';
    groundAt(x, y, 14, col, .12);
    g.save();
    g.globalCompositeOperation = 'lighter';
    trail(p, x, y, col, 'diamond');
    at(x, y, 10 + size, col, .34);
    g.restore();
    g.save();
    g.translate(x, y);
    g.rotate(ang);
    const L = size * 2.5;
    const W = Math.max(1.6, size * .78);
    g.fillStyle = mix(col, '#000000', .68);
    poly([[L + 1.5, 0], [0, -W - 1.2], [-L * .7, -W * .4], [-L * .5, 0], [-L * .7, W * .4], [0, W + 1.2]]);
    g.fillStyle = col;
    poly([[L, 0], [0, -W], [-L * .58, -W * .35], [-L * .4, 0], [-L * .58, W * .35], [0, W]]);
    g.fillStyle = mix(col, '#ffffff', .58);
    poly([[L * .74, 0], [0, -W * .42], [-L * .25, -W * .12], [-L * .1, 0]]);
    g.strokeStyle = mix(col, '#ffffff', .28);
    g.lineWidth = .7;
    g.beginPath();
    g.moveTo(-L * .3, 0);
    g.lineTo(L * .45, 0);
    g.stroke();
    g.restore();
    if (p.hom) {
      g.save();
      g.globalCompositeOperation = 'lighter';
      g.strokeStyle = '#f0e8ff';
      g.lineWidth = .8;
      g.beginPath();
      g.moveTo(x - 4, y);
      g.lineTo(x + 4, y);
      g.moveTo(x, y - 4);
      g.lineTo(x, y + 4);
      g.stroke();
      g.restore();
    }
    if (p.k) {
      g.save();
      g.globalCompositeOperation = 'lighter';
      g.strokeStyle = mix(col, '#ffffff', .35);
      g.lineWidth = 1;
      g.beginPath();
      g.arc(x, y, size + 5 + Math.sin(S.FRAME * .2) * 1.5, 0, TAU);
      g.stroke();
      g.restore();
    }
    if (hot) {
      g.save();
      g.globalCompositeOperation = 'lighter';
      const dir = p.vx < 0 ? 1 : -1;
      g.fillStyle = '#f8d060';
      poly([[x + dir * (size + 1), y - 2], [x + dir * (size + 10), y], [x + dir * (size + 1), y + 2]]);
      g.restore();
    }
  }

  function drawProjs(cam) {
    for (const p of S.projs) {
      const x = p.x - cam;
      const y = p.y;
      if (p.ty === 'fire') drawFire(p, x, y);
      else if (p.ty === 'ice') drawIce(p, x, y);
      else if (p.ty === 'shadow') drawShadow(p, x, y);
      else if (p.ty === 'bolt') {
        drawBolt(x, y - 100, x, y, { amp: 6, segs: 8, col: '#f8f860' });
        g.save();
        g.globalCompositeOperation = 'lighter';
        at(x, GROUND, 24, '#f8f860', .30);
        g.strokeStyle = '#f8f860';
        g.lineWidth = 1.5;
        g.beginPath();
        g.ellipse(x, GROUND, 13, 3.5, 0, 0, TAU);
        g.stroke();
        g.restore();
      } else if (p.ty === 'wave') drawWave(p, x);
      else if (p.ty === 'meteor') drawMeteor(p, x, y);
      else if (p.ty === 'rocket') drawRocket(p, x, y);
      else if (p.ty === 'bomb') drawBomb(p, x, y);
      else if (p.ty === 'net') drawNet(p, x, y);
      else if (p.ty === 'shard') drawShard(p, x, y);
    }
  }

  function drawCastAura(f) {
    if (f.state !== 'cast' && f.state !== 'super') return;
    const d = f.def;
    const col = ACC[d.id] || d.acc || '#f8d060';
    const isSuper = f.state === 'super';
    const p = Math.min(1, f.st / (isSuper ? 30 : 14));
    const gy = GROUND - f.y;
    const cy = -d.h * .55;
    g.save();
    g.globalCompositeOperation = 'lighter';
    if (isSuper) {
      at(0, cy, 22 + p * 20, col, .10);
      g.globalAlpha = .11;
      g.strokeStyle = col;
      g.lineWidth = 1.5;
      for (let i = 0; i < 2; i++) {
        const r = 16 + p * 15 + i * 8;
        g.beginPath();
        g.ellipse(0, cy, r, r * .38, S.FRAME * .03 + i, 0, TAU);
        g.stroke();
      }
      g.globalAlpha = .14;
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * TAU + S.FRAME * .02;
        g.beginPath();
        g.moveTo(Math.cos(a) * 10, cy + Math.sin(a) * 8);
        g.lineTo(Math.cos(a) * (24 + p * 18), cy + Math.sin(a) * (20 + p * 12));
        g.stroke();
      }
    } else {
      g.globalAlpha = .18;
      g.strokeStyle = col;
      g.lineWidth = 1;
      for (let i = 0; i < 2; i++) {
        g.beginPath();
        g.ellipse(0, cy, 10 + p * 8 + i * 6, 14 + p * 9 + i * 5, S.FRAME * .04 + i * .6, 0, TAU);
        g.stroke();
      }
    }
    if (gy > -4) {
      g.globalAlpha = isSuper ? .26 : .20;
      g.strokeStyle = col;
      g.lineWidth = 1.4;
      g.beginPath();
      g.ellipse(0, gy, 15 + p * 9, 4 + p * 2, 0, 0, TAU);
      g.stroke();
      g.globalAlpha = .10;
      g.fillStyle = col;
      g.beginPath();
      g.ellipse(0, gy, 17 + p * 11, 5 + p * 2.5, 0, 0, TAU);
      g.fill();
    }
    g.restore();
  }

  function drawCastCharge(f, hand) {
    if (f.state !== 'cast' && f.state !== 'super') return;
    const limit = f.state === 'super' ? 24 : 20;
    if (f.st > limit) return;
    const d = f.def;
    const col = ACC[d.id] || d.acc || '#f8d060';
    const col2 = f.spec2go ? mix(col, '#ffffff', .45) : col;
    const p = Math.min(1, f.st / 14);
    const fade = f.st <= 14 ? 1 : Math.max(0, 1 - (f.st - 14) / 6);
    const r = 3 + p * 8;
    const hx = hand[0] + (d.bow ? 16 : d.blade ? 13 : d.fan ? 8 : d.claws ? 4 : 0);
    const hy = hand[1];
    g.save();
    g.globalCompositeOperation = 'lighter';
    at(hx, hy, r * 3.2, col, .30 * fade);
    g.globalAlpha = .55 * fade;
    g.strokeStyle = col2;
    g.lineWidth = 1.2;
    for (let i = 0; i < 3; i++) {
      g.beginPath();
      g.arc(hx, hy, r + 2 + i * 2.4, S.FRAME * .08 + i * 1.9, S.FRAME * .08 + i * 1.9 + 1.6);
      g.stroke();
    }
    g.globalAlpha = .35 * fade;
    g.strokeStyle = col2;
    g.lineWidth = .8;
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * TAU + S.FRAME * .05;
      g.beginPath();
      g.moveTo(hx + Math.cos(a) * (r + 4), hy + Math.sin(a) * (r + 4));
      g.lineTo(hx + Math.cos(a) * (r + 8), hy + Math.sin(a) * (r + 8));
      g.stroke();
    }
    g.globalAlpha = .9 * fade;
    g.fillStyle = '#fff8e0';
    g.beginPath();
    g.arc(hx, hy, Math.max(1.2, r * .3), 0, TAU);
    g.fill();
    drawChargeShape(f, hx, hy, r, col2, p, fade);
    g.restore();
  }

  function drawChargeShape(f, hx, hy, r, col, p, fade) {
    const id = f.def.id;
    g.globalAlpha = fade;
    g.strokeStyle = col;
    g.fillStyle = col;
    g.lineWidth = 1.1;
    if (id === 0) {
      for (let i = 0; i < 3; i++) {
        const ox = Math.sin(S.FRAME * .2 + i * 2) * 2;
        g.beginPath();
        g.moveTo(hx - 3 + i * 3, hy + 2);
        g.quadraticCurveTo(hx - 2 + i * 3 + ox, hy - r - 3, hx + 1 + i * 3, hy - r * .7);
        g.stroke();
      }
    } else if (id === 1) {
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * .1 + i * 2.1;
        g.beginPath();
        g.moveTo(hx, hy);
        g.quadraticCurveTo(hx + Math.cos(a) * r * 2, hy + Math.sin(a) * r * 2, hx + Math.cos(a + .8) * r * 2.6, hy + Math.sin(a + .8) * r * 2.6);
        g.stroke();
      }
    } else if (id === 2) {
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * .18 + i * 2.1;
        g.beginPath();
        g.moveTo(hx + Math.cos(a) * (r + 4), hy + Math.sin(a) * (r + 4));
        g.lineTo(hx + Math.cos(a + .25) * (r + 1), hy + Math.sin(a + .25) * (r + 1));
        g.lineTo(hx + Math.cos(a + .5) * (r + 5), hy + Math.sin(a + .5) * (r + 5));
        g.stroke();
      }
    } else if (id === 3) {
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * .08 + i * 2.1;
        const rx = hx + Math.cos(a) * (r + 5);
        const ry = hy + Math.sin(a) * (r + 5);
        g.beginPath();
        g.moveTo(rx - 3, ry - 2);
        g.lineTo(rx, ry - 4);
        g.lineTo(rx + 3, ry);
        g.lineTo(rx - 1, ry + 3);
        g.closePath();
        g.fill();
      }
    } else if (id === 4) {
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * .1 + i * 2.1;
        const rx = hx + Math.cos(a) * (r + 5);
        const ry = hy + Math.sin(a) * (r + 5);
        g.beginPath();
        g.moveTo(rx, ry - 3);
        g.quadraticCurveTo(rx + 2.5, ry, rx, ry + 3);
        g.quadraticCurveTo(rx - 2.5, ry, rx, ry - 3);
        g.fill();
      }
    } else if (id === 5) {
      g.beginPath();
      for (let i = 0; i < 18; i++) {
        const a = i * .42 + S.FRAME * .1;
        const rr = 3 + i * .65;
        const px = hx + Math.cos(a) * rr;
        const py = hy + Math.sin(a) * rr;
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      }
      g.stroke();
    } else if (id === 6) {
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * TAU + S.FRAME * .03;
        const rx = hx + Math.cos(a) * (r + 4);
        const ry = hy + Math.sin(a) * (r + 4);
        diamond(rx, ry, 1.2, 3.2, col, .8 * fade);
      }
    } else if (id === 7) {
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * TAU;
        g.save();
        g.translate(hx + Math.cos(a) * (r + 4), hy + Math.sin(a) * (r + 4));
        g.rotate(a);
        g.fillRect(-1, -2, 2, 4);
        g.restore();
      }
    } else if (id === 8) {
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * .08 + i * 2.1;
        g.beginPath();
        g.moveTo(hx + Math.cos(a) * r, hy + Math.sin(a) * r);
        g.bezierCurveTo(hx + Math.cos(a + .5) * r * 2, hy + Math.sin(a + .5) * r * 2,
          hx + Math.cos(a + 1) * r * 1.4, hy + Math.sin(a + 1) * r * 1.4,
          hx + Math.cos(a + 1.4) * r * 2.6, hy + Math.sin(a + 1.4) * r * 2.6);
        g.stroke();
      }
    } else if (id === 9) {
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * TAU + S.FRAME * .04;
        g.beginPath();
        g.moveTo(hx + Math.cos(a) * (r + 2), hy + Math.sin(a) * (r + 2));
        g.lineTo(hx + Math.cos(a) * (r + 8), hy + Math.sin(a) * (r + 8));
        g.stroke();
      }
    } else if (id === 10) {
      for (let i = -2; i <= 2; i++) {
        g.beginPath();
        g.moveTo(hx + 2, hy + i * 2);
        g.lineTo(hx + r + 9, hy + i * 3.2);
        g.stroke();
      }
    } else if (id === 11) {
      g.beginPath();
      g.arc(hx, hy, r + 5, -1.2, 1.1);
      g.stroke();
      g.beginPath();
      g.moveTo(hx - r - 2, hy + 4);
      g.lineTo(hx + r + 5, hy - 3);
      g.stroke();
    } else if (id === 12) {
      g.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5;
        const rr = i % 2 ? r * .55 : r + 5;
        const px = hx + Math.cos(a) * rr;
        const py = hy + Math.sin(a) * rr;
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      }
      g.closePath();
      g.stroke();
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * .1 + i * 2.1;
        g.fillRect(hx + Math.cos(a) * (r + 8) - .7, hy + Math.sin(a) * (r + 8) - .7, 1.4, 1.4);
      }
    }
  }

  return { drawProjs, drawCastAura, drawCastCharge, drawBolt };
}
