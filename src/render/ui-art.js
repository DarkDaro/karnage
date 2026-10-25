const CACHE_SCALE = 3;

function layer(width, height, scale) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const context = canvas.getContext('2d');
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.imageSmoothingEnabled = true;
  return { canvas, context, width, height, ready: false };
}

function fillBase(context, RW, RH) {
  const sky = context.createLinearGradient(0, 0, 0, RH);
  sky.addColorStop(0, '#0b0706');
  sky.addColorStop(.58, '#090605');
  sky.addColorStop(1, '#050303');
  context.fillStyle = sky;
  context.fillRect(0, 0, RW, RH);

  const glow = context.createRadialGradient(RW / 2, 78, 6, RW / 2, 78, 190);
  glow.addColorStop(0, 'rgba(118,24,16,.20)');
  glow.addColorStop(.5, 'rgba(70,14,10,.07)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, RW, RH);

  const floor = context.createLinearGradient(0, RH - 72, 0, RH);
  floor.addColorStop(0, 'rgba(0,0,0,0)');
  floor.addColorStop(1, 'rgba(0,0,0,.42)');
  context.fillStyle = floor;
  context.fillRect(0, RH - 72, RW, 72);

  const vignette = context.createRadialGradient(RW / 2, RH * .5, 70, RW / 2, RH * .5, 255);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(.72, 'rgba(0,0,0,.10)');
  vignette.addColorStop(1, 'rgba(0,0,0,.55)');
  context.fillStyle = vignette;
  context.fillRect(0, 0, RW, RH);
}

function drawSigil(context, x, y, radius, alpha) {
  context.save();
  context.translate(x, y);
  context.strokeStyle = `rgba(200,160,64,${alpha})`;
  context.lineWidth = 1;
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius - 5, 0, Math.PI * 2);
  context.stroke();
  for (let i = 0; i < 16; i += 1) {
    const angle = i * Math.PI / 8;
    const inner = radius - 10;
    const outer = radius - (i % 2 ? 2 : 5);
    context.beginPath();
    context.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    context.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    context.stroke();
  }
  context.restore();
}

function buildTitleLayer(context, RW, RH, baseCanvas) {
  context.drawImage(baseCanvas, 0, 0, RW, RH);

  const distant = context.createRadialGradient(RW / 2, 92, 14, RW / 2, 92, 220);
  distant.addColorStop(0, 'rgba(150,24,14,.20)');
  distant.addColorStop(.46, 'rgba(74,10,8,.08)');
  distant.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = distant;
  context.fillRect(0, 0, RW, RH);

  context.save();
  context.fillStyle = '#070403';
  context.fillRect(0, 0, 28, RH);
  context.fillRect(RW - 28, 0, 28, RH);
  context.fillStyle = '#0d0806';
  context.fillRect(28, 0, 10, RH);
  context.fillRect(RW - 38, 0, 10, RH);
  context.strokeStyle = 'rgba(200,160,64,.12)';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(27.5, 0);
  context.lineTo(27.5, RH);
  context.moveTo(RW - 27.5, 0);
  context.lineTo(RW - 27.5, RH);
  context.stroke();
  context.restore();

  context.save();
  context.strokeStyle = 'rgba(200,160,64,.10)';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(62, 190);
  context.lineTo(62, 48);
  context.quadraticCurveTo(92, 18, 140, 12);
  context.lineTo(284, 12);
  context.quadraticCurveTo(332, 18, 362, 48);
  context.lineTo(362, 190);
  context.stroke();
  context.beginPath();
  context.moveTo(78, 190);
  context.lineTo(78, 55);
  context.quadraticCurveTo(106, 30, 146, 24);
  context.lineTo(278, 24);
  context.quadraticCurveTo(318, 30, 346, 55);
  context.lineTo(346, 190);
  context.stroke();
  context.restore();

  for (const x of [58, RW - 58]) {
    const sway = x < RW / 2 ? -2 : 2;
    context.strokeStyle = 'rgba(180,170,140,.14)';
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(x, 0);
    context.quadraticCurveTo(x + sway, 42, x + sway * 2, 84);
    context.stroke();
    for (let y = 8; y < 84; y += 9) {
      context.strokeRect(x + sway * (y / 42) - 2, y, 4, 5);
    }
  }

  const floor = context.createLinearGradient(0, 184, 0, RH);
  floor.addColorStop(0, 'rgba(44,30,22,.42)');
  floor.addColorStop(.35, 'rgba(20,12,9,.82)');
  floor.addColorStop(1, 'rgba(4,3,3,.98)');
  context.fillStyle = floor;
  context.fillRect(0, 184, RW, RH - 184);
  context.strokeStyle = 'rgba(200,160,64,.12)';
  context.beginPath();
  context.moveTo(0, 184.5);
  context.lineTo(RW, 184.5);
  context.stroke();
  context.strokeStyle = 'rgba(200,160,64,.055)';
  for (let i = -5; i <= 5; i += 1) {
    context.beginPath();
    context.moveTo(RW / 2 + i * 12, 184);
    context.lineTo(RW / 2 + i * 42, RH);
    context.stroke();
  }
  for (const y of [196, 212, 232]) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(RW, y);
    context.stroke();
  }

  drawSigil(context, RW / 2, 42, 59, .12);

  const haze = context.createLinearGradient(0, 168, 0, 216);
  haze.addColorStop(0, 'rgba(120,90,70,0)');
  haze.addColorStop(.55, 'rgba(120,90,70,.035)');
  haze.addColorStop(1, 'rgba(120,90,70,0)');
  context.fillStyle = haze;
  context.fillRect(0, 168, RW, 48);

  const edge = context.createLinearGradient(0, 0, RW, 0);
  edge.addColorStop(0, 'rgba(0,0,0,.42)');
  edge.addColorStop(.2, 'rgba(0,0,0,0)');
  edge.addColorStop(.8, 'rgba(0,0,0,0)');
  edge.addColorStop(1, 'rgba(0,0,0,.42)');
  context.fillStyle = edge;
  context.fillRect(0, 0, RW, RH);
}

function buildLogoLayer(context, RW) {
  const cx = RW / 2;
  const cy = 40;

  const backGlow = context.createRadialGradient(cx, cy, 4, cx, cy, 82);
  backGlow.addColorStop(0, 'rgba(236,54,28,.22)');
  backGlow.addColorStop(.4, 'rgba(150,18,12,.12)');
  backGlow.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = backGlow;
  context.fillRect(cx - 88, 0, 176, 112);

  context.save();
  context.strokeStyle = 'rgba(200,160,64,.24)';
  context.lineWidth = 1.4;
  context.beginPath();
  context.arc(cx, cy + 1, 48, 0, Math.PI * 2);
  context.stroke();
  context.strokeStyle = 'rgba(224,32,32,.18)';
  context.setLineDash([2, 6]);
  context.beginPath();
  context.arc(cx, cy + 1, 53, 0, Math.PI * 2);
  context.stroke();
  context.setLineDash([]);
  context.restore();

  context.save();
  context.translate(cx, cy + 1);
  context.scale(.9, .9);

  const crown = context.createLinearGradient(0, -48, 0, -27);
  crown.addColorStop(0, '#8a5a16');
  crown.addColorStop(.45, '#e8c040');
  crown.addColorStop(1, '#6e3f0c');
  context.fillStyle = crown;
  context.strokeStyle = '#170b05';
  context.lineWidth = 1.4;
  context.beginPath();
  context.moveTo(-20, -20);
  context.lineTo(-18, -35);
  context.lineTo(-11, -28);
  context.lineTo(-7, -43);
  context.lineTo(0, -32);
  context.lineTo(7, -43);
  context.lineTo(11, -28);
  context.lineTo(18, -35);
  context.lineTo(20, -20);
  context.closePath();
  context.fill();
  context.stroke();
  context.fillStyle = 'rgba(255,236,150,.38)';
  context.fillRect(-18, -22, 36, 1);

  const horn = context.createLinearGradient(-30, -35, -10, -8);
  horn.addColorStop(0, '#8a7a62');
  horn.addColorStop(.55, '#c4b59c');
  horn.addColorStop(1, '#4d3d2d');
  context.fillStyle = horn;
  context.strokeStyle = '#160c08';
  context.lineWidth = 1.6;
  context.beginPath();
  context.moveTo(-19, -21);
  context.bezierCurveTo(-28, -29, -33, -42, -29, -46);
  context.bezierCurveTo(-23, -37, -16, -31, -10, -28);
  context.closePath();
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(19, -21);
  context.bezierCurveTo(28, -29, 33, -42, 29, -46);
  context.bezierCurveTo(23, -37, 16, -31, 10, -28);
  context.closePath();
  context.fill();
  context.stroke();

  const bone = context.createLinearGradient(-24, -34, 24, 36);
  bone.addColorStop(0, '#efe2c8');
  bone.addColorStop(.3, '#cfbea2');
  bone.addColorStop(.66, '#9c896e');
  bone.addColorStop(1, '#5d4a38');
  context.fillStyle = bone;
  context.strokeStyle = '#160d09';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(-24, -12);
  context.bezierCurveTo(-27, -28, -15, -37, 0, -37);
  context.bezierCurveTo(15, -37, 27, -28, 24, -12);
  context.lineTo(26, 2);
  context.bezierCurveTo(26, 16, 19, 25, 12, 27);
  context.lineTo(12, 32);
  context.lineTo(-12, 32);
  context.lineTo(-12, 27);
  context.bezierCurveTo(-19, 25, -26, 16, -26, 2);
  context.closePath();
  context.fill();
  context.stroke();

  context.fillStyle = 'rgba(58,30,22,.38)';
  context.beginPath();
  context.ellipse(-20, 8, 5, 12, -.18, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.ellipse(20, 8, 5, 12, .18, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#1a0705';
  context.beginPath();
  context.ellipse(-10, -2, 7.5, 8.5, -.08, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.ellipse(10, -2, 7.5, 8.5, .08, 0, Math.PI * 2);
  context.fill();
  const ember = context.createRadialGradient(-10, -1, 0, -10, -1, 5);
  ember.addColorStop(0, 'rgba(255,90,52,.72)');
  ember.addColorStop(.45, 'rgba(180,18,12,.34)');
  ember.addColorStop(1, 'rgba(20,3,3,0)');
  context.fillStyle = ember;
  context.beginPath();
  context.arc(-10, -1, 5, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(10, -1, 5, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#220b07';
  context.beginPath();
  context.moveTo(0, 6);
  context.lineTo(-4, 15);
  context.lineTo(4, 15);
  context.closePath();
  context.fill();

  context.strokeStyle = 'rgba(38,20,14,.58)';
  context.lineWidth = 1.1;
  context.beginPath();
  context.moveTo(19, -20);
  context.lineTo(14, -9);
  context.lineTo(18, 1);
  context.moveTo(-18, 5);
  context.lineTo(-24, 14);
  context.moveTo(6, 24);
  context.lineTo(9, 31);
  context.stroke();

  context.fillStyle = '#2a0e09';
  context.strokeStyle = '#160d09';
  context.lineWidth = 1.4;
  context.beginPath();
  context.moveTo(-15, 29);
  context.quadraticCurveTo(-18, 39, -11, 45);
  context.quadraticCurveTo(0, 49, 11, 45);
  context.quadraticCurveTo(18, 39, 15, 29);
  context.closePath();
  context.fill();
  context.stroke();

  context.fillStyle = '#0d0504';
  context.fillRect(-13, 35, 26, 8);
  context.fillStyle = '#c5b293';
  for (let i = 0; i < 5; i += 1) {
    context.fillRect(-11 + i * 5, 35, 3, 4);
    context.fillRect(-9 + i * 5, 41, 3, 3);
  }
  context.fillStyle = 'rgba(255,238,200,.42)';
  context.fillRect(-13, 35, 26, 1);

  context.strokeStyle = 'rgba(224,32,32,.32)';
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(22, -18);
  context.quadraticCurveTo(28, 4, 19, 25);
  context.stroke();
  context.restore();

  const word = 'KARNAGE';
  context.save();
  context.font = '50px "Russo One", sans-serif';
  const measured = context.measureText(word).width || 260;
  const stretch = 286 / measured;
  context.translate(cx, 130);
  context.scale(stretch, 1);
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.lineJoin = 'round';
  context.shadowColor = 'rgba(180,20,10,.72)';
  context.shadowBlur = 12;
  context.strokeStyle = '#0d0303';
  context.lineWidth = 7;
  context.strokeText(word, 0, 0);
  context.shadowBlur = 0;
  context.strokeStyle = '#4b0b08';
  context.lineWidth = 2.4;
  context.strokeText(word, 0, 0);
  const metal = context.createLinearGradient(0, -49, 0, 2);
  metal.addColorStop(0, '#fff0b8');
  metal.addColorStop(.28, '#f2ce68');
  metal.addColorStop(.52, '#d55a2c');
  metal.addColorStop(.76, '#90140c');
  metal.addColorStop(1, '#360504');
  context.fillStyle = metal;
  context.fillText(word, 0, 0);
  context.restore();

  context.fillStyle = '#c8a040';
  context.fillRect(cx - 102, 139, 84, 1);
  context.fillRect(cx + 18, 139, 84, 1);
  context.fillStyle = '#e02020';
  context.fillRect(cx - 12, 138, 24, 3);
  context.fillStyle = 'rgba(255,220,140,.55)';
  context.fillRect(cx - 12, 138, 24, 1);

  context.font = '9px "Russo One", sans-serif';
  context.textAlign = 'center';
  context.fillStyle = '#e8c040';
  context.fillText('С М Е Р Т Е Л Ь Н Ы Й   Т У Р Н И Р', cx, 154);
}

function buildCompactLogo(context, RW) {
  const cx = RW / 2;
  const glow = context.createRadialGradient(cx, 23, 4, cx, 23, 86);
  glow.addColorStop(0, 'rgba(224,32,32,.22)');
  glow.addColorStop(.55, 'rgba(128,16,12,.08)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = glow;
  context.fillRect(cx - 90, 0, 180, 48);

  context.font = '24px "Rubik Mono One", "Russo One", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.lineJoin = 'round';
  context.shadowColor = 'rgba(180,20,10,.68)';
  context.shadowBlur = 8;
  context.strokeStyle = '#0d0303';
  context.lineWidth = 4;
  context.strokeText('KARNAGE', cx, 30);
  context.shadowBlur = 0;
  context.strokeStyle = '#4b0b08';
  context.lineWidth = 1.5;
  context.strokeText('KARNAGE', cx, 30);
  const metal = context.createLinearGradient(0, 8, 0, 32);
  metal.addColorStop(0, '#fff0b8');
  metal.addColorStop(.36, '#f2ce68');
  metal.addColorStop(.68, '#c4341c');
  metal.addColorStop(1, '#4c0705');
  context.fillStyle = metal;
  context.fillText('KARNAGE', cx, 30);

  context.fillStyle = 'rgba(200,160,64,.48)';
  context.fillRect(cx - 62, 37, 46, 1);
  context.fillRect(cx + 16, 37, 46, 1);
  context.fillStyle = '#e02020';
  context.fillRect(cx - 9, 36, 18, 3);
  context.fillStyle = 'rgba(255,220,140,.6)';
  context.fillRect(cx - 9, 36, 18, 1);
}

export function createUiArt({ RW, RH }) {
  const base = layer(RW, RH, 2);
  const title = layer(RW, RH, 2);
  const logo = layer(RW, 160, CACHE_SCALE);
  const compact = layer(RW, 48, CACHE_SCALE);
  let revision = 0;

  const ensureBase = () => {
    if (base.ready) return;
    base.context.clearRect(0, 0, RW, RH);
    fillBase(base.context, RW, RH);
    base.ready = true;
    revision += 1;
  };

  const ensureTitle = () => {
    ensureBase();
    if (title.ready) return;
    title.context.clearRect(0, 0, RW, RH);
    buildTitleLayer(title.context, RW, RH, base.canvas);
    title.ready = true;
    revision += 1;
  };

  const ensureLogo = () => {
    if (logo.ready) return;
    logo.context.clearRect(0, 0, RW, 160);
    buildLogoLayer(logo.context, RW);
    logo.ready = true;
    revision += 1;
  };

  const ensureCompact = () => {
    if (compact.ready) return;
    compact.context.clearRect(0, 0, RW, 48);
    buildCompactLogo(compact.context, RW);
    compact.ready = true;
    revision += 1;
  };

  function drawBase(context) {
    ensureBase();
    context.drawImage(base.canvas, 0, 0, RW, RH);
  }

  function drawTitleBackground(context, time, reduce = false) {
    if (reduce) time = 0;
    ensureTitle();
    context.drawImage(title.canvas, 0, 0, RW, RH);

    context.save();
    context.translate(RW / 2, 41);
    context.rotate(time * .0028);
    context.strokeStyle = 'rgba(200,160,64,.16)';
    context.lineWidth = 1;
    context.setLineDash([3, 9]);
    context.beginPath();
    context.arc(0, 0, 57, 0, Math.PI * 2);
    context.stroke();
    context.setLineDash([]);
    context.restore();

    for (const [x, phase] of [[37, 0], [RW - 37, 1.7]]) {
      const pulse = .10 + .045 * (.5 + .5 * Math.sin(time * .11 + phase));
      const glow = context.createRadialGradient(x, 94, 1, x, 94, 22);
      glow.addColorStop(0, `rgba(248,180,80,${pulse})`);
      glow.addColorStop(.45, `rgba(220,72,24,${pulse * .45})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = glow;
      context.fillRect(x - 22, 72, 44, 44);
      context.fillStyle = `rgba(248,206,118,${.36 + pulse})`;
      context.fillRect(x - 1, 88 + Math.sin(time * .12 + phase) * 1.5, 2, 7);
    }
  }

  function drawLogo(context, time, reduce = false) {
    if (reduce) time = 0;
    ensureLogo();
    const breathe = 1 + .004 * Math.sin(time * .025);
    context.save();
    context.translate(RW / 2, 0);
    context.scale(breathe, breathe);
    context.translate(-RW / 2, 0);
    context.drawImage(logo.canvas, 0, 0, RW, 160);
    context.restore();

    const pulse = .5 + .5 * Math.sin(time * .09);
    context.save();
    context.globalCompositeOperation = 'lighter';
    for (const x of [RW / 2 - 9, RW / 2 + 9]) {
      const glow = context.createRadialGradient(x, 39, 0, x, 39, 8);
      glow.addColorStop(0, `rgba(255,110,64,${.20 + pulse * .22})`);
      glow.addColorStop(.4, `rgba(204,30,16,${.10 + pulse * .12})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = glow;
      context.fillRect(x - 8, 31, 16, 16);
    }
    context.restore();
  }

  function drawMenuBackground(context, time, reduce = false) {
    if (reduce) time = 0;
    ensureTitle();
    context.save();
    context.globalAlpha = .82;
    context.drawImage(title.canvas, 0, 0, RW, RH);
    context.restore();
    const shade = context.createLinearGradient(0, 0, 0, RH);
    shade.addColorStop(0, 'rgba(4,3,2,.24)');
    shade.addColorStop(.55, 'rgba(4,3,2,.38)');
    shade.addColorStop(1, 'rgba(2,1,1,.72)');
    context.fillStyle = shade;
    context.fillRect(0, 0, RW, RH);
    const glow = context.createRadialGradient(RW / 2, 26, 4, RW / 2, 26, 120);
    glow.addColorStop(0, `rgba(150,22,14,${.10 + .025 * Math.sin(time * .04)})`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = glow;
    context.fillRect(RW / 2 - 128, 0, 256, 76);
  }

  function drawCompact(context) {
    ensureCompact();
    context.drawImage(compact.canvas, 0, 0, RW, 48);
  }

  function invalidate() {
    base.ready = false;
    title.ready = false;
    logo.ready = false;
    compact.ready = false;
  }

  function info() {
    return {
      base: base.ready,
      title: title.ready,
      logo: logo.ready,
      compact: compact.ready,
      revision
    };
  }

  return { drawBase, drawTitleBackground, drawLogo, drawMenuBackground, drawCompact, invalidate, info };
}
