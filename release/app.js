(() => {
  // src/assets/arena-manifest.js
  var arena_manifest_default = {
    "0": {
      "image": "0/far.png",
      "props": "0/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "rain", "every": 2, "wind": -0.6 },
        { "type": "motes", "every": 22, "color": "rgba(180,200,220,.14)" }
      ],
      "lights": [
        { "x": 122, "y": 138, "radius": 62, "color": "#f0a030", "alpha": 0.2 },
        { "x": 596, "y": 138, "radius": 62, "color": "#f0a030", "alpha": 0.18 },
        { "x": 792, "y": 138, "radius": 62, "color": "#f0a030", "alpha": 0.16 },
        { "x": 700, "y": 34, "radius": 96, "color": "#a8c8e8", "alpha": 0.1 }
      ],
      "wet": true
    },
    "1": {
      "image": "1/far.png",
      "props": "1/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "motes", "every": 18, "color": "rgba(180,160,220,.22)" },
        { "type": "fog", "every": 8 }
      ],
      "lights": [
        { "x": 120, "y": 172, "radius": 42, "color": "#f0a050", "alpha": 0.16 },
        { "x": 158, "y": 168, "radius": 42, "color": "#f0a050", "alpha": 0.14 },
        { "x": 650, "y": 168, "radius": 42, "color": "#f0a050", "alpha": 0.14 },
        { "x": 672, "y": 164, "radius": 42, "color": "#f0a050", "alpha": 0.14 },
        { "x": 650, "y": 42, "radius": 110, "color": "#ff5ab0", "alpha": 0.09 }
      ],
      "fog": true
    },
    "2": {
      "image": "2/far.png",
      "props": "2/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "rain", "every": 1, "wind": -0.8 },
        { "type": "motes", "every": 30, "color": "rgba(160,190,210,.12)" }
      ],
      "lights": [
        { "x": 160, "y": 88, "radius": 42, "color": "#f05030", "alpha": 0.2 },
        { "x": 560, "y": 98, "radius": 54, "color": "#50c8d0", "alpha": 0.16 },
        { "x": 120, "y": 162, "radius": 54, "color": "#e8c060", "alpha": 0.14 }
      ],
      "wet": true
    },
    "3": {
      "image": "3/far.png",
      "props": "3/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "sand", "every": 7, "color": "rgba(200,170,110,.16)" },
        { "type": "motes", "every": 20, "color": "rgba(220,190,140,.14)" }
      ],
      "lights": [
        { "x": 372, "y": 128, "radius": 70, "color": "#f0b060", "alpha": 0.2 },
        { "x": 110, "y": 156, "radius": 48, "color": "#d09050", "alpha": 0.12 }
      ],
      "fog": true,
      "fogColor": "#c8a878"
    },
    "4": {
      "image": "4/far.png",
      "props": "4/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "motes", "every": 22, "color": "rgba(200,220,150,.24)" },
        { "type": "fog", "every": 10 }
      ],
      "lights": [
        { "x": 350, "y": 160, "radius": 46, "color": "#f0b050", "alpha": 0.18 },
        { "x": 648, "y": 160, "radius": 46, "color": "#f0b050", "alpha": 0.18 },
        { "x": 676, "y": 42, "radius": 92, "color": "#d8e8b0", "alpha": 0.12 }
      ],
      "fog": true,
      "fogColor": "#a8c890"
    },
    "5": {
      "image": "5/far.png",
      "props": "5/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "sand", "every": 6, "color": "rgba(230,190,120,.18)" },
        { "type": "motes", "every": 24, "color": "rgba(240,210,150,.14)" }
      ],
      "lights": [
        { "x": 430, "y": 188, "radius": 62, "color": "#f0a040", "alpha": 0.24 },
        { "x": 666, "y": 54, "radius": 100, "color": "#f0c060", "alpha": 0.12 },
        { "x": 112, "y": 120, "radius": 48, "color": "#e0a050", "alpha": 0.1 }
      ],
      "fog": true,
      "fogColor": "#d8a060"
    },
    "6": {
      "image": "6/far.png",
      "props": "6/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "ember", "every": 2, "color": "rgba(240,110,40,.75)" },
        { "type": "motes", "every": 18, "color": "rgba(120,100,90,.14)" }
      ],
      "lights": [
        { "x": 378, "y": 194, "radius": 92, "color": "#f06020", "alpha": 0.26 },
        { "x": 118, "y": 174, "radius": 54, "color": "#e05020", "alpha": 0.18 },
        { "x": 610, "y": 150, "radius": 48, "color": "#d04820", "alpha": 0.14 }
      ],
      "fog": true,
      "fogColor": "#e07038"
    },
    "7": {
      "image": "7/far.png",
      "props": "7/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "snow", "every": 2 },
        { "type": "motes", "every": 24, "color": "rgba(200,230,255,.18)" }
      ],
      "lights": [
        { "x": 676, "y": 46, "radius": 96, "color": "#c8e0f0", "alpha": 0.12 },
        { "x": 110, "y": 174, "radius": 62, "color": "#70b0d0", "alpha": 0.14 },
        { "x": 580, "y": 164, "radius": 72, "color": "#70b0d0", "alpha": 0.14 }
      ],
      "fog": true,
      "fogColor": "#b8d8f0",
      "wet": true
    },
    "8": {
      "image": "8/far.png",
      "props": "8/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "ember", "every": 12, "color": "rgba(80,220,170,.55)" },
        { "type": "motes", "every": 20, "color": "rgba(160,190,190,.12)" }
      ],
      "lights": [
        { "x": 652, "y": 158, "radius": 96, "color": "#40d0a0", "alpha": 0.22 },
        { "x": 120, "y": 166, "radius": 54, "color": "#e05040", "alpha": 0.14 },
        { "x": 500, "y": 92, "radius": 80, "color": "#5080c0", "alpha": 0.1 }
      ],
      "wet": true
    },
    "9": {
      "image": "9/far.png",
      "props": "9/props.png",
      "layers": [
        { "file": "far.png", "scroll": 0.12, "y": 0 },
        { "file": "mid.png", "scroll": 0.38, "y": 0 },
        { "file": "props.png", "scroll": 0.82, "y": 0 },
        { "file": "fg.png", "scroll": 1.15, "y": 0, "foreground": true }
      ],
      "ambient": [
        { "type": "fog", "every": 8 },
        { "type": "motes", "every": 26, "color": "rgba(200,200,225,.16)" }
      ],
      "lights": [
        { "x": 196, "y": 48, "radius": 110, "color": "#d8b0e8", "alpha": 0.12 },
        { "x": 256, "y": 188, "radius": 38, "color": "#f0a050", "alpha": 0.16 },
        { "x": 292, "y": 180, "radius": 42, "color": "#f0a050", "alpha": 0.14 },
        { "x": 648, "y": 186, "radius": 38, "color": "#f0a050", "alpha": 0.14 }
      ],
      "fog": true,
      "fogColor": "#a8a0c8"
    }
  };

  // src/assets/arena.js
  var base = new URL("assets/arenas/", location.href);
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }
  async function loadLayer(key, layer) {
    const source = layer.image || `${key}/${layer.file}`;
    const image = await loadImage(new URL(source, base).href);
    return { ...layer, image };
  }
  async function loadArenaAssets() {
    const entries = await Promise.all(
      Object.entries(arena_manifest_default).map(async ([key, definition]) => {
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
          const layers = Array.isArray(definition.layers) ? await Promise.all(definition.layers.map((layer) => loadLayer(key, layer))) : [];
          return [key, { ...definition, image, props, layers, ready: true }];
        } catch {
          return [key, { ...definition, layers: [], ready: false }];
        }
      })
    );
    return Object.fromEntries(entries);
  }

  // src/assets/fx-manifest.js
  var fx_manifest_default = {
    "hitLight": {
      "image": "hit-light.png",
      "frameWidth": 48,
      "frameHeight": 48,
      "frames": 8,
      "fps": 30,
      "loop": false,
      "anchor": [
        24,
        24
      ],
      "blend": "lighter",
      "scale": 1,
      "alpha": 0.9
    },
    "hitHeavy": {
      "image": "hit-heavy.png",
      "frameWidth": 48,
      "frameHeight": 48,
      "frames": 9,
      "fps": 22,
      "loop": false,
      "anchor": [
        24,
        24
      ],
      "blend": "lighter",
      "scale": 1.25,
      "alpha": 0.75
    },
    "dust": {
      "image": "dust.png",
      "frameWidth": 32,
      "frameHeight": 32,
      "frames": 9,
      "fps": 15,
      "loop": false,
      "anchor": [
        16,
        30
      ],
      "blend": "source-over",
      "scale": 0.8,
      "alpha": 0.45
    },
    "block": {
      "image": "block.png",
      "frameWidth": 32,
      "frameHeight": 32,
      "frames": 6,
      "fps": 24,
      "loop": false,
      "anchor": [
        16,
        16
      ],
      "blend": "lighter",
      "scale": 0.8,
      "alpha": 0.8
    },
    "smoke": {
      "image": "smoke.png",
      "frameWidth": 32,
      "frameHeight": 32,
      "frames": 9,
      "fps": 14,
      "loop": false,
      "anchor": [
        16,
        28
      ],
      "blend": "source-over",
      "scale": 1,
      "alpha": 0.55
    },
    "dustRun": {
      "image": "dust-run.png",
      "frameWidth": 16,
      "frameHeight": 16,
      "frames": 4,
      "fps": 18,
      "loop": false,
      "anchor": [
        8,
        14
      ],
      "blend": "source-over",
      "scale": 1,
      "alpha": 0.35
    },
    "fireImpact": {
      "image": "fire-impact.png",
      "frameWidth": 48,
      "frameHeight": 48,
      "frames": 8,
      "fps": 24,
      "loop": false,
      "anchor": [
        24,
        24
      ],
      "blend": "lighter",
      "scale": 0.8,
      "alpha": 0.85
    },
    "iceImpact": {
      "image": "ice-impact.png",
      "frameWidth": 48,
      "frameHeight": 48,
      "frames": 8,
      "fps": 22,
      "loop": false,
      "anchor": [
        24,
        24
      ],
      "blend": "lighter",
      "scale": 0.85,
      "alpha": 0.9
    },
    "shadowImpact": {
      "image": "shadow-impact.png",
      "frameWidth": 48,
      "frameHeight": 48,
      "frames": 8,
      "fps": 20,
      "loop": false,
      "anchor": [
        24,
        24
      ],
      "blend": "lighter",
      "scale": 0.8,
      "alpha": 0.8
    },
    "explosion": {
      "image": "explosion.png",
      "frameWidth": 64,
      "frameHeight": 64,
      "frames": 9,
      "fps": 18,
      "loop": false,
      "anchor": [
        32,
        38
      ],
      "blend": "lighter",
      "scale": 1,
      "alpha": 0.9
    }
  };

  // src/assets/fx.js
  var base2 = new URL("assets/fx/", location.href);
  function loadImage2(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }
  async function loadFxAssets() {
    const entries = await Promise.all(
      Object.entries(fx_manifest_default).map(async ([key, definition]) => {
        try {
          const image = await loadImage2(new URL(definition.image, base2).href);
          return [key, { ...definition, image, ready: true }];
        } catch {
          return [key, { ...definition, ready: false }];
        }
      })
    );
    return Object.fromEntries(entries);
  }

  // src/assets/ui-manifest.js
  var ui_manifest_default = {
    "panel": {
      "image": "panel.png",
      "slice": 12
    },
    "button": {
      "image": "button.png",
      "slice": 12
    }
  };

  // src/assets/ui.js
  var base3 = new URL("assets/ui/", location.href);
  function loadImage3(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }
  async function loadUiAssets() {
    const entries = await Promise.all(
      Object.entries(ui_manifest_default).map(async ([key, definition]) => {
        try {
          const image = await loadImage3(new URL(definition.image, base3).href);
          return [key, { ...definition, image, ready: true }];
        } catch {
          return [key, { ...definition, ready: false }];
        }
      })
    );
    return Object.fromEntries(entries);
  }

  // src/data/characters.js
  var CH = [
    { id: 0, name: "\u042D\u041C\u0411\u0415\u0420", en: "EMBER", skin: "#c8845a", suit: "#8a2418", acc: "#f0a032", hair: "#3a1408", gear: "hair", h: 60, bulk: 1, spd: 2, jmp: 8.4, dmg: 1, specN: "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0448\u0430\u0440", spec: "DRP", sup: "\u041C\u0435\u0442\u0435\u043E\u0440\u0438\u0442\u043D\u044B\u0439 \u0434\u043E\u0436\u0434\u044C", fat: "RRLP", arena: 6 },
    { id: 1, name: "\u0413\u0415\u0419\u0421\u0422", en: "GEIST", skin: "#a9b6bd", suit: "#3d4750", acc: "#9fb4bd", hair: "#111", gear: "mask", h: 62, bulk: 0.95, spd: 2.3, jmp: 8.8, dmg: 0.95, specN: "\u0422\u0435\u043D\u0438-\u0441\u043A\u0430\u0447\u043E\u043A", spec: "RRP", sup: "\u041A\u0443\u043D\u0430\u0439-\u0446\u0435\u043F\u044C", fat: "LLRP", arena: 1 },
    { id: 2, name: "\u0412\u041E\u041B\u042C\u0422", en: "VOLT", skin: "#d8a05a", suit: "#2b4a8a", acc: "#f2d23a", hair: "#1a1a1a", gear: "helm", h: 63, bulk: 1.05, spd: 2.1, jmp: 8.5, dmg: 1, specN: "\u0421\u0442\u043E\u043B\u043F \u043C\u043E\u043B\u043D\u0438\u0439", spec: "DUP", sup: "\u0413\u0440\u043E\u0437\u0430", fat: "DDRP", arena: 2 },
    { id: 3, name: "\u0411\u0410\u0417\u0410\u041B\u042C\u0422", en: "BASALT", skin: "#8a7256", suit: "#4a4038", acc: "#7a6a54", hair: "#2a241e", gear: "horn", h: 74, bulk: 1.45, spd: 1.6, jmp: 7.2, dmg: 1.2, specN: "\u0421\u0435\u0439\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430", spec: "LRK", sup: "\u041A\u0443\u043B\u0430\u043A\u0438 \u043D\u0435\u0434\u0440", fat: "LRDP", arena: 3 },
    { id: 4, name: "\u0424\u042D\u041D\u0413", en: "FANG", skin: "#c8965e", suit: "#8a7218", acc: "#e8e0c0", hair: "#141210", gear: "mask", claws: 1, h: 61, bulk: 0.95, spd: 2.4, jmp: 8.8, dmg: 0.9, specN: "\u041E\u0442\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u0433\u043E\u0442\u044C", spec: "DRK", sup: "\u0421\u043E\u0442\u043D\u044F \u043F\u043E\u0440\u0435\u0437\u043E\u0432", fat: "RLDP", arena: 4 },
    { id: 5, name: "\u0421\u0410\u0425\u0420\u0410", en: "SAHRA", skin: "#b8824e", suit: "#7a6a3a", acc: "#3aa8a0", hair: "#201408", gear: "hood", h: 55, bulk: 0.85, spd: 2.6, jmp: 9.2, dmg: 0.9, specN: "\u041F\u0435\u0441\u0447\u0430\u043D\u0430\u044F \u0434\u044B\u043C\u043A\u0430", spec: "LLK", sup: "\u0417\u0435\u0440\u043A\u0430\u043B\u0430 \u043F\u0443\u0441\u0442\u044B\u043D\u0438", fat: "DLLP", arena: 5 },
    { id: 6, name: "\u041A\u0420\u0418\u041E", en: "KRYO", skin: "#8ab4c8", suit: "#1e4a6a", acc: "#c8ecff", hair: "#0a1420", gear: "mask", h: 62, bulk: 1, spd: 2, jmp: 8.4, dmg: 1, specN: "\u041B\u0435\u0434\u044F\u043D\u0430\u044F \u0441\u0444\u0435\u0440\u0430", spec: "DLP", sup: "\u0410\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u044B\u0439 \u043D\u043E\u043B\u044C", fat: "LDDP", arena: 7 },
    { id: 7, name: "\u0420\u0416\u0410\u0412\u042B\u0419", en: "RUST", skin: "#9aa48a", suit: "#4a5240", acc: "#d84a2a", hair: "#333", gear: "visor", h: 64, bulk: 1.1, spd: 2, jmp: 8.2, dmg: 1.05, specN: "\u0421\u0435\u0442\u044C-\u043B\u043E\u0432\u0443\u0448\u043A\u0430", spec: "RLP", sup: "\u041A\u043E\u0432\u0440\u043E\u0432\u044B\u0439 \u0437\u0430\u043B\u043F", fat: "RDRP", arena: 8 },
    { id: 8, name: "\u041D\u041E\u041A\u0422\u042E\u0420\u041D", en: "NOCTURNE", skin: "#d8d0d8", suit: "#2a1a3a", acc: "#7a3aa8", hair: "#0a0612", gear: "hood", cape: 1, h: 63, bulk: 1, spd: 2.2, jmp: 8.6, dmg: 1, specN: "\u0421\u0433\u0443\u0441\u0442\u043E\u043A \u0442\u044C\u043C\u044B", spec: "DRP", sup: "\u0412\u043E\u0440\u043E\u043D\u043A\u0430 \u0434\u0443\u0448", fat: "DRDP", arena: 9 },
    { id: 9, name: "\u041A\u0410\u0419\u0417\u0415\u0420", en: "KAISER", skin: "#c89868", suit: "#3a4a2a", acc: "#c8b060", hair: "#3a2a14", gear: "band", h: 65, bulk: 1.15, spd: 1.9, jmp: 8, dmg: 1.1, specN: "\u042D\u043D\u0435\u0440\u0433\u043E\u0432\u043E\u043B\u043D\u0430", spec: "DDK", sup: "\u041E\u0440\u0431\u0438\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043B\u043F", fat: "RLRP", arena: 0 }
  ];
  CH[0].spec2 = "DRK";
  CH[0].spec2N = "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0432\u0435\u0435\u0440";
  CH[1].spec2 = "RRK";
  CH[1].spec2N = "\u0425\u0432\u0430\u0442\u043A\u0430 \u0442\u0435\u043D\u0438";
  CH[2].spec2 = "UUP";
  CH[2].spec2N = "\u0413\u0440\u043E\u0437\u043E\u0432\u043E\u0439 \u0441\u0442\u043E\u043B\u0431";
  CH[3].spec2 = "LLP";
  CH[3].spec2N = "\u041A\u0430\u043C\u043D\u0435\u043F\u0430\u0434";
  CH[4].spec2 = "RDP";
  CH[4].spec2N = "\u0420\u043E\u0439 \u043A\u043B\u0438\u043D\u043A\u043E\u0432";
  CH[5].spec2 = "RRP";
  CH[5].spec2N = "\u041F\u0435\u0441\u0447\u0430\u043D\u044B\u0439 \u0436\u0435\u0440\u043D\u043E\u0432";
  CH[6].spec2 = "URK";
  CH[6].spec2N = "\u041B\u0435\u0434\u044F\u043D\u044B\u0435 \u0438\u0433\u043B\u044B";
  CH[7].spec2 = "RDK";
  CH[7].spec2N = "\u0414\u0432\u043E\u0439\u043D\u0430\u044F \u0433\u0440\u0430\u043D\u0430\u0442\u0430";
  CH[8].spec2 = "ULP";
  CH[8].spec2N = "\u041F\u0440\u043E\u043A\u043B\u044F\u0442\u0438\u0435";
  CH[9].spec2 = "URP";
  CH[9].spec2N = "\u0422\u044F\u0436\u0451\u043B\u044B\u0439 \u0441\u043D\u0430\u0440\u044F\u0434";
  CH.push({ id: 10, name: "\u041A\u0410\u0420\u041C\u0418\u041D", en: "CARMINE", skin: "#e8d8d0", suit: "#6a1020", acc: "#d82040", hair: "#d8d0e0", gear: "corona", dress: 1, longhair: 1, fan: 1, h: 58, bulk: 0.9, spd: 2.2, jmp: 8.6, dmg: 0.95, specN: "\u041A\u0440\u043E\u0432\u0430\u0432\u044B\u0435 \u0438\u0433\u043B\u044B", spec: "RDP", sup: "\u0410\u043B\u044B\u0439 \u043F\u0438\u043E\u043D", fat: "RDLP", arena: 9 });
  CH.push({ id: 11, name: "\u0410\u042F\u041C\u042D", en: "AYAME", skin: "#e0c8b8", suit: "#1a1f33", acc: "#7ac8d8", hair: "#0a0d1a", gear: "tail", blade: 1, h: 57, bulk: 0.85, spd: 2.7, jmp: 9.2, dmg: 1, specN: "\u041F\u043E\u043B\u0443\u043C\u0435\u0441\u044F\u0446", spec: "DRP", sup: "\u0421\u0442\u043E \u0442\u0435\u043D\u0435\u0439", fat: "LDRP", arena: 4 });
  CH.push({ id: 12, name: "\u0412\u0415\u0413\u0410", en: "VEGA", skin: "#c8a888", suit: "#241540", acc: "#b89aff", hair: "#e8e8ff", gear: "halo", bow: 1, ponytail: 1, skirt: 1, female: 1, h: 60, bulk: 0.95, spd: 2.3, jmp: 8.8, dmg: 1.05, specN: "\u0417\u0432\u0451\u0437\u0434\u043D\u0430\u044F \u043C\u0435\u0442\u043A\u0430", spec: "UDK", sup: "\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439 \u043B\u043E\u0432\u0435\u0446", fat: "UDRP", arena: 1 });
  CH[10].spec2 = "RRK";
  CH[10].spec2N = "\u041A\u0440\u043E\u0432\u0430\u0432\u044B\u0435 \u0448\u0438\u043F\u044B";
  CH[11].spec2 = "RRP";
  CH[11].spec2N = "\u0421\u043A\u0432\u043E\u0437\u044C \u0442\u0435\u043D\u044C";
  CH[12].spec2 = "RUK";
  CH[12].spec2N = "\u041F\u0440\u044B\u0436\u043E\u043A \u0441\u043A\u0432\u043E\u0437\u044C \u0437\u0432\u0451\u0437\u0434\u044B";
  var BOSS = {
    ...CH[9],
    boss: true,
    name: "\u041A\u0410\u0419\u0417\u0415\u0420-\u041F\u0420\u0410\u0419\u041C",
    en: "PRIME KAISER",
    specN: "\u041A\u043E\u0440\u043E\u043D\u0430-\u0437\u0430\u043B\u043F",
    spec2N: "\u041C\u0435\u0442\u0435\u043E\u0440\u0438\u0442\u043D\u044B\u0439 \u043F\u0440\u0438\u0433\u043E\u0432\u043E\u0440",
    sup: "\u041E\u0440\u0431\u0438\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u0440\u043E\u043D\u0430",
    skin: "#e0b484",
    suit: "#181820",
    acc: "#f0c850",
    hair: "#e8e0c8",
    gear: "corona",
    cape: 1,
    h: 72,
    bulk: 1.28,
    spd: 2.05,
    jmp: 8.2,
    dmg: 1.28,
    arena: 8
  };
  var THROW_DATA = {
    0: { throwN: "\u041F\u0415\u041F\u0415\u041B\u042C\u041D\u042B\u0419 \u0412\u0417\u0420\u042B\u0412", throwT: "fire", throwC: "#f06020", throwD: 10 },
    1: { throwN: "\u0422\u0415\u041D\u0415\u0412\u041E\u0419 \u0421\u0411\u0420\u041E\u0421", throwT: "shadow", throwC: "#9fb4bd", throwD: 9 },
    2: { throwN: "\u0420\u0410\u0417\u0420\u042F\u0414 \u0412 \u0423\u041F\u041E\u0420", throwT: "shock", throwC: "#f8f860", throwD: 10 },
    3: { throwN: "\u041A\u0410\u041C\u0415\u041D\u041D\u042B\u0419 \u0413\u0420\u041E\u0425\u041E\u0422", throwT: "slam", throwC: "#8a7a5c", throwD: 13 },
    4: { throwN: "\u042F\u0414\u041E\u0412\u0418\u0422\u042B\u0419 \u0423\u041A\u0423\u0421", throwT: "claw", throwC: "#7ac83a", throwD: 9 },
    5: { throwN: "\u0417\u0415\u0420\u041A\u0410\u041B\u042C\u041D\u042B\u0419 \u0412\u0418\u0425\u0420\u042C", throwT: "sand", throwC: "#c8a060", throwD: 9 },
    6: { throwN: "\u041B\u0415\u0414\u042F\u041D\u0410\u042F \u0413\u0420\u041E\u0411\u041D\u0418\u0426\u0410", throwT: "ice", throwC: "#c8ecff", throwD: 9 },
    7: { throwN: "\u0420\u0416\u0410\u0412\u0410\u042F \u041F\u0415\u0420\u0415\u0413\u0420\u0423\u0417\u041A\u0410", throwT: "blast", throwC: "#c8c8a0", throwD: 11 },
    8: { throwN: "\u041F\u041E\u0425\u0418\u0429\u0415\u041D\u0418\u0415 \u0421\u041D\u0410", throwT: "drain", throwC: "#7a3aa8", throwD: 8 },
    9: { throwN: "\u041A\u041E\u0420\u041E\u041B\u0415\u0412\u0421\u041A\u0418\u0419 \u041F\u0420\u0418\u0413\u041E\u0412\u041E\u0420", throwT: "royal", throwC: "#f8f860", throwD: 12 },
    10: { throwN: "\u0410\u041B\u0410\u042F \u0416\u0410\u0422\u0412\u0410", throwT: "blood", throwC: "#d82040", throwD: 10 },
    11: { throwN: "\u041B\u0423\u041D\u041D\u042B\u0419 \u0421\u041D\u041E\u0421", throwT: "blade", throwC: "#9adcee", throwD: 10 },
    12: { throwN: "\u0417\u0412\u0401\u0417\u0414\u041D\u042B\u0419 \u0428\u0412\u042B\u0420\u041E\u041A", throwT: "star", throwC: "#b89aff", throwD: 9 }
  };
  for (const c of CH) Object.assign(c, THROW_DATA[c.id]);
  Object.assign(BOSS, { throwN: "\u041F\u0420\u0418\u0413\u041E\u0412\u041E\u0420 \u041A\u041E\u0420\u041E\u041D\u042B", throwT: "royal", throwC: "#f0c850", throwD: 14 });
  var CMD_THROW_NAMES = ["\u041F\u0415\u041F\u0415\u041B\u042C\u041D\u042B\u0419 \u041E\u0411\u0425\u0412\u0410\u0422", "\u0422\u0415\u041D\u0415\u0412\u041E\u0419 \u041F\u0415\u0420\u0415\u041B\u041E\u041C", "\u041A\u041E\u0420\u041E\u0422\u041A\u041E\u0415 \u0417\u0410\u041C\u042B\u041A\u0410\u041D\u0418\u0415", "\u0413\u041E\u0420\u041D\u042B\u0419 \u0421\u041B\u041E\u041C", "\u042F\u0414\u041E\u0412\u0418\u0422\u042B\u0419 \u0417\u0410\u0425\u0412\u0410\u0422", "\u041F\u0415\u0421\u0427\u0410\u041D\u042B\u0419 \u041F\u041B\u0415\u041D", "\u041B\u0415\u0414\u042F\u041D\u041E\u0419 \u041A\u0410\u041F\u041A\u0410\u041D", "\u0420\u0416\u0410\u0412\u042B\u0419 \u0417\u0410\u0416\u0418\u041C", "\u0421\u041E\u041D\u041D\u042B\u0419 \u041F\u041B\u0415\u041D", "\u041A\u041E\u0420\u041E\u041B\u0415\u0412\u0421\u041A\u0418\u0419 \u0417\u0410\u0425\u0412\u0410\u0422", "\u0410\u041B\u042B\u0419 \u041F\u041B\u0415\u041D", "\u041B\u0423\u041D\u041D\u042B\u0419 \u0417\u0410\u0425\u0412\u0410\u0422", "\u0417\u0412\u0401\u0417\u0414\u041D\u042B\u0419 \u0417\u0410\u0425\u0412\u0410\u0422"];
  for (const c of CH) c.throwCmdN = CMD_THROW_NAMES[c.id];
  BOSS.throwCmdN = "\u041A\u041E\u0420\u041E\u041D\u0410-\u0417\u0410\u0425\u0412\u0410\u0422";
  Object.assign(CH[3], { grappler: true, throwCmdD: 18, throwCmdT: "slam" });
  Object.assign(CH[7], { grappler: true, throwCmdD: 16, throwCmdT: "blast" });
  var NORMAL_BASE = {
    punch: { d: 6, wd: 5, ac: 3, rc: 8, rng: 28, hw: 28, hh: 0.72, kb: 2, status: "stagger" },
    kick: { d: 9, wd: 7, ac: 4, rc: 11, rng: 36, hw: 36, hh: 0.6, kb: 3, status: "stagger" },
    upper: { d: 15, wd: 6, ac: 4, rc: 15, rng: 24, hw: 24, hh: 0.5, kb: 3, launch: 1, status: "launch" },
    sweep: { d: 10, wd: 6, ac: 3, rc: 13, rng: 38, hw: 38, hh: 0.12, kb: 3, low: 1, status: "low" },
    jkick: { d: 10, wd: 4, ac: 8, rc: 20, rng: 34, hw: 34, hh: 0.4, kb: 3, overhead: 1, status: "overhead" },
    rh: { d: 12, wd: 8, ac: 4, rc: 15, rng: 40, hw: 40, hh: 0.55, kb: 5, knock: 1, status: "knockdown" }
  };
  var NORMAL_STYLE = {
    0: { startup: 0.98, active: 1, recovery: 0.96, reach: 1.02, box: 1, kb: 1 },
    1: { startup: 0.88, active: 1, recovery: 0.9, reach: 0.98, box: 0.95, kb: 0.9 },
    2: { startup: 1, active: 1.05, recovery: 1, reach: 1, box: 1, kb: 1 },
    3: { startup: 1.24, active: 1.15, recovery: 1.2, reach: 1.12, box: 1.15, kb: 1.35 },
    4: { startup: 0.9, active: 1.1, recovery: 0.92, reach: 0.98, box: 0.95, kb: 0.9 },
    5: { startup: 0.82, active: 1, recovery: 0.88, reach: 0.96, box: 0.9, kb: 0.85 },
    6: { startup: 1, active: 1, recovery: 1, reach: 1.04, box: 1, kb: 1 },
    7: { startup: 1.08, active: 1.05, recovery: 1.05, reach: 1.08, box: 1.06, kb: 1.1 },
    8: { startup: 0.95, active: 1, recovery: 0.95, reach: 1.02, box: 1, kb: 1 },
    9: { startup: 1.12, active: 1.1, recovery: 1.08, reach: 1.1, box: 1.1, kb: 1.2 },
    10: { startup: 0.9, active: 1, recovery: 0.92, reach: 0.95, box: 0.92, kb: 0.9 },
    11: { startup: 0.78, active: 1.05, recovery: 0.85, reach: 0.96, box: 0.9, kb: 0.85 },
    12: { startup: 0.9, active: 1, recovery: 0.95, reach: 1.02, box: 0.95, kb: 0.95 }
  };
  var CMD_DEFAULT = {
    fP: { t: "punch", d: 8, wd: 6, ac: 3, rc: 10, rng: 32, hh: 0.7 },
    fK: { t: "kick", d: 11, wd: 8, ac: 4, rc: 14, rng: 40, hh: 0.55, knock: 1 },
    bP: { t: "punch", d: 7, wd: 5, ac: 4, rc: 9, rng: 28, hh: 0.65 }
  };
  function tuneMove(id, base4) {
    const p = NORMAL_STYLE[id] || NORMAL_STYLE[0];
    return {
      ...base4,
      wd: Math.max(3, Math.round(base4.wd * p.startup)),
      ac: Math.max(2, Math.round(base4.ac * p.active)),
      rc: Math.max(5, Math.round(base4.rc * p.recovery)),
      rng: Math.round(base4.rng * p.reach),
      hw: Math.round((base4.hw || base4.rng) * p.reach),
      hh: +(base4.hh * p.box).toFixed(2),
      kb: +(base4.kb * p.kb).toFixed(1)
    };
  }
  function buildNormals(id, data) {
    const out = {};
    for (const type of Object.keys(NORMAL_BASE)) out[type] = { ...tuneMove(id, NORMAL_BASE[type]), ...data[type] || {} };
    return out;
  }
  function buildCommands(id, data) {
    const out = {};
    for (const key of Object.keys(CMD_DEFAULT)) {
      const base4 = tuneMove(id, { ...CMD_DEFAULT[key], hw: CMD_DEFAULT[key].rng, kb: CMD_DEFAULT[key].knock ? 5 : 2, status: CMD_DEFAULT[key].knock ? "knockdown" : "stagger" });
      out[key] = { ...base4, ...data[key] || {} };
    }
    return out;
  }
  var NORMAL_DATA = {
    0: { norm: { punch: { d: 7 }, kick: { d: 8 }, upper: { d: 16 }, sweep: { d: 9 }, rh: { d: 13 }, jkick: { d: 10 } }, cmd: { fP: { n: "\u041F\u041B\u0410\u041C\u0415\u041D\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 9 }, fK: { n: "\u041E\u0413\u041D\u0415\u041D\u041D\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 12 }, bP: { n: "\u041F\u0415\u041F\u0415\u041B\u042C\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 8 } } },
    1: { norm: { punch: { d: 5, rng: 30 }, kick: { d: 8, rng: 38 }, upper: { d: 14 }, sweep: { d: 9 }, rh: { d: 11 }, jkick: { d: 11 } }, cmd: { fP: { n: "\u0422\u0415\u041D\u0415\u0412\u041E\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 7, rng: 33 }, fK: { n: "\u0421\u041A\u041E\u041B\u042C\u0417\u042F\u0429\u0418\u0419 \u041F\u0418\u041D\u041E\u041A", d: 10, rng: 41 }, bP: { n: "\u041E\u0411\u0420\u0410\u0422\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 6, rng: 30 } } },
    2: { norm: { punch: { d: 6, rng: 30 }, kick: { d: 8 }, upper: { d: 15 }, sweep: { d: 9 }, rh: { d: 12 }, jkick: { d: 10 } }, cmd: { fP: { n: "\u0420\u0410\u0417\u0420\u042F\u0414\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 8, rng: 33 }, fK: { n: "\u0413\u0420\u041E\u0417\u041E\u0412\u041E\u0419 \u041F\u0418\u041D\u041E\u041A", d: 11 }, bP: { n: "\u042D\u041B\u0415\u041A\u0422\u0420\u041E\u041A\u041E\u041D\u0422\u0420", d: 7, rng: 29 } } },
    3: { norm: { punch: { d: 8, wd: 6 }, kick: { d: 11, wd: 8 }, upper: { d: 18, wd: 8 }, sweep: { d: 12, wd: 8 }, rh: { d: 15, wd: 10 }, jkick: { d: 12, wd: 6 } }, cmd: { fP: { n: "\u041A\u0410\u041C\u0415\u041D\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 10, wd: 7 }, fK: { n: "\u0422\u042F\u0416\u0401\u041B\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 14, wd: 9 }, bP: { n: "\u0413\u041E\u0420\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 9, wd: 6 } } },
    4: { norm: { punch: { d: 5, rng: 29 }, kick: { d: 7, rng: 38 }, upper: { d: 13 }, sweep: { d: 8 }, rh: { d: 10 }, jkick: { d: 9 } }, cmd: { fP: { n: "\u041A\u041E\u0413\u0422\u0415\u0412\u041E\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 7, rng: 32 }, fK: { n: "\u042F\u0414\u041E\u0412\u0418\u0422\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 9, rng: 40 }, bP: { n: "\u0417\u0410\u0421\u0410\u0414\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 6, rng: 30 } } },
    5: { norm: { punch: { d: 5, rng: 30 }, kick: { d: 7, rng: 38 }, upper: { d: 12 }, sweep: { d: 9 }, rh: { d: 10 }, jkick: { d: 9 } }, cmd: { fP: { n: "\u041F\u0415\u0421\u0427\u0410\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 7, rng: 33 }, fK: { n: "\u0412\u0418\u0425\u0420\u0415\u0412\u041E\u0419 \u041F\u0418\u041D\u041E\u041A", d: 9, rng: 41 }, bP: { n: "\u041C\u0418\u0420\u0410\u0416\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 6, rng: 30 } } },
    6: { norm: { punch: { d: 6, rng: 30 }, kick: { d: 8, rng: 38 }, upper: { d: 15 }, sweep: { d: 10 }, rh: { d: 12 }, jkick: { d: 10 } }, cmd: { fP: { n: "\u041B\u0415\u0414\u042F\u041D\u041E\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 8, rng: 33 }, fK: { n: "\u0421\u0422\u0423\u0414\u0401\u041D\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 11 }, bP: { n: "\u041C\u041E\u0420\u041E\u0417\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 7 } } },
    7: { norm: { punch: { d: 7 }, kick: { d: 10 }, upper: { d: 16 }, sweep: { d: 11 }, rh: { d: 13 }, jkick: { d: 11 } }, cmd: { fP: { n: "\u0416\u0415\u041B\u0415\u0417\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 9 }, fK: { n: "\u0428\u041B\u0410\u041A\u041E\u0412\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 13 }, bP: { n: "\u0420\u0416\u0410\u0412\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 8 } } },
    8: { norm: { punch: { d: 6, rng: 31 }, kick: { d: 8, rng: 39 }, upper: { d: 14 }, sweep: { d: 9 }, rh: { d: 11 }, jkick: { d: 10 } }, cmd: { fP: { n: "\u0421\u0423\u041C\u0420\u0410\u0427\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 8, rng: 34 }, fK: { n: "\u0422\u0415\u041D\u0415\u0412\u041E\u0419 \u041F\u0418\u041D\u041E\u041A", d: 10, rng: 42 }, bP: { n: "\u041A\u041E\u0428\u041C\u0410\u0420\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 7, rng: 31 } } },
    9: { norm: { punch: { d: 7, rng: 29 }, kick: { d: 10, rng: 37 }, upper: { d: 17 }, sweep: { d: 11 }, rh: { d: 14 }, jkick: { d: 11 } }, cmd: { fP: { n: "\u041A\u041E\u0420\u041E\u041B\u0415\u0412\u0421\u041A\u0418\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 9 }, fK: { n: "\u0421\u0422\u0410\u041B\u042C\u041D\u041E\u0419 \u041F\u0418\u041D\u041E\u041A", d: 13 }, bP: { n: "\u0412\u041B\u0410\u0421\u0422\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 8 } } },
    10: { norm: { punch: { d: 5, rng: 29 }, kick: { d: 7, rng: 37 }, upper: { d: 13 }, sweep: { d: 8 }, rh: { d: 10 }, jkick: { d: 9 } }, cmd: { fP: { n: "\u041A\u0420\u041E\u0412\u0410\u0412\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 7 }, fK: { n: "\u0410\u041B\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 9 }, bP: { n: "\u0411\u0410\u0413\u0420\u041E\u0412\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 6 } } },
    11: { norm: { punch: { d: 5, rng: 31, wd: 4 }, kick: { d: 7, rng: 40, wd: 6 }, upper: { d: 12 }, sweep: { d: 8 }, rh: { d: 10 }, jkick: { d: 11 } }, cmd: { fP: { n: "\u041B\u0423\u041D\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 7, rng: 34 }, fK: { n: "\u0421\u0415\u0420\u041F\u041E\u0412\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 9, rng: 42 }, bP: { n: "\u0422\u0415\u041D\u0415\u0412\u041E\u0419 \u041A\u041E\u041D\u0422\u0420", d: 6, rng: 31 } } },
    12: { norm: { punch: { d: 6, rng: 31 }, kick: { d: 8, rng: 40 }, upper: { d: 14 }, sweep: { d: 9 }, rh: { d: 11 }, jkick: { d: 12 } }, cmd: { fP: { n: "\u0417\u0412\u0401\u0417\u0414\u041D\u042B\u0419 \u041F\u0420\u042F\u041C\u041E\u0419", d: 8, rng: 34 }, fK: { n: "\u041A\u041E\u041C\u0415\u0422\u041D\u042B\u0419 \u041F\u0418\u041D\u041E\u041A", d: 10, rng: 42 }, bP: { n: "\u041D\u0415\u0411\u0415\u0421\u041D\u042B\u0419 \u041A\u041E\u041D\u0422\u0420", d: 7, rng: 31 } } }
  };
  function applyNormalData(target, data) {
    if (!data) return;
    target.norm = buildNormals(target.id, data.norm);
    target.cmd = buildCommands(target.id, data.cmd);
  }
  for (const c of CH) applyNormalData(c, NORMAL_DATA[c.id]);
  applyNormalData(BOSS, NORMAL_DATA[9]);
  var TARGET_DATA = {
    0: { target: { seq: "PPK", n: "\u041F\u0415\u041F\u0415\u041B\u042C\u041D\u0410\u042F \u0421\u0415\u0420\u0418\u042F" } },
    1: { target: { seq: "PK", n: "\u0422\u0415\u041D\u0415\u0412\u041E\u0419 \u0420\u0410\u0417\u0420\u0415\u0417" } },
    2: { target: { seq: "PPK", n: "\u0413\u0420\u041E\u0417\u041E\u0412\u0410\u042F \u0426\u0415\u041F\u042C" } },
    3: { target: { seq: "PPK", n: "\u0413\u041E\u0420\u041D\u042B\u0419 \u041E\u0411\u0412\u0410\u041B" } },
    4: { target: { seq: "PPK", n: "\u041A\u041E\u0413\u0422\u0415\u0412\u0410\u042F \u0421\u0415\u0420\u0418\u042F" } },
    5: { target: { seq: "PPK", n: "\u041F\u0415\u0421\u0427\u0410\u041D\u0410\u042F \u041A\u0410\u0420\u0423\u0421\u0415\u041B\u042C" } },
    6: { target: { seq: "PPK", n: "\u041B\u0415\u0414\u042F\u041D\u0410\u042F \u0426\u0415\u041F\u042C" } },
    7: { target: { seq: "PPK", n: "\u0420\u0416\u0410\u0412\u0410\u042F \u0421\u0415\u0420\u0418\u042F" } },
    8: { target: { seq: "PPK", n: "\u0421\u0423\u041C\u0420\u0410\u0427\u041D\u0410\u042F \u0426\u0415\u041F\u042C" } },
    9: { target: { seq: "PPK", n: "\u041A\u041E\u0420\u041E\u041B\u0415\u0412\u0421\u041A\u0410\u042F \u0421\u0415\u0420\u0418\u042F" } },
    10: { target: { seq: "PPK", n: "\u0410\u041B\u0410\u042F \u0421\u0415\u0420\u0418\u042F" } },
    11: { target: { seq: "PK", n: "\u041B\u0423\u041D\u041D\u042B\u0419 \u0420\u0410\u0417\u0420\u0415\u0417" } },
    12: { target: { seq: "PPK", n: "\u0417\u0412\u0401\u0417\u0414\u041D\u0410\u042F \u0426\u0415\u041F\u042C" } }
  };
  for (const c of CH) Object.assign(c, TARGET_DATA[c.id]);
  Object.assign(BOSS, TARGET_DATA[9]);
  var ROLE_PICKS = {
    0: { zone: "spec", jump: "upper", pressure: "fP" },
    1: { zone: "spec", jump: "upper", pressure: "spec2" },
    2: { zone: "spec", jump: "upper", pressure: "fK" },
    3: { zone: "spec", jump: "upper", pressure: "fP" },
    4: { zone: "spec2", jump: "upper", pressure: "spec" },
    5: { zone: "spec2", jump: "upper", pressure: "spec" },
    6: { zone: "spec", jump: "upper", pressure: "fK" },
    7: { zone: "spec", jump: "upper", pressure: "bP" },
    8: { zone: "spec", jump: "upper", pressure: "spec" },
    9: { zone: "spec", jump: "upper", pressure: "fK" },
    10: { zone: "spec", jump: "upper", pressure: "spec" },
    11: { zone: "spec", jump: "upper", pressure: "spec2" },
    12: { zone: "spec", jump: "upper", pressure: "spec" }
  };
  for (const c of CH) c.roles = ROLE_PICKS[c.id];
  BOSS.roles = ROLE_PICKS[9];
  var DUMMY = {
    ...CH[3],
    id: 13,
    name: "\u041C\u0410\u041D\u0415\u041A\u0415\u041D",
    en: "DUMMY",
    skin: "#b8b0a0",
    suit: "#4a4a4a",
    acc: "#c8c0a8",
    hair: "#2a2a2a",
    gear: "visor",
    h: 64,
    bulk: 1.12,
    spd: 0,
    jmp: 0,
    dmg: 0,
    specN: "\u2014",
    spec2N: "\u2014",
    sup: "\u2014",
    throwN: "\u0417\u0410\u0425\u0412\u0410\u0422 \u041C\u0410\u041D\u0415\u041A\u0415\u041D\u0410",
    throwCmdN: "\u0417\u0410\u0425\u0412\u0410\u0422 \u041C\u0410\u041D\u0415\u041A\u0415\u041D\u0410"
  };

  // src/data/endings.js
  var ENDINGS = [
    { title: "\u041F\u0415\u041F\u0415\u041B \u041D\u0410 \u0412\u0415\u0422\u0420\u0423", lines: ["\u0410\u0440\u0435\u043D\u0430 \u043E\u0441\u0442\u044B\u043B\u0430, \u043D\u043E \u0443\u0433\u043B\u0438 \u0435\u0449\u0451 \u0434\u044B\u0448\u0430\u0442.", "\u042D\u043C\u0431\u0435\u0440 \u0443\u0445\u043E\u0434\u0438\u0442 \u043F\u0435\u0440\u0432\u043E\u0439."], col: "#f0a032" },
    { title: "\u0422\u0415\u041D\u042C \u0411\u0415\u0417 \u0425\u041E\u0417\u042F\u0418\u041D\u0410", lines: ["\u041E\u043D \u0432\u0435\u0440\u043D\u0443\u043B \u0434\u043E\u043B\u0433 \u0438 \u0437\u0430\u0431\u0440\u0430\u043B \u0438\u043C\u044F.", "\u0422\u0435\u043F\u0435\u0440\u044C \u0442\u0438\u0448\u0438\u043D\u0430 \u0433\u043E\u0432\u043E\u0440\u0438\u0442 \u0435\u0433\u043E \u0433\u043E\u043B\u043E\u0441\u043E\u043C."], col: "#9fb4bd" },
    { title: "\u041F\u041E\u0421\u041B\u0415\u0414\u041D\u0418\u0419 \u0420\u0410\u0417\u0420\u042F\u0414", lines: ["\u0413\u0440\u043E\u0437\u0430 \u0443\u0448\u043B\u0430 \u0432 \u043F\u0440\u043E\u0432\u043E\u0434\u0430.", "\u0412\u043E\u043B\u044C\u0442 \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u0441\u0432\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0433\u043B\u0430\u0437\u0430\u0445."], col: "#f2d23a" },
    { title: "\u041A\u0410\u041C\u0415\u041D\u042C \u041D\u0415 \u0413\u041D\u0401\u0422\u0421\u042F", lines: ["\u041A\u043E\u0440\u043E\u043D\u0430 \u0442\u0440\u0435\u0441\u043D\u0443\u043B\u0430 \u043E \u0435\u0433\u043E \u043F\u043B\u0435\u0447\u0438.", "\u0411\u0430\u0437\u0430\u043B\u044C\u0442 \u0432\u0435\u0440\u043D\u0443\u043B\u0441\u044F \u0432 \u043D\u0435\u0434\u0440\u0430."], col: "#c8a040" },
    { title: "\u042F\u0414 \u041F\u0420\u041E\u0422\u0418\u0412 \u0417\u041E\u041B\u041E\u0422\u0410", lines: ["\u0417\u043E\u043B\u043E\u0442\u043E \u0430\u0440\u0435\u043D\u044B \u0441\u0442\u0430\u043B\u043E \u0437\u0435\u043B\u0451\u043D\u044B\u043C.", "\u0424\u044D\u043D\u0433 \u043D\u0435 \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u0442\u0435\u043B, \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043B\u0443\u0445\u0438."], col: "#7ac83a" },
    { title: "\u041F\u0423\u0421\u0422\u042B\u041D\u042F \u0417\u0410\u0411\u0420\u0410\u041B\u0410 \u0410\u0420\u0415\u041D\u0423", lines: ["\u041F\u0435\u0441\u043E\u043A \u0437\u0430\u0441\u044B\u043F\u0430\u043B \u0442\u0440\u0438\u0431\u0443\u043D\u044B.", "\u0421\u0430\u0445\u0440\u0430 \u0443\u0448\u043B\u0430 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u043D\u0435\u0442 \u043A\u0430\u0440\u0442."], col: "#c8a060" },
    { title: "\u0422\u0418\u0428\u0418\u041D\u0410 \u041F\u041E\u0414\u041E \u041B\u042C\u0414\u041E\u041C", lines: ["\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0432\u044B\u0441\u0442\u0440\u0435\u043B \u0437\u0430\u043C\u0451\u0440\u0437 \u043D\u0430 \u043B\u0435\u0442\u0443.", "\u041A\u0440\u0438\u043E \u0432\u043F\u0435\u0440\u0432\u044B\u0435 \u043D\u0435 \u0441\u043B\u044B\u0448\u0438\u0442 \u044D\u0445\u0430."], col: "#c8ecff" },
    { title: "\u041C\u0415\u0422\u0410\u041B\u041B \u041F\u041E\u041C\u041D\u0418\u0422", lines: ["\u041A\u0430\u0436\u0434\u044B\u0439 \u0443\u0434\u0430\u0440 \u043E\u0441\u0442\u0430\u043B\u0441\u044F \u0432\u043C\u044F\u0442\u0438\u043D\u043E\u0439.", "\u0420\u0436\u0430\u0432\u044B\u0439 \u0443\u0445\u043E\u0434\u0438\u0442 \u0432 \u043B\u043E\u043C, \u043D\u043E \u043D\u0435 \u0441\u0434\u0430\u0451\u0442\u0441\u044F."], col: "#d84a2a" },
    { title: "\u0427\u0423\u0416\u0418\u0415 \u0413\u041E\u041B\u041E\u0421\u0410", lines: ["\u0412\u043E\u0440\u043E\u043D\u043A\u0430 \u0437\u0430\u043A\u0440\u044B\u043B\u0430\u0441\u044C \u0438\u0437\u043D\u0443\u0442\u0440\u0438.", "\u041D\u043E\u043A\u0442\u044E\u0440\u043D \u0443\u043D\u0451\u0441 \u0432\u0441\u0435 \u0438\u043C\u0435\u043D\u0430, \u043A\u0440\u043E\u043C\u0435 \u0441\u0432\u043E\u0435\u0433\u043E."], col: "#7a3aa8" },
    { title: "\u041A\u041E\u0420\u041E\u041D\u0410 \u0418\u0417 \u0422\u0415\u041D\u0418", lines: ["\u041F\u0440\u0430\u0439\u043C \u043F\u0430\u043B \u043E\u0442 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u043A\u043E\u043F\u0438\u0438.", "\u041A\u0430\u0439\u0437\u0435\u0440 \u043D\u0435 \u0441\u0442\u0430\u043B \u043D\u0430\u0434\u0435\u0432\u0430\u0442\u044C \u043A\u043E\u0440\u043E\u043D\u0443."], col: "#f0c850" },
    { title: "\u041A\u0420\u041E\u0412\u042C \u041D\u0410 \u0411\u0415\u041B\u041E\u041C", lines: ["\u0410\u0440\u0435\u043D\u0430 \u0441\u0442\u0430\u043B\u0430 \u0435\u0451 \u0445\u043E\u043B\u0441\u0442\u043E\u043C.", "\u041A\u0430\u0440\u043C\u0438\u043D \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043B\u0430 \u043F\u0440\u0438\u0433\u043E\u0432\u043E\u0440."], col: "#d82040" },
    { title: "\u0414\u041E \u0420\u0410\u0421\u0421\u0412\u0415\u0422\u0410", lines: ["\u041B\u0443\u043D\u0430 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u043B\u0430 \u043A\u043B\u0438\u043D\u043E\u043A.", "\u0410\u044F\u043C\u044D \u0438\u0441\u0447\u0435\u0437\u043B\u0430 \u0440\u0430\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0441\u0442\u0438\u0445\u043B\u043E \u044D\u0445\u043E."], col: "#7ac8d8" },
    { title: "\u0417\u0412\u0401\u0417\u0414\u042B \u0421\u041E\u0428\u041B\u0418\u0421\u042C", lines: ["\u041C\u0435\u0442\u043A\u0430 \u043F\u043E\u0433\u0430\u0441\u043B\u0430 \u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u043C \u0443\u0434\u0430\u0440\u0435.", "\u0412\u0435\u0433\u0430 \u0432\u044B\u0431\u0440\u0430\u043B\u0430 \u0434\u043E\u0440\u043E\u0433\u0443 \u0434\u043E\u043C\u043E\u0439."], col: "#b89aff" }
  ];

  // src/data/arenas.js
  var AR = [
    { n: "\u0414\u041E\u041A", sky: ["#0a0e18", "#0e1626", "#16243a", "#1e3448"], far: "#0c141e", mid: "bldg", mc: "#141d2a", gr: "#25282c", gr2: "#33383c", moon: "#c8d0d8" },
    { n: "\u0425\u0420\u0410\u041C \u041F\u0420\u0418\u0417\u0420\u0410\u041A\u041E\u0412", sky: ["#0c0a14", "#141024", "#1c1834", "#282048"], far: "#120e1e", mid: "col", mc: "#1c1630", gr: "#241c32", gr2: "#322744", moon: "#c8a8e0" },
    { n: "\u0413\u0420\u041E\u0417\u041E\u0412\u041E\u0419 \u0413\u041E\u0420\u041E\u0414", sky: ["#0a1018", "#122028", "#1a3038", "#284850"], far: "#0e1a20", mid: "roof", mc: "#15242c", gr: "#26302e", gr2: "#303c38", moon: "#e8e088", rain: 1 },
    { n: "\u041A\u0410\u041C\u0415\u041D\u041D\u041E\u041B\u041E\u041C\u041D\u042F", sky: ["#1a1410", "#241c14", "#34281c", "#443424"], far: "#241c14", mid: "mtn", mc: "#302418", gr: "#4a3c2c", gr2: "#584836", moon: "#e0c8a0" },
    { n: "\u0414\u041E\u0414\u0417\u0401 \u041A\u041B\u0418\u041D\u041A\u0410", sky: ["#101408", "#1a200c", "#28301a", "#38402a"], far: "#141a0c", mid: "bam", mc: "#20301a", gr: "#3a3c28", gr2: "#484a32", moon: "#d8d8a8" },
    { n: "\u041F\u0423\u0421\u0422\u042B\u041D\u042F", sky: ["#2a1408", "#3c1e0a", "#542c0e", "#6a3c16"], far: "#3c2010", mid: "dune", mc: "#4a2a14", gr: "#8a6438", gr2: "#9a7444", moon: "#f0d060", sand: 1 },
    { n: "\u0412\u0423\u041B\u041A\u0410\u041D", sky: ["#180604", "#280a06", "#3c1008", "#521a0a"], far: "#200806", mid: "lav", mc: "#2a0c08", gr: "#38201a", gr2: "#442820", moon: "#f06020", ember: 1 },
    { n: "\u041B\u0415\u0414\u041D\u0418\u041A", sky: ["#08101c", "#0c1828", "#122438", "#1a3050"], far: "#0c1826", mid: "ice", mc: "#16304a", gr: "#3a5068", gr2: "#486078", moon: "#d8ecff", snow: 1 },
    { n: "\u041A\u0418\u0411\u0415\u0420-\u0417\u0410\u0412\u041E\u0414", sky: ["#0c0e12", "#101418", "#141a20", "#1a222a"], far: "#10141a", mid: "pipe", mc: "#1a222c", gr: "#2e3238", gr2: "#3a3e44", moon: "#e04030" },
    { n: "\u041A\u041B\u0410\u0414\u0411\u0418\u0429\u0415", sky: ["#0a0c14", "#10121e", "#161828", "#20223a"], far: "#0e1018", mid: "tomb", mc: "#181a28", gr: "#2c2e2a", gr2: "#383a34", moon: "#c8ccd8" }
  ];
  function initArenas({ mul, RW, RH, FL, GR }) {
    AR.forEach((A, i) => {
      const r = mul(i * 991 + 7);
      A.fs = [];
      let x = -40;
      while (x < 1020) {
        const w = 26 + r() * 54, h = 30 + r() * 80;
        A.fs.push({ x, w, h });
        x += w + 8 + r() * 40;
      }
      A.ms = [];
      x = -70;
      while (x < 1150) {
        A.ms.push({ x, v: r() });
        x += 95 + r() * 70;
      }
      A.rb = [];
      for (let i2 = 0; i2 < 46; i2++) A.rb.push({ x: r() * 860, y: FL + 4 + (r() * 26 | 0), w: 2 + (r() * 4 | 0), a: 0.08 + r() * 0.16 });
      A.stars = [];
      for (let i2 = 0; i2 < 42; i2++) A.stars.push({ x: r() * RW | 0, y: 4 + r() * 105 | 0, p: r() * 6.28, z: r() < 0.3 ? 2 : 1 });
    });
  }

  // src/game/world/arena.js
  var clamp = (value, min, max) => value < min ? min : value > max ? max : value;
  function rgba(hex, alpha) {
    const value = hex.replace("#", "");
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  function createArenaView({ g, RW, RH, FL, AR: AR2, assets, shade, mix }) {
    function drawLayer(layer, cam, opacity = 1) {
      const image = layer.image;
      if (!image) return;
      const maxSource = Math.max(0, image.width - RW);
      const sourceX = clamp(Math.round(cam * (layer.scroll ?? 1)), 0, maxSource);
      const height = Math.min(layer.height ?? RH, RH);
      const y = layer.y ?? 0;
      g.save();
      g.globalAlpha = (layer.alpha ?? 1) * opacity;
      g.imageSmoothingEnabled = false;
      if (layer.blend) g.globalCompositeOperation = layer.blend;
      g.drawImage(image, sourceX, 0, RW, height, 0, y, RW, height);
      g.restore();
    }
    function drawFog(asset, cam, time) {
      if (!asset.fog) return;
      const color = asset.fogColor || "#b8a4e8";
      for (let i = 0; i < 3; i++) {
        const x = ((i * 174 - cam * 0.24 + time * 0.18) % (RW + 260) + RW + 260) % (RW + 260) - 130;
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
      g.fillRect(0, FL - 40, RW, 40);
    }
    function drawGround(A, asset, cam, time) {
      const gr = g.createLinearGradient(0, FL, 0, RH);
      gr.addColorStop(0, A.gr);
      gr.addColorStop(1, shade(A.gr, 0.55));
      g.fillStyle = gr;
      g.fillRect(0, FL, RW, RH - FL);
      g.fillStyle = mix(A.gr, "#ffffff", 0.14);
      g.fillRect(0, FL, RW, 1);
      g.fillStyle = "rgba(0,0,0,.25)";
      g.fillRect(0, FL, RW, 2);
      const horizon = g.createLinearGradient(0, FL - 12, 0, FL);
      horizon.addColorStop(0, "rgba(178,188,208,0)");
      horizon.addColorStop(1, "rgba(178,188,208,.08)");
      g.fillStyle = horizon;
      g.fillRect(0, FL - 12, RW, 12);
      g.strokeStyle = "rgba(0,0,0,.15)";
      g.lineWidth = 1;
      const vanishX = RW / 2 - (cam - RW / 2) * 0.35;
      for (let i = -8; i <= 8; i++) {
        g.beginPath();
        g.moveTo(vanishX + i * 26, FL + 2);
        g.lineTo(vanishX + i * 72, RH);
        g.stroke();
      }
      for (const y of [FL + 5, FL + 14, FL + 26]) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(RW, y);
        g.stroke();
      }
      if (Array.isArray(A.rb)) {
        g.fillStyle = A.gr2;
        for (const rb of A.rb) {
          const x = Math.round(((rb.x - cam) % (RW + 40) + RW + 40) % (RW + 40) - 20);
          g.globalAlpha = rb.a;
          g.fillRect(x, rb.y, rb.w, 2);
        }
        g.globalAlpha = 1;
      }
      if (asset.wet) {
        const sheen = g.createLinearGradient(0, FL, 0, FL + 26);
        sheen.addColorStop(0, "rgba(150,190,210,.12)");
        sheen.addColorStop(1, "rgba(150,190,210,0)");
        g.fillStyle = sheen;
        g.fillRect(0, FL, RW, 26);
        for (const light of asset.lights || []) {
          if (light.y < FL - 40) continue;
          const x = light.x - cam * 0.82;
          if (x < -20 || x > RW + 20) continue;
          const reflection = g.createLinearGradient(0, FL, 0, Math.min(RH, FL + 30));
          reflection.addColorStop(0, rgba(light.color, 0.16));
          reflection.addColorStop(1, rgba(light.color, 0));
          g.fillStyle = reflection;
          g.fillRect(x - 7, FL, 14, Math.min(RH, FL + 30) - FL);
        }
      }
      g.fillStyle = "rgba(0,0,0,.25)";
      g.fillRect(0, FL, RW, 2);
      if (asset.wet) {
        const ripple = 0.06 + Math.sin(time * 0.08) * 0.02;
        g.fillStyle = `rgba(190,220,235,${ripple})`;
        g.fillRect(0, FL + 3, RW, 1);
      }
    }
    function drawLights(asset, cam, time) {
      if (!Array.isArray(asset.lights)) return;
      g.save();
      g.globalCompositeOperation = "lighter";
      for (const light of asset.lights) {
        const x = light.x - cam * 0.82;
        if (x < -light.radius || x > RW + light.radius) continue;
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
      const A = AR2[ai] || AR2[0];
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
      const vignette = g.createRadialGradient(RW * 0.5, FL * 0.52, 80, RW * 0.5, FL * 0.52, 310);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.72, "rgba(0,0,0,.03)");
      vignette.addColorStop(1, "rgba(0,0,0,.18)");
      g.fillStyle = vignette;
      g.fillRect(0, 0, RW, RH);
      const top = g.createLinearGradient(0, 0, 0, 26);
      top.addColorStop(0, "rgba(0,0,0,.16)");
      top.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = top;
      g.fillRect(0, 0, RW, 26);
    }
    function ambient({ arena, cam, frame, parts }) {
      const asset = assets[arena];
      if (!asset || !asset.ready || !Array.isArray(asset.ambient) || !asset.ambient.length) return false;
      for (const item of asset.ambient) {
        const every = Math.max(1, item.every || 1);
        if (frame % every !== 0) continue;
        if (item.type === "rain") {
          parts.push({
            x: cam + Math.random() * (RW + 50) - 20,
            y: -6,
            vx: item.wind ?? -0.5,
            vy: 7,
            c: "rgba(170,190,215,.28)",
            l: 60,
            s: 1,
            gv: 0,
            line: 1,
            kf: 1
          });
        } else if (item.type === "snow") {
          parts.push({
            x: cam + Math.random() * RW,
            y: -4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: 0.32 + Math.random() * 0.35,
            c: item.color || "rgba(230,240,255,.7)",
            l: 420,
            s: 1 + Math.random(),
            gv: 0
          });
        } else if (item.type === "sand") {
          parts.push({
            x: cam + RW + 10,
            y: FL - Math.random() * 158,
            vx: -1.6 - Math.random() * 1.2,
            vy: 0.04,
            c: item.color || "rgba(220,180,110,.2)",
            l: 80,
            s: 1,
            gv: 0,
            horiz: 3 + Math.random() * 5
          });
        } else if (item.type === "ember") {
          parts.push({
            x: cam + Math.random() * RW,
            y: FL + Math.random() * 10,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.4 - Math.random() * 0.6,
            c: item.color || "rgba(240,110,40,.8)",
            l: 60 + Math.random() * 60,
            s: 1 + Math.random(),
            gv: -0.01
          });
        } else if (item.type === "motes") {
          parts.push({
            x: cam + Math.random() * RW,
            y: FL - Math.random() * 145,
            vx: (Math.random() - 0.5) * 0.24,
            vy: -0.06 - Math.random() * 0.16,
            c: item.color || "rgba(180,170,220,.2)",
            l: 110 + Math.random() * 170,
            s: 1 + Math.random() * 1.6,
            gv: 0
          });
        } else if (item.type === "fog") {
        }
      }
      return true;
    }
    return { draw, foreground, hasForeground, ambient, post };
  }

  // src/game/core/state.js
  function createSelection(mode = "cpu") {
    return {
      mode,
      c1: 0,
      c2: 1,
      ph: 0,
      l1: false,
      l2: false,
      diff: 1,
      ar: -1,
      row: 0
    };
  }
  function createState() {
    return {
      GAME: "title",
      FRAME: 0,
      freeze: 0,
      shake: 0,
      cam: 0,
      menuIdx: 0,
      settingsIdx: 0,
      ladder: [],
      lStep: 0,
      paused: false,
      pauseIdx: 0,
      wipe: 0,
      battle: null,
      flashS: 0,
      announce: null,
      sel: createSelection(),
      vsT: 0,
      titleT: 0,
      contT: 0,
      arcP1: 0,
      lastSel: null,
      // реванш теми же бойцами
      vsEscT: 0,
      // подтверждение выхода из аркады
      bstat: null,
      // статистика боя для экрана реванша
      parts: [],
      projs: [],
      decals: [],
      fx: [],
      last: 0,
      acc: 0
    };
  }
  function setScreen(state, screen) {
    state.GAME = screen;
    state.cam = 0;
    state.parts.length = 0;
    state.decals.length = 0;
    state.projs.length = 0;
    state.fx.length = 0;
    state.announce = null;
    state.paused = false;
    if (screen === "menu") state.menuIdx = 0;
    if (screen === "settings") state.settingsIdx = 0;
  }
  function beginBattle(state, battle, bstat) {
    state.battle = battle;
    state.parts.length = 0;
    state.projs.length = 0;
    state.decals.length = 0;
    state.fx.length = 0;
    state.bstat = bstat;
  }
  function resetRound(state, wipe) {
    state.freeze = 0;
    state.shake = 0;
    state.flashS = 0;
    state.wipe = wipe;
    state.decals.length = 0;
    state.projs.length = 0;
    state.fx.length = 0;
  }

  // src/game/fx/particles.js
  function createParticles({ g, state, options, FL, GR, rnd }) {
    function P(x, y, vx, vy, c, l, s, gv) {
      if (!options.blood && c === "#b01818") return;
      state.parts.push({ x, y, vx, vy, c, l: l || 30, s: s || 2, gv: gv === void 0 ? 0.3 : gv });
    }
    function blood(x, y, n, pw) {
      if (!options.blood) return;
      for (let i = 0; i < n; i++) {
        P(x, y, rnd(-2.5, 2.5) * (pw || 1), rnd(-4, 1), "#b01818", rnd(20, 50), rnd(1, 3));
      }
    }
    function updParts() {
      for (let i = state.parts.length; i--; ) {
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
          if (options.blood && p.c === "#b01818" && Math.random() < 0.5) {
            state.decals.push({ x: p.x, y: FL + 2 + rnd(0, 4), s: rnd(1, 3), t: 0, l: rnd(480, 900) });
          }
          p.y = FL + GR - 1;
          p.vy *= -0.3;
          p.vx *= 0.6;
        }
        if (p.l <= 0) state.parts.splice(i, 1);
      }
      for (let i = state.decals.length; i--; ) {
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
      g.fillStyle = "#b01818";
      for (const d of state.decals) {
        const a = d.l ? 1 - Math.max(0, (d.t - d.l * 0.6) / (d.l * 0.4)) : 1;
        g.globalAlpha = a;
        g.fillRect(d.x - cam, d.y, d.s, d.s > 2 ? 2 : 1);
      }
      g.globalAlpha = 1;
    }
    return { P, blood, updParts, drawParts, drawDecals };
  }

  // src/game/fighter.js
  var ATK = { punch: { d: 6, wd: 5, ac: 3, rc: 8, rng: 28, hh: 0.72 }, kick: { d: 9, wd: 7, ac: 4, rc: 11, rng: 36, hh: 0.6 }, upper: { d: 15, wd: 6, ac: 4, rc: 15, rng: 24, hh: 0.5, launch: 1 }, sweep: { d: 10, wd: 6, ac: 3, rc: 13, rng: 38, hh: 0.12, low: 1 }, jkick: { d: 10, wd: 4, ac: 8, rc: 20, rng: 34, hh: 0.4, overhead: 1 }, rh: { d: 12, wd: 8, ac: 4, rc: 15, rng: 40, hh: 0.55, knock: 1 }, throw: { d: 1, wd: 5, ac: 3, rc: 20, rng: 30, hh: 0.55, throw: 1, grab: 1 } };
  var ZEROC = { l: 0, r: 0, u: 0, d: 0, P: 0, K: 0, B: 0, pP: 0, pK: 0, pl: 0, pr: 0, pu: 0, pd: 0 };
  var WM = { 0: [0.24, 1, 1, 1.5, 0.02], 1: [0.15, 0.65, 0.4, 0.6, 0.1], 2: [0.27, 1.1, 1.3, 1.8, 0], 3: [0.14, 1.2, 0.8, 2.6, 0.06], 4: [0.3, 0.9, 1.4, 1, 0.12], 5: [0.2, 0.7, 0.5, 0.8, -0.03], 6: [0.2, 0.9, 0.7, 1, 0], 7: [0.22, 1.1, 0.5, 1.6, 0.04], 8: [0.13, 0.5, 0.3, 0.4, -0.05], 9: [0.21, 0.95, 1.1, 1.6, 0.03], 10: [0.19, 0.75, 0.6, 0.9, -0.04], 11: [0.28, 0.85, 1.2, 0.9, 0.1], 12: [0.17, 0.6, 0.4, 0.5, -0.02] };
  function hitR(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }
  function createFighter({
    S,
    FL,
    GR,
    AW,
    clamp: clamp2,
    lerp,
    rnd,
    pick,
    P,
    blood,
    spriteFx,
    SFX,
    smoke,
    resolveHit,
    autoHit
  }) {
    const CAST_ARMS = { 1: [[0.2, 1.2], [0.1, 1.1]], 2: [[2.6, 0], [-2.6, 0.1]], 3: [[1.8, 0.6], [-0.5, 1.8]], 4: [[1.2, 0.5], [-0.6, 1.8]], 5: [[0.6, 1.2], [-0.6, 1.3]], 6: [[2.4, 0.3], [-0.4, 1.8]], 7: [[1.5, 0.05], [1.2, 0.2]], 8: [[1.6, 0.2], [-0.9, 1.6]], 9: [[1.5, 0.1], [1.3, 0.2]], 10: [[1.7, 0.35], [1.35, 0.45]], 11: [[1.9, -0.1], [-0.4, 2.1]], 12: [[1.55, -0.05], [-0.5, 1.7]] };
    function castHand(f) {
      const d = f.def, ph = Math.min(1, f.st / 12), ci = CAST_ARMS[d.id];
      const a1 = ci ? lerp(-0.5, ci[0][0], ph) : lerp(-0.5, 1.5, ph), a2 = ci ? lerp(2, ci[0][1], ph) : lerp(2, 0.1, ph);
      const hip = -d.h * 0.47, shY = hip - d.h * 0.3, shX = ph * 0.2 * 10, l1 = d.h * 0.2, l2 = d.h * 0.18;
      const lx = 2 + shX + Math.sin(a1) * l1 + Math.sin(a1 + a2) * l2, ly = shY + 2 + Math.cos(a1) * l1 + Math.cos(a1 + a2) * l2;
      const sc = d.bulk * (f.scale || 1), sq = f.squash || 1;
      return { x: f.x + f.face * sc * lx, y: f.y + sc * sq * ly };
    }
    function castOrigin(f) {
      const h = castHand(f), d = f.def;
      let dx = 0;
      if (d.bow) dx = 16;
      else if (d.blade) dx = 13;
      else if (d.fan) dx = 8;
      else if (d.claws) dx = 4;
      return { x: h.x + f.face * dx, y: h.y };
    }
    function castBurst(x, y, col, scale) {
      const c = col || "#f8d060", k = scale || 1;
      S.fx.push({ ty: "castburst", x, y, t: 0, life: 10, col: c, scale: k });
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2;
        P(x + Math.cos(a) * 3, y + Math.sin(a) * 3, Math.cos(a) * rnd(0.8, 2.2), Math.sin(a) * rnd(0.8, 2.2), c, 16, 2, 0);
      }
    }
    class F {
      constructor(def, ctrl) {
        this.def = def;
        this.ctrl = ctrl;
        this.wins = 0;
        this.rage = 0;
        this.aiDir = null;
        this.reset(200, 1);
      }
      reset(x, face) {
        this.x = x;
        this.y = FL + GR;
        this.vx = 0;
        this.vy = 0;
        this.face = face;
        this.state = "idle";
        this.st = 0;
        this.hp = 100;
        this.atk = null;
        this.frozen = 0;
        this.netT = 0;
        this.invis = 0;
        this.invuln = 0;
        this.poison = 0;
        this.charred = 0;
        this.hidden = 0;
        this.tilt = 0;
        this.run = 100;
        this.running = 0;
        this.hpLag = 100;
        this.lastTap = -99;
        this.tapDir = 0;
        this.animT = 0;
        this.squash = 1;
        this.scale = 1;
        this.flash = 0;
        this.jbuf = 0;
        this.abuf = 0;
        this.abufB = "punch";
        this.dodging = 0;
        this.dvx = 0;
        this.marks = [];
        this.poisonC = null;
        this.spec2go = 0;
        this.combo = 0;
        this.comboT = 99;
        this.pale = 0;
        this.defeated = 0;
        this.damageTaken = 0;
        this.armor = 0;
        this.blockStun = 0;
        this.blockLow = 0;
        this.grabbedBy = 0;
        this.throwTarget = 0;
        this.jumpGrace = 0;
        this.chain = "";
        this.chainT = 0;
        this.ctrl.clear();
      }
      get onGround() {
        return this.y >= FL + GR - 0.5;
      }
      get box() {
        const d = this.def, bh = this.state === "crouch" ? d.h * 0.55 : d.h;
        return { x: this.x - 9 * d.bulk, y: this.y - bh, w: 18 * d.bulk, h: bh };
      }
      startAtk(t, key) {
        const d = this.def, c = key && d.cmd ? d.cmd[key] : null, stats = c ? { ...c } : null, type = stats ? stats.t || t : t;
        let A = { ...ATK[type], ...d.norm?.[type] || {} };
        let name = null;
        if (stats) {
          const { n, ...rest } = stats;
          delete rest.t;
          A = { ...A, ...rest };
          name = n || null;
        }
        const btn = key ? key === "fP" || key === "bP" ? "P" : key === "fK" ? "K" : null : type === "punch" || type === "upper" ? "P" : type === "kick" || type === "sweep" || type === "rh" ? "K" : null;
        let target = null, chainPart = false;
        if (btn) {
          const seq = d.target && d.target.seq, continuing = this.comboT < 60 && this.combo > 0 && this.chainT > 0;
          let chain = continuing ? this.chain + btn : btn;
          if (seq && !seq.startsWith(chain)) chain = btn;
          this.chain = chain;
          this.chainT = 60;
          chainPart = !!(seq && chain.length < seq.length && seq.startsWith(chain));
          if (seq && chain === seq) target = d.target;
        } else {
          this.chain = "";
          this.chainT = 0;
        }
        this.state = "atk";
        this.st = 0;
        this.atk = { t: type, name, A, target, chainPart, hit: 0, blocked: 0, connected: 0, cancel: 0 };
        this.invis = 0;
        this.spec2go = 0;
        this.jumpGrace = 0;
        if (!S.battle || S.battle.phase === "fight") this.ctrl.buf.length = 0;
        SFX.swing();
      }
      // 08.09: атака пробивает невидимость; 24.10: буфер очищается для special cancel только в бою; 25.10: профили нормалов, командные нормалы и target-combo
      startCmd(key) {
        const c = this.def.cmd && this.def.cmd[key];
        if (!c) return false;
        this.startAtk(c.t, key);
        return true;
      }
      startCmdThrow() {
        this.startAtk("throw");
        this.atk.cmdThrow = 1;
        if (this.def.grappler) this.armor = Math.max(this.armor, 6);
      }
      jump() {
        this.vy = -this.def.jmp;
        this.state = "jump";
        this.jumpGrace = 0;
        SFX.jump();
      }
      motionPrefix() {
        const d = this.def;
        return [d.spec, d.spec2].some((seq) => {
          const p = (seq || "").slice(0, -1);
          return p.endsWith("U") && this.ctrl.matchRel(p, this.face, 16);
        });
      }
      update(FR, foe) {
        const d = this.def, c = S.battle && S.battle.phase === "intro" ? ZEROC : this.ctrl;
        const stunned = this.blockStun > 0;
        if (stunned) this.blockStun--;
        this.animT++;
        this.st++;
        if (this.chainT > 0) this.chainT--;
        else this.chain = "";
        this.flash = Math.max(0, this.flash - 1);
        this.squash = lerp(this.squash, 1, 0.12);
        this.hpLag = Math.max(this.hp, this.hpLag - 0.4);
        if (this.defeated) {
          this.tilt = lerp(this.tilt, this.state === "dizzy" ? 0 : -1.4, 0.2);
          return;
        }
        if (this.netT > 0 && this.state !== "net") this.netT = 0;
        if (this.poison > 0) {
          this.poison--;
          this.hp = Math.max(1, this.hp - 0.06);
          this.damageTaken = (this.damageTaken || 0) + 0.06;
          if (this.poison % 9 === 0) P(this.x, this.y - d.h * 0.6, rnd(-0.5, 0.5), rnd(-1.5, -0.3), this.poisonC || "#7ac83a", 20, 2);
        }
        if (this.invis > 0) this.invis--;
        if (this.invuln > 0) this.invuln--;
        if (this.armor > 0) this.armor--;
        if (S.GAME === "fight" && !this.hidden) {
          if (d.id === 0 && FR % 9 === 0) P(this.x + rnd(-4, 4), this.y - d.h - 4, rnd(-0.3, 0.3), rnd(-1.2, -0.5), pick(["#f06020", "#f0a030"]), 26, 1, -0.02);
          if (d.id === 6 && FR % 12 === 0) P(this.x + rnd(-7, 7), this.y - d.h * rnd(0.3, 1), 0, rnd(0.2, 0.6), "#cfeaff", 30, 1, 0.02);
          if (d.id === 12 && FR % 13 === 0) P(this.x + rnd(-11, 11), this.y - d.h * rnd(0.1, 1.1), rnd(-0.2, 0.2), rnd(-0.7, -0.2), "#b89aff", 22, 1, -0.01);
        }
        if (this.state === "grabbed") {
          const g = this.grabbedBy;
          if (g && g.state === "atk" && g.atk && g.atk.t === "throw" && !g.atk.thrown) {
            const ph = clamp2((g.st - (g.atk.A.wd + g.atk.A.ac)) / 8, 0, 1);
            this.x = clamp2(g.x + g.face * (16 + ph * 8), 16, AW - 16);
            this.y = g.y - 6 - ph * 8;
            this.vx = 0;
            this.vy = 0;
            this.face = -g.face;
            this.tilt = lerp(this.tilt, 0.22, 0.2);
            return;
          }
          this.grabbedBy = 0;
          this.state = "idle";
          this.st = 0;
        }
        if (this.state === "dash") {
          this.vx = this.dvx;
          this.dodging = 1;
          if (this.st > 14) {
            this.state = "idle";
            this.dodging = 0;
          }
        } else if (this.running && this.onGround && c.pB) {
          this.st = 0;
          this.state = "dash";
          this.dvx = this.running * d.spd * 3.4;
          this.dodging = 1;
          SFX.swing();
          for (let i = 0; i < 6; i++) P(this.x, this.y - rnd(4, 22), -this.running * rnd(1, 2.2), rnd(-1, 0), "#9a9080", 16, 2, 0.04);
        }
        const M = { idle: 1, walk: 1, crouch: 1, block: 1, atk: 1, cast: 1, super: 1, fatal: 1, jump: 1 }[this.state] ? 1 : 0;
        if (M) {
          if (this.state === "super" || this.state === "cast" || this.state === "atk") this.running = 0;
          let mv = 0;
          if (!stunned && ["idle", "walk", "jump"].includes(this.state)) {
            if (c.l && !c.r) mv = -1;
            else if (c.r && !c.l) mv = 1;
          }
          if (this.onGround && this.run > 0 && this.running && ["idle", "walk"].includes(this.state)) {
            mv = this.running;
            this.run -= 0.6;
            if (this.run <= 0) this.running = 0;
          } else this.run = Math.min(100, this.run + 0.25);
          if (!c.l && !c.r) this.running = 0;
          if (this.onGround) {
            if ((c.pl || c.pr) && FR - this.lastTap < 16 && this.tapDir === (c.pl ? -1 : 1) && this.run > 10) {
              this.running = c.pl ? -1 : 1;
              SFX.swing();
              for (let i = 0; i < 4; i++) P(this.x, FL + GR - 3, rnd(-1, 1), rnd(-1.4, -0.3), "#9a9080", 14, 2, 0.06);
            }
            if (c.pl || c.pr) {
              this.lastTap = FR;
              this.tapDir = c.pl ? -1 : 1;
            }
          }
          this.vx = mv * (this.running ? d.spd * 2.3 : d.spd);
          if (this.running && this.onGround && FR % 4 === 0) {
            P(this.x - this.running * 8, FL + GR - 2, -this.running * rnd(0.2, 0.6), rnd(-1, -0.2), "#9a9080", 16, 1, 0.05);
            if (FR % 12 === 0) spriteFx("dustRun", this.x - this.running * 8, FL + GR, { scale: 0.9, alpha: 0.35 });
          } else if (this.state === "walk" && this.onGround && FR % Math.max(8, Math.round(3.5 / (WM[d.id] ? WM[d.id][0] : 0.22))) === 0) SFX.step();
          if (mv && this.onGround && this.state === "idle") this.state = "walk";
          if (!mv && this.state === "walk") this.state = "idle";
          if (this.onGround && c.d && ["idle", "walk"].includes(this.state)) this.state = "crouch";
          if (this.state === "crouch" && !c.d) this.state = "idle";
          if (!stunned && this.onGround && c.pu && ["idle", "walk"].includes(this.state)) {
            if (this.motionPrefix()) this.jumpGrace = 4;
            else this.jump();
          }
          if (this.jumpGrace > 0) {
            this.jumpGrace--;
            if (this.jumpGrace === 0 && this.onGround && ["idle", "walk", "crouch"].includes(this.state)) this.jump();
          } else if (!this.onGround && c.pu) this.jbuf = 8;
          else if (this.jbuf > 0) this.jbuf--;
          if (this.onGround && c.B && ["idle", "walk", "crouch"].includes(this.state)) this.state = "block";
          else if (this.state === "block" && !c.B) this.state = c.d ? "crouch" : "idle";
          this.blockLow = this.state === "block" ? !!c.d : 0;
          if (!stunned && ["idle", "walk", "crouch", "block"].includes(this.state) && this.onGround && (c.pP || c.pK)) {
            const btn = c.pP ? "P" : "K", fwd = this.face > 0 ? c.r : c.l, back = this.face > 0 ? c.l : c.r;
            if (this.rage >= 100 && this.ctrl.match("DDP", 60)) this.startSuper();
            else if (this.ctrl.matchRel(d.spec, this.face, 60)) this.startSpec(foe);
            else if (this.ctrl.matchRel(d.spec2, this.face, 60)) this.startSpec2(foe);
            else if (c.pP && c.pK) {
              if (c.d || this.def.grappler && fwd) this.startCmdThrow();
              else this.startAtk("throw");
            } else if (!c.d && fwd && btn === "P") this.startCmd("fP");
            else if (!c.d && fwd && btn === "K") this.startCmd("fK");
            else if (!c.d && back && btn === "P") this.startCmd("bP");
            else if (btn === "P") this.startAtk(c.d ? "upper" : "punch");
            else if (c.d) this.startAtk("sweep");
            else this.startAtk(c.l && !c.r && this.face > 0 || c.r && !c.l && this.face < 0 ? "rh" : "kick");
          }
          if (this.state === "jump" && (c.pP || c.pK)) {
            if (this.ctrl.matchRel(d.spec, this.face, 60)) this.startSpec(foe);
            else if (this.ctrl.matchRel(d.spec2, this.face, 60)) this.startSpec2(foe);
            else this.startAtk("jkick");
          }
        } else this.vx *= 0.98;
        if (this.state === "hit") {
          this.vx = this.hvx;
          if (this.st > 18 && this.onGround) {
            this.state = "idle";
            this.vx = 0;
          }
        }
        if (this.state === "down") {
          this.tilt = lerp(this.tilt, -1.4, 0.2);
          this.vx *= 0.9;
          if (this.st > 40) {
            this.state = "getup";
            this.st = 0;
            this.invuln = 8;
          }
        } else if (this.state === "getup") {
          this.tilt = lerp(this.tilt, 0, 0.15);
          if (this.st > 18) {
            this.state = "idle";
            this.tilt = 0;
          }
        } else if (this.onGround) this.tilt = lerp(this.tilt, 0, 0.3);
        this.vy += 0.42;
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > FL + GR) {
          if (this.vy > 3) {
            SFX.land();
            spriteFx("dust", this.x, FL + GR, { scale: 1, alpha: 0.55 });
            for (let i = 0; i < 5; i++) P(this.x + rnd(-8, 8), FL + GR - 2, rnd(-1, 1), rnd(-1.2, -0.2), "#9a9080", 20, 2, 0.05);
            this.squash = 0.82;
          }
          this.y = FL + GR;
          this.vy = 0;
          if (this.state === "jump") this.state = "idle";
          if (this.state === "idle" && this.jbuf > 0) {
            this.vy = -d.jmp;
            this.state = "jump";
            this.jbuf = 0;
            SFX.jump();
          }
          if (this.state === "atk" && this.atk && this.atk.t === "jkick") {
            this.state = "idle";
            this.atk = null;
          }
        }
        this.x = clamp2(this.x, 16, AW - 16);
        if ((this.state === "down" || this.state === "hit") && Math.abs(this.vx) > 3 && (this.x <= 17 || this.x >= AW - 17)) {
          this.vx *= -0.55;
          S.shake = Math.max(S.shake, 4);
          SFX.hitH();
          blood(this.x, this.y - 30, 4, 1);
        }
        const dx = this.x - foe.x;
        if (Math.abs(dx) < 16 && Math.abs(this.y - foe.y) < 40) {
          const push = (16 - Math.abs(dx)) / 2 * (dx < 0 ? -1 : 1);
          this.x += push;
          foe.x -= push;
          this.x = clamp2(this.x, 16, AW - 16);
          foe.x = clamp2(foe.x, 16, AW - 16);
        }
        if (["idle", "walk", "crouch", "block"].includes(this.state)) this.face = foe.x < this.x ? -1 : 1;
        if (this.state === "atk" && this.atk) {
          const A = this.atk.A;
          if (c.pP) {
            this.abuf = 8;
            this.abufB = "punch";
          } else if (c.pK) {
            this.abuf = 8;
            this.abufB = c.d ? "sweep" : "kick";
          } else if (this.abuf > 0) this.abuf--;
          if (this.st > A.wd && this.st <= A.wd + A.ac && !this.atk.hit && foe.state !== "down") {
            const hb = this.atkBox();
            if (hb && hitR(hb, foe.box) && (!A.throw || foe.onGround && ["idle", "walk", "block"].includes(foe.state))) {
              const res = resolveHit(this, foe, A.d, { launch: A.launch, low: A.low, overhead: A.overhead, throw: A.throw, knock: A.knock, grab: A.grab, kb: A.kb, status: A.status, chain: this.atk.chainPart, target: this.atk.target });
              this.atk.hit = 1;
              this.atk.blocked = res === "block" ? 1 : 0;
              this.atk.connected = res === "hit" || res === "grab" ? 1 : 0;
              this.atk.grabbed = res === "grab" ? foe : 0;
            }
          }
          if (this.atk.t === "throw" && this.atk.grabbed && !this.atk.thrown && this.st >= A.wd + A.ac + 8) this.finishThrow(this.atk.grabbed);
          if (this.st === A.wd + A.ac && !this.atk.hit) {
            SFX.whiff();
            const hb = this.atkBox();
            S.fx.push({ ty: "whiff", x: hb ? hb.x + hb.w / 2 : this.x + this.face * 22, y: hb ? hb.y + hb.h / 2 : this.y - this.def.h * 0.6, face: this.face, t: 0, life: 12, col: this.def.acc || "#cfe8ff" });
          }
          if (this.atk.hit && this.atk.connected && !this.atk.blocked && !this.atk.cancel && !A.throw && this.st > A.wd + A.ac && this.st <= A.wd + A.ac + 10 && this.onGround) {
            if (this.ctrl.matchRel(d.spec, this.face, 60)) {
              this.atk.cancel = 1;
              this.startSpec(foe);
            } else if (this.ctrl.matchRel(d.spec2, this.face, 60)) {
              this.atk.cancel = 1;
              this.startSpec2(foe);
            }
          }
          if (this.state === "atk" && this.st > A.wd + A.ac + A.rc) {
            if (this.abuf > 0 && this.onGround) {
              this.abuf = 0;
              this.startAtk(this.abufB);
            } else {
              this.state = "idle";
              this.atk = null;
            }
          }
        }
        if (this.state === "cast" && this.st === 14) {
          if (this.spec2go) {
            this.fireSpec2(foe);
            this.spec2go = 0;
          } else this.fireSpec(foe);
        }
        if (this.state === "cast" && this.st > 28) this.state = "idle";
        if (this.state === "frozen") {
          this.frozen--;
          if (this.frozen <= 0) this.state = "idle";
        }
        if (this.state === "net") {
          this.netT--;
          if (this.netT <= 0) this.state = "idle";
        }
      }
      atkBox() {
        if (!this.atk) return null;
        const A = this.atk.A, d = this.def, w = (A.hw || A.rng) * d.bulk;
        if (this.atk.t === "jkick") return { x: this.x + (this.face > 0 ? 4 : -4 - w), y: this.y - d.h * 0.05, w: w + 6, h: d.h * 0.6 };
        return { x: this.x + (this.face > 0 ? 4 : -4 - w), y: this.y - d.h * A.hh - (this.atk.t === "sweep" ? 0 : 6), w: w + 6, h: this.atk.t === "sweep" ? 12 : this.atk.t === "upper" ? 34 : 14 };
      }
      finishThrow(foe) {
        const d = this.def, cmd = !!(this.atk && this.atk.cmdThrow), type = cmd ? d.throwCmdT || d.throwT || "slam" : d.throwT || "slam", col = d.throwC || d.acc || "#f8d060", dmg = cmd ? d.throwCmdD || (d.throwD || 10) + 1 : d.throwD || 10, name = cmd ? d.throwCmdN || d.throwN : d.throwN, launch = type === "star";
        foe.grabbedBy = 0;
        this.throwTarget = 0;
        const res = resolveHit(this, foe, dmg, { throw: 1, knock: !launch, launch: launch ? 1 : 0 });
        this.atk.thrown = 1;
        this.atk.grabbed = 0;
        if (res !== "hit") return;
        foe.x = clamp2(this.x + this.face * (launch ? 22 : 34), 16, AW - 16);
        foe.y = this.y - 4;
        foe.vy = launch ? -9 : -3.6;
        foe.vx = this.face * (launch ? 4.5 : 5);
        this.x = clamp2(this.x - this.face * 3, 16, AW - 16);
        this.squash = 0.86;
        S.shake = Math.max(S.shake, type === "slam" || type === "blast" || type === "royal" ? 7 : 4);
        S.fx.push({ ty: "ring", x: foe.x, y: foe.y - foe.def.h * 0.55, t: 0, col });
        S.fx.push({ ty: "name", x: this.x + this.face * 10, y: this.y - this.def.h - 10, txt: name, col, life: 60, t: 0 });
        if (type === "fire") {
          SFX.fire();
          foe.poison = 50;
          foe.poisonC = col;
        } else if (type === "shadow") {
          SFX.tele();
          this.invis = 24;
          smoke(this.x, this.y - 30);
        } else if (type === "shock") {
          SFX.zap();
          foe.blockStun = 12;
        } else if (type === "slam") {
          SFX.bone();
        } else if (type === "claw") {
          SFX.slash();
          foe.poison = 60;
          foe.poisonC = col;
        } else if (type === "sand") {
          SFX.mirror();
        } else if (type === "ice") {
          SFX.ice();
          S.fx.push({ ty: "nova", x: foe.x, y: foe.y - 30, t: 0 });
        } else if (type === "blast") {
          SFX.boom();
        } else if (type === "drain") {
          SFX.sting();
          this.hp = Math.min(100, this.hp + 6);
          S.fx.push({ ty: "drain", x: foe.x, y: foe.y, t: 0 });
        } else if (type === "royal") {
          SFX.sting();
          S.flashS = Math.max(S.flashS, 4);
        } else if (type === "blood") {
          SFX.sting();
          foe.poison = 70;
          foe.poisonC = col;
          blood(foe.x, foe.y - foe.def.h * 0.5, 8, 1.2);
        } else if (type === "blade") {
          SFX.slash();
          blood(foe.x, foe.y - foe.def.h * 0.5, 9, 1.3);
        } else if (type === "star") {
          SFX.cast2();
        }
        for (let i = 0; i < 10; i++) P(foe.x + rnd(-12, 12), foe.y - rnd(8, 50), rnd(-2, 2), rnd(-2.5, 0), col, 24, 2, -0.01);
      }
      startSpec(foe) {
        this.state = "cast";
        this.st = 0;
        this.face = foe.x < this.x ? -1 : 1;
        this.spec2go = 0;
        this.jumpGrace = 0;
        this.chain = "";
        this.chainT = 0;
        SFX.cast();
      }
      startSpec2(foe) {
        this.state = "cast";
        this.st = 0;
        this.face = foe.x < this.x ? -1 : 1;
        this.spec2go = 1;
        this.jumpGrace = 0;
        this.chain = "";
        this.chainT = 0;
        SFX.cast2();
      }
      // 08.09: второй спец — тот же каст, флаг spec2go выбирает ветку в fireSpec
      startSuper() {
        this.state = "super";
        this.st = 0;
        this.rage = 0;
        this.armor = this.def.boss ? 20 : 12;
        this.supEv = [];
        this.invis = 0;
        this.jumpGrace = 0;
        this.chain = "";
        this.chainT = 0;
        S.flashS = Math.max(S.flashS, 4);
        S.shake = Math.max(S.shake, 4);
        SFX.supwave();
        const sy = this.y - this.def.h * 0.55;
        S.fx.push({ ty: "super", x: this.x, y: sy, gy: this.y, t: 0, life: 26, col: this.def.acc || "#e8c040" });
        for (let i = 0; i < 18; i++) {
          const a = i / 18 * Math.PI * 2;
          P(this.x + Math.cos(a) * 7, sy + Math.sin(a) * 7, Math.cos(a) * rnd(1.2, 3), Math.sin(a) * rnd(1.2, 3), i % 2 ? this.def.acc : "#f8e8b0", 26, 2, -0.02);
        }
        const me = this;
        const E = (t, fn) => this.supEv.push({ t, fn, done: 0 });
        const id = this.def.id;
        if (this.def.boss) {
          SFX.fire();
          SFX.boom();
          S.shake = 6;
          for (let i = 0; i < 8; i++) E(14 + i * 7, () => {
            S.projs.push({ ty: "meteor", x: clamp2(me.foe.x + rnd(-54, 54), 20, AW - 20), y: -10, vx: 0, vy: 5.8, o: me, d: 3.4, l: 120 });
            SFX.shoot();
          });
          E(74, () => {
            S.shake = 8;
            S.flashS = Math.max(S.flashS, 4);
            for (let i = 0; i < 18; i++) {
              const a = i / 18 * Math.PI * 2;
              P(me.x + Math.cos(a) * 8, me.y - 30 + Math.sin(a) * 8, Math.cos(a) * rnd(1, 3), Math.sin(a) * rnd(1, 3), "#f0c850", 30, 2, -0.02);
            }
          });
        } else if (id === 0) {
          SFX.fire();
          for (let i = 0; i < 10; i++) E(14 + i * 7, () => {
            S.projs.push({ ty: "meteor", x: me.foe.x + rnd(-34, 34), y: -10, vx: 0, vy: 5.5, o: me, d: 2.6, l: 120 });
            SFX.shoot();
          });
        } else if (id === 1) {
          E(10, () => {
            me.x = clamp2(me.foe.x - me.foe.face * 26, 20, AW - 20);
            smoke(me.x, me.y - 30);
            SFX.tele();
          });
          for (let i = 0; i < 8; i++) E(20 + i * 6, () => {
            autoHit(me, 3);
            SFX.slash();
          });
          E(78, () => resolveHit(me, me.foe, 8, { launch: 1 }));
        } else if (id === 2) {
          for (let i = 0; i < 6; i++) E(14 + i * 9, () => {
            S.projs.push({ ty: "bolt", x: me.foe.x + rnd(-30, 30), y: FL, vx: 0, vy: 0, o: me, d: 3.4, l: 14 });
            SFX.zap();
          });
        } else if (id === 3) {
          for (let i = 0; i < 6; i++) E(14 + i * 10, () => {
            const rx = me.foe.x + rnd(-24, 24);
            S.fx.push({ ty: "rock", x: rx, t: 0 });
            SFX.bone();
            S.shake = 6;
            if (Math.abs(me.foe.x - rx) < 26 && me.foe.onGround && me.foe.state !== "down") resolveHit(me, me.foe, 4, {});
          });
        } else if (id === 4) {
          E(10, () => {
            me.x = clamp2(me.foe.x - me.foe.face * 24, 20, AW - 20);
            smoke(me.x, me.y - 30);
            SFX.tele();
          });
          for (let i = 0; i < 15; i++) E(18 + i * 4, () => {
            autoHit(me, 1.7);
            SFX.slash();
          });
          E(85, () => resolveHit(me, me.foe, 9, { launch: 1 }));
        } else if (id === 5) {
          SFX.tele();
          SFX.mirror();
          E(10, () => {
            me.x = clamp2(me.foe.x - me.foe.face * 30, 20, AW - 20);
            smoke(me.x, me.y - 30);
            SFX.tele();
          });
          for (let i = 0; i < 9; i++) E(16 + i * 7, () => {
            autoHit(me, 2.6);
            SFX.hit();
          });
          E(85, () => resolveHit(me, me.foe, 8, { launch: 1 }));
        } else if (id === 6) {
          E(14, () => {
            SFX.ice();
            S.fx.push({ ty: "nova", x: me.x, y: me.y - 30, t: 0 });
            if (Math.abs(me.foe.x - me.x) < 95) {
              resolveHit(me, me.foe, 6, {});
              me.foe.frozen = 90;
              me.foe.state = "frozen";
              me.foe.atk = null;
              SFX.freeze();
            } else {
              const oh = castOrigin(me);
              S.projs.push({ ty: "ice", x: oh.x, y: oh.y, vx: me.face * 6.5, vy: 0, o: me, d: 6, l: 120, frz: 1 });
              SFX.ice();
            }
            for (let i = 0; i < 14; i++) P(me.x, me.y - 30, Math.cos(i / 14 * 6.28) * 3.4, Math.sin(i / 14 * 6.28) * 3.4, "#c8ecff", 30, 2, 0);
          });
        } else if (id === 7) {
          for (let i = 0; i < 8; i++) E(14 + i * 8, () => {
            SFX.shoot();
            const oh = castOrigin(me);
            S.projs.push({ ty: "bomb", x: oh.x, y: oh.y - 4, vx: me.face * rnd(2, 4.4), vy: -4.5, o: me, d: 3, l: 130 });
          });
        } else if (id === 8) {
          SFX.sting();
          S.fx.push({ ty: "drain", x: me.foe.x, t: 0 });
          for (let i = 0; i < 8; i++) E(16 + i * 8, () => {
            const f = me.foe;
            if (S.battle.phase === "fight" && !f.defeated && f.hp > 0 && f.armor <= 0) {
              f.hp = Math.max(0, f.hp - 3);
              f.damageTaken = (f.damageTaken || 0) + 3;
              f.flash = 4;
              f.state = "hit";
              f.st = 0;
              f.atk = null;
              f.spec2go = 0;
              f.netT = 0;
              me.hp = Math.min(100, me.hp + 1.6);
              f.rage = Math.min(100, f.rage + 2.7);
              for (let j = 0; j < 3; j++) P(f.x + rnd(-8, 8), f.y - rnd(10, 50), (me.x - f.x) * 0.05, rnd(-1, -0.2), "#7a3aa8", 34, 2, 0);
              SFX.hit();
            }
          });
        } else if (id === 10) {
          SFX.sting();
          for (let i = 0; i < 7; i++) E(14 + i * 6, () => {
            const oh = castOrigin(me);
            S.projs.push({ ty: "shard", c: "#d82040", x: oh.x, y: oh.y + Math.sin(i * 2.1) * 10, vx: me.face * 8, vy: (me.foe.y - me.def.h * 0.5 - oh.y) / 9, o: me, d: 2.3, l: 60, s: 4 });
            SFX.slash();
            for (let j = 0; j < 3; j++) P(me.foe.x + rnd(-12, 12), me.foe.y - rnd(10, 55), rnd(-1.5, 1.5), rnd(-2, 0), "#d82040", 26, 2, 0);
          });
          E(80, () => resolveHit(me, me.foe, 10, { launch: 1 }));
        } else if (id === 11) {
          SFX.tele();
          E(10, () => {
            me.x = clamp2(me.foe.x - me.foe.face * 26, 20, AW - 20);
            smoke(me.x, me.y - 30);
            SFX.tele();
          });
          for (let i = 0; i < 10; i++) E(16 + i * 5, () => {
            autoHit(me, 2.2);
            SFX.slash();
            for (let j = 0; j < 2; j++) P(me.foe.x + rnd(-10, 10), me.foe.y - rnd(10, 55), rnd(-1.2, 1.2), rnd(-2, 0), "#9adcee", 24, 2, 0);
          });
          E(78, () => resolveHit(me, me.foe, 9, { launch: 1 }));
        } else if (id === 12) {
          SFX.cast2();
          for (let i = 0; i < 3; i++) E(14 + i * 10, () => {
            SFX.shoot();
            const oh = castOrigin(me);
            S.projs.push({ ty: "shard", c: "#b89aff", x: oh.x, y: oh.y - 4, vx: me.face * 3.2, vy: -2.6, o: me, d: 8, l: 130, s: 5, hom: 1 });
          });
        } else {
          for (let i = 0; i < 6; i++) E(14 + i * 8, () => {
            S.projs.push({ ty: "rocket", x: me.foe.x + rnd(-30, 30), y: -8, vx: 0, vy: 4.6, o: me, d: 4, l: 120 });
            SFX.shoot();
          });
        }
        this.superDur = 110;
      }
      fireSpec(foe) {
        const d = this.def;
        this.face = foe.x < this.x ? -1 : 1;
        const h = castOrigin(this), x = h.x, y = h.y;
        castBurst(x, y, d.acc, d.boss ? 1.25 : 1);
        if (d.boss) {
          SFX.boom();
          S.shake = 6;
          for (let i = -1; i <= 1; i++) S.projs.push({ ty: "shard", c: "#f0c850", x, y: y + i * 8, vx: this.face * (5.2 + Math.abs(i) * 0.6), vy: i * 0.8, o: this, d: 5, l: 100, s: 6, k: 1 });
          return;
        }
        switch (d.id) {
          case 0:
            S.projs.push({ ty: "fire", x, y, vx: this.face * 4, vy: 0, o: this, d: 7, l: 110 });
            SFX.fire();
            break;
          // 08.09: баланс — снаряды слабее ударов в упор
          case 1:
            this.x = clamp2(foe.x - foe.face * 30, 20, AW - 20);
            smoke(this.x, this.y - 30);
            SFX.tele();
            break;
          case 2:
            S.fx.push({ ty: "castbolt", x, y, t: 0 });
            S.projs.push({ ty: "bolt", x: foe.x, y: FL, vx: 0, vy: 0, o: this, d: 8, l: 16 });
            SFX.zap();
            break;
          // 30.09: болт + канал из руки
          // 08.09: баланс Вольта — болт бьёт по позиции врага без промаха, 9→8
          case 3:
            S.projs.push({ ty: "wave", x: this.x + this.face * 18, y: FL + GR - 12, vx: this.face * 3.4, vy: 0, o: this, d: 8, l: 90, c: "#a07840" });
            SFX.boom();
            S.shake = 4;
            break;
          // 08.09: волна создавалась с y:0 — хитбокс у земли, приём никогда не попадал; баланс 9→8
          case 4:
            if (Math.abs(foe.x - this.x) < 44 * d.bulk) {
              resolveHit(this, foe, 5, {});
              foe.poison = 200;
              SFX.slash();
            }
            for (let i = 0; i < 5; i++) P(this.x + this.face * 30, y, rnd(-1, 1) + this.face, rnd(-2, 0), "#7ac83a", 24, 2);
            break;
          case 5:
            this.invis = 130;
            smoke(this.x, this.y - 30);
            SFX.tele();
            break;
          case 6:
            S.projs.push({ ty: "ice", x, y, vx: this.face * 3.6, vy: 0, o: this, d: 6, l: 110 });
            SFX.ice();
            break;
          // 08.09: баланс 7→6
          case 7:
            S.projs.push({ ty: "net", x, y, vx: this.face * 3, vy: 0, o: this, d: 4, l: 120 });
            SFX.net();
            break;
          // 08.09: баланс Ржавого — сеть даёт бесплатное комбо, урон 5→4
          case 8:
            S.projs.push({ ty: "shadow", x, y, vx: this.face * 3.4, vy: 0, o: this, d: 6, l: 110 });
            SFX.tele();
            break;
          // 08.09: баланс 8→6
          case 10:
            for (let i = -1; i <= 1; i++) S.projs.push({ ty: "shard", c: "#d82040", x, y: y + i * 6, vx: this.face * 6.2, vy: i * 0.9, o: this, d: 4, l: 90, s: 3, bl: 1 });
            SFX.slash();
            break;
          // 30.09: Кровавые иглы — быстрый веер с кровотечением
          case 11:
            S.projs.push({ ty: "shard", c: "#9adcee", x, y, vx: this.face * 5.5, vy: 0, o: this, d: 7, l: 75, s: 7 });
            SFX.slash();
            break;
          // 30.09: Полумесяц — серп клинка, дальность до ~410px
          case 12:
            this.marks = this.marks || [];
            if (this.marks.length >= 2) this.marks.shift();
            this.marks.push({ x: clamp2(this.x + this.face * 46, 20, AW - 20), y: this.y });
            SFX.cast2();
            for (let i = 0; i < 6; i++) P(this.x + this.face * 46 + rnd(-8, 8), this.y - rnd(0, 40), 0, rnd(-0.5, -0.1), "#b89aff", 26, 2, 0);
            break;
          // 30.09: Звёздная метка — до двух на арене
          case 9:
            S.projs.push({ ty: "wave", x: this.x + this.face * 18, y: FL + GR - 12, vx: this.face * 4, vy: 0, o: this, d: 9, l: 90, c: "#c8d060" });
            SFX.boom();
            S.shake = 5;
            break;
          // 25.10: ветка Кайзера явная; баланс 10→9
          default:
            throw new Error("Unknown fighter spec: " + d.id);
        }
      }
      fireSpec2(foe) {
        const d = this.def;
        this.face = foe.x < this.x ? -1 : 1;
        const h = castOrigin(this), x = h.x, y = h.y;
        castBurst(x, y, d.acc, d.boss ? 1.25 : 1);
        if (d.boss) {
          SFX.bone();
          S.shake = 5;
          for (let i = 0; i < 5; i++) S.projs.push({ ty: "meteor", x: clamp2(foe.x + rnd(-52, 52), 20, AW - 20), y: -10 - i * 22, vx: 0, vy: 5.6, o: this, d: 4, l: 120 });
          return;
        }
        switch (d.id) {
          case 0:
            SFX.fire();
            for (let i = -1; i <= 1; i++) S.projs.push({ ty: "shard", c: "#f06020", x, y, vx: this.face * 4.5, vy: i * 1.1, o: this, d: 4, l: 90, s: 4 });
            break;
          // Огненный веер
          case 1:
            this.x = clamp2(foe.x - foe.face * 28, 20, AW - 20);
            this.face = foe.face;
            this.invis = 40;
            smoke(this.x, this.y - 30);
            SFX.tele();
            this.startAtk("kick");
            break;
          // Хватка тени — телепорт за спину, лицом к затылку врага
          case 2:
            S.fx.push({ ty: "castbolt", x, y, t: 0 });
            for (const off of [-30, 0, 30]) S.projs.push({ ty: "bolt", x: clamp2(foe.x + off, 20, AW - 20), y: FL, vx: 0, vy: 0, o: this, d: 5, l: 16 });
            SFX.zap();
            break;
          // Грозовой столб + канал из руки
          case 3:
            for (let i = 0; i < 3; i++) S.projs.push({ ty: "meteor", x: clamp2(foe.x + rnd(-44, 44), 20, AW - 20), y: -10 - i * 30, vx: 0, vy: 5.5, o: this, d: 6, l: 120 });
            SFX.bone();
            break;
          // Камнепад
          case 4:
            for (let i = 0; i < 3; i++) S.projs.push({ ty: "shard", c: "#7ac83a", x, y: y + i * 8 - 8, vx: this.face * 6, vy: 0, o: this, d: 4, l: 80, s: 3 });
            SFX.slash();
            break;
          // Рой клинков
          case 5:
            S.projs.push({ ty: "shard", c: "#c8a060", x, y, vx: this.face * 2.6, vy: 0, o: this, d: 7, l: 110, s: 6, k: 1 });
            SFX.tele();
            break;
          // Песчаный жернов — валит с ног
          case 6:
            for (let i = 0; i < 3; i++) S.projs.push({ ty: "shard", c: "#c8ecff", x, y: y + i * 10 - 10, vx: this.face * 5, vy: 0, o: this, d: 3, l: 80, s: 3 });
            SFX.ice();
            break;
          // Ледяные иглы
          case 7:
            S.projs.push({ ty: "bomb", x, y: y - 10, vx: this.face * 3.2, vy: -5, o: this, d: 6, l: 130 });
            S.projs.push({ ty: "bomb", x, y: y - 10, vx: this.face * 1.8, vy: -4, o: this, d: 6, l: 130 });
            SFX.shoot();
            break;
          // Двойная граната
          case 8:
            S.projs.push({ ty: "shard", c: "#7a3aa8", x, y, vx: this.face * 2.8, vy: 0, o: this, d: 5, l: 110, s: 5, pois: 1 });
            SFX.sting();
            break;
          // Проклятие — отравление
          case 10:
            for (let i = 0; i < 3; i++) S.projs.push({ ty: "shard", c: "#d82040", x: clamp2(foe.x + rnd(-32, 32), 20, AW - 20), y: FL + GR - 4, vx: 0, vy: -(4.4 + i * 0.5), o: this, d: 5, l: 60, s: 5 });
            SFX.bone();
            S.shake = 3;
            break;
          // 30.09: Кровавые шипы — взмывают из земли под врагом
          case 11: {
            const ox = this.x;
            this.x = clamp2(foe.x + foe.face * 30, 20, AW - 20);
            smoke(ox, this.y - 30);
            smoke(this.x, this.y - 30);
            SFX.tele();
            this.face = foe.x < this.x ? -1 : 1;
            if (foe.state !== "down") {
              resolveHit(this, foe, 6, {});
              foe.poison = 150;
              foe.poisonC = "#b01818";
            }
            break;
          }
          // 30.09: Сквозь тень — проход сквозь врага, удар в спину с кровотечением
          case 12: {
            this.marks = this.marks || [];
            if (this.marks.length) {
              const m = this.marks.pop();
              smoke(this.x, this.y - 30);
              this.x = clamp2(m.x, 20, AW - 16);
              smoke(this.x, this.y - 30);
              SFX.tele();
              for (let i = 0; i < 8; i++) P(this.x + rnd(-10, 10), this.y - rnd(0, 50), rnd(-1, 1), rnd(-1.5, 0.5), "#b89aff", 24, 2, 0);
              if (Math.abs(foe.x - this.x) < 70 && foe.state !== "down" && foe.state !== "victim") {
                resolveHit(this, foe, 6, {});
                S.shake = Math.max(S.shake, 3);
                for (let i = 0; i < 10; i++) P(foe.x + rnd(-14, 14), foe.y - rnd(5, 55), rnd(-1.5, 1.5), rnd(-2, 0.5), "#b89aff", 26, 2, 0);
                SFX.cast2();
              }
            } else {
              this.x = clamp2(foe.x - foe.face * 30, 20, AW - 20);
              smoke(this.x, this.y - 30);
              SFX.tele();
              if (foe.state !== "down") resolveHit(this, foe, 5, {});
            }
            break;
          }
          // без меток — прыжок за спину с ударом
          case 9:
            S.projs.push({ ty: "shard", c: "#f8d060", x, y, vx: this.face * 2.4, vy: 0, o: this, d: 10, l: 110, s: 7, k: 1 });
            SFX.shoot();
            break;
          // Тяжёлый снаряд — медленный, валит
          default:
            throw new Error("Unknown fighter spec: " + d.id);
        }
      }
      updSuper() {
        if (this.state !== "super") return;
        for (const e of this.supEv) if (!e.done && this.st >= e.t) {
          e.done = 1;
          e.fn();
        }
        if (this.st > this.superDur) this.state = "idle";
      }
    }
    return F;
  }

  // src/game/combat.js
  function createCombat({ S, SFX, P, blood, spriteFx, rnd, pick }) {
    function comboScale(f) {
      const chain = f.comboT !== void 0 && f.comboT < 60 ? f.combo || 0 : 0;
      return Math.max(0.55, 1 - chain * 0.07);
    }
    function autoHit(a, dmg) {
      const f = a.foe;
      if (!f || f.hidden || f.dodging || f.defeated) return;
      if (!S.battle || S.battle.phase !== "fight") return;
      if (f.state === "down" || f.state === "victim") return;
      if (f.invuln > 0) return;
      if (Math.abs(f.x - a.x) >= 48) return;
      if (f.armor > 0) {
        f.armor--;
        f.flash = 4;
        SFX.block();
        return;
      }
      if (f.state === "block") {
        f.hp = Math.max(1, f.hp - 1);
        f.damageTaken = (f.damageTaken || 0) + 1;
        a.rage = Math.min(100, a.rage + 1);
        f.rage = Math.min(100, f.rage + 1);
        f.vx = a.face * 2;
        f.hvx = 0;
        SFX.block();
        for (let i = 0; i < 4; i++) P(f.x + f.face * 8, f.y - f.def.h * 0.55, rnd(-1.5, 1.5), rnd(-2, 0), "#fff", 10, 2, 0);
        return;
      }
      let d = dmg * a.def.dmg * comboScale(a);
      f.hp = Math.max(0, f.hp - d);
      f.damageTaken = (f.damageTaken || 0) + d;
      f.flash = 4;
      f.state = "hit";
      f.st = 0;
      f.vx = 0;
      f.hvx = 0;
      f.atk = null;
      f.spec2go = 0;
      f.invis = 0;
      f.netT = 0;
      f.combo = 0;
      f.chain = "";
      f.chainT = 0;
      f.blockStun = 0;
      if (f.frozen > 0) f.frozen = 0;
      a.rage = Math.min(100, a.rage + 2);
      f.rage = Math.min(100, f.rage + d * 0.9);
      a.combo = (a.comboT !== void 0 && a.comboT < 60 ? a.combo : 0) + 1;
      a.comboT = 0;
      if (S.bstat) {
        const k = a === S.battle.p1 ? "1" : "2";
        S.bstat["h" + k]++;
        S.bstat["d" + k] += d;
        S.bstat["c" + k] = Math.max(S.bstat["c" + k], a.combo || 0);
      }
      blood(f.x, f.y - f.def.h * 0.5, Math.min(10, 3 + d), 1);
      for (let i = 0; i < 4; i++) P(f.x + rnd(-10, 10), f.y - rnd(20, 50), rnd(-2, 2), rnd(-2, 0), "#fff", 10, 2, 0);
      S.freeze = Math.max(S.freeze, 3);
      if (f.hp <= 0) S.freeze = Math.max(S.freeze, 12);
      SFX.hit();
    }
    function resolveHit(att, def, dmg, opts) {
      opts = opts || {};
      if (S.battle && ["finish", "fatal", "over", "ko"].includes(S.battle.phase)) return "miss";
      if (def.defeated) return "miss";
      if (def.armor > 0) {
        def.armor--;
        def.flash = 4;
        SFX.block();
        return "miss";
      }
      if (def.state === "super" && def.st < 20) def.rage = Math.min(100, def.rage + 50);
      if (def.invuln > 0) return "miss";
      if (def.dodging) {
        for (let i = 0; i < 5; i++) P(def.x + rnd(-6, 6), def.y - rnd(8, 44), -att.face * rnd(0.6, 1.6), rnd(-1, -0.2), "#9a9080", 14, 2, 0.03);
        SFX.whiff();
        return "miss";
      }
      if (opts.grab) {
        const d2 = dmg * att.def.dmg * comboScale(att);
        def.hp = Math.max(0, def.hp - d2);
        def.damageTaken = (def.damageTaken || 0) + d2;
        def.flash = 4;
        def.state = "grabbed";
        def.st = 0;
        def.vx = 0;
        def.vy = 0;
        def.grabbedBy = att;
        def.atk = null;
        def.spec2go = 0;
        def.invis = 0;
        def.netT = 0;
        def.chain = "";
        def.chainT = 0;
        def.blockStun = 0;
        def.frozen = 0;
        def.face = -att.face;
        att.throwTarget = def;
        att.combo = (att.comboT !== void 0 && att.comboT < 60 ? att.combo : 0) + 1;
        att.comboT = 0;
        att.rage = Math.min(100, att.rage + 2);
        def.rage = Math.min(100, def.rage + d2 * 0.9);
        if (S.bstat) {
          const k = att === S.battle.p1 ? "1" : "2";
          S.bstat["h" + k]++;
          S.bstat["d" + k] += d2;
          S.bstat["c" + k] = Math.max(S.bstat["c" + k], att.combo || 0);
        }
        SFX.hitV();
        S.freeze = Math.max(S.freeze, 2);
        if (def.hp <= 0) S.freeze = Math.max(S.freeze, 12);
        for (let i = 0; i < 4; i++) P(def.x + rnd(-8, 8), def.y - rnd(10, 48), rnd(-1, 1), rnd(-1.5, 0), "#fff", 12, 2, 0.03);
        return "grab";
      }
      if (opts.throw) def.blockStun = 0;
      if (def.state === "block" && !opts.throw && !(opts.low && !def.blockLow || opts.overhead && def.blockLow)) {
        def.hp = Math.max(1, def.hp - 1);
        def.blockStun = 6;
        def.damageTaken = (def.damageTaken || 0) + 1;
        SFX.block();
        att.rage = Math.min(100, att.rage + 1);
        def.rage = Math.min(100, def.rage + 1);
        def.vx = att.face * 2;
        def.hvx = 0;
        att.chain = "";
        att.chainT = 0;
        spriteFx("block", def.x + def.face * 8, def.y - def.def.h * 0.55, { scale: 0.9, alpha: 0.9 });
        for (let i = 0; i < 4; i++) P(def.x + def.face * 8, def.y - def.def.h * 0.55, rnd(-1.5, 1.5), rnd(-2, 0), "#fff", 10, 2, 0);
        return "block";
      }
      let d = dmg * att.def.dmg * comboScale(att);
      if (opts.target) {
        d *= 1.2;
        S.fx.push({ ty: "name", x: att.x + att.face * 10, y: att.y - att.def.h - 20, txt: opts.target.n, col: att.def.acc, life: 45, t: 0 });
        S.shake = Math.max(S.shake, 3);
      }
      if (def.frozen > 0) {
        d *= 1.4;
        def.frozen = 0;
        for (let i = 0; i < 6; i++) P(def.x + rnd(-8, 8), def.y - rnd(10, 50), rnd(-2, 2), rnd(-3, 0), "#c8ecff", 18, 2, 0.04);
      }
      def.hp = Math.max(0, def.hp - d);
      if (def.hp <= 0) S.freeze = Math.max(S.freeze, 12);
      def.blockStun = 0;
      def.damageTaken = (def.damageTaken || 0) + d;
      def.netT = 0;
      def.spec2go = 0;
      def.atk = null;
      def.invis = 0;
      def.chain = "";
      def.chainT = 0;
      att.combo = (att.comboT !== void 0 && att.comboT < 60 ? att.combo : 0) + 1;
      att.comboT = 0;
      if (def.combo >= 3) SFX.cbreak();
      def.combo = 0;
      const ar0 = att.rage;
      att.rage = Math.min(100, att.rage + d * 1.1);
      def.rage = Math.min(100, def.rage + d * 0.9);
      def.flash = 4;
      if (ar0 < 100 && att.rage >= 100) SFX.rdy();
      if (att.combo >= 3) att.rage = Math.min(100, att.rage + att.combo);
      if (att.combo >= 5 && att.combo % 5 === 0) SFX.combo();
      if (S.bstat) {
        const k = att === S.battle.p1 ? "1" : "2";
        S.bstat["h" + k]++;
        S.bstat["d" + k] += d;
        S.bstat["c" + k] = Math.max(S.bstat["c" + k], att.combo || 0);
      }
      blood(def.x, def.y - def.def.h * 0.55, Math.min(14, 3 + d), d > 10 ? 1.6 : 1);
      spriteFx(d > 15 ? "hitHeavy" : "hitLight", def.x, def.y - def.def.h * 0.55, { scale: d > 15 ? 1 : 0.65, alpha: d > 15 ? 0.45 : 0.65 });
      for (let i = 0; i < 6; i++) P(def.x - att.face * 8, def.y - def.def.h * 0.55, rnd(-2.5, 2.5), rnd(-2.5, 1), pick(["#fff", "#f8d060", "#f0a030"]), 10, rnd(1, 2), 0.05);
      S.freeze = def.hp <= 0 ? Math.max(S.freeze, 12) : Math.max(S.freeze, Math.min(6, 2 + d * 0.25));
      const kb = opts.kb || 5;
      def.hitStatus = opts.status || (opts.launch ? "launch" : opts.knock ? "knockdown" : "stagger");
      if (opts.launch) {
        def.vy = -8;
        def.vx = att.face * Math.min(3, kb);
        def.state = "hit";
        def.st = 0;
        def.hvx = att.face * Math.min(3, kb);
        SFX.upper();
        S.shake = 5;
      } else if (def.hp <= 0 && S.battle.phase === "fight") {
        def.state = "hit";
        def.st = 0;
        def.hvx = att.face * 4;
        SFX.hitH();
      } else if ((opts.knock || d > 9 || def.hp <= 0) && !opts.chain) {
        def.state = "down";
        def.st = 0;
        def.vx = att.face * kb;
        def.vy = -5;
        def.hvx = att.face * 3;
        SFX.hitH();
        S.shake = 6;
        S.fx.push({ ty: "ring", x: def.x, y: def.y - def.def.h * 0.55, t: 0, col: "#f8d060" });
      } else {
        def.state = "hit";
        def.st = 0;
        def.hvx = opts.still ? 0 : att.face * Math.min(2.4, kb);
        if (opts.chain) {
          def.vx = 0;
          def.hvx = 0;
        }
        def.vy = def.onGround ? -2 : 0;
        (Math.random() < 0.4 ? SFX.hitV : SFX.hit)();
        S.shake = 2;
      }
      return "hit";
    }
    return { autoHit, resolveHit };
  }

  // src/game/input.js
  var KM1 = { l: "KeyA", r: "KeyD", u: "KeyW", d: "KeyS", P: "KeyJ", K: "KeyK", B: "KeyL" };
  var KM2 = { l: "ArrowLeft", r: "ArrowRight", u: "ArrowUp", d: "ArrowDown", P: "KeyI", K: "KeyO", B: "KeyP" };
  function createInput() {
    const keys = {};
    const TOUCH = { l: 0, r: 0, u: 0, d: 0, P: 0, K: 0, B: 0 };
    class Ctrl {
      constructor(m) {
        this.m = m;
        this.ax = {};
        this.ai = false;
        this.buf = [];
        this._ = {};
      }
      poll(FR) {
        const q = (k) => this.ai ? !!this.ax[k] : !!keys[this.m[k]] || this.m === KM1 && !!TOUCH[k];
        const o = { l: q("l"), r: q("r"), u: q("u"), d: q("d"), P: q("P"), K: q("K"), B: q("B") };
        this.pP = o.P && !this._.P;
        this.pK = o.K && !this._.K;
        this.pB = o.B && !this._.B;
        this.pl = o.l && !this._.l;
        this.pr = o.r && !this._.r;
        this.pu = o.u && !this._.u;
        this.pd = o.d && !this._.d;
        this._ = o;
        Object.assign(this, o);
        const push = (k) => this.buf.push({ k, t: FR });
        if (this.pP) push("P");
        if (this.pK) push("K");
        if (this.pl) push("L");
        if (this.pr) push("R");
        if (this.pd) push("D");
        if (this.pu) push("U");
        if (this.buf.length > 14) this.buf.splice(0, this.buf.length - 14);
      }
      match(seq, win) {
        win = win || 60;
        const b = this.buf;
        if (typeof seq === "string") seq = seq.split("");
        const n = seq.length;
        if (b.length < n) return false;
        if (b[b.length - 1].t - b[b.length - n].t > win) return false;
        for (let i = 0; i < n; i++) if (b[b.length - n + i].k !== seq[i]) return false;
        return true;
      }
      matchRel(seq, face, win) {
        const mapped = seq.split("").map((k) => k === "R" ? face > 0 ? "R" : "L" : k === "L" ? face > 0 ? "L" : "R" : k);
        return this.match(mapped, win);
      }
      matchRelLoose(seq, face, win) {
        win = win || 60;
        const mapped = seq.split("").map((k) => k === "R" ? face > 0 ? "R" : "L" : k === "L" ? face > 0 ? "L" : "R" : k);
        const b = this.buf, n = mapped.length;
        if (b.length < n) return false;
        for (let start = b.length - n; start >= 0; start--) {
          if (b[b.length - 1].t - b[start].t > win) break;
          let ok = true;
          for (let i = 0; i < n; i++) if (b[start + i].k !== mapped[i]) {
            ok = false;
            break;
          }
          if (ok) return true;
        }
        return false;
      }
      clear() {
        this.buf.length = 0;
      }
    }
    return { keys, TOUCH, KM1, KM2, Ctrl };
  }

  // src/render/ability-fx.js
  var TAU = Math.PI * 2;
  var ACC = {
    0: "#f0a032",
    1: "#9fb4bd",
    2: "#f8f860",
    3: "#c8a060",
    4: "#7ac83a",
    5: "#c8a060",
    6: "#c8ecff",
    7: "#d84a2a",
    8: "#a050d0",
    9: "#f0c850",
    10: "#e02040",
    11: "#9adcee",
    12: "#b89aff"
  };
  function createAbilityFx({ g, S, FL, GR, lerp, rnd, mix }) {
    const GROUND = FL + GR;
    function at(x, y, r, col, alpha) {
      if (r <= 0 || alpha <= 0) return;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, "rgba(255,255,255,.95)");
      gr.addColorStop(0.34, col);
      gr.addColorStop(1, "rgba(0,0,0,0)");
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
      g.scale(1, 0.28);
      at(0, 0, r * (1.18 - h * 0.32), col, alpha * (1 - h * 0.45));
      g.restore();
    }
    function groundShadow(x, y, r, alpha) {
      if (y >= GROUND - 2 || alpha <= 0) return;
      const h = Math.min(1, (GROUND - y) / 160);
      g.save();
      g.globalAlpha = alpha * (1 - h * 0.5);
      g.fillStyle = "#000";
      g.beginPath();
      g.ellipse(x, GROUND - 1, r * (1.2 - h * 0.3), 3.1, 0, 0, TAU);
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
      const n = p.ty === "shard" ? 4 : 5;
      for (let i = 1; i <= n; i++) {
        const k = i * 3.2;
        const tx = x - p.vx / sp * k;
        const ty = y - p.vy / sp * k;
        const a = 0.3 * (1 - i / (n + 1));
        if (kind === "diamond") diamond(tx, ty, 1.5 + (n - i) * 0.22, 3 + (n - i) * 0.35, col, a);
        else if (kind === "square") {
          g.globalAlpha = a;
          g.fillStyle = col;
          g.fillRect(tx - 1, ty - 1, 2, 2);
        } else {
          g.globalAlpha = a;
          g.fillStyle = col;
          g.beginPath();
          g.arc(tx, ty, 1.5 + (n - i) * 0.55, 0, TAU);
          g.fill();
        }
      }
    }
    function drawFire(p, x, y) {
      groundAt(x, y, 25, "#f06020", 0.2);
      g.save();
      g.globalCompositeOperation = "lighter";
      trail(p, x, y, "#f06020", "circle");
      const flick = Math.sin(S.FRAME * 0.45 + p.l * 0.7) * 1.5;
      const dir = p.vx < 0 ? 1 : -1;
      at(x, y, 18 + flick, "#f06020", 0.5);
      g.globalAlpha = 0.85;
      g.fillStyle = "#a03010";
      poly([[x + dir * 2, y - 4], [x + dir * (13 + flick), y - 9 + flick], [x + dir * 10, y - 2], [x + dir * (16 + flick), y], [x + dir * 9, y + 4], [x + dir * 12, y + 8], [x + dir * 2, y + 5]]);
      g.fillStyle = "#f06020";
      poly([[x + dir * 2, y - 3], [x + dir * (9 + flick), y - 5], [x + dir * 6, y], [x + dir * 10, y + 3], [x + dir * 2, y + 4]]);
      g.globalAlpha = 1;
      g.fillStyle = "#3a1008";
      g.beginPath();
      g.arc(x, y, 7, 0, TAU);
      g.fill();
      g.fillStyle = "#f06020";
      g.beginPath();
      g.arc(x, y, 6, 0, TAU);
      g.fill();
      g.fillStyle = "#f8d060";
      g.beginPath();
      g.arc(x + 0.5, y - 0.5, 3.6, 0, TAU);
      g.fill();
      g.fillStyle = "#fff8d0";
      g.fillRect(x - 1, y - 2, 2, 2);
      for (let i = 0; i < 4; i++) {
        const a = S.FRAME * 0.12 + i * 1.7;
        g.globalAlpha = 0.55;
        g.fillStyle = i % 2 ? "#f8d060" : "#f06020";
        g.fillRect(x + Math.cos(a) * (9 + i), y + Math.sin(a) * (7 + i * 0.5), 1.5, 1.5);
      }
      g.restore();
    }
    function drawIce(p, x, y) {
      groundAt(x, y, 20, "#88c8f0", 0.16);
      const ang = Math.atan2(p.vy, p.vx) || (p.vx < 0 ? Math.PI : 0);
      g.save();
      g.globalCompositeOperation = "lighter";
      trail(p, x, y, "#9adcee", "diamond");
      at(x, y, 15, "#88c8f0", 0.42);
      g.restore();
      g.save();
      g.translate(x, y);
      g.rotate(ang + Math.sin(S.FRAME * 0.09) * 0.08);
      g.fillStyle = "#2a5068";
      poly([[12, 0], [2, -5], [-9, -3], [-6, 0], [-9, 3], [2, 5]]);
      g.fillStyle = "#88c8f0";
      poly([[10, 0], [2, -3.8], [-6, -2.2], [-3, 0], [-6, 2.2], [2, 3.8]]);
      g.fillStyle = "#e8f8ff";
      poly([[7, 0], [1, -1.8], [-2, -1], [0, 0], [-2, 1], [1, 1.8]]);
      g.strokeStyle = "#d8f4ff";
      g.lineWidth = 0.7;
      g.beginPath();
      g.moveTo(-1, -1.2);
      g.lineTo(4, -0.2);
      g.stroke();
      g.restore();
      g.save();
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = "rgba(220,248,255,.8)";
      g.lineWidth = 0.8;
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * 0.11 + i * 2.1;
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
      groundAt(x, y, 22, "#7a3aa8", 0.16);
      g.save();
      g.globalCompositeOperation = "lighter";
      trail(p, x, y, "#7a3aa8", "circle");
      at(x, y, 19, "#7a3aa8", 0.38);
      g.strokeStyle = "rgba(160,80,210,.55)";
      g.lineWidth = 1.4;
      const dir = p.vx < 0 ? 1 : -1;
      for (let i = 0; i < 3; i++) {
        const wob = Math.sin(S.FRAME * 0.16 + i * 2) * 3;
        g.beginPath();
        g.moveTo(x, y);
        g.bezierCurveTo(x + dir * 7, y - 7 + wob, x + dir * (14 + i * 3), y + 7 - wob, x + dir * (9 + i * 2), y + 12 + wob);
        g.stroke();
      }
      g.restore();
      g.fillStyle = "#180a24";
      g.beginPath();
      g.arc(x, y, 7.2, 0, TAU);
      g.fill();
      g.fillStyle = "#3a1a5a";
      g.beginPath();
      g.arc(x, y, 5.8, 0, TAU);
      g.fill();
      g.fillStyle = "#7a3aa8";
      g.beginPath();
      g.arc(x - 1, y - 1, 3.2, 0, TAU);
      g.fill();
      g.fillStyle = "#d8b0ff";
      g.fillRect(x - 1, y - 2, 1.5, 1.5);
      g.save();
      g.globalCompositeOperation = "lighter";
      for (let i = 0; i < 3; i++) {
        const a = S.FRAME * 0.1 + i * 2.1;
        g.globalAlpha = 0.55;
        g.fillStyle = "#a050d0";
        g.beginPath();
        g.arc(x + Math.cos(a) * (9 + i * 1.5), y + Math.sin(a) * (6 + i), 1.7, 0, TAU);
        g.fill();
      }
      g.restore();
    }
    function drawBolt(x1, y1, x2, y2, opts = {}) {
      const amp = opts.amp || 5;
      const col = opts.col || "#f8f860";
      const segs = opts.segs || 7;
      const pts = [[x1, y1]];
      for (let i = 1; i < segs; i++) {
        const t = i / segs;
        pts.push([lerp(x1, x2, t) + rnd(-amp, amp), lerp(y1, y2, t) + rnd(-amp * 0.35, amp * 0.35)]);
      }
      pts.push([x2, y2]);
      g.save();
      g.globalCompositeOperation = "lighter";
      g.lineCap = "round";
      g.strokeStyle = "rgba(248,248,96,.14)";
      g.lineWidth = 9;
      line(pts);
      g.strokeStyle = col;
      g.lineWidth = 2.4;
      line(pts);
      g.strokeStyle = "#fffce0";
      g.lineWidth = 0.9;
      line(pts);
      g.lineWidth = 1;
      g.strokeStyle = "rgba(248,248,96,.7)";
      for (let i = 2; i < pts.length - 2; i += 2) {
        if (Math.random() < 0.7) {
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
      const col = id === 3 ? "#a07840" : id === 9 ? "#c8d060" : p.c || "#a07840";
      const dark = mix(col, "#000000", 0.78);
      const mid = mix(col, "#000000", 0.42);
      const light = mix(col, "#ffffff", id === 3 ? 0.24 : 0.38);
      const base4 = GROUND;
      const dir = p.vx < 0 ? -1 : 1;
      g.save();
      g.globalAlpha = 0.34;
      g.fillStyle = "#1a120a";
      g.beginPath();
      g.ellipse(x, base4 + 1, 27, 4.2, 0, 0, TAU);
      g.fill();
      g.globalAlpha = 0.22;
      g.fillStyle = "#8a7a5c";
      for (let i = 0; i < 5; i++) {
        const a = i * 1.7 + S.FRAME * 0.07;
        g.beginPath();
        g.arc(x - dir * (10 + i * 4) + Math.cos(a) * 3, base4 - 3 + Math.sin(a) * 4, 3 + i * 0.7, 0, TAU);
        g.fill();
      }
      g.globalAlpha = 1;
      g.fillStyle = dark;
      poly([[x - dir * 22, base4], [x - dir * 16, base4 - 16], [x - dir * 9, base4 - 26], [x + dir * 2, base4 - 30], [x + dir * 12, base4 - 18], [x + dir * 18, base4]]);
      for (let k = -3; k <= 3; k++) {
        const h = 30 - Math.abs(k) * 4.8 + Math.sin(S.FRAME * 0.34 + k + 0.4) * 2;
        const ox = x + k * 5.6 + dir * h * 0.12;
        g.fillStyle = dark;
        poly([[ox - 7, base4], [ox - 5, base4 - h * 0.38], [ox - 2, base4 - h], [ox + 2, base4 - h * 0.74], [ox + 3, base4 - h * 0.3], [ox + 7, base4]]);
        g.fillStyle = mid;
        poly([[ox - 5, base4 - 1], [ox - 3, base4 - h * 0.42], [ox - 1, base4 - h * 0.86], [ox + 1, base4 - h * 0.52], [ox + 4, base4 - 1]]);
        g.fillStyle = light;
        g.globalAlpha = 0.5;
        poly([[ox - 2, base4 - h * 0.18], [ox - 1, base4 - h * 0.72], [ox + 1, base4 - h * 0.44]]);
        g.globalAlpha = 1;
      }
      g.globalCompositeOperation = "lighter";
      g.globalAlpha = 0.65;
      g.strokeStyle = light;
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(x + dir * 6, base4 - 3);
      g.lineTo(x + dir * 13, base4 - 17);
      g.lineTo(x + dir * 9, base4 - 30);
      g.stroke();
      g.globalAlpha = 0.16;
      g.fillStyle = col;
      g.beginPath();
      g.ellipse(x, base4 - 8, 27, 8, 0, 0, TAU);
      g.fill();
      g.globalAlpha = 0.9;
      g.fillStyle = mid;
      for (let i = 0; i < 4; i++) {
        const bx = x + dir * (15 + i * 5) + Math.sin(S.FRAME * 0.2 + i) * 2;
        const by = base4 - 10 - i * 4 + Math.cos(S.FRAME * 0.25 + i) * 2;
        g.save();
        g.translate(bx, by);
        g.rotate(S.FRAME * 0.08 + i);
        g.fillRect(-2, -1.5, 4, 3);
        g.restore();
      }
      g.globalAlpha = 0.75;
      g.fillStyle = light;
      for (let i = 0; i < 4; i++) {
        const a = i * 1.9 + S.FRAME * 0.11;
        g.fillRect(x + Math.cos(a) * (14 + i * 3), base4 - 8 - Math.sin(a) * 12, 1.5, 1.5);
      }
      g.restore();
      g.fillStyle = "#5a4a38";
      for (let i = 0; i < 5; i++) {
        const a = i * 1.7 + S.FRAME * 0.08;
        g.globalAlpha = 0.65;
        g.fillRect(x + Math.cos(a) * (15 + i * 2), base4 - 5 + Math.sin(a) * 7, 2, 2);
      }
      g.globalAlpha = 1;
      g.strokeStyle = "rgba(40,30,20,.55)";
      g.lineWidth = 1;
      for (let i = -2; i <= 2; i += 2) {
        g.beginPath();
        g.moveTo(x + i * 6, base4);
        g.lineTo(x + i * 11, base4 + 3);
        g.lineTo(x + i * 8, base4 + 5);
        g.stroke();
      }
    }
    function drawMeteor(p, x, y) {
      groundShadow(x, y, 14, 0.35);
      groundAt(x, y, 28, "#f06020", 0.34);
      g.save();
      g.globalCompositeOperation = "lighter";
      for (let i = 1; i <= 5; i++) {
        const ty = y - i * 5.5;
        g.globalAlpha = 0.34 - i * 0.045;
        g.fillStyle = i < 3 ? "#f8d060" : "#f06020";
        g.beginPath();
        g.arc(x + Math.sin(S.FRAME * 0.1 + i) * 1.5, ty, 6 - i * 0.65, 0, TAU);
        g.fill();
      }
      at(x, y, 22, "#f06020", 0.48);
      g.restore();
      g.save();
      g.translate(x, y);
      g.rotate(Math.sin(p.l * 0.09) * 0.35);
      g.fillStyle = "#2a1810";
      poly([[-10, -6], [-5, -12], [3, -10], [9, -4], [7, 6], [0, 10], [-8, 6]]);
      g.fillStyle = "#6a4a32";
      poly([[-8, -5], [-3, -9], [3, -8], [7, -3], [5, 5], [0, 8], [-6, 5]]);
      g.fillStyle = "#9a7a5a";
      poly([[-5, -5], [-1, -7], [2, -6], [0, -2], [-4, -1]]);
      g.strokeStyle = "#f06020";
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
      g.globalCompositeOperation = "lighter";
      g.fillStyle = "#f8d060";
      poly([[x - 5, y - 9], [x - 2, y - 19 + Math.sin(S.FRAME * 0.4) * 3], [x + 1, y - 10]]);
      g.fillStyle = "#f06020";
      poly([[x + 1, y - 8], [x + 5, y - 16], [x + 7, y - 7]]);
      g.restore();
    }
    function drawRocket(p, x, y) {
      groundShadow(x, y, 11, 0.3);
      groundAt(x, y, 17, "#d84030", 0.18);
      g.save();
      g.globalCompositeOperation = "lighter";
      for (let i = 1; i <= 4; i++) {
        g.globalAlpha = 0.26 - i * 0.045;
        g.fillStyle = i < 3 ? "#f8d060" : "#d84030";
        g.beginPath();
        g.arc(x + Math.sin(S.FRAME * 0.1 + i) * 1.2, y - 10 - i * 5, 4 - i * 0.5, 0, TAU);
        g.fill();
      }
      g.fillStyle = "#f8d060";
      poly([[x - 2.5, y - 7], [x, y - 19 + Math.sin(S.FRAME * 0.5) * 3], [x + 2.5, y - 7]]);
      g.restore();
      g.save();
      g.translate(x, y);
      g.rotate(Math.sin(S.FRAME * 0.12) * 0.04);
      g.fillStyle = "#1a1a20";
      g.fillRect(-4, -7, 8, 17);
      g.fillStyle = "#7a8088";
      g.fillRect(-3, -7, 6, 16);
      g.fillStyle = "#b8c0c8";
      g.fillRect(-2, -6, 2, 14);
      g.fillStyle = "#8a2020";
      g.beginPath();
      g.moveTo(-3, 9);
      g.lineTo(0, 14);
      g.lineTo(3, 9);
      g.fill();
      g.fillStyle = "#d84030";
      g.fillRect(-2, 7, 4, 3);
      g.fillStyle = "#3a3a42";
      poly([[-3, -4], [-8, -10], [-3, -8], [-2, -4]]);
      poly([[3, -4], [8, -10], [3, -8], [2, -4]]);
      g.restore();
    }
    function drawBomb(p, x, y) {
      groundShadow(x, y, 9, 0.24);
      g.save();
      g.globalCompositeOperation = "lighter";
      trail(p, x, y, "#6a5a44", "circle");
      for (let i = 1; i <= 3; i++) {
        g.globalAlpha = 0.2 - i * 0.04;
        g.fillStyle = "#6a5a44";
        g.beginPath();
        g.arc(x - p.vx * i * 1.2, y - p.vy * i * 1.2, 3 + i, 0, TAU);
        g.fill();
      }
      g.restore();
      g.save();
      g.translate(x, y);
      g.rotate(p.l * 0.12);
      g.fillStyle = "#17120e";
      g.beginPath();
      g.arc(0, 0, 6.2, 0, TAU);
      g.fill();
      g.fillStyle = "#2a2018";
      g.beginPath();
      g.arc(0, 0, 5.2, 0, TAU);
      g.fill();
      g.fillStyle = "#5a4a3a";
      g.fillRect(-3.5, -4, 5, 1.5);
      g.fillStyle = "#8a7a5a";
      g.fillRect(-2, -3, 2, 1);
      g.fillStyle = "#3a3028";
      g.fillRect(3, -6, 3, 2);
      g.restore();
      const spark = 1 + (S.FRAME % 6 < 3 ? 1 : 0);
      g.save();
      g.globalCompositeOperation = "lighter";
      g.fillStyle = "#f0a030";
      g.fillRect(x + 5, y - 7 + Math.sin(S.FRAME * 0.4), spark + 1, spark);
      g.fillStyle = "#fff0a0";
      g.fillRect(x + 6, y - 7, 1, 1);
      g.restore();
    }
    function drawNet(p, x, y) {
      g.save();
      g.globalCompositeOperation = "lighter";
      trail(p, x, y, "#c8c8a0", "square");
      at(x, y, 14, "#c8c8a0", 0.24);
      g.restore();
      g.save();
      g.translate(x, y);
      g.rotate(S.FRAME * 0.035);
      const s = 9 + (120 - p.l) * 0.05;
      g.strokeStyle = "#8a8a68";
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(0, -s);
      g.lineTo(s, 0);
      g.lineTo(0, s);
      g.lineTo(-s, 0);
      g.closePath();
      g.stroke();
      g.strokeStyle = "#d8d8b0";
      g.lineWidth = 0.75;
      for (let i = -2; i <= 2; i++) {
        const d = i * s / 2.6;
        g.beginPath();
        g.moveTo(d, -s + Math.abs(d) * 0.55);
        g.lineTo(d, s - Math.abs(d) * 0.55);
        g.moveTo(-s + Math.abs(d) * 0.55, d);
        g.lineTo(s - Math.abs(d) * 0.55, d);
        g.stroke();
      }
      g.fillStyle = "#c8c8a0";
      for (const [wx, wy] of [[0, -s], [s, 0], [0, s], [-s, 0]]) {
        g.fillRect(wx - 1.2, wy - 1.2, 2.4, 2.4);
      }
      g.restore();
    }
    function drawShard(p, x, y) {
      const col = p.c || "#f8d060";
      const ang = Math.atan2(p.vy, p.vx) || (p.vx < 0 ? Math.PI : 0);
      const size = p.s || 4;
      const hot = col === "#f06020" || col === "#f8d060" || col === "#f0c850";
      groundAt(x, y, 14, col, 0.12);
      g.save();
      g.globalCompositeOperation = "lighter";
      trail(p, x, y, col, "diamond");
      at(x, y, 10 + size, col, 0.34);
      g.restore();
      g.save();
      g.translate(x, y);
      g.rotate(ang);
      const L = size * 2.5;
      const W = Math.max(1.6, size * 0.78);
      g.fillStyle = mix(col, "#000000", 0.68);
      poly([[L + 1.5, 0], [0, -W - 1.2], [-L * 0.7, -W * 0.4], [-L * 0.5, 0], [-L * 0.7, W * 0.4], [0, W + 1.2]]);
      g.fillStyle = col;
      poly([[L, 0], [0, -W], [-L * 0.58, -W * 0.35], [-L * 0.4, 0], [-L * 0.58, W * 0.35], [0, W]]);
      g.fillStyle = mix(col, "#ffffff", 0.58);
      poly([[L * 0.74, 0], [0, -W * 0.42], [-L * 0.25, -W * 0.12], [-L * 0.1, 0]]);
      g.strokeStyle = mix(col, "#ffffff", 0.28);
      g.lineWidth = 0.7;
      g.beginPath();
      g.moveTo(-L * 0.3, 0);
      g.lineTo(L * 0.45, 0);
      g.stroke();
      g.restore();
      if (p.hom) {
        g.save();
        g.globalCompositeOperation = "lighter";
        g.strokeStyle = "#f0e8ff";
        g.lineWidth = 0.8;
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
        g.globalCompositeOperation = "lighter";
        g.strokeStyle = mix(col, "#ffffff", 0.35);
        g.lineWidth = 1;
        g.beginPath();
        g.arc(x, y, size + 5 + Math.sin(S.FRAME * 0.2) * 1.5, 0, TAU);
        g.stroke();
        g.restore();
      }
      if (hot) {
        g.save();
        g.globalCompositeOperation = "lighter";
        const dir = p.vx < 0 ? 1 : -1;
        g.fillStyle = "#f8d060";
        poly([[x + dir * (size + 1), y - 2], [x + dir * (size + 10), y], [x + dir * (size + 1), y + 2]]);
        g.restore();
      }
    }
    function drawProjs(cam) {
      for (const p of S.projs) {
        const x = p.x - cam;
        const y = p.y;
        if (p.ty === "fire") drawFire(p, x, y);
        else if (p.ty === "ice") drawIce(p, x, y);
        else if (p.ty === "shadow") drawShadow(p, x, y);
        else if (p.ty === "bolt") {
          drawBolt(x, y - 100, x, y, { amp: 6, segs: 8, col: "#f8f860" });
          g.save();
          g.globalCompositeOperation = "lighter";
          at(x, GROUND, 24, "#f8f860", 0.3);
          g.strokeStyle = "#f8f860";
          g.lineWidth = 1.5;
          g.beginPath();
          g.ellipse(x, GROUND, 13, 3.5, 0, 0, TAU);
          g.stroke();
          g.restore();
        } else if (p.ty === "wave") drawWave(p, x);
        else if (p.ty === "meteor") drawMeteor(p, x, y);
        else if (p.ty === "rocket") drawRocket(p, x, y);
        else if (p.ty === "bomb") drawBomb(p, x, y);
        else if (p.ty === "net") drawNet(p, x, y);
        else if (p.ty === "shard") drawShard(p, x, y);
      }
    }
    function drawCastAura(f) {
      if (f.state !== "cast" && f.state !== "super") return;
      const d = f.def;
      const col = ACC[d.id] || d.acc || "#f8d060";
      const isSuper = f.state === "super";
      const p = Math.min(1, f.st / (isSuper ? 30 : 14));
      const gy = GROUND - f.y;
      const cy = -d.h * 0.55;
      g.save();
      g.globalCompositeOperation = "lighter";
      if (isSuper) {
        at(0, cy, 22 + p * 20, col, 0.1);
        g.globalAlpha = 0.11;
        g.strokeStyle = col;
        g.lineWidth = 1.5;
        for (let i = 0; i < 2; i++) {
          const r = 16 + p * 15 + i * 8;
          g.beginPath();
          g.ellipse(0, cy, r, r * 0.38, S.FRAME * 0.03 + i, 0, TAU);
          g.stroke();
        }
        g.globalAlpha = 0.14;
        for (let i = 0; i < 8; i++) {
          const a = i / 8 * TAU + S.FRAME * 0.02;
          g.beginPath();
          g.moveTo(Math.cos(a) * 10, cy + Math.sin(a) * 8);
          g.lineTo(Math.cos(a) * (24 + p * 18), cy + Math.sin(a) * (20 + p * 12));
          g.stroke();
        }
      } else {
        g.globalAlpha = 0.18;
        g.strokeStyle = col;
        g.lineWidth = 1;
        for (let i = 0; i < 2; i++) {
          g.beginPath();
          g.ellipse(0, cy, 10 + p * 8 + i * 6, 14 + p * 9 + i * 5, S.FRAME * 0.04 + i * 0.6, 0, TAU);
          g.stroke();
        }
      }
      if (gy > -4) {
        g.globalAlpha = isSuper ? 0.26 : 0.2;
        g.strokeStyle = col;
        g.lineWidth = 1.4;
        g.beginPath();
        g.ellipse(0, gy, 15 + p * 9, 4 + p * 2, 0, 0, TAU);
        g.stroke();
        g.globalAlpha = 0.1;
        g.fillStyle = col;
        g.beginPath();
        g.ellipse(0, gy, 17 + p * 11, 5 + p * 2.5, 0, 0, TAU);
        g.fill();
      }
      g.restore();
    }
    function drawCastCharge(f, hand) {
      if (f.state !== "cast" && f.state !== "super") return;
      const limit = f.state === "super" ? 24 : 20;
      if (f.st > limit) return;
      const d = f.def;
      const col = ACC[d.id] || d.acc || "#f8d060";
      const col2 = f.spec2go ? mix(col, "#ffffff", 0.45) : col;
      const p = Math.min(1, f.st / 14);
      const fade = f.st <= 14 ? 1 : Math.max(0, 1 - (f.st - 14) / 6);
      const r = 3 + p * 8;
      const hx = hand[0] + (d.bow ? 16 : d.blade ? 13 : d.fan ? 8 : d.claws ? 4 : 0);
      const hy = hand[1];
      g.save();
      g.globalCompositeOperation = "lighter";
      at(hx, hy, r * 3.2, col, 0.3 * fade);
      g.globalAlpha = 0.55 * fade;
      g.strokeStyle = col2;
      g.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        g.beginPath();
        g.arc(hx, hy, r + 2 + i * 2.4, S.FRAME * 0.08 + i * 1.9, S.FRAME * 0.08 + i * 1.9 + 1.6);
        g.stroke();
      }
      g.globalAlpha = 0.35 * fade;
      g.strokeStyle = col2;
      g.lineWidth = 0.8;
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * TAU + S.FRAME * 0.05;
        g.beginPath();
        g.moveTo(hx + Math.cos(a) * (r + 4), hy + Math.sin(a) * (r + 4));
        g.lineTo(hx + Math.cos(a) * (r + 8), hy + Math.sin(a) * (r + 8));
        g.stroke();
      }
      g.globalAlpha = 0.9 * fade;
      g.fillStyle = "#fff8e0";
      g.beginPath();
      g.arc(hx, hy, Math.max(1.2, r * 0.3), 0, TAU);
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
          const ox = Math.sin(S.FRAME * 0.2 + i * 2) * 2;
          g.beginPath();
          g.moveTo(hx - 3 + i * 3, hy + 2);
          g.quadraticCurveTo(hx - 2 + i * 3 + ox, hy - r - 3, hx + 1 + i * 3, hy - r * 0.7);
          g.stroke();
        }
      } else if (id === 1) {
        for (let i = 0; i < 3; i++) {
          const a = S.FRAME * 0.1 + i * 2.1;
          g.beginPath();
          g.moveTo(hx, hy);
          g.quadraticCurveTo(hx + Math.cos(a) * r * 2, hy + Math.sin(a) * r * 2, hx + Math.cos(a + 0.8) * r * 2.6, hy + Math.sin(a + 0.8) * r * 2.6);
          g.stroke();
        }
      } else if (id === 2) {
        for (let i = 0; i < 3; i++) {
          const a = S.FRAME * 0.18 + i * 2.1;
          g.beginPath();
          g.moveTo(hx + Math.cos(a) * (r + 4), hy + Math.sin(a) * (r + 4));
          g.lineTo(hx + Math.cos(a + 0.25) * (r + 1), hy + Math.sin(a + 0.25) * (r + 1));
          g.lineTo(hx + Math.cos(a + 0.5) * (r + 5), hy + Math.sin(a + 0.5) * (r + 5));
          g.stroke();
        }
      } else if (id === 3) {
        for (let i = 0; i < 3; i++) {
          const a = S.FRAME * 0.08 + i * 2.1;
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
          const a = S.FRAME * 0.1 + i * 2.1;
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
          const a = i * 0.42 + S.FRAME * 0.1;
          const rr = 3 + i * 0.65;
          const px = hx + Math.cos(a) * rr;
          const py = hy + Math.sin(a) * rr;
          if (i === 0) g.moveTo(px, py);
          else g.lineTo(px, py);
        }
        g.stroke();
      } else if (id === 6) {
        for (let i = 0; i < 6; i++) {
          const a = i / 6 * TAU + S.FRAME * 0.03;
          const rx = hx + Math.cos(a) * (r + 4);
          const ry = hy + Math.sin(a) * (r + 4);
          diamond(rx, ry, 1.2, 3.2, col, 0.8 * fade);
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
          const a = S.FRAME * 0.08 + i * 2.1;
          g.beginPath();
          g.moveTo(hx + Math.cos(a) * r, hy + Math.sin(a) * r);
          g.bezierCurveTo(
            hx + Math.cos(a + 0.5) * r * 2,
            hy + Math.sin(a + 0.5) * r * 2,
            hx + Math.cos(a + 1) * r * 1.4,
            hy + Math.sin(a + 1) * r * 1.4,
            hx + Math.cos(a + 1.4) * r * 2.6,
            hy + Math.sin(a + 1.4) * r * 2.6
          );
          g.stroke();
        }
      } else if (id === 9) {
        for (let i = 0; i < 8; i++) {
          const a = i / 8 * TAU + S.FRAME * 0.04;
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
          const rr = i % 2 ? r * 0.55 : r + 5;
          const px = hx + Math.cos(a) * rr;
          const py = hy + Math.sin(a) * rr;
          if (i === 0) g.moveTo(px, py);
          else g.lineTo(px, py);
        }
        g.closePath();
        g.stroke();
        for (let i = 0; i < 3; i++) {
          const a = S.FRAME * 0.1 + i * 2.1;
          g.fillRect(hx + Math.cos(a) * (r + 8) - 0.7, hy + Math.sin(a) * (r + 8) - 0.7, 1.4, 1.4);
        }
      }
    }
    return { drawProjs, drawCastAura, drawCastCharge, drawBolt };
  }

  // src/render/render.js
  function createRender({
    g,
    S,
    UI,
    CH: CH2,
    WM: WM2,
    RW,
    FL,
    GR,
    OUT,
    lerp,
    rnd,
    mix,
    shade,
    blink,
    fatalMapped,
    fatalFrames
  }) {
    const abilityFx = createAbilityFx({ g, S, FL, GR, lerp, rnd, mix });
    function drawProjs(cam) {
      abilityFx.drawProjs(cam);
    }
    const drawBolt = abilityFx.drawBolt;
    function drawFx(cam) {
      for (const f of S.fx) {
        const x = f.x - cam;
        if (f.ty === "sprite") {
          const frame2 = Math.min(f.frames - 1, Math.floor(f.t / f.dur * f.frames));
          g.save();
          g.globalCompositeOperation = f.blend;
          g.globalAlpha = f.alpha;
          g.drawImage(f.img, frame2 * f.frameW, 0, f.frameW, f.frameH, x - f.anchor[0] * f.scale, f.y - f.anchor[1] * f.scale, f.frameW * f.scale, f.frameH * f.scale);
          g.restore();
        } else if (f.ty === "whiff") {
          const p = f.t / f.life, a = 1 - p;
          g.save();
          g.translate(x, f.y);
          g.scale(f.face || 1, 1);
          g.globalCompositeOperation = "screen";
          g.globalAlpha = a;
          g.strokeStyle = "rgba(220,238,255,.9)";
          g.lineWidth = 2 - p;
          g.beginPath();
          g.arc(0, 0, 9 + p * 10, -1, 0.45);
          g.stroke();
          g.globalAlpha = a * 0.5;
          g.lineWidth = 1;
          g.beginPath();
          g.arc(0, 0, 5 + p * 6, -1.25, 0.7);
          g.stroke();
          g.globalAlpha = a * 0.6;
          g.strokeStyle = f.col;
          g.beginPath();
          g.moveTo(-2, 0);
          g.lineTo(-10 - p * 4, 0);
          g.stroke();
          g.restore();
        } else if (f.ty === "super") {
          const p = f.t / f.life, a = 1 - p;
          g.save();
          g.globalCompositeOperation = "lighter";
          g.translate(x, f.y);
          g.globalAlpha = a * 0.35;
          const rad = 8 + p * 40, gr = g.createRadialGradient(0, 0, 2, 0, 0, rad);
          gr.addColorStop(0, "rgba(255,255,255,.9)");
          gr.addColorStop(0.35, f.col);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.beginPath();
          g.arc(0, 0, rad, 0, 7);
          g.fill();
          g.globalAlpha = a;
          g.strokeStyle = f.col;
          g.lineWidth = 3;
          g.beginPath();
          g.arc(0, 0, 6 + p * 44, 0, 7);
          g.stroke();
          g.globalAlpha = a * 0.7;
          g.strokeStyle = "#fff";
          g.lineWidth = 1.5;
          g.beginPath();
          g.arc(0, 0, 3 + p * 30, 0, 7);
          g.stroke();
          for (let i = 0; i < 10; i++) {
            const an = i * Math.PI / 5 + p * 0.3, r0 = 5 + p * 8, r1 = 12 + p * 40;
            g.beginPath();
            g.moveTo(Math.cos(an) * r0, Math.sin(an) * r0);
            g.lineTo(Math.cos(an) * r1, Math.sin(an) * r1);
            g.stroke();
          }
          g.globalAlpha = a * 0.55;
          g.strokeStyle = f.col;
          g.lineWidth = 2;
          g.beginPath();
          g.ellipse(0, f.gy - f.y, 10 + p * 34, 3 + p * 7, 0, 0, 7);
          g.stroke();
          g.globalAlpha = a;
          g.fillStyle = "#fff";
          g.beginPath();
          g.arc(0, 0, Math.max(0, 5 * (1 - p)), 0, 7);
          g.fill();
          g.restore();
        } else if (f.ty === "rock") {
          const h = Math.min(30, f.t * 4);
          g.fillStyle = "#5a4a38";
          for (let i = 0; i < 4; i++) {
            const bx = x - 11 + (i * 7 + f.t) % 23, by = FL + GR - h + (i * 5 + f.t * 2) % Math.max(1, h);
            g.fillRect(bx, by, 3, 3);
          }
          g.fillStyle = "#6a5a44";
          g.fillRect(x - 10, FL + GR - h, 20, h);
          g.fillStyle = "#8a7a5c";
          g.fillRect(x - 6, FL + GR - h, 5, h);
          g.fillStyle = "#3a3028";
          g.fillRect(x + 2, FL + GR - h + 2, 5, h - 2);
          if (f.t < 8) {
            g.fillStyle = "#b01818";
            g.fillRect(x - 10, FL + GR - h - 4, 20, 3);
          }
          if (f.t === 2 || f.t === 6) {
            g.save();
            g.globalCompositeOperation = "lighter";
            g.fillStyle = "#d8c8a0";
            g.fillRect(x - 7, FL + GR - h - 1, 14, 1);
            g.restore();
          }
        } else if (f.ty === "boom") {
          const p = Math.min(1, f.t / 22), a = 1 - p, r = 7 + p * 18;
          g.save();
          g.globalCompositeOperation = "lighter";
          const gr = g.createRadialGradient(x, f.y, 1, x, f.y, r * 1.7);
          gr.addColorStop(0, "rgba(255,250,210,.9)");
          gr.addColorStop(0.25, "#f8d060");
          gr.addColorStop(0.55, "#f06020");
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.globalAlpha = a * 0.9;
          g.fillStyle = gr;
          g.beginPath();
          g.arc(x, f.y, r * 1.7, 0, 7);
          g.fill();
          g.globalAlpha = a;
          g.strokeStyle = p < 0.4 ? "#f8d060" : "#f06020";
          g.lineWidth = 2.5;
          g.beginPath();
          g.arc(x, f.y, r, 0, 7);
          g.stroke();
          g.globalAlpha = a * 0.5;
          g.strokeStyle = "#fff";
          g.lineWidth = 1;
          g.beginPath();
          g.arc(x, f.y, r * 0.55, 0, 7);
          g.stroke();
          g.restore();
        } else if (f.ty === "impact") {
          const p = Math.min(1, f.t / (f.life || 14)), a = 1 - p, r = (f.r || 16) * (0.28 + p * 0.9);
          g.save();
          g.globalCompositeOperation = "lighter";
          g.globalAlpha = a;
          const gr = g.createRadialGradient(x, f.y, 0, x, f.y, r * 0.7);
          gr.addColorStop(0, "rgba(255,255,255,.95)");
          gr.addColorStop(0.35, f.col);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.beginPath();
          g.arc(x, f.y, r * 0.7, 0, 7);
          g.fill();
          g.strokeStyle = f.col;
          g.lineWidth = 2;
          g.beginPath();
          g.arc(x, f.y, r, 0, 7);
          g.stroke();
          g.globalAlpha = a * 0.65;
          g.lineWidth = 1;
          for (let i = 0; i < 8; i++) {
            const an = i * Math.PI / 4 + p * 0.2;
            g.beginPath();
            g.moveTo(x + Math.cos(an) * r * 0.7, f.y + Math.sin(an) * r * 0.7);
            g.lineTo(x + Math.cos(an) * r * 1.5, f.y + Math.sin(an) * r * 1.5);
            g.stroke();
          }
          g.restore();
        } else if (f.ty === "castburst") {
          const p = Math.min(1, f.t / (f.life || 12)), a = 1 - p, r = (f.scale || 1) * (3 + p * 16);
          g.save();
          g.globalCompositeOperation = "lighter";
          g.globalAlpha = a * 0.9;
          const gr = g.createRadialGradient(x, f.y, 0, x, f.y, r * 0.5);
          gr.addColorStop(0, "rgba(255,255,255,.95)");
          gr.addColorStop(0.45, f.col);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.beginPath();
          g.arc(x, f.y, r * 0.5, 0, 7);
          g.fill();
          g.strokeStyle = f.col;
          g.lineWidth = 1.6;
          g.beginPath();
          g.arc(x, f.y, r, 0, 7);
          g.stroke();
          g.globalAlpha = a * 0.8;
          g.lineWidth = 1;
          for (let i = 0; i < 10; i++) {
            const an = i * Math.PI / 5;
            g.beginPath();
            g.moveTo(x + Math.cos(an) * r * 0.5, f.y + Math.sin(an) * r * 0.5);
            g.lineTo(x + Math.cos(an) * r * 1.7, f.y + Math.sin(an) * r * 1.7);
            g.stroke();
          }
          g.restore();
        } else if (f.ty === "nova") {
          const p = Math.min(1, f.t / 26), a = 1 - p, r = 4 + p * 36;
          g.save();
          g.globalCompositeOperation = "lighter";
          g.globalAlpha = a * 0.85;
          const gr = g.createRadialGradient(x, f.y, 0, x, f.y, r);
          gr.addColorStop(0, "rgba(235,250,255,.7)");
          gr.addColorStop(0.4, "#88c8f0");
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.beginPath();
          g.arc(x, f.y, r, 0, 7);
          g.fill();
          g.strokeStyle = "#c8ecff";
          g.lineWidth = 2;
          g.beginPath();
          g.arc(x, f.y, r * 0.75, 0, 7);
          g.stroke();
          g.globalAlpha = a * 0.7;
          g.lineWidth = 1;
          for (let i = 0; i < 10; i++) {
            const an = i * Math.PI / 5 + p * 0.3;
            g.beginPath();
            g.moveTo(x + Math.cos(an) * r * 0.6, f.y + Math.sin(an) * r * 0.6);
            g.lineTo(x + Math.cos(an) * r * 1.2, f.y + Math.sin(an) * r * 1.2);
            g.stroke();
          }
          g.restore();
        } else if (f.ty === "drain") {
          const p = Math.min(1, f.t / 60), a = 1 - p;
          g.save();
          g.globalCompositeOperation = "lighter";
          g.strokeStyle = "#7a3aa8";
          g.lineWidth = 2;
          g.globalAlpha = a * 0.8;
          for (let i = 0; i < 3; i++) {
            g.beginPath();
            g.ellipse(x, FL - 40 + Math.sin(f.t * 0.12 + i * 2) * 5, 20 + f.t * 0.2 + i * 5, 7 + i * 2, f.t * 0.03 + i, 0, 7);
            g.stroke();
          }
          for (let i = 0; i < 5; i++) {
            const an = f.t * 0.08 + i * 1.3, rr = 16 + f.t * 0.2;
            g.fillStyle = i % 2 ? "#b89aff" : "#7a3aa8";
            g.fillRect(x + Math.cos(an) * rr - 1, FL - 40 + Math.sin(an) * rr * 0.45 - 1, 2, 2);
          }
          g.restore();
        } else if (f.ty === "slash") {
          g.save();
          g.globalCompositeOperation = "lighter";
          g.strokeStyle = "#fff";
          g.lineWidth = 2;
          g.beginPath();
          g.moveTo(x - 10, f.y - 14);
          g.lineTo(x + 10, f.y + 10);
          g.stroke();
          g.globalAlpha = 0.7;
          g.strokeStyle = f.col || "#9adcee";
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(x - 6, f.y - 16);
          g.lineTo(x + 14, f.y + 8);
          g.stroke();
          g.restore();
        } else if (f.ty === "slashimpact") {
          const p = Math.min(1, f.t / (f.life || 10)), a = 1 - p;
          g.save();
          g.translate(x, f.y);
          g.scale(f.face || 1, 1);
          g.globalCompositeOperation = "lighter";
          g.globalAlpha = a;
          g.strokeStyle = f.col || "#fff";
          g.lineWidth = 2.2;
          g.beginPath();
          g.arc(0, 0, 12 + p * 10, -2.3, -0.2);
          g.stroke();
          g.beginPath();
          g.arc(0, 0, 9 + p * 8, 0.7, 2.8);
          g.stroke();
          g.globalAlpha = a * 0.85;
          g.strokeStyle = "#fff";
          g.lineWidth = 0.8;
          g.beginPath();
          g.arc(0, 0, 11 + p * 9, -2.15, -0.35);
          g.stroke();
          g.restore();
        } else if (f.ty === "ring") {
          const p = Math.min(1, f.t / 14), a = 1 - p, r = f.t * 3.2;
          g.save();
          g.globalCompositeOperation = "lighter";
          g.globalAlpha = a;
          g.strokeStyle = f.col;
          g.lineWidth = 2;
          g.beginPath();
          g.arc(x, f.y, r, 0, 7);
          g.stroke();
          g.globalAlpha = a * 0.5;
          g.strokeStyle = "#fff";
          g.lineWidth = 1;
          g.beginPath();
          g.arc(x, f.y, r * 0.7, 0, 7);
          g.stroke();
          g.restore();
        } else if (f.ty === "name") {
          const pr = f.t / (f.life || 60), a = 1 - pr;
          g.save();
          g.globalAlpha = a;
          g.font = '9px "Russo One"';
          g.textAlign = "center";
          g.fillStyle = f.col;
          g.fillText(f.txt, x, f.y - pr * 14);
          g.restore();
        } else if (f.ty === "boltfx") {
          drawBolt(x, FL, x, FL - 90, { amp: 5, segs: 7 });
          g.save();
          g.globalCompositeOperation = "lighter";
          g.fillStyle = "rgba(248,248,96,.5)";
          g.fillRect(x - 3, FL - 2, 6, 3);
          g.restore();
        }
        if (f.ty === "castbolt") {
          const by2 = f.y;
          drawBolt(x, by2 - 4, x + Math.sin(f.t) * 3, by2 - 76, { amp: 5, segs: 6 });
          g.save();
          g.globalCompositeOperation = "lighter";
          g.fillStyle = "rgba(248,248,96,.75)";
          g.fillRect(x - 2, by2 - 6, 4, 6);
          g.restore();
        }
      }
    }
    function seg(x, y, a1, a2, l1, l2) {
      const mx = x + Math.sin(a1) * l1, my = y + Math.cos(a1) * l1;
      const ex = mx + Math.sin(a1 + a2) * l2, ey = my + Math.cos(a1 + a2) * l2;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(mx, my);
      g.lineTo(ex, ey);
      g.stroke();
      return [ex, ey];
    }
    const lite = (c, t) => mix(c, "#ffffff", t);
    function limb(x, y, a1, a2, l1, l2, w, c) {
      g.lineCap = "round";
      g.strokeStyle = OUT;
      g.lineWidth = w + 3;
      seg(x, y, a1, a2, l1, l2);
      g.strokeStyle = c;
      g.lineWidth = w;
      const e = seg(x, y, a1, a2, l1, l2);
      const mx = x + Math.sin(a1) * l1, my = y + Math.cos(a1) * l1, hi = lite(c, 0.28);
      if (hi) {
        g.strokeStyle = hi;
        g.lineWidth = Math.max(1, w * 0.32);
        g.beginPath();
        g.moveTo(x, y - w * 0.3);
        g.lineTo(mx, my - w * 0.3);
        g.lineTo(e[0], e[1] - w * 0.3);
        g.stroke();
      }
      return e;
    }
    function boot(e, c) {
      g.fillStyle = OUT;
      g.fillRect(e[0] - 4, e[1] - 3, 9, 6);
      g.fillStyle = c;
      g.fillRect(e[0] - 3, e[1] - 2, 7, 4);
      const hi = lite(c, 0.3);
      if (hi) {
        g.fillStyle = hi;
        g.fillRect(e[0] - 3, e[1] - 2, 7, 1);
      }
      g.fillStyle = OUT;
      g.fillRect(e[0] - 4, e[1] + 2, 9, 1);
      g.fillStyle = shade(c, 0.7);
      g.fillRect(e[0] + 2, e[1] - 1, 3, 3);
    }
    function fist(e, c) {
      g.fillStyle = OUT;
      g.fillRect(e[0] - 3, e[1] - 3, 7, 7);
      g.fillStyle = c;
      g.fillRect(e[0] - 2, e[1] - 2, 5, 5);
      const hi = lite(c, 0.25);
      if (hi) {
        g.fillStyle = hi;
        g.fillRect(e[0] - 2, e[1] - 2, 5, 1);
      }
      g.fillStyle = shade(c, 0.75);
      g.fillRect(e[0] + 1, e[1], 3, 3);
    }
    function pose(f) {
      const d = f.def, t = f.animT, s = f.state;
      let p = { hip: d.h * 0.47, lean: 0, armF: [0.7, 1.9], armB: [-0.5, 2.1], legF: [0.45, -0.15], legB: [-0.45, -0.2], head: 0 };
      const bob = Math.sin(t * 0.09) * 1.4;
      if (s === "idle") {
        p.hip += bob * 0.4;
        p.armF[0] += Math.sin(t * 0.09) * 0.08;
        if (S.battle && S.battle.phase === "intro") {
          const q = d.id;
          if (q === 0) {
            p.armF = [1.5, 0.6];
            p.armB = [1.3, 0.6];
            p.lean = 0.08;
          } else if (q === 1) {
            p.head = 0.3;
            p.armF = [0.15, 0.5];
            p.armB = [-0.15, 0.5];
            p.lean = 0.12;
          } else if (q === 2) {
            p.armF = [1.9, 0.3];
            p.armB = [-1.9, 0.3];
            p.hip += Math.sin(t * 0.6) * 0.8;
          } else if (q === 3) {
            p.armF = [0.7, 1.3];
            p.armB = [-0.7, 1.3];
            p.hip = d.h * 0.42;
          } else if (q === 4) {
            p.lean = 0.18;
            p.armF = [1.3, 0.4];
            p.armB = [-0.4, 1.6];
            p.hip = d.h * 0.42;
          } else if (q === 5) {
            p.armF = [2.4, 0.15];
            p.armB = [-0.3, 1.8];
            p.head = -0.05;
          } else if (q === 6) {
            p.armF = [0.9, 1.6];
            p.armB = [0.7, 1.6];
            p.head = 0.08;
          } else if (q === 7) {
            p.armF = [1.1, 0.9];
            p.armB = [1, 0.9];
            p.lean = 0.06;
          } else if (q === 8) {
            p.armF = [0.5, 0.4];
            p.armB = [-0.5, 0.4];
            p.lean = -0.08;
          } else if (q === 10) {
            p.armF = [1.45, 0.35];
            p.armB = [1.25, 0.4];
            p.lean = -0.05;
            p.head = -0.05;
          } else if (q === 11) {
            p.armF = [1.2, 0.55];
            p.armB = [-0.3, 1.9];
            p.lean = 0.14;
            p.hip = d.h * 0.42;
          } else if (q === 12) {
            p.armF = [1.5, 0.1];
            p.armB = [-0.2, 1.8];
            p.lean = -0.04;
            p.head = -0.06;
          } else {
            p.armF = [1.4, 0.3];
            p.armB = [-0.2, 1.7];
            p.head = -0.1;
          }
        }
      } else if (s === "walk") {
        const W = WM2[d.id] || [0.22, 1, 1, 1.4, 0];
        const c = Math.sin(t * W[0]), la = W[1], aa = W[2];
        p.legF = [0.45 + c * 0.6 * la, -0.3];
        p.legB = [-0.45 - c * 0.6 * la, -0.3];
        p.armF = [0.5 - c * 0.4 * aa, 1.8];
        p.armB = [-0.5 + c * 0.4 * aa, 2];
        p.hip += Math.abs(c) * W[3];
        p.lean = W[4];
      } else if (s === "jump") {
        p.legF = [0.9, -1.9];
        p.legB = [-0.6, -1.7];
        p.armF = [1.8, -0.4];
        p.armB = [-1.2, -0.3];
      } else if (s === "dash") {
        p.lean = 0.38;
        p.hip = d.h * 0.36;
        p.legF = [1.25, -0.7];
        p.legB = [-1, -0.35];
        p.armF = [-0.9, 1.4];
        p.armB = [1.3, 1.1];
        p.head = 0.1;
      } else if (s === "crouch") {
        p.hip = d.h * 0.24;
        p.legF = [1.1, -2.2];
        p.legB = [-1.1, -2];
        p.armF = [0.9, 2];
        p.armB = [-0.3, 2.2];
      } else if (s === "block") {
        p.armF = [1.15, 1.9];
        p.armB = [0.95, 2.1];
        p.legF = [0.35, -0.2];
        p.legB = [-0.5, -0.2];
        p.lean = 0.05;
      } else if (s === "atk") {
        const ph = f.atk ? Math.min(1, f.st / f.atk.A.wd) : 0;
        if (f.atk && f.atk.t === "punch") {
          p.armF = [lerp(-0.4, 1.55, ph), lerp(2.2, 0.05, ph)];
          p.armB = [-0.7, 2.1];
          p.lean = ph * 0.25;
        } else if (f.atk && (f.atk.t === "kick" || f.atk.t === "rh")) {
          p.legF = [lerp(0.3, 1.5, ph), lerp(-0.5, -0.05, ph)];
          p.legB = [-0.35, -0.15];
          p.armF = [-0.3, 1.6];
          p.armB = [-0.8, 1.9];
          p.lean = ph * 0.2;
          p.hip = d.h * 0.44;
        } else if (f.atk && f.atk.t === "jkick") {
          p.legF = [lerp(0.5, 1.4, ph), -0.1];
          p.legB = [-0.8, -1.4];
          p.armF = [-0.6, 1.5];
          p.armB = [-1.3, -0.4];
        } else if (f.atk && f.atk.t === "upper") {
          p.armF = [lerp(1.2, 2.7, ph), 0.1];
          p.armB = [-0.6, 2];
          p.lean = -ph * 0.2;
          p.legF = [0.4, -0.2];
          p.legB = [-0.5, -0.2];
        } else if (f.atk && f.atk.t === "sweep") {
          p.hip = d.h * 0.18;
          p.legF = [lerp(0.5, 1.55, ph), -0.05];
          p.legB = [-1.2, -1.9];
          p.armF = [0.9, 2.2];
          p.armB = [-0.9, 1.8];
        } else if (f.atk && f.atk.t === "throw") {
          const A = f.atk.A, th = f.atk.grabbed || f.atk.thrown ? Math.min(1, (f.st - (A.wd + A.ac)) / 8) : 0;
          p.armF = [lerp(0.7, 1.95, ph) + th * 0.35, lerp(1.9, 0.15, ph)];
          p.armB = [lerp(-0.5, 1.25, ph) + th * 0.45, lerp(2.1, 0.25, ph)];
          p.lean = ph * 0.25 - th * 0.42;
          p.hip = d.h * 0.44;
          p.legF = [0.55, -0.2];
          p.legB = [-0.6, -0.2];
        }
      } else if (s === "grabbed") {
        p.lean = 0.28;
        p.armF = [0.9, 1.1];
        p.armB = [-0.9, 1];
        p.legF = [0.85, -1.1];
        p.legB = [-0.9, -0.9];
        p.head = 0.25;
      } else if (s === "hit") {
        p.lean = -0.35;
        p.armF = [-0.6, 1.2];
        p.armB = [-1.1, 1];
        p.head = -0.3;
        p.legF = [0.6, -0.3];
        p.legB = [-0.6, -0.2];
      } else if (s === "cast" || s === "super") {
        const ph = Math.min(1, f.st / 12);
        p.armF = [lerp(-0.5, 1.5, ph), lerp(2, 0.1, ph)];
        p.armB = [lerp(-0.8, 1.3, ph), lerp(2, 0.2, ph)];
        p.lean = ph * 0.2;
        const ci = { 1: [[0.2, 1.2], [0.1, 1.1]], 2: [[2.6, 0], [-2.6, 0.1]], 3: [[1.8, 0.6], [-0.5, 1.8]], 4: [[1.2, 0.5], [-0.6, 1.8]], 5: [[0.6, 1.2], [-0.6, 1.3]], 6: [[2.4, 0.3], [-0.4, 1.8]], 7: [[1.5, 0.05], [1.2, 0.2]], 8: [[1.6, 0.2], [-0.9, 1.6]], 9: [[1.5, 0.1], [1.3, 0.2]], 10: [[1.7, 0.35], [1.35, 0.45]], 11: [[1.9, -0.1], [-0.4, 2.1]], 12: [[1.55, -0.05], [-0.5, 1.7]] }[d.id];
        if (ci) {
          p.armF = [lerp(-0.5, ci[0][0], ph), lerp(2, ci[0][1], ph)];
          p.armB = [lerp(-0.8, ci[1][0], ph), lerp(2, ci[1][1], ph)];
        }
      } else if (s === "win") {
        const w0 = d.id;
        if (w0 === 0) {
          p.armF = [2.8, 0.1];
          p.armB = [2.6, 0.1];
          p.hip += Math.sin(t * 0.1) * 1.2;
        } else if (w0 === 1) {
          p.armF = [0.9, 1.4];
          p.armB = [-0.9, 1.3];
          p.head = 0.12;
          p.lean = 0.05;
        } else if (w0 === 2) {
          p.armF = [2.3, 0.2];
          p.armB = [-2.3, 0.2];
          p.hip += Math.abs(Math.sin(t * 0.5)) * 1.5;
        } else if (w0 === 3) {
          p.armF = [0.7, 1.5];
          p.armB = [-0.7, 1.5];
          p.hip = d.h * 0.4;
        } else if (w0 === 4) {
          p.armF = [2.6, 0.1];
          p.armB = [1.2, 0.4];
          p.lean = 0.1;
        } else if (w0 === 5) {
          p.armF = [1.6, 0.3];
          p.armB = [-1.6, 0.3];
          p.lean = -0.05;
          p.hip += Math.sin(t * 0.08) * 0.8;
        } else if (w0 === 6) {
          p.armF = [1.2, 0.6];
          p.armB = [1.05, 0.55];
          p.head = 0.1;
        } else if (w0 === 7) {
          p.armF = [2.9, 0.1];
          p.armB = [-0.5, 1.8];
          p.hip += Math.abs(Math.sin(t * 0.22)) * 1.6;
        } else if (w0 === 8) {
          p.armF = [0.35, 0.3];
          p.armB = [-0.35, 0.3];
          p.lean = -0.06;
          p.head = -0.08;
        } else if (w0 === 10) {
          p.armF = [2.2, 0.15];
          p.armB = [-2.2, 0.15];
          p.lean = -0.07;
          p.head = -0.06;
          p.hip += Math.sin(t * 0.07) * 0.7;
        } else if (w0 === 11) {
          p.armF = [0.6, 1.5];
          p.armB = [-0.7, 2];
          p.lean = 0.06;
          p.head = 0.1;
        } else if (w0 === 12) {
          p.armF = [1.9, -0.3];
          p.armB = [-1.6, -0.3];
          p.head = -0.15;
          p.hip += Math.sin(t * 0.06) * 0.9;
        } else {
          p.armF = [0.9, 1.2];
          p.armB = [-0.6, 1.2];
          p.head = -0.06;
          p.lean = 0.04;
        }
      } else if (s === "fatal") {
        const ph = Math.min(1, f.st / 30);
        p.armF = [lerp(-0.5, 2.6, ph), 0.2];
        p.armB = [lerp(-0.7, 2.2, ph), 0.3];
        p.lean = ph * 0.3;
      } else if (s === "victim") {
        p.lean = 0.1;
        p.armF = [0.15, 0.3];
        p.armB = [-0.15, 0.25];
        p.head = 0.15;
      } else if (s === "dizzy") {
        p.lean = Math.sin(t * 0.12) * 0.2;
        p.armF = [0.2, 1.2];
        p.armB = [-0.2, 1.1];
        p.head = Math.sin(t * 0.12) * 0.3;
      }
      return p;
    }
    function drawFighterGlow(f, cam) {
      if (!f || f.hidden) return;
      const d = f.def, x = f.x - cam, y = f.y - 38, r = 24 + (d.bulk || 1) * 10;
      const superOn = f.state === "super" || f.rage >= 100;
      const a = (superOn ? 0.1 : 0.05) * (f.state === "super" ? 1.6 : 1);
      g.save();
      g.globalCompositeOperation = "lighter";
      g.globalAlpha = a;
      const gr = g.createRadialGradient(x, y, 2, x, y, r);
      gr.addColorStop(0, mix(d.acc, "#ffffff", 0.18));
      gr.addColorStop(0.45, d.acc);
      gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr;
      g.fillRect(x - r, y - r, r * 2, r * 2);
      g.restore();
    }
    function drawF(f, cam) {
      if (f.hidden) return;
      const d = f.def, sc = d.bulk * f.scale;
      g.save();
      g.lineCap = "round";
      g.translate(Math.round(f.x - cam), Math.round(f.y));
      const shadowY = FL + GR - f.y;
      const shg = g.createRadialGradient(0, shadowY, 1, 0, shadowY, 15 * sc);
      shg.addColorStop(0, "rgba(0,0,0,.45)");
      shg.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = shg;
      g.beginPath();
      g.ellipse(0, shadowY, 15 * sc, 4.2, 0, 0, 7);
      g.fill();
      if (d.boss) {
        g.save();
        g.globalCompositeOperation = "lighter";
        const ay = -d.h * 0.55, ar = d.h * 0.9, ag = g.createRadialGradient(0, ay, 2, 0, ay, ar);
        ag.addColorStop(0, "rgba(240,200,80,.24)");
        ag.addColorStop(0.55, "rgba(180,60,20,.1)");
        ag.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = ag;
        g.beginPath();
        g.arc(0, ay, ar, 0, 7);
        g.fill();
        g.restore();
      }
      abilityFx.drawCastAura(f);
      if (f.invis > 0) g.globalAlpha = 0.25;
      g.scale(f.face * sc, sc * f.squash);
      g.rotate(f.tilt * f.face);
      if (f.state === "super" || f.frozen > 0) g.translate(rnd(-1, 1), rnd(-1, 1));
      const p = pose(f);
      const suit = f.charred ? "#1c1712" : f.pale ? shade(d.suit, 0.5) : d.suit, skin = f.charred ? "#241c12" : f.pale ? "#d8ccc8" : d.skin, dk = shade(suit, 0.6), ac = f.charred ? "#4a4238" : d.acc;
      const hipY = -p.hip, shY = hipY - d.h * 0.3, shX = p.lean * 10;
      if (d.cape && !f.charred) {
        g.fillStyle = shade(suit, 0.4);
        g.beginPath();
        g.moveTo(-2, shY);
        g.quadraticCurveTo(-14 - Math.sin(f.animT * 0.1) * 3, shY + 16, -10, hipY + 14);
        g.lineTo(-2, shY + 6);
        g.fill();
        g.fillStyle = shade(suit, 0.58);
        g.beginPath();
        g.moveTo(-2, shY);
        g.quadraticCurveTo(-9 - Math.sin(f.animT * 0.1) * 2, shY + 12, -6, hipY + 10);
        g.lineTo(-2, shY + 6);
        g.fill();
      }
      const bl = limb(-1, hipY, p.legB[0], p.legB[1], d.h * 0.26, d.h * 0.24, 5, dk);
      boot(bl, shade(suit, 0.35));
      const ba = limb(-3 + shX * 0.5, shY, p.armB[0], p.armB[1], d.h * 0.2, d.h * 0.18, 4, dk);
      fist(ba, shade(skin, 0.7));
      const tw = d.female ? 9 : 10;
      g.strokeStyle = OUT;
      g.lineWidth = tw + 3;
      g.beginPath();
      g.moveTo(-1, hipY);
      g.lineTo(shX, shY + 2);
      g.stroke();
      const tg = g.createLinearGradient(-6, 0, 7, 0);
      tg.addColorStop(0, shade(suit, 0.55));
      tg.addColorStop(0.45, suit);
      tg.addColorStop(1, mix(suit, "#ffffff", 0.16));
      g.strokeStyle = tg;
      g.lineWidth = tw;
      g.beginPath();
      g.moveTo(-1, hipY);
      g.lineTo(shX, shY + 2);
      g.stroke();
      if (!f.charred) {
        if (d.female) {
          g.fillStyle = shade(suit, 0.74);
          g.beginPath();
          g.ellipse(shX - 2, shY + 5, 3, 2, 0, 0, 7);
          g.fill();
          g.beginPath();
          g.ellipse(shX + 2, shY + 5, 3, 2, 0, 0, 7);
          g.fill();
          g.fillStyle = mix(suit, "#ffffff", 0.16);
          g.fillRect(shX - 1, shY + 4, 2, 1);
          g.fillStyle = shade(suit, 0.62);
          g.fillRect(shX - 5, shY + 10, 2, 5);
          g.fillRect(shX + 3, shY + 10, 2, 5);
          g.fillStyle = shade(suit, 0.86);
          g.fillRect(shX - 3, shY + 10, 6, 1);
        } else {
          g.fillStyle = shade(suit, 0.74);
          g.fillRect(shX - 4, shY + 5, 4, 2);
          g.fillRect(shX + 1, shY + 5, 4, 2);
          g.fillStyle = shade(suit, 0.82);
          g.fillRect(shX - 1, shY + 8, 2, 3);
          g.fillRect(shX - 1, shY + 11, 2, 1);
        }
      }
      if (d.bulk > 1.12) {
        g.fillStyle = shade(suit, 0.75);
        g.fillRect(shX - 7, shY - 1, 6, 6);
        g.fillRect(shX + 2, shY - 1, 6, 6);
        g.fillStyle = ac;
        g.fillRect(shX - 7, shY + 4, 6, 1);
        g.fillRect(shX + 2, shY + 4, 6, 1);
        const hi2 = lite(ac, 0.35);
        if (hi2) {
          g.fillStyle = hi2;
          g.fillRect(shX - 7, shY - 1, 6, 1);
          g.fillRect(shX + 2, shY - 1, 6, 1);
        }
      }
      g.fillStyle = d.female ? ac : shade(suit, 0.45);
      g.fillRect(-5, hipY - 3, 10, 4);
      g.fillStyle = d.female ? mix(ac, "#ffffff", 0.55) : mix(ac, "#ffffff", 0.3);
      g.fillRect(-1, hipY - 3, 2, 4);
      g.fillStyle = ac;
      g.fillRect(-4 + shX * 0.5, shY + 5, 7, 3);
      g.fillStyle = shade(ac, 0.6);
      g.fillRect(-4 + shX * 0.5, shY + 7, 7, 1);
      g.fillStyle = mix(ac, "#ffffff", 0.35);
      g.fillRect(-4 + shX * 0.5, shY + 5, 7, 1);
      if (d.dress) {
        const dg2 = g.createLinearGradient(-8, hipY, 10, hipY + d.h * 0.4);
        dg2.addColorStop(0, shade(suit, 0.7));
        dg2.addColorStop(0.5, suit);
        dg2.addColorStop(1, shade(suit, 0.55));
        g.fillStyle = dg2;
        g.beginPath();
        g.moveTo(-7, hipY + 2);
        g.lineTo(7 + shX * 0.5, hipY + 2);
        g.lineTo(11 + shX * 0.6, hipY + d.h * 0.36);
        g.lineTo(-9, hipY + d.h * 0.36);
        g.closePath();
        g.fill();
      }
      if (d.skirt && !f.charred) {
        const sy = hipY - 1, by = hipY + d.h * 0.22;
        const skg = g.createLinearGradient(0, sy, 0, by);
        skg.addColorStop(0, shade(suit, 0.75));
        skg.addColorStop(1, shade(suit, 0.45));
        g.fillStyle = skg;
        g.beginPath();
        g.moveTo(-6, hipY);
        g.lineTo(6 + shX * 0.4, hipY);
        g.lineTo(11 + shX * 0.6, by);
        g.lineTo(-9, by);
        g.closePath();
        g.fill();
        g.fillStyle = mix(suit, "#ffffff", 0.12);
        g.fillRect(5, hipY + 1, 3, by - hipY - 2);
        g.fillStyle = ac;
        g.fillRect(-9, by, 20 + shX * 0.6, 1);
        g.fillStyle = shade(suit, 0.22);
        g.fillRect(-1, hipY, 2, by - hipY);
      }
      if (!d.skirt) {
        g.fillStyle = ac;
        g.fillRect(-9, hipY + d.h * 0.32, 20 + shX * 0.6, 1);
      }
      const fl = limb(1, hipY, p.legF[0], p.legF[1], d.h * 0.26, d.h * 0.24, 5, suit);
      boot(fl, shade(suit, 0.5));
      const fa = limb(2 + shX, shY + 2, p.armF[0], p.armF[1], d.h * 0.2, d.h * 0.18, 4, skin);
      fist(fa, skin);
      const fanOut = d.fan && (f.state === "cast" || f.state === "super");
      if (fanOut) {
        const f0 = fa;
        g.fillStyle = OUT;
        g.beginPath();
        g.moveTo(f0[0], f0[1]);
        g.arc(f0[0], f0[1], 14, -1.2, 0.15);
        g.closePath();
        g.fill();
        const fg = g.createRadialGradient(f0[0], f0[1], 2, f0[0], f0[1], 13);
        fg.addColorStop(0, shade(suit, 0.6));
        fg.addColorStop(1, "#8a1424");
        g.fillStyle = fg;
        g.beginPath();
        g.moveTo(f0[0], f0[1]);
        g.arc(f0[0], f0[1], 12, -1.1, 0.05);
        g.closePath();
        g.fill();
        g.strokeStyle = mix(ac, "#ffffff", 0.45);
        g.lineWidth = 0.7;
        for (let i = 0; i < 4; i++) {
          const aa = -1.05 + i * 0.31;
          g.beginPath();
          g.moveTo(f0[0], f0[1]);
          g.lineTo(f0[0] + Math.cos(aa) * 12, f0[1] + Math.sin(aa) * 12);
          g.stroke();
        }
        g.fillStyle = ac;
        g.fillRect(f0[0] - 1.5, f0[1] - 1.5, 3, 3);
        g.strokeStyle = "#3a2530";
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(f0[0], f0[1]);
        g.lineTo(f0[0] - 4, f0[1] + 4);
        g.stroke();
      }
      if (d.claws && (f.state === "atk" || f.state === "cast")) {
        g.fillStyle = ac;
        for (let i = -1; i <= 1; i++) {
          g.beginPath();
          g.moveTo(fa[0], fa[1] + i * 3);
          g.lineTo(fa[0] + 7, fa[1] + i * 3 - 1);
          g.lineTo(fa[0], fa[1] + i * 3 + 2);
          g.fill();
        }
        g.fillStyle = mix(ac, "#ffffff", 0.4);
        g.fillRect(fa[0] + 4, fa[1] - 1, 2, 1);
      }
      if (d.blade && (f.state === "atk" || f.state === "cast" || f.state === "dash")) {
        const ka = fa, a1 = p.armF[0], a2 = p.armF[1], bx = Math.sin(a1 + a2), by = Math.cos(a1 + a2);
        g.strokeStyle = OUT;
        g.lineWidth = 3.5;
        g.beginPath();
        g.moveTo(ka[0], ka[1]);
        g.lineTo(ka[0] + bx * 21, ka[1] + by * 21 - 2);
        g.stroke();
        g.strokeStyle = "#c8d8e0";
        g.lineWidth = 1.5;
        g.beginPath();
        g.moveTo(ka[0] + bx * 2, ka[1] + by * 2 - 0.5);
        g.lineTo(ka[0] + bx * 21, ka[1] + by * 21 - 2);
        g.stroke();
        g.strokeStyle = mix("#c8d8e0", "#ffffff", 0.5);
        g.lineWidth = 0.7;
        g.beginPath();
        g.moveTo(ka[0] + bx * 3, ka[1] + by * 3 - 1);
        g.lineTo(ka[0] + bx * 19, ka[1] + by * 19 - 2);
        g.stroke();
        g.fillStyle = ac;
        g.fillRect(ka[0] - 1.5, ka[1] - 1.5, 3, 3);
        g.fillStyle = OUT;
        g.fillRect(ka[0] - 2, ka[1] + 0.5, 4, 1.5);
        g.strokeStyle = "#5a4a3a";
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(ka[0] - bx * 5, ka[1] - by * 5 + 1);
        g.lineTo(ka[0] - bx, ka[1] - by + 1);
        g.stroke();
      } else if (d.blade) {
        g.strokeStyle = OUT;
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(-8, shY + 7);
        g.lineTo(-2, shY + 19);
        g.stroke();
        g.strokeStyle = shade(suit, 0.5);
        g.lineWidth = 1.8;
        g.beginPath();
        g.moveTo(-8, shY + 7);
        g.lineTo(-2, shY + 19);
        g.stroke();
        g.fillStyle = ac;
        g.fillRect(-9.5, shY + 5, 3, 3);
      }
      if (d.bow && f.state === "cast") {
        const b0 = fa;
        g.strokeStyle = OUT;
        g.lineWidth = 3;
        g.beginPath();
        g.arc(b0[0] + 3, b0[1], 11, -1.25, 1.25);
        g.stroke();
        g.strokeStyle = ac;
        g.lineWidth = 1.8;
        g.beginPath();
        g.arc(b0[0] + 3, b0[1], 11, -1.25, 1.25);
        g.stroke();
        g.strokeStyle = "#e8e8ff";
        g.lineWidth = 0.7;
        g.beginPath();
        g.moveTo(b0[0] + 3 + Math.cos(-1.25) * 11, b0[1] + Math.sin(-1.25) * 11);
        g.lineTo(b0[0] + 3 + Math.cos(1.25) * 11, b0[1] + Math.sin(1.25) * 11);
        g.stroke();
        g.strokeStyle = "#e8e8ff";
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(b0[0] - 2, b0[1]);
        g.lineTo(b0[0] + 13, b0[1]);
        g.stroke();
        g.strokeStyle = OUT;
        g.lineWidth = 2.5;
        g.beginPath();
        g.moveTo(b0[0] - 2, b0[1]);
        g.lineTo(b0[0] + 13, b0[1]);
        g.stroke();
        g.fillStyle = ac;
        g.beginPath();
        g.moveTo(b0[0] + 16, b0[1]);
        g.lineTo(b0[0] + 11, b0[1] - 2);
        g.lineTo(b0[0] + 11, b0[1] + 2);
        g.fill();
        g.strokeStyle = ac;
        g.lineWidth = 1.2;
        g.beginPath();
        g.moveTo(b0[0] + 3, b0[1] - 4);
        g.lineTo(b0[0] + 3, b0[1] + 4);
        g.stroke();
        g.strokeStyle = shade(suit, 0.5);
        g.lineWidth = 1.8;
        g.beginPath();
        g.moveTo(b0[0] - 6, b0[1] + 2);
        g.lineTo(b0[0] + 2, b0[1] + 8);
        g.stroke();
        g.strokeStyle = OUT;
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(b0[0] - 6, b0[1] + 2);
        g.lineTo(b0[0] + 2, b0[1] + 8);
        g.stroke();
      }
      const hx = shX + p.lean * 6, hy = shY - 8 + p.head * 8;
      g.fillStyle = OUT;
      g.fillRect(hx - 6, hy - 11, 13, 16);
      g.fillStyle = skin;
      g.fillRect(hx - 5, hy - 9, 11, 13);
      if (d.female) {
        g.fillStyle = shade(skin, 0.9);
        g.fillRect(hx - 4, hy + 3, 9, 1);
      } else {
        g.fillStyle = shade(skin, 0.82);
        g.fillRect(hx - 5, hy + 1, 11, 3);
      }
      g.fillStyle = shade(skin, 0.7);
      g.fillRect(hx - 6, hy - 4, 2, 3);
      if (d.female) {
        g.fillStyle = ac;
        g.fillRect(hx - 7, hy - 1, 1, 2);
      }
      if (d.longhair && !f.charred && !f.pale) {
        g.fillStyle = OUT;
        g.fillRect(hx - 9, hy - 9, 4, 22);
        g.fillRect(hx + 6, hy - 9, 4, 22);
        g.fillStyle = d.hair;
        g.fillRect(hx - 8, hy - 8, 3, 20);
        g.fillRect(hx + 6, hy - 8, 3, 20);
        g.fillStyle = mix(d.hair, "#ffffff", 0.3);
        g.fillRect(hx - 8, hy - 8, 3, 1);
        g.fillRect(hx + 6, hy - 8, 3, 1);
        g.fillStyle = shade(d.hair, 0.75);
        g.fillRect(hx - 8, hy + 6, 3, 4);
        g.fillRect(hx + 6, hy + 6, 3, 4);
      }
      if (d.ponytail && !f.charred && !f.pale) {
        const sw = Math.sin(f.animT * 0.08) * 2;
        g.fillStyle = OUT;
        g.beginPath();
        g.moveTo(hx - 6, hy - 8);
        g.quadraticCurveTo(hx - 11, hy - 10 + sw, hx - 13, hy - 2 + sw);
        g.quadraticCurveTo(hx - 15, hy + 7 + sw, hx - 15, hy + 18 + sw);
        g.lineTo(hx - 12, hy + 17 + sw);
        g.quadraticCurveTo(hx - 11, hy + 7 + sw, hx - 10, hy + sw);
        g.quadraticCurveTo(hx - 9, hy - 5 + sw, hx - 4, hy - 6);
        g.closePath();
        g.fill();
        g.fillStyle = d.hair;
        g.beginPath();
        g.moveTo(hx - 5, hy - 7);
        g.quadraticCurveTo(hx - 10, hy - 8 + sw, hx - 12, hy - 2 + sw);
        g.quadraticCurveTo(hx - 13, hy + 7 + sw, hx - 13, hy + 16 + sw);
        g.lineTo(hx - 12, hy + 15 + sw);
        g.quadraticCurveTo(hx - 11, hy + 6 + sw, hx - 10, hy + sw);
        g.quadraticCurveTo(hx - 9, hy - 4 + sw, hx - 4, hy - 5);
        g.closePath();
        g.fill();
        g.strokeStyle = shade(d.hair, 0.78);
        g.lineWidth = 0.8;
        for (const q of [[-11, -2], [-12, 3], [-13, 8], [-13, 13]]) {
          g.beginPath();
          g.moveTo(hx + q[0] - 1, hy + q[1] + sw * 0.4);
          g.lineTo(hx + q[0] + 1, hy + q[1] + 1 + sw * 0.4);
          g.stroke();
        }
        g.strokeStyle = mix(d.hair, "#ffffff", 0.45);
        g.lineWidth = 0.7;
        g.beginPath();
        g.moveTo(hx - 6, hy - 7);
        g.quadraticCurveTo(hx - 11, hy - 9 + sw, hx - 13, hy - 2 + sw);
        g.quadraticCurveTo(hx - 14, hy + 7 + sw, hx - 14, hy + 15 + sw);
        g.stroke();
        g.fillStyle = ac;
        g.fillRect(hx - 8, hy - 9, 2, 5);
        g.beginPath();
        g.moveTo(hx - 8, hy - 7);
        g.lineTo(hx - 12, hy - 5 + sw);
        g.lineTo(hx - 9, hy - 3);
        g.fill();
        g.fillStyle = ac;
        g.fillRect(hx - 14, hy + 16 + sw, 2, 2);
      }
      const expr = f.state === "hit" || f.state === "victim" || f.state === "grabbed" ? 1 : f.state === "dizzy" ? 2 : 0;
      if (expr === 0) {
        g.fillStyle = "#f0e8e0";
        g.fillRect(hx + 2, hy - 5, 3, 2);
        g.fillStyle = "#141414";
        g.fillRect(d.female ? hx + 4 : hx + 3, hy - 5, d.female ? 1 : 2, 2);
        if (d.female) {
          g.fillStyle = "#141414";
          g.fillRect(hx + 4, hy - 6, 1, 1);
        }
      } else if (expr === 1) {
        g.fillStyle = "#141414";
        g.fillRect(hx + 2, hy - 4, 3, 1);
      } else {
        g.fillStyle = "#141414";
        g.fillRect(hx + 2, hy - 5, 1, 2);
        g.fillRect(hx + 4, hy - 5, 1, 2);
      }
      g.fillStyle = shade(skin, 0.72);
      g.fillRect(hx + 2, expr === 2 || d.female ? hy - 7 : hy - 6, d.female ? 3 : 4, 1);
      if (d.female) {
        g.fillStyle = shade(skin, 0.6);
        g.fillRect(hx - 1, hy - 5, 1, 2);
        g.fillStyle = "#a85060";
        g.fillRect(hx, hy - 1, 2, 1);
      }
      drawGear(f, hx, hy);
      if (f.state === "cast" || f.state === "super") abilityFx.drawCastCharge(f, fa);
      if (f.flash > 0) {
        g.globalAlpha = 0.12;
        g.fillStyle = "#fff";
        g.beginPath();
        g.ellipse(0, -d.h * 0.5, 12, d.h * 0.42, 0, 0, 7);
        g.fill();
        g.globalAlpha = 1;
      }
      g.restore();
      if (f.frozen > 0) {
        const b = f.box;
        g.fillStyle = "rgba(120,190,240,.45)";
        g.fillRect(b.x - cam, b.y - 2, b.w, b.h + 4);
        g.fillStyle = "rgba(225,245,255,.85)";
        for (let i = 0; i < 3; i++) {
          const sx = b.x - cam + 3 + i * (b.w - 6) / 2;
          g.beginPath();
          g.moveTo(sx - 3, b.y - 2);
          g.lineTo(sx, b.y - 8 - i * 7 % 5);
          g.lineTo(sx + 3, b.y - 2);
          g.fill();
        }
      }
      if (f.netT > 0) {
        g.strokeStyle = "#c8c8a0";
        g.lineWidth = 1;
        const b = f.box;
        for (let i = 0; i < 4; i++) g.strokeRect(b.x - cam + 2 + i * 3, b.y + i * 4, b.w - 4 - i * 6, 4);
      }
      if (f.state === "dizzy") {
        for (let i = 0; i < 3; i++) {
          const a = f.animT * 0.15 + i * 2.09;
          g.fillStyle = "#f8d060";
          g.fillRect(f.x - cam + Math.cos(a) * 12 - 1, f.y - d.h - 8 + Math.sin(a) * 3, 3, 3);
        }
      }
    }
    function drawGear(f, hx, hy) {
      const d = f.def, ac = d.acc;
      if (f.charred) {
        g.fillStyle = "#e8e0d0";
        g.fillRect(hx - 1, hy - 4, 2, 2);
        return;
      }
      if (d.gear === "mask") {
        g.fillStyle = OUT;
        g.fillRect(hx - 5, hy - 7, 11, 5);
        g.fillStyle = ac;
        g.fillRect(hx - 4, hy - 6, 9, 4);
        g.fillStyle = shade(ac, 0.5);
        g.fillRect(hx - 5, hy - 7, 2, 8);
        g.fillRect(hx + 4, hy - 7, 2, 8);
        g.fillStyle = "#141414";
        g.fillRect(hx + 1, hy - 5, 2, 2);
        g.fillStyle = mix(ac, "#ffffff", 0.45);
        g.fillRect(hx - 3, hy - 6, 7, 1);
        g.fillStyle = shade(ac, 0.75);
        g.fillRect(hx - 4, hy - 3, 9, 1);
      } else if (d.gear === "helm") {
        g.fillStyle = OUT;
        g.fillRect(hx - 6, hy - 10, 12, 7);
        g.fillStyle = ac;
        g.fillRect(hx - 5, hy - 10, 11, 6);
        g.fillStyle = "#222";
        g.fillRect(hx - 3, hy - 5, 8, 3);
        g.fillStyle = ac;
        g.fillRect(hx - 1, hy - 13, 2, 4);
        g.fillStyle = mix(ac, "#ffffff", 0.4);
        g.fillRect(hx - 5, hy - 10, 11, 1);
        g.fillStyle = S.FRAME % 40 < 20 ? "#e04020" : "#601414";
        g.fillRect(hx - 1, hy - 14, 2, 1);
        g.fillStyle = shade(ac, 0.6);
        g.fillRect(hx - 6, hy - 6, 2, 3);
        g.fillRect(hx + 5, hy - 6, 2, 3);
      } else if (d.gear === "hood") {
        g.fillStyle = OUT;
        g.beginPath();
        g.moveTo(hx - 7, hy + 3);
        g.lineTo(hx - 5, hy - 10);
        g.lineTo(hx + 6, hy - 9);
        g.lineTo(hx + 7, hy + 3);
        g.fill();
        const hg2 = g.createLinearGradient(hx - 6, 0, hx + 6, 0);
        hg2.addColorStop(0, shade(d.suit, 0.5));
        hg2.addColorStop(0.6, shade(d.suit, 0.7));
        hg2.addColorStop(1, shade(d.suit, 0.9));
        g.fillStyle = hg2;
        g.beginPath();
        g.moveTo(hx - 6, hy + 2);
        g.lineTo(hx - 4, hy - 9);
        g.lineTo(hx + 5, hy - 8);
        g.lineTo(hx + 6, hy + 2);
        g.fill();
        g.fillStyle = "#000";
        g.fillRect(hx - 2, hy - 5, 6, 4);
        const ec = d.id === 8 ? "#c060e0" : "#e04040";
        g.fillStyle = ec;
        g.fillRect(hx - 1, hy - 4, 2, 1);
        g.fillRect(hx + 2, hy - 4, 2, 1);
        g.globalAlpha = 0.5;
        g.fillRect(hx - 2, hy - 5, 6, 1);
        g.globalAlpha = 1;
      } else if (d.gear === "horn") {
        g.fillStyle = "#8a7a5c";
        g.beginPath();
        g.moveTo(hx - 4, hy - 8);
        g.lineTo(hx - 8, hy - 14);
        g.lineTo(hx - 2, hy - 9);
        g.fill();
        g.beginPath();
        g.moveTo(hx + 5, hy - 8);
        g.lineTo(hx + 9, hy - 14);
        g.lineTo(hx + 3, hy - 9);
        g.fill();
        g.fillStyle = "#a89878";
        g.beginPath();
        g.moveTo(hx - 5, hy - 9);
        g.lineTo(hx - 8, hy - 14);
        g.lineTo(hx - 3, hy - 10);
        g.fill();
        g.beginPath();
        g.moveTo(hx + 4, hy - 9);
        g.lineTo(hx + 8, hy - 14);
        g.lineTo(hx + 4, hy - 10);
        g.fill();
        g.fillStyle = "#141414";
        g.fillRect(hx - 1, hy - 5, 3, 2);
      } else if (d.gear === "visor") {
        g.fillStyle = OUT;
        g.fillRect(hx - 6, hy - 10, 12, 8);
        g.fillStyle = "#5a6450";
        g.fillRect(hx - 5, hy - 10, 11, 8);
        g.fillStyle = S.FRAME % 14 < 7 ? ac : shade(ac, 0.5);
        g.fillRect(hx - 4, hy - 7, 9, 2);
        g.fillStyle = "rgba(255,255,255,.3)";
        g.fillRect(hx - 4, hy - 7 + (S.FRAME >> 3) % 2, 9, 1);
        g.fillStyle = shade("#5a6450", 0.7);
        g.fillRect(hx - 5, hy - 4, 11, 2);
      } else if (d.gear === "band") {
        g.fillStyle = ac;
        g.fillRect(hx - 5, hy - 7, 11, 4);
        g.fillStyle = mix(ac, "#ffffff", 0.35);
        g.fillRect(hx - 5, hy - 7, 11, 1);
        g.fillStyle = shade(ac, 0.5);
        g.fillRect(hx + 5, hy - 7, 3, 7 + Math.sin(f.animT * 0.15) * 2);
        g.fillStyle = "#141414";
        g.fillRect(hx - 1, hy - 5, 3, 2);
        g.fillStyle = shade(d.skin, 0.75);
        g.fillRect(hx + 1, hy - 4, 1, 3);
        g.fillStyle = shade(d.skin, 0.85);
        g.fillRect(hx + 3, hy - 3, 1, 2);
      } else if (d.gear === "halo") {
        const hb = Math.sin(f.animT * 0.07) * 1.5;
        g.save();
        g.translate(hx + 1, hy - 17 + hb);
        g.rotate(f.animT * 0.04);
        g.fillStyle = OUT;
        g.fillRect(-4.5, -4.5, 9, 9);
        g.fillStyle = ac;
        g.fillRect(-3.5, -3.5, 7, 7);
        g.fillStyle = "#e8e8ff";
        g.fillRect(-1.5, -1.5, 3, 3);
        g.restore();
        g.fillStyle = ac;
        g.fillRect(hx - 1, hy - 9, 2, 2);
        if (!d.female) {
          g.fillStyle = "#141414";
          g.fillRect(hx - 1, hy - 5, 3, 2);
          g.fillStyle = shade(d.skin, 0.85);
          g.fillRect(hx - 1, hy - 3, 3, 1);
        }
        g.fillStyle = d.hair;
        g.fillRect(hx - 6, hy - 11, 12, 5);
        g.fillStyle = mix(d.hair, "#ffffff", 0.3);
        g.fillRect(hx - 6, hy - 11, 12, 1);
        if (d.female) {
          g.fillStyle = shade(d.hair, 0.82);
          g.beginPath();
          g.moveTo(hx + 3, hy - 11);
          g.lineTo(hx + 6, hy - 11);
          g.lineTo(hx + 6, hy - 7);
          g.lineTo(hx + 2, hy - 8);
          g.fill();
          g.fillStyle = mix(d.hair, "#ffffff", 0.45);
          g.fillRect(hx + 4, hy - 10, 1, 2);
          g.fillStyle = shade(d.hair, 0.8);
          g.fillRect(hx - 1, hy - 11, 1, 3);
        }
      } else if (d.gear === "tail") {
        g.fillStyle = d.hair;
        g.fillRect(hx - 6, hy - 11, 12, 5);
        g.fillRect(hx - 7, hy - 8, 14, 3);
        g.fillStyle = mix(d.hair, "#ffffff", 0.25);
        g.fillRect(hx - 6, hy - 11, 12, 1);
        const sw = Math.sin(f.animT * 0.12) * 3;
        g.strokeStyle = OUT;
        g.lineWidth = 5;
        g.beginPath();
        g.moveTo(hx - 6, hy - 9);
        g.quadraticCurveTo(hx - 14, hy - 6 + sw * 0.4, hx - 17, hy + 2 + sw);
        g.stroke();
        g.strokeStyle = d.hair;
        g.lineWidth = 3.5;
        g.beginPath();
        g.moveTo(hx - 6, hy - 9);
        g.quadraticCurveTo(hx - 14, hy - 6 + sw * 0.4, hx - 17, hy + 2 + sw);
        g.stroke();
        g.fillStyle = ac;
        g.fillRect(hx - 8, hy - 10, 2, 6);
        g.fillStyle = "#141414";
        g.fillRect(hx - 1, hy - 5, 3, 2);
        g.fillStyle = shade(d.skin, 0.85);
        g.fillRect(hx - 1, hy - 3, 3, 1);
      } else if (d.gear === "corona") {
        g.fillStyle = OUT;
        g.fillRect(hx - 7, hy - 11, 14, 4);
        g.fillStyle = ac;
        g.fillRect(hx - 6, hy - 10, 12, 2);
        for (let i = 0; i < 3; i++) {
          g.beginPath();
          g.moveTo(hx - 5 + i * 5, hy - 10);
          g.lineTo(hx - 2.5 + i * 5, hy - 15);
          g.lineTo(hx + i * 5, hy - 10);
          g.fill();
        }
        g.fillStyle = mix(ac, "#ffffff", 0.45);
        g.fillRect(hx - 6, hy - 10, 12, 1);
        g.fillStyle = "#f0d8d0";
        g.fillRect(hx - 1, hy - 11, 2, 1);
        g.fillStyle = "#141414";
        g.fillRect(hx - 1, hy - 5, 3, 2);
        g.fillStyle = shade(d.skin, 0.75);
        g.fillRect(hx - 6, hy - 2, 2, 4);
      } else {
        if (d.id === 0) {
          for (let i = 0; i < 3; i++) {
            const fx2 = hx - 3 + i * 3, hg = 4 + Math.sin(S.FRAME * 0.3 + i * 2) * 2;
            g.fillStyle = "#f06020";
            g.beginPath();
            g.moveTo(fx2 - 1, hy - 8);
            g.lineTo(fx2 + 1, hy - 9 - hg);
            g.lineTo(fx2 + 3, hy - 8);
            g.fill();
            g.fillStyle = "#f8d060";
            g.beginPath();
            g.moveTo(fx2, hy - 8);
            g.lineTo(fx2 + 1, hy - 8 - hg * 0.5);
            g.lineTo(fx2 + 2, hy - 8);
            g.fill();
          }
        } else {
          g.fillStyle = OUT;
          g.fillRect(hx - 6, hy - 11, 12, 5);
          g.fillStyle = d.hair;
          g.fillRect(hx - 5, hy - 11, 11, 4);
          g.fillRect(hx - 5, hy - 8, 3, 5);
          g.fillStyle = mix(d.hair, "#ffffff", 0.22);
          g.fillRect(hx - 5, hy - 11, 11, 1);
          g.fillRect(hx - 5, hy - 8, 1, 4);
        }
        g.fillStyle = "#141414";
        g.fillRect(hx - 1, hy - 6, 3, 2);
        g.fillStyle = shade(d.skin, 0.85);
        g.fillRect(hx - 1, hy - 3, 3, 1);
      }
    }
    function portraitTop(d) {
      return d.gear === "halo" ? -25 : d.gear === "horn" || d.gear === "corona" ? -19 : -15;
    }
    function drawPort(d, x, y, s) {
      g.save();
      g.lineCap = "round";
      g.translate(x, y);
      g.scale(s, s);
      const top = portraitTop(d), ph = 15 - top;
      const bg2 = g.createLinearGradient(0, top, 0, 15);
      bg2.addColorStop(0, shade(d.suit, 0.45));
      bg2.addColorStop(1, "#0c0a08");
      g.fillStyle = bg2;
      g.fillRect(-12, top, 24, ph);
      g.strokeStyle = "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(-11.5, top + 0.5, 23, ph - 1);
      g.fillStyle = OUT;
      g.fillRect(-4, 3, 8, 13);
      g.fillStyle = shade(d.skin, 0.7);
      g.fillRect(-3, 4, 6, 12);
      g.fillStyle = OUT;
      g.beginPath();
      g.moveTo(-11, 15);
      g.lineTo(-8, 1);
      g.lineTo(8, 1);
      g.lineTo(11, 15);
      g.closePath();
      g.fill();
      const tg2 = g.createLinearGradient(-8, 0, 8, 0);
      tg2.addColorStop(0, shade(d.suit, 0.55));
      tg2.addColorStop(0.5, d.suit);
      tg2.addColorStop(1, shade(d.suit, 0.85));
      g.fillStyle = tg2;
      g.beginPath();
      g.moveTo(-10, 15);
      g.lineTo(-7, 2);
      g.lineTo(7, 2);
      g.lineTo(10, 15);
      g.closePath();
      g.fill();
      g.fillStyle = d.acc;
      g.fillRect(-4, 5, 8, 2);
      g.fillStyle = shade(d.acc, 0.6);
      g.fillRect(-4, 6, 8, 1);
      g.fillStyle = mix(d.acc, "#ffffff", 0.4);
      g.fillRect(-1, 9, 2, 2);
      if (d.ponytail) {
        const sw = Math.sin(S.FRAME * 0.06) * 1;
        g.strokeStyle = OUT;
        g.lineWidth = 3.5;
        g.beginPath();
        g.moveTo(-5, -9);
        g.quadraticCurveTo(-10, -7 + sw, -11, 8 + sw);
        g.stroke();
        g.strokeStyle = d.hair;
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(-5, -9);
        g.quadraticCurveTo(-10, -7 + sw, -11, 8 + sw);
        g.stroke();
        g.strokeStyle = mix(d.hair, "#ffffff", 0.4);
        g.lineWidth = 0.7;
        g.beginPath();
        g.moveTo(-6, -9);
        g.quadraticCurveTo(-10, -7 + sw, -10, 7 + sw);
        g.stroke();
        g.fillStyle = d.acc;
        g.fillRect(-7, -10, 2, 4);
      }
      if (d.longhair) {
        g.fillStyle = OUT;
        g.fillRect(-9, -11, 3, 17);
        g.fillRect(6, -11, 3, 17);
        g.fillStyle = d.hair;
        g.fillRect(-8, -10, 2, 15);
        g.fillRect(6, -10, 2, 15);
        g.fillStyle = mix(d.hair, "#ffffff", 0.3);
        g.fillRect(-8, -10, 2, 1);
        g.fillRect(6, -10, 2, 1);
      }
      g.fillStyle = OUT;
      g.fillRect(-6, -12, 12, 17);
      g.fillStyle = d.skin;
      g.fillRect(-5, -11, 10, 15);
      if (d.female) {
        g.fillStyle = shade(d.skin, 0.9);
        g.fillRect(-4, 1, 9, 1);
        g.fillStyle = d.acc;
        g.fillRect(-7, -2, 1, 2);
      } else {
        g.fillStyle = shade(d.skin, 0.82);
        g.fillRect(-5, -1, 10, 4);
      }
      g.fillStyle = "#f0e8e0";
      g.fillRect(0, -7, 3, 2);
      g.fillStyle = "#141414";
      g.fillRect(d.female ? 2 : 1, -7, d.female ? 1 : 2, 2);
      if (d.female) {
        g.fillStyle = "#141414";
        g.fillRect(2, -8, 1, 1);
        g.fillStyle = shade(d.skin, 0.6);
        g.fillRect(0, -5, 1, 1);
        g.fillStyle = "#a85060";
        g.fillRect(0, -2, 2, 1);
      }
      g.fillStyle = shade(d.skin, 0.72);
      g.fillRect(0, d.female ? -9 : -8, 4, 1);
      drawGear({ def: d, animT: 0, charred: 0 }, 0, -3);
      g.restore();
    }
    const FAKES = CH2.map((d) => ({ def: d, x: 0, y: FL + GR, face: 1, animT: 0, state: "idle", st: 0, atk: null, tilt: 0, squash: 1, scale: 1, invis: 0, frozen: 0, netT: 0, charred: 0, hidden: 0, flash: 0, hp: 100 }));
    function drawFake(i, px, py, sc, face) {
      const fk = typeof i === "object" ? Object.assign({}, FAKES[i.id] || FAKES[0], { def: i }) : FAKES[i];
      fk.animT = S.FRAME;
      fk.face = face;
      g.save();
      g.translate(px, py);
      g.scale(sc, sc);
      g.translate(-fk.x, -fk.y);
      drawF(fk, 0);
      g.restore();
    }
    function drawHUD(b) {
      const p1 = b.p1, p2 = b.p2;
      const pg = g.createLinearGradient(0, 6, 0, 40);
      pg.addColorStop(0, "rgba(28,22,14,.96)");
      pg.addColorStop(0.5, "rgba(12,9,6,.96)");
      pg.addColorStop(1, "rgba(5,4,3,.96)");
      g.fillStyle = pg;
      g.fillRect(6, 6, RW - 12, 34);
      frame(6, 6, RW - 12, 34);
      g.fillStyle = "rgba(248,220,140,.28)";
      g.fillRect(7, 7, RW - 14, 1);
      const bar = (f, x, dir) => {
        const w = 150, d = f.def;
        g.fillStyle = "#1a0505";
        g.fillRect(x - 1, 12, w + 2, 10);
        g.strokeStyle = "rgba(200,160,64,.5)";
        g.lineWidth = 1;
        g.strokeRect(x - 0.5, 12.5, w + 1, 9);
        const hw = w * f.hp / 100, lw = w * (f.hpLag === void 0 ? 100 : f.hpLag) / 100;
        g.fillStyle = "#f8f0e0";
        g.fillRect(dir > 0 ? x : x + w - lw, 13, lw, 8);
        const low = f.hp <= 30, hpg = g.createLinearGradient(0, 13, 0, 21);
        hpg.addColorStop(0, low ? "#f87850" : "#f8dc70");
        hpg.addColorStop(0.45, low ? "#e04020" : "#e8c040");
        hpg.addColorStop(1, low ? "#7a1008" : "#a87818");
        g.fillStyle = hpg;
        g.fillRect(dir > 0 ? x : x + w - hw, 13, hw, 8);
        g.fillStyle = "rgba(255,255,255,.45)";
        g.fillRect(dir > 0 ? x : x + w - hw, 13, hw, 1);
        g.fillStyle = "rgba(0,0,0,.28)";
        g.fillRect(dir > 0 ? x : x + w - hw, 19, hw, 2);
        if (f.flash > 0) {
          g.fillStyle = "#fff";
          g.fillRect(dir > 0 ? x : x + w - hw, 13, hw, 3);
        }
        g.fillStyle = "rgba(0,0,0,.3)";
        for (let i = 1; i < 10; i++) g.fillRect(x + i * 15, 13, 1, 8);
        g.fillStyle = d.acc;
        g.fillRect(dir > 0 ? x - 1 : x + w - 1, 12, 2, 10);
        g.font = '8px "Russo One"';
        g.textAlign = dir > 0 ? "left" : "right";
        const nw = g.measureText(f.def.name).width;
        g.fillStyle = "rgba(0,0,0,.6)";
        g.fillRect(dir > 0 ? x - 2 : x + w - nw - 6, 25, nw + 8, 10);
        g.fillStyle = d.acc;
        g.fillRect(dir > 0 ? x - 2 : x + w - nw - 6, 25, 2, 10);
        g.fillStyle = "#f0e8d0";
        g.fillText(f.def.name, dir > 0 ? x + 2 : x + w - 2, 33);
        g.fillStyle = "#2a0a0a";
        g.fillRect(x, 40, w, 3);
        g.fillStyle = f.rage >= 100 ? blink() ? "#ff7050" : "#c02010" : "#8a2018";
        g.fillRect(dir > 0 ? x : x + w - w * f.rage / 100, 40, w * f.rage / 100, 3);
        if (f.rage >= 100) {
          g.fillStyle = "rgba(255,96,64,.35)";
          g.fillRect(dir > 0 ? x : x + w - w, 40, w, 3);
        }
        g.fillStyle = "#3a3418";
        g.fillRect(x, 44, w, 2);
        g.fillStyle = "#c8b040";
        g.fillRect(dir > 0 ? x : x + w - w * f.run / 100, 44, w * f.run / 100, 2);
        if (f.rage >= 100) {
          g.fillStyle = "#ff5030";
          g.font = '7px "Russo One"';
          g.globalAlpha = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(S.FRAME * 0.08));
          g.fillText("\u0421\u0423\u041F\u0415\u0420 \u0413\u041E\u0422\u041E\u0412", dir > 0 ? x + 2 : x + w - 2, 52);
          g.globalAlpha = 1;
        }
      };
      bar(p1, 40, 1);
      bar(p2, RW - 190, -1);
      drawPort(p1.def, 24, 26.5, 0.8);
      drawPort(p2.def, RW - 24, 26.5, 0.8);
      const pt1 = portraitTop(p1.def), pt2 = portraitTop(p2.def);
      g.strokeStyle = p1.def.acc;
      g.lineWidth = 1;
      g.strokeRect(14.5, 26 + pt1 * 0.8, 19, (15 - pt1) * 0.8 + 1);
      g.strokeStyle = p2.def.acc;
      g.strokeRect(RW - 33.5, 26 + pt2 * 0.8, 19, (15 - pt2) * 0.8 + 1);
      g.fillStyle = "rgba(0,0,0,.78)";
      g.fillRect(RW / 2 - 18, 7, 36, 22);
      frame(RW / 2 - 18, 7, 36, 22);
      if (b.timer < 11) {
        g.strokeStyle = blink() ? "#ff5030" : "#801818";
        g.lineWidth = 1;
        g.strokeRect(RW / 2 - 17.5, 7.5, 35, 21);
      }
      g.font = '15px "Russo One"';
      g.fillStyle = b.timer < 11 && blink() ? "#ff5030" : "#f0e8d0";
      g.textAlign = "center";
      g.fillText(b.mode === "training" ? "\u221E" : "" + Math.ceil(b.timer), RW / 2, 23);
      const pip = (x, y, on) => {
        g.fillStyle = on ? "#e04020" : "#2a2522";
        g.beginPath();
        g.moveTo(x + 3, y);
        g.lineTo(x + 6, y + 3);
        g.lineTo(x + 3, y + 6);
        g.lineTo(x, y + 3);
        g.closePath();
        g.fill();
        if (on) {
          g.fillStyle = "rgba(255,140,110,.6)";
          g.fillRect(x + 2, y + 2, 2, 2);
        }
      };
      for (let i = 0; i < 2; i++) {
        pip(RW / 2 - 45 - i * 9, 10, i < p1.wins);
        pip(RW / 2 + 39 + i * 9, 10, i < p2.wins);
      }
    }
    function bigText(t, y, col, sc) {
      g.save();
      g.translate(RW / 2, y);
      g.scale(sc, sc);
      g.font = '20px "Rubik Mono One","Russo One",sans-serif';
      g.textAlign = "center";
      g.fillStyle = "#000";
      for (let dx = -2; dx <= 2; dx += 2) for (let dy = -2; dy <= 2; dy += 2) g.fillText(t, dx, dy);
      g.fillStyle = col;
      g.fillText(t, 0, 0);
      g.restore();
    }
    function frame(x, y, w, h, key = "panel") {
      const p = UI[key];
      if (p && p.ready) {
        const sm = p.slice || 12, dm = Math.min(sm, Math.max(2, Math.floor(Math.min(w, h) / 2))), iw = p.image.width, ih = p.image.height, cw = iw - sm * 2, ch = ih - sm * 2;
        g.save();
        g.imageSmoothingEnabled = false;
        g.drawImage(p.image, 0, 0, sm, sm, x, y, dm, dm);
        g.drawImage(p.image, iw - sm, 0, sm, sm, x + w - dm, y, dm, dm);
        g.drawImage(p.image, 0, ih - sm, sm, sm, x, y + h - dm, dm, dm);
        g.drawImage(p.image, iw - sm, ih - sm, sm, sm, x + w - dm, y + h - dm, dm, dm);
        g.drawImage(p.image, sm, 0, cw, sm, x + dm, y, w - dm * 2, dm);
        g.drawImage(p.image, sm, ih - sm, cw, sm, x + dm, y + h - dm, w - dm * 2, dm);
        g.drawImage(p.image, 0, sm, sm, ch, x, y + dm, dm, h - dm * 2);
        g.drawImage(p.image, iw - sm, sm, sm, ch, x + w - dm, y + dm, dm, h - dm * 2);
        g.restore();
        return true;
      }
      g.strokeStyle = "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      g.fillStyle = "#c8a040";
      g.fillRect(x, y, 3, 3);
      g.fillRect(x + w - 3, y, 3, 3);
      g.fillRect(x, y + h - 3, 3, 3);
      g.fillRect(x + w - 3, y + h - 3, 3, 3);
      return false;
    }
    function panel(x, y, w, h) {
      g.fillStyle = "rgba(10,8,6,.93)";
      g.fillRect(x, y, w, h);
      frame(x, y, w, h);
    }
    const seqTxt = (s, p2, face = 1, generic = false) => s.split("").map((x) => {
      if (face < 0 && x === "L") x = "R";
      else if (face < 0 && x === "R") x = "L";
      return { D: "\u2193", U: "\u2191", L: "\u2190", R: "\u2192", P: generic ? "P" : p2 ? "I" : "J", K: generic ? "K" : p2 ? "O" : "K" }[x];
    }).join(" ");
    function drawFatalPanel(b) {
      const left = Math.max(0, 1 - b.phaseT / fatalFrames);
      g.fillStyle = "rgba(0,0,0,.6)";
      g.fillRect(RW / 2 - 80, 220, 160, 5);
      g.fillStyle = left > 0.35 ? "#c8a040" : "#e04020";
      g.fillRect(RW / 2 - 80, 220, 160 * left, 5);
      g.strokeStyle = "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(RW / 2 - 80.5, 219.5, 161, 6);
      if (!b.winner.ctrl.ai) {
        const w = b.winner, p2 = w === b.p2, prog = b.fatalProg || 0, seq = fatalMapped(w.def.fat, w.face), n = seq.length, secs = Math.max(0, Math.ceil((fatalFrames - b.phaseT) / 60));
        g.fillStyle = "rgba(8,5,4,.86)";
        g.fillRect(116, 52, 192, 36);
        frame(116, 52, 192, 36);
        g.font = '7px "Russo One"';
        g.fillStyle = "#c8a040";
        g.textAlign = "left";
        g.fillText("\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418", 124, 63);
        g.textAlign = "right";
        g.fillStyle = secs > 3 ? "#c8a040" : "#e04020";
        g.fillText(secs + " \u0421", 300, 63);
        g.font = '12px "Russo One"';
        g.fillStyle = blink() ? "#e02020" : "#f0e8d0";
        g.textAlign = "center";
        g.fillText(seqTxt(w.def.fat, p2, w.face), 212, 76);
        const bw = 12, gap = 5, tw = n * bw + (n - 1) * gap, sx = 212 - tw / 2;
        for (let i = 0; i < n; i++) {
          const x = sx + i * (bw + gap), on = i < prog;
          g.fillStyle = on ? "#e04020" : "#2a2522";
          g.fillRect(x, 81, bw, 3);
          if (on) {
            g.fillStyle = "rgba(255,140,110,.55)";
            g.fillRect(x, 81, bw, 1);
          }
        }
      }
    }
    return {
      pose,
      drawF,
      drawFighterGlow,
      drawGear,
      portraitTop,
      drawPort,
      drawFake,
      drawHUD,
      bigText,
      frame,
      panel,
      seqTxt,
      drawFatalPanel,
      drawProjs,
      drawBolt,
      drawFx
    };
  }

  // src/audio/audio.js
  function createAudio({ S, clamp: clamp2, rnd }) {
    const AU = { ctx: null, on: true, voice: true, vol: 100, samples: {}, loading: {}, audioLoading: false, musicSrc: null, musicGain: null, musicTrack: "", lastSample: "" };
    try {
      if (localStorage.karnageVox !== void 0) AU.voice = localStorage.karnageVox === "1";
      if (localStorage.karnageVol !== void 0) {
        const v = parseFloat(localStorage.karnageVol);
        if (Number.isFinite(v)) AU.vol = clamp2(v, 0, 100);
      }
      if (localStorage.karnageSnd !== void 0) AU.on = localStorage.karnageSnd === "1";
    } catch (e) {
    }
    const setVol = () => {
      if (AU.master) AU.master.gain.value = AU.on ? 0.9 * AU.vol / 100 : 0;
    };
    const saveSet = () => {
      try {
        localStorage.karnageSnd = AU.on ? 1 : 0;
        localStorage.karnageVox = AU.voice ? 1 : 0;
        localStorage.karnageVol = AU.vol;
      } catch (e) {
      }
    };
    const MU = { s: 0, next: 0 };
    function initA() {
      if (AU.ctx) return;
      try {
        AU.ctx = new (window.AudioContext || window.webkitAudioContext)();
        AU.master = AU.ctx.createGain();
        AU.master.gain.value = AU.on ? 0.9 * AU.vol / 100 : 0;
        AU.master.connect(AU.ctx.destination);
        AU.mg = AU.ctx.createGain();
        AU.mg.gain.value = 0.3;
        AU.mg.connect(AU.master);
        MU.next = AU.ctx.currentTime + 0.1;
        loadAudio();
      } catch (e) {
      }
    }
    function tone(o) {
      if (!AU.ctx || !AU.on) return;
      const c = AU.ctx, t = c.currentTime + (o.w || 0);
      const os = c.createOscillator(), gn = c.createGain();
      os.type = o.t || "square";
      os.frequency.setValueAtTime(o.f, t);
      if (o.f2) os.frequency.exponentialRampToValueAtTime(Math.max(1, o.f2), t + (o.d || 0.1));
      gn.gain.setValueAtTime(o.v || 0.3, t);
      gn.gain.exponentialRampToValueAtTime(1e-3, t + (o.d || 0.1));
      os.connect(gn);
      gn.connect(o.m ? AU.mg : AU.master);
      os.start(t);
      os.stop(t + (o.d || 0.1) + 0.02);
    }
    function nz(o) {
      if (!AU.ctx || !AU.on) return;
      const c = AU.ctx, t = c.currentTime + (o.w || 0), d = o.d || 0.1;
      const n = c.sampleRate * d | 0, b = c.createBuffer(1, Math.max(1, n), c.sampleRate), ch = b.getChannelData(0);
      for (let i = 0; i < n; i++) ch[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource();
      s.buffer = b;
      const f = c.createBiquadFilter();
      f.type = o.ft || "lowpass";
      f.frequency.setValueAtTime(o.fl || 800, t);
      if (o.fl2) f.frequency.exponentialRampToValueAtTime(o.fl2, t + d);
      const gn = c.createGain();
      gn.gain.setValueAtTime(o.v || 0.3, t);
      gn.gain.exponentialRampToValueAtTime(1e-3, t + d);
      s.connect(f);
      f.connect(gn);
      gn.connect(o.m ? AU.mg : AU.master);
      s.start(t);
      s.stop(t + d + 0.02);
    }
    const SFX = {
      swing: () => nz({ d: 0.06, v: 0.09, ft: "highpass", fl: 1500 }),
      hit: () => {
        nz({ d: 0.09, v: 0.45, fl: 520, fl2: 120 });
        tone({ f: 130, f2: 55, d: 0.08, v: 0.24 });
      },
      hitH: () => {
        nz({ d: 0.14, v: 0.55, fl: 340, fl2: 80 });
        tone({ f: 95, f2: 38, d: 0.12, v: 0.3 });
      },
      block: () => {
        tone({ f: 620, d: 0.04, v: 0.15 });
        nz({ d: 0.05, v: 0.12, ft: "highpass", fl: 2600 });
      },
      upper: () => {
        tone({ f: 170, f2: 640, d: 0.18, t: "sawtooth", v: 0.2 });
        nz({ d: 0.12, v: 0.2, fl: 700, fl2: 1800 });
      },
      land: () => nz({ d: 0.09, v: 0.22, fl: 300, fl2: 90 }),
      fire: () => {
        nz({ d: 0.3, v: 0.28, ft: "bandpass", fl: 420, fl2: 150 });
        tone({ f: 100, f2: 60, d: 0.25, t: "sawtooth", v: 0.11 });
      },
      ice: () => {
        tone({ f: 1150, f2: 1750, d: 0.12, t: "triangle", v: 0.15 });
        tone({ f: 1600, d: 0.07, t: "sine", v: 0.09, w: 0.05 });
      },
      zap: () => {
        for (let i = 0; i < 4; i++) tone({ f: rnd(300, 2400), d: 0.03, v: 0.11, w: i * 0.025 });
        nz({ d: 0.12, v: 0.18, ft: "highpass", fl: 1800 });
      },
      tele: () => {
        tone({ f: 900, f2: 90, d: 0.22, t: "sine", v: 0.2 });
        nz({ d: 0.15, v: 0.1, ft: "bandpass", fl: 900, fl2: 200 });
      },
      boom: () => {
        nz({ d: 0.45, v: 0.6, fl: 260, fl2: 50 });
        tone({ f: 70, f2: 28, d: 0.4, t: "sine", v: 0.4 });
      },
      net: () => nz({ d: 0.18, v: 0.2, ft: "highpass", fl: 1e3, fl2: 3e3 }),
      slash: () => {
        nz({ d: 0.05, v: 0.28, ft: "highpass", fl: 2200 });
        nz({ d: 0.05, v: 0.22, ft: "highpass", fl: 1800, w: 0.05 });
      },
      shoot: () => {
        tone({ f: 240, f2: 60, d: 0.05, v: 0.18 });
        nz({ d: 0.04, v: 0.2, ft: "highpass", fl: 1500 });
      },
      bone: () => tone({ f: 190, f2: 80, d: 0.06, v: 0.24 }),
      sting: () => {
        tone({ f: 82, d: 1, t: "sawtooth", v: 0.2 });
        tone({ f: 87, d: 1, t: "sawtooth", v: 0.16 });
      },
      menu: () => tone({ f: 420, d: 0.04, v: 0.11 }),
      sel: () => tone({ f: 520, f2: 760, d: 0.09, v: 0.13 }),
      fatal: () => {
        tone({ f: 60, d: 1.2, t: "sawtooth", v: 0.3 });
        nz({ d: 1, v: 0.2, fl: 200, fl2: 40 });
      },
      rdy: () => {
        tone({ f: 330, f2: 880, d: 0.25, t: "sawtooth", v: 0.15 });
        tone({ f: 660, f2: 1320, d: 0.25, t: "sawtooth", v: 0.1, w: 0.08 });
      },
      jump: () => nz({ d: 0.12, v: 0.1, ft: "bandpass", fl: 300, fl2: 1400 }),
      freeze: () => {
        tone({ f: 1400, d: 0.3, t: "triangle", v: 0.12 });
        tone({ f: 2100, d: 0.25, t: "sine", v: 0.08, w: 0.06 });
        nz({ d: 0.2, v: 0.06, ft: "highpass", fl: 4e3 });
      },
      supwave: () => {
        nz({ d: 0.5, v: 0.4, fl: 400, fl2: 60 });
        tone({ f: 55, f2: 30, d: 0.5, t: "sine", v: 0.35 });
      },
      win: () => {
        tone({ f: 392, d: 0.12, t: "square", v: 0.12 });
        tone({ f: 523, d: 0.12, t: "square", v: 0.12, w: 0.12 });
        tone({ f: 659, d: 0.22, t: "square", v: 0.12, w: 0.24 });
      },
      step: () => nz({ d: 0.03, v: 0.05, fl: 400 }),
      ko: () => {
        nz({ d: 0.7, v: 0.5, fl: 200, fl2: 40 });
        tone({ f: 50, f2: 24, d: 0.7, t: "sine", v: 0.4 });
      },
      cast: () => {
        tone({ f: 220, f2: 660, d: 0.2, t: "triangle", v: 0.09 });
        nz({ d: 0.15, v: 0.06, ft: "bandpass", fl: 600, fl2: 1800 });
      },
      combo: () => {
        tone({ f: 660, f2: 990, d: 0.12, t: "square", v: 0.12 });
        tone({ f: 990, f2: 1320, d: 0.12, t: "square", v: 0.09, w: 0.06 });
      },
      tick: () => tone({ f: 880, d: 0.05, t: "square", v: 0.08 }),
      thunder: () => {
        nz({ d: 1.4, v: 0.35, fl: 120, fl2: 35 });
        tone({ f: 45, f2: 28, d: 1.2, t: "sine", v: 0.25 });
      }
    };
    Object.assign(SFX, {
      // 30.09: новые звуки — второй спец, тревога HP, вариант удара, промах, зеркала, разрыв комбо, рёв VS, монетка
      cast2: () => {
        tone({ f: 330, f2: 990, d: 0.22, t: "square", v: 0.09 });
        tone({ f: 660, f2: 1320, d: 0.18, t: "triangle", v: 0.07, w: 0.06 });
        nz({ d: 0.14, v: 0.07, ft: "bandpass", fl: 900, fl2: 2400 });
      },
      heart: () => {
        tone({ f: 62, d: 0.09, t: "sine", v: 0.3 });
        tone({ f: 55, d: 0.11, t: "sine", v: 0.24, w: 0.14 });
      },
      hitV: () => {
        nz({ d: 0.11, v: 0.42, fl: 640, fl2: 130 });
        tone({ f: rnd(150, 190), f2: 60, d: 0.08, v: 0.22 });
      },
      whiff: () => nz({ d: 0.1, v: 0.07, ft: "bandpass", fl: 600, fl2: 2600 }),
      mirror: () => {
        tone({ f: 880, f2: 440, d: 0.16, t: "triangle", v: 0.12 });
        tone({ f: 1320, f2: 660, d: 0.16, t: "triangle", v: 0.08, w: 0.04 });
      },
      cbreak: () => {
        tone({ f: 240, f2: 120, d: 0.14, t: "sawtooth", v: 0.18 });
        nz({ d: 0.1, v: 0.14, ft: "highpass", fl: 1200 });
      },
      vsroar: () => {
        nz({ d: 0.8, v: 0.3, fl: 300, fl2: 60 });
        tone({ f: 110, f2: 55, d: 0.7, t: "sawtooth", v: 0.14 });
      },
      coin: () => {
        tone({ f: 988, d: 0.07, t: "square", v: 0.12 });
        tone({ f: 1319, d: 0.18, t: "square", v: 0.12, w: 0.07 });
      }
    });
    const AUDIO_BASE = "assets/audio/";
    const SAMPLES = {
      hit: [AUDIO_BASE + "sfx/impact/impactPunch_heavy_000.wav", AUDIO_BASE + "sfx/impact/impactPunch_heavy_001.wav", AUDIO_BASE + "sfx/impact/impactPunch_medium_000.wav"],
      hitH: [AUDIO_BASE + "sfx/impact/impactSoft_heavy_000.wav", AUDIO_BASE + "sfx/impact/impactMetal_heavy_000.wav", AUDIO_BASE + "sfx/impact/impactPunch_heavy_002.wav"],
      hitV: [AUDIO_BASE + "sfx/impact/impactPunch_medium_001.wav", AUDIO_BASE + "sfx/impact/impactPunch_medium_002.wav"],
      upper: [AUDIO_BASE + "sfx/impact/impactPunch_heavy_003.wav", AUDIO_BASE + "sfx/impact/impactMetal_heavy_001.wav"],
      block: [AUDIO_BASE + "sfx/impact/impactPlate_medium_000.wav", AUDIO_BASE + "sfx/impact/impactMetal_light_000.wav", AUDIO_BASE + "sfx/impact/impactPlate_light_000.wav"],
      step: [AUDIO_BASE + "sfx/footsteps/footstep_concrete_000.wav", AUDIO_BASE + "sfx/footsteps/footstep_concrete_001.wav", AUDIO_BASE + "sfx/footsteps/footstep_wood_000.wav", AUDIO_BASE + "sfx/footsteps/footstep_snow_000.wav"],
      land: [AUDIO_BASE + "sfx/impact/impactSoft_medium_000.wav", AUDIO_BASE + "sfx/impact/impactSoft_medium_001.wav"],
      menu: [AUDIO_BASE + "sfx/ui/interface/interface_click_002.wav", AUDIO_BASE + "sfx/ui/kenney/ui_click1.wav"],
      sel: [AUDIO_BASE + "sfx/ui/interface/interface_confirmation_002.wav", AUDIO_BASE + "sfx/ui/interface/interface_select_003.wav"],
      tick: [AUDIO_BASE + "sfx/ui/interface/interface_tick_001.wav"],
      zap: [AUDIO_BASE + "sfx/digital/zap1.wav", AUDIO_BASE + "sfx/digital/zap2.wav"],
      shoot: [AUDIO_BASE + "sfx/scifi/laserSmall_000.wav", AUDIO_BASE + "sfx/scifi/laserLarge_000.wav", AUDIO_BASE + "sfx/scifi/laserRetro_000.wav"],
      slash: [AUDIO_BASE + "sfx/combat/knifeSlice.wav", AUDIO_BASE + "sfx/combat/chop.wav"],
      fire: [AUDIO_BASE + "sfx/scifi/thrusterFire_000.wav", AUDIO_BASE + "sfx/scifi/explosionCrunch_003.wav"],
      ice: [AUDIO_BASE + "sfx/scifi/forceField_000.wav", AUDIO_BASE + "sfx/scifi/forceField_001.wav"],
      net: [AUDIO_BASE + "sfx/scifi/forceField_002.wav", AUDIO_BASE + "sfx/scifi/forceField_003.wav"],
      tele: [AUDIO_BASE + "sfx/digital/phaseJump1.wav", AUDIO_BASE + "sfx/digital/phaseJump2.wav"],
      boom: [AUDIO_BASE + "sfx/scifi/explosionCrunch_000.wav", AUDIO_BASE + "sfx/scifi/explosionCrunch_001.wav"],
      ko: [AUDIO_BASE + "sfx/scifi/explosionCrunch_002.wav", AUDIO_BASE + "sfx/scifi/lowFrequency_explosion_000.wav"],
      rdy: [AUDIO_BASE + "sfx/digital/powerUp1.wav", AUDIO_BASE + "sfx/digital/powerUp2.wav"],
      coin: [AUDIO_BASE + "music/jingles/8-Bit jingles/jingles_NES00.mp3"],
      win: [AUDIO_BASE + "music/jingles/Hit jingles/jingles_HIT00.mp3"],
      fatal: [AUDIO_BASE + "sfx/scifi/explosionCrunch_004.wav", AUDIO_BASE + "sfx/scifi/lowFrequency_explosion_001.wav"]
    };
    const MUSIC_TRACKS = {
      menu: { src: AUDIO_BASE + "music/sector-0.mp3", vol: 0.22 },
      battle: { src: AUDIO_BASE + "music/urgent-2.mp3", vol: 0.26 },
      battle8: { src: AUDIO_BASE + "music/8bit-battle-loop.mp3", vol: 0.24 },
      pause: { src: AUDIO_BASE + "music/airy-0.mp3", vol: 0.18 },
      victory: { src: AUDIO_BASE + "music/victory-5.mp3", vol: 0.32, loop: false }
    };
    function loadBuffer(path) {
      if (!AU.ctx) return Promise.resolve(null);
      if (AU.samples[path]) return Promise.resolve(AU.samples[path]);
      if (AU.loading[path]) return AU.loading[path];
      const url = new URL(path, location.href).href;
      AU.loading[path] = fetch(url, { cache: "force-cache" }).then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.arrayBuffer();
      }).then((buf) => AU.ctx.decodeAudioData(buf)).then((buffer) => {
        AU.samples[path] = buffer;
        return buffer;
      }).catch(() => null);
      return AU.loading[path];
    }
    function loadAudio() {
      if (!AU.ctx || AU.audioLoading) return;
      AU.audioLoading = true;
      const paths = [.../* @__PURE__ */ new Set([...Object.values(SAMPLES).flat(), ...Object.values(MUSIC_TRACKS).map((t) => t.src)])];
      Promise.all(paths.map(loadBuffer)).finally(() => {
        AU.audioLoading = false;
      });
    }
    function playSample(key, volume = 0.5, pitch = 0.03) {
      if (!AU.ctx || !AU.on || AU.vol <= 0) return false;
      const list = SAMPLES[key];
      if (!list) return false;
      const ready = list.filter((path2) => AU.samples[path2]);
      if (!ready.length) {
        for (const path2 of list) loadBuffer(path2);
        return false;
      }
      const path = ready[Math.random() * ready.length | 0];
      const c = AU.ctx, src = c.createBufferSource(), gain = c.createGain();
      src.buffer = AU.samples[path];
      const rate = 1 + (pitch ? (Math.random() * 2 - 1) * pitch : 0);
      src.playbackRate.value = rate;
      const dur = Math.max(0.04, src.buffer.duration / rate), t = c.currentTime;
      gain.gain.setValueAtTime(volume, t);
      gain.gain.setValueAtTime(volume, Math.max(t, t + dur - 0.03));
      gain.gain.linearRampToValueAtTime(1e-4, t + dur);
      src.connect(gain);
      gain.connect(AU.master);
      src.start(t);
      src.stop(t + dur + 0.02);
      AU.lastSample = key;
      return true;
    }
    function stopMusic() {
      if (AU.musicSrc) {
        try {
          AU.musicSrc.onended = null;
          AU.musicSrc.stop();
        } catch (e) {
        }
      }
      AU.musicSrc = null;
      AU.musicGain = null;
      AU.musicTrack = "";
    }
    function startMusic(name) {
      const track = MUSIC_TRACKS[name];
      if (!track) return false;
      if (AU.musicTrack === name) return true;
      if (!AU.samples[track.src]) {
        loadBuffer(track.src);
        return false;
      }
      stopMusic();
      const c = AU.ctx, src = c.createBufferSource(), gain = c.createGain();
      src.buffer = AU.samples[track.src];
      src.loop = track.loop !== false;
      gain.gain.value = track.vol;
      src.connect(gain);
      gain.connect(AU.master);
      src.onended = () => {
        if (AU.musicSrc === src) AU.musicSrc = null;
      };
      src.start();
      AU.musicSrc = src;
      AU.musicGain = gain;
      AU.musicTrack = name;
      return true;
    }
    function musicTrackFor(md) {
      if (md === "fight") return S.battle && S.battle.mode === "arcade" ? "battle8" : "battle";
      if (md === "menu") return "menu";
      if (md === "vs") return "battle8";
      if (md === "pause") return "pause";
      if (md === "end") return S.GAME === "ending" ? "victory" : "pause";
      return "";
    }
    const SYNTH_SFX = { ...SFX };
    const SAMPLE_SFX = {
      hit: ["hit", 0.6, 0.04],
      hitH: ["hitH", 0.72, 0.03],
      hitV: ["hitV", 0.55, 0.05],
      block: ["block", 0.55, 0.02],
      upper: ["upper", 0.65, 0.03],
      step: ["step", 0.18, 0.12],
      land: ["land", 0.45, 0.06],
      menu: ["menu", 0.38, 0],
      sel: ["sel", 0.48, 0],
      tick: ["tick", 0.3, 0],
      zap: ["zap", 0.5, 0.03],
      shoot: ["shoot", 0.45, 0.03],
      slash: ["slash", 0.55, 0.03],
      fire: ["fire", 0.45, 0.03],
      ice: ["ice", 0.4, 0.02],
      net: ["net", 0.45, 0.02],
      tele: ["tele", 0.45, 0.02],
      boom: ["boom", 0.72, 0.02],
      ko: ["ko", 0.85, 0.02],
      rdy: ["rdy", 0.5, 0.02],
      coin: ["coin", 0.42, 0],
      win: ["win", 0.55, 0],
      fatal: ["fatal", 0.8, 0.02]
    };
    for (const [name, spec] of Object.entries(SAMPLE_SFX)) {
      const synth = SYNTH_SFX[name];
      if (typeof synth === "function") SFX[name] = function() {
        if (!playSample(spec[0], spec[1], spec[2])) synth();
      };
    }
    let VOICES = [];
    if (window.speechSynthesis) {
      try {
        speechSynthesis.onvoiceschanged = () => {
          VOICES = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.startsWith("en"));
        };
        speechSynthesis.getVoices();
      } catch (e) {
      }
    }
    function say(t) {
      if (!AU.on || !AU.voice || AU.vol <= 0 || !window.speechSynthesis) return;
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(t);
        const v = VOICES.find((v2) => /david|daniel|fred|male|george/i.test(v2.name));
        if (v) u.voice = v;
        u.pitch = 0.3;
        u.rate = 0.8;
        u.volume = AU.vol / 100;
        u.lang = "en-US";
        speechSynthesis.speak(u);
      } catch (e) {
      }
    }
    const BASS = [0, 0, 3, 0, -2, -2, 3, 5, 0, 0, 3, 0, -4, -4, -2, 2];
    const MBASS = [0, 0, -2, 0, 3, 3, 5, 3, 0, 0, -2, 0, -4, -4, 0, 3];
    const VBASS = [0, 0, 3, 5, 0, 0, 3, 2, 0, 0, 3, 5, 7, 5, 3, 2];
    const EBASS = [0, 4, 7, 12, 9, 7, 4, 0];
    function music() {
      if (!AU.ctx || !AU.on) {
        stopMusic();
        return;
      }
      const c = AU.ctx;
      if (MU.next < c.currentTime - 0.25) {
        MU.next = c.currentTime + 0.05;
        MU.s = 0;
      }
      const md = S.GAME === "fight" && S.battle ? S.paused ? "pause" : "fight" : S.GAME === "vs" ? "vs" : S.GAME === "ending" || S.GAME === "continue" ? "end" : "menu";
      const track = musicTrackFor(md);
      if (track && startMusic(track)) return;
      const tr = md === "fight" ? S.battle.arena : 0;
      const dt = md === "pause" ? 0.28 : md === "vs" ? 0.11 : md === "fight" && S.battle.aiLvl >= 7 ? 0.115 : md === "end" ? 0.22 : md === "menu" ? 0.16 : 0.13;
      while (MU.next < c.currentTime + 0.15) {
        const s = MU.s % 32, w = MU.next - c.currentTime;
        if (md === "pause") {
          if (s % 8 === 0) [0, 3, 7].forEach((n) => tone({ f: 82.4 * Math.pow(2, n / 12), d: 2.8, t: "triangle", v: 0.05, w, m: 1 }));
          if (s % 16 === 4) tone({ f: 55, d: 1.8, t: "sine", v: 0.09, w, m: 1 });
        } else if (md === "vs") {
          if (s % 4 === 0) tone({ f: 110, f2: 55, d: 0.1, t: "sawtooth", v: 0.15, w, m: 1 });
          if (s % 8 === 4) nz({ d: 0.06, v: 0.13, ft: "bandpass", fl: 1500, w, m: 1 });
          if (s % 2 === 0) tone({ f: 220 * Math.pow(2, VBASS[s / 2 | 0] / 12), d: 0.07, t: "square", v: 0.05, w, m: 1 });
        } else if (md === "end") {
          if (s % 16 === 0) [0, 4, 7, 12].forEach((n) => tone({ f: 130.8 * Math.pow(2, n / 12), d: 3.5, t: "triangle", v: 0.05, w, m: 1 }));
          if (s % 4 === 0) tone({ f: 261.6 * Math.pow(2, EBASS[(s / 4 | 0) % 8] / 12), d: 0.42, t: "triangle", v: 0.08, w, m: 1 });
          if (s % 8 === 2) nz({ d: 0.04, v: 0.03, ft: "highpass", fl: 6e3, w, m: 1 });
        } else if (md === "menu") {
          if ([0, 8, 16, 24].includes(s)) tone({ f: 98, f2: 40, d: 0.16, t: "sine", v: 0.35, w, m: 1 });
          if (s % 4 === 0) nz({ d: 0.03, v: 0.03, ft: "highpass", fl: 6e3, w, m: 1 });
          if (s % 2 === 0) tone({ f: 49 * Math.pow(2, MBASS[s / 2 | 0] / 12), d: 0.15, t: "sawtooth", v: 0.09, w, m: 1 });
          if (s === 0) [0, 7, 12].forEach((n) => tone({ f: 65.4 * Math.pow(2, n / 12), d: 3.2, t: "triangle", v: 0.035, w, m: 1 }));
        } else {
          if ([0, 6, 8, 14, 16, 22, 24, 28].includes(s)) tone({ f: 110, f2: 38, d: 0.14, t: "sine", v: 0.4, w, m: 1 });
          if ([4, 12, 20, 28].includes(s)) nz({ d: 0.09, v: 0.2, ft: "bandpass", fl: 1800, w, m: 1 });
          if (s % 2 === 0) nz({ d: 0.03, v: 0.045, ft: "highpass", fl: 6e3, w, m: 1 });
          if (s % 2 === 0) tone({ f: 41.2 * Math.pow(2, (BASS[s / 2 | 0] + tr) / 12), d: 0.13, t: "sawtooth", v: 0.12, w, m: 1 });
          if (s === 0) [0, 3, 7].forEach((n) => tone({ f: 82.4 * Math.pow(2, (n + tr) / 12), d: 3.4, t: "triangle", v: 0.04, w, m: 1 }));
        }
        MU.s++;
        MU.next += dt;
      }
    }
    return {
      AU,
      SFX,
      MU,
      initA,
      say,
      setVol,
      saveSet,
      startMusic,
      stopMusic,
      music,
      tone,
      nz,
      playSample,
      loadBuffer,
      loadAudio,
      musicTrackFor
    };
  }

  // src/game/karnage.js
  function startKarnage(fxAssets = {}, arenaAssets = {}, uiAssets = {}) {
    const RW = 424, RH = 240, FL = 206, AW = 760, GR = 8, OUT = "#0e0b08";
    const UI_GOLD = "#e8c040", UI_RED = "#e02020", UI_BLUE = "#3868c8", UI_TEXT = "#e8e0c0", UI_MUTED = "#807850", UI_ACCENT = "#c8a040";
    const isTouchUI = () => document.body.classList.contains("touch");
    const FATAL_FRAMES = 600, FATAL_INPUT = 240;
    const FX = fxAssets || {}, ARENA_IMG = arenaAssets || {}, UI = uiAssets || {};
    const S = createState();
    const cv = document.getElementById("cv"), g = cv.getContext("2d");
    function fit() {
      let s = Math.min(innerWidth / RW, innerHeight / RH);
      if (s >= 2) s = Math.floor(s);
      cv.style.width = s * RW + "px";
      cv.style.height = s * RH + "px";
      document.body.classList.toggle("portrait", innerHeight > innerWidth);
    }
    addEventListener("resize", fit);
    fit();
    if (document.fonts) document.fonts.load('20px "Russo One"');
    const clamp2 = (v, a, b) => v < a ? a : v > b ? b : v, lerp = (a, b, t) => a + (b - a) * t, rnd = (a, b) => a + Math.random() * (b - a), pick = (a) => a[Math.random() * a.length | 0], blink = () => (S.FRAME >> 4) % 2 === 0;
    function mul(s) {
      return function() {
        s |= 0;
        s = s + 1831565813 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }
    initArenas({ mul, RW, RH, FL, GR });
    function colorParts(c) {
      if (c[0] === "#") return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
      const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
      return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
    }
    function mix(a, b, t) {
      const A = colorParts(a), B = colorParts(b);
      return "rgb(" + (lerp(A[0], B[0], t) | 0) + "," + (lerp(A[1], B[1], t) | 0) + "," + (lerp(A[2], B[2], t) | 0) + ")";
    }
    const shade = (h, k) => mix(h, "#000000", 1 - k);
    const {
      drawF,
      drawFighterGlow,
      drawPort,
      drawFake,
      drawHUD,
      drawFatalPanel,
      bigText,
      frame,
      panel,
      seqTxt,
      drawProjs,
      drawFx
    } = createRender({
      g,
      S,
      UI,
      CH,
      WM,
      RW,
      FL,
      GR,
      OUT,
      lerp,
      rnd,
      mix,
      shade,
      blink,
      fatalMapped,
      fatalFrames: FATAL_FRAMES
    });
    const arenaView = createArenaView({ g, RW, RH, FL, AR, assets: ARENA_IMG, shade, mix });
    const OPT = { crt: true, blood: true, shake: true, reduce: false };
    try {
      const raw = JSON.parse(localStorage.karnageOpts || "{}");
      if (raw && typeof raw === "object") {
        for (const k of ["crt", "blood", "shake", "reduce"]) if (typeof raw[k] === "boolean") OPT[k] = raw[k];
      }
    } catch (e) {
    }
    const saveOpts = () => {
      try {
        localStorage.karnageOpts = JSON.stringify(OPT);
      } catch (e) {
      }
    };
    const applyCrt = () => {
      const el = document.getElementById("crt");
      if (el) el.style.display = OPT.crt ? "block" : "none";
    };
    applyCrt();
    const { P, blood, updParts, drawParts, drawDecals } = createParticles({ g, state: S, options: OPT, FL, GR, rnd });
    const { AU, SFX, MU, initA, say, setVol, saveSet, music } = createAudio({ S, clamp: clamp2, rnd });
    const dayStamp = () => {
      const d = /* @__PURE__ */ new Date();
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };
    const topRaw = () => {
      try {
        const raw = JSON.parse(localStorage.karnageTop || "[]");
        if (!Array.isArray(raw)) return [];
        return raw.filter((e) => e && Number.isInteger(e.id) && e.id >= 0 && e.id < CH.length && Number.isFinite(e.step) && e.step >= 0);
      } catch (e) {
        return [];
      }
    };
    const topBest = () => {
      const best = /* @__PURE__ */ new Map();
      for (const e of topRaw()) {
        const cur = best.get(e.id);
        if (!cur || e.step > cur.step) best.set(e.id, { id: e.id, step: e.step, ...typeof e.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.date) ? { date: e.date } : {} });
      }
      return [...best.values()].sort((a, b) => b.step - a.step || a.id - b.id);
    };
    const TOP = () => topBest().slice(0, 5);
    const addTop = (id, step2, date) => {
      try {
        if (!Number.isInteger(id) || id < 0 || id >= CH.length || !Number.isFinite(step2) || step2 < 0) return;
        const day = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : dayStamp();
        const best = /* @__PURE__ */ new Map();
        for (const e of topRaw()) {
          const cur2 = best.get(e.id);
          if (!cur2 || e.step > cur2.step) best.set(e.id, { id: e.id, step: e.step, ...typeof e.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.date) ? { date: e.date } : {} });
        }
        const cur = best.get(id);
        if (!cur || step2 > cur.step) best.set(id, { id, step: step2, date: day });
        localStorage.karnageTop = JSON.stringify([...best.values()].sort((a, b) => b.step - a.step || a.id - b.id).slice(0, 5));
      } catch (e) {
      }
    };
    const ARC_KEY = "karnageArcRun", ARC_VERSION = 1, ARC_TOTAL = CH.length - 1;
    function validArcRun(run) {
      if (!run || run.v !== ARC_VERSION) return false;
      if (!Number.isInteger(run.c1) || run.c1 < 0 || run.c1 >= CH.length) return false;
      if (!Array.isArray(run.ladder) || run.ladder.length !== CH.length - 2) return false;
      if (!run.ladder.every((id) => Number.isInteger(id) && id >= 0 && id < CH.length && id !== run.c1 && id !== BOSS.id)) return false;
      if (new Set(run.ladder).size !== run.ladder.length) return false;
      if (!Number.isInteger(run.step) || run.step < 0 || run.step >= ARC_TOTAL) return false;
      return true;
    }
    function loadArcRun() {
      try {
        const run = JSON.parse(localStorage[ARC_KEY] || "null");
        return validArcRun(run) ? run : null;
      } catch (e) {
        return null;
      }
    }
    function saveArcRun() {
      try {
        if (!Number.isInteger(S.arcP1) || !S.ladder.length || !Number.isInteger(S.lStep)) return;
        const run = { v: ARC_VERSION, c1: S.arcP1, ladder: S.ladder.slice(), step: S.lStep };
        if (validArcRun(run)) localStorage[ARC_KEY] = JSON.stringify(run);
      } catch (e) {
      }
    }
    function clearArcRun() {
      try {
        localStorage.removeItem(ARC_KEY);
      } catch (e) {
      }
    }
    function arcTotal() {
      return S.ladder.length ? S.ladder.length + 1 : ARC_TOTAL;
    }
    addEventListener("pointerdown", () => {
      initA();
      if (AU.ctx && AU.ctx.state === "suspended") AU.ctx.resume();
      if (S.GAME === "title") {
        toLobby("menu");
        SFX.sel();
      }
    });
    const { keys, TOUCH, KM1: KM12, KM2: KM22, Ctrl } = createInput();
    function bindTouch() {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (!isTouch) return;
      document.body.classList.add("touch");
      const root = document.createElement("div");
      root.id = "touch";
      root.innerHTML = '<div class="dpad"><button class="up" data-key="u">\u25B2</button><button class="left" data-key="l">\u25C0</button><button class="down" data-key="d">\u25BC</button><button class="right" data-key="r">\u25B6</button></div><div class="actions"><button class="punch" data-key="P">P</button><button class="kick" data-key="K">K</button><button class="block" data-key="B">\u0411\u041B\u041E\u041A</button></div><button class="pause" data-key="pause">\u2161</button>';
      document.body.appendChild(root);
      const codes = { l: "ArrowLeft", r: "ArrowRight", u: "ArrowUp", d: "ArrowDown", P: "Enter", K: "KeyK", B: "Escape" };
      for (const btn of root.querySelectorAll("button")) {
        const key = btn.dataset.key;
        const down = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (btn.setPointerCapture) try {
            btn.setPointerCapture(e.pointerId);
          } catch (err) {
          }
          btn.classList.add("on");
          initA();
          if (AU.ctx && AU.ctx.state === "suspended") AU.ctx.resume();
          if (key === "pause") {
            onKey("Escape");
            return;
          }
          TOUCH[key] = 1;
          if (S.GAME !== "fight" || S.paused) onKey(codes[key]);
          else if (key === "P") onKey("KeyJ");
        };
        const up = (e) => {
          e.preventDefault();
          btn.classList.remove("on");
          if (key !== "pause") TOUCH[key] = 0;
        };
        btn.addEventListener("pointerdown", down);
        btn.addEventListener("pointerup", up);
        btn.addEventListener("pointercancel", up);
        btn.addEventListener("lostpointercapture", up);
      }
    }
    bindTouch();
    addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
      if (!e.repeat) {
        keys[e.code] = true;
        initA();
        if (AU.ctx && AU.ctx.state === "suspended") AU.ctx.resume();
        onKey(e.code);
      }
    });
    addEventListener("keyup", (e) => {
      keys[e.code] = false;
    });
    addEventListener("blur", () => {
      for (const k in keys) keys[k] = false;
      for (const k in TOUCH) TOUCH[k] = 0;
      document.querySelectorAll("#touch button.on").forEach((btn) => btn.classList.remove("on"));
      if (S.GAME === "fight" && !S.paused) {
        S.paused = true;
        S.pauseIdx = 0;
      }
    });
    addEventListener("visibilitychange", () => {
      if (document.hidden) {
        for (const k in keys) keys[k] = false;
        for (const k in TOUCH) TOUCH[k] = 0;
        document.querySelectorAll("#touch button.on").forEach((btn) => btn.classList.remove("on"));
        if (S.GAME === "fight" && !S.paused) {
          S.paused = true;
          S.pauseIdx = 0;
        }
      }
    });
    ;
    ;
    function drawArena(ai, cam, t) {
      if (arenaView.draw(ai, cam, t)) return;
      const A = AR[ai], AS = ARENA_IMG[ai];
      if (AS && AS.ready) {
        g.drawImage(AS.image, 0, 0, RW, RH);
        if (AS.props) g.drawImage(AS.props, 0, 0, RW, RH);
        const fg = g.createLinearGradient(0, FL - 26, 0, FL);
        fg.addColorStop(0, "rgba(178,188,208,0)");
        fg.addColorStop(1, "rgba(178,188,208,.08)");
        g.fillStyle = fg;
        g.fillRect(0, FL - 26, RW, 26);
        const gr2 = g.createLinearGradient(0, FL, 0, RH);
        gr2.addColorStop(0, A.gr);
        gr2.addColorStop(1, shade(A.gr, 0.55));
        g.fillStyle = gr2;
        g.fillRect(0, FL, RW, RH - FL);
        g.fillStyle = mix(A.gr, "#fff", 0.14);
        g.fillRect(0, FL, RW, 1);
        g.fillStyle = "rgba(0,0,0,.25)";
        g.fillRect(0, FL, RW, 2);
        return;
      }
      const sky = g.createLinearGradient(0, 0, 0, FL);
      sky.addColorStop(0, A.sky[0]);
      sky.addColorStop(0.45, A.sky[1]);
      sky.addColorStop(0.75, A.sky[2]);
      sky.addColorStop(1, A.sky[3]);
      g.fillStyle = sky;
      g.fillRect(0, 0, RW, FL + 1);
      g.fillStyle = "#c8d0d8";
      for (const st of A.stars) {
        g.globalAlpha = 0.25 + 0.3 * Math.sin(t * 0.03 + st.p);
        g.fillRect(st.x, st.y, st.z, st.z);
      }
      g.globalAlpha = 1;
      const mg2 = g.createRadialGradient(330, 42, 4, 330, 42, 34);
      mg2.addColorStop(0, "rgba(232,232,216,.32)");
      mg2.addColorStop(1, "rgba(232,232,216,0)");
      g.fillStyle = mg2;
      g.fillRect(292, 4, 80, 80);
      g.fillStyle = A.moon;
      g.beginPath();
      g.arc(330, 42, 11, 0, 7);
      g.fill();
      g.fillStyle = A.sky[0];
      g.beginPath();
      g.arc(326, 38, 9, 0, 7);
      g.fill();
      g.fillStyle = A.far;
      for (const s of A.fs) {
        const x0 = Math.round(((s.x - cam * 0.25) % 1060 + 1060) % 1060 - 40);
        for (const x of [x0, x0 - 1060]) if (x < RW && x + s.w > 0) g.fillRect(x, 140 - s.h, s.w, s.h + 20);
      }
      g.fillStyle = A.mc;
      for (const sp of A.ms) {
        const bx0 = Math.round(((sp.x - cam * 0.55) % 1220 + 1220) % 1220 - 70);
        const v = sp.v, m = A.mid;
        for (const bx of [bx0, bx0 - 1220]) {
          if (bx < -140 || bx > RW + 90) continue;
          if (m === "bldg") {
            g.fillRect(bx, 92 + v * 20, 42, 114);
            g.fillStyle = A.far;
            for (let w = 0; w < 4; w++) for (let h = 0; h < 5; h++) if ((sp.x + w * 3 + h) % 3) g.fillRect(bx + 5 + w * 10, 100 + h * 18, 6, 9);
            g.fillStyle = A.mc;
          } else if (m === "col") {
            g.fillRect(bx, 80, 14, 126);
            g.fillRect(bx - 4, 76, 22, 8);
            g.fillRect(bx - 4, 198, 22, 8);
          } else if (m === "roof") {
            g.fillRect(bx, 110, 30, 96);
            g.fillRect(bx + 12, 70, 3, 44);
            g.fillStyle = "#d84030";
            if ((sp.x + (t / 20 | 0)) % 4 < 2) g.fillRect(bx + 11, 68, 5, 4);
            g.fillStyle = A.mc;
          } else if (m === "mtn") {
            g.beginPath();
            g.moveTo(bx - 56, 206);
            g.lineTo(bx + 30, 60 + v * 40);
            g.lineTo(bx + 116, 206);
            g.fill();
          } else if (m === "bam") {
            for (let b = 0; b < 3; b++) g.fillRect(bx + b * 16, 50 + (sp.x + b * 17) % 30, 5, 160);
            g.fillStyle = "#4a6a2a";
            g.fillRect(bx - 6, 50 + sp.x % 30, 36, 4);
            g.fillStyle = A.mc;
          } else if (m === "dune") {
            g.beginPath();
            g.moveTo(bx - 64, 206);
            g.quadraticCurveTo(bx + 30, 108 + v * 30, bx + 124, 206);
            g.fill();
          } else if (m === "lav") {
            g.fillRect(bx, 120, 50, 86);
            g.fillStyle = "#f06020";
            if ((sp.x + (t / 14 | 0)) % 5 < 2) g.fillRect(bx + 8, 190, 34, 4);
            g.fillStyle = A.mc;
          } else if (m === "ice") {
            g.beginPath();
            g.moveTo(bx - 44, 206);
            g.lineTo(bx + 20, 48 + v * 40);
            g.lineTo(bx + 74, 206);
            g.fill();
          } else if (m === "pipe") {
            g.fillRect(bx, 60, 12, 146);
            g.fillRect(bx - 6, 70 + sp.x % 3 * 30, 24, 10);
            g.beginPath();
            g.arc(bx + 6, 60, 10, 0, 7);
            g.fill();
          } else {
            g.fillRect(bx, 150, 18, 56);
            g.fillRect(bx + 3, 140, 12, 14);
            if (sp.x % 3 < 1) {
              g.fillRect(bx - 2, 120, 4, 40);
              g.fillRect(bx - 12, 130, 24, 5);
            }
          }
        }
      }
      g.strokeStyle = "rgba(190,190,200,.22)";
      g.lineWidth = 2;
      for (const chx of [120, 420, 700]) {
        const x = Math.round(chx - cam * 0.7);
        if (x < -10 || x > RW + 10) continue;
        const sw = Math.sin(t * 0.05 + chx) * 3, cl = 40 + chx % 50;
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x + sw, cl);
        g.stroke();
        g.fillStyle = "rgba(190,190,200,.3)";
        g.fillRect(x + sw - 2, cl, 5, 4);
      }
      const px1 = Math.round(60 - cam * 0.85), px2 = Math.round(AW - 60 - cam * 0.85);
      for (const px of [px1, px2]) {
        if (px < -30 || px > RW + 30) continue;
        g.fillStyle = "#3a3128";
        g.fillRect(px - 7, FL - 64, 14, 64);
        g.fillStyle = "#4a4038";
        g.fillRect(px - 9, FL - 68, 18, 6);
        g.fillStyle = "#2a221c";
        g.fillRect(px - 5, FL - 76, 10, 10);
        const ff = Math.sin(t * 0.21 + px) * 1.5;
        g.fillStyle = "#f06020";
        g.fillRect(px - 3, FL - 84 + ff * 0.4, 6, 9);
        g.fillStyle = "#f8d060";
        g.fillRect(px - 1, FL - 82 + ff * 0.4, 3, 5);
      }
      const fog = g.createLinearGradient(0, FL - 26, 0, FL);
      fog.addColorStop(0, "rgba(178,188,208,0)");
      fog.addColorStop(1, "rgba(178,188,208,.08)");
      g.fillStyle = fog;
      g.fillRect(0, FL - 26, RW, 26);
      const gr = g.createLinearGradient(0, FL, 0, RH);
      g.fillStyle = gr;
      gr.addColorStop(0, A.gr);
      gr.addColorStop(1, shade(A.gr, 0.55));
      g.fillRect(0, FL, RW, RH - FL);
      g.fillStyle = mix(A.gr, "#fff", 0.14);
      g.fillRect(0, FL, RW, 1);
      g.globalAlpha = 0.14;
      g.fillStyle = mix(A.sky[3], "#fff", 0.5);
      g.fillRect(0, FL - 12, RW, 12);
      g.globalAlpha = 1;
      g.strokeStyle = "rgba(0,0,0,.16)";
      g.lineWidth = 1;
      const vx = RW / 2 - (cam - RW / 2) * 0.35;
      for (let i = -8; i <= 8; i++) {
        g.beginPath();
        g.moveTo(vx + i * 26, FL + 2);
        g.lineTo(vx + i * 72, RH);
        g.stroke();
      }
      for (const y of [FL + 5, FL + 14, FL + 26]) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(RW, y);
        g.stroke();
      }
      g.fillStyle = A.gr2;
      for (let i = 0; i < 26; i++) {
        const x0 = Math.round(((i * 47 - cam) % (RW + 47) + RW + 47) % (RW + 47) - 23);
        const y = FL + 3 + i * 13 % (RH - FL - 8), w2 = 20 + i * 7 % 18;
        for (const x of [x0, x0 - (RW + 47)]) g.fillRect(x, y, w2, 2);
      }
      g.strokeStyle = "rgba(0,0,0,.18)";
      g.lineWidth = 1;
      for (const yy of [FL + 9, FL + 20, FL + 32]) {
        g.beginPath();
        g.moveTo(0, yy);
        g.lineTo(RW, yy);
        g.stroke();
      }
      g.fillStyle = A.gr2;
      for (const rb of A.rb) {
        const x = Math.round(((rb.x - cam) % (RW + 40) + RW + 40) % (RW + 40) - 20);
        g.globalAlpha = rb.a;
        g.fillRect(x, rb.y, rb.w, 2);
      }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(0,0,0,.25)";
      g.fillRect(0, FL, RW, 2);
      g.fillStyle = "rgba(255,255,255,.06)";
      g.fillRect(0, FL + 2, RW, 1);
    }
    function ambient() {
      if (arenaView.ambient({ arena: S.battle.arena, cam: S.cam, frame: S.FRAME, parts: S.parts })) return;
      const A = AR[S.battle.arena];
      if (A.rain && S.FRAME % 2 === 0) S.parts.push({ x: S.cam + rnd(-20, RW + 30), y: -6, vx: -0.6, vy: 7, c: "rgba(170,190,215,.28)", l: 60, s: 1, gv: 0, line: 1, kf: 1 });
      if (A.snow && S.FRAME % 2 === 0) S.parts.push({ x: S.cam + rnd(-10, RW + 10), y: -4, vx: rnd(-0.3, 0.3), vy: rnd(0.3, 0.6), c: "rgba(230,240,255,.7)", l: 420, s: 1, gv: 0 });
      if (A.sand && S.FRAME % 8 === 0) S.parts.push({ x: S.cam + RW + 10, y: rnd(60, FL), vx: rnd(-2.6, -1.6), vy: 0, c: "rgba(220,180,110,.2)", l: 120, s: 1, gv: 0, line: 1, kf: 1 });
      if (A.ember && S.FRAME % 3 === 0) S.parts.push({ x: S.cam + rnd(0, RW), y: FL + rnd(-4, 10), vx: rnd(-0.3, 0.3), vy: -rnd(0.4, 1), c: pick(["#f06020", "#c84018", "#f0a030"]), l: rnd(60, 120), s: rnd(1, 2), gv: -0.01 });
      if (A.rain && Math.random() < 4e-3) {
        S.flashS = Math.max(S.flashS, 3);
        SFX.thunder();
      }
    }
    function spriteFx(name, x, y, opts) {
      const a = FX[name];
      if (!a || !a.ready) return false;
      opts = opts || {};
      const frames = a.frames || 1;
      const fps = a.fps || 30;
      if (S.fx.length > 40) S.fx.splice(0, S.fx.length - 40);
      S.fx.push({ ty: "sprite", img: a.image, x, y, t: 0, dur: opts.duration ?? Math.max(1, Math.round(frames * 60 / fps)), frames, frameW: a.frameWidth, frameH: a.frameHeight, anchor: a.anchor || [a.frameWidth / 2, a.frameHeight / 2], blend: a.blend || "source-over", scale: opts.scale ?? a.scale ?? 1, alpha: opts.alpha ?? a.alpha ?? 1 });
      return true;
    }
    function impactBurst(x, y, col, size) {
      S.fx.push({ ty: "impact", x, y, t: 0, life: 12, col: col || "#f8d060", r: size || 18 });
    }
    function slashImpact(x, y, col, face) {
      S.fx.push({ ty: "slashimpact", x, y, t: 0, life: 10, col: col || "#ffffff", face: face < 0 ? -1 : 1 });
    }
    function impactFx(ty, x, y, color, p) {
      const shard = ty === "shard", c = color || "#f8d060";
      if (ty === "ice" || shard && color === "#c8ecff") {
        const ok = spriteFx("iceImpact", x, y, { scale: shard ? 0.52 : 0.6, alpha: shard ? 0.74 : 0.76, duration: shard ? 9 : 13 });
        impactBurst(x, y, "#9adcee", shard ? 15 : 20);
        return ok;
      }
      if (ty === "shadow" || shard && color === "#7a3aa8") {
        const ok = spriteFx("shadowImpact", x, y, { scale: shard ? 0.5 : 0.62, alpha: shard ? 0.7 : 0.74, duration: shard ? 9 : 14 });
        impactBurst(x, y, "#a050d0", shard ? 15 : 20);
        return ok;
      }
      if (ty === "fire" || shard && (color === "#f06020" || color === "#f8d060")) {
        const ok = spriteFx("fireImpact", x, y, { scale: shard ? 0.5 : 0.68, alpha: shard ? 0.76 : 0.78, duration: shard ? 9 : 14 });
        impactBurst(x, y, c, shard ? 15 : 20);
        return ok;
      }
      if (ty === "bolt") {
        const ok = spriteFx("hitHeavy", x, y, { scale: 0.5, alpha: 0.62, duration: 8 });
        S.fx.push({ ty: "boltfx", x, y: FL + GR, t: 0 });
        impactBurst(x, y, "#f8f860", 22);
        for (let i = 0; i < 6; i++) P(x + rnd(-8, 8), y - rnd(0, 22), rnd(-2, 2), rnd(-2, 1), "#f8f860", 18, 2, 0);
        return ok;
      }
      if (ty === "net") {
        const ok = spriteFx("block", x, y, { scale: 0.5, alpha: 0.55, duration: 10 });
        impactBurst(x, y, "#c8c8a0", 18);
        return ok;
      }
      if (ty === "wave") {
        const ok = spriteFx("dust", x, y, { scale: 1.05, alpha: 0.55, duration: 14 });
        impactBurst(x, y, c, 24);
        for (let i = 0; i < 8; i++) P(x + rnd(-10, 10), y - 2, rnd(-1.6, 1.6), rnd(-2.6, -0.5), c, 18, 2, 0.08);
        return ok;
      }
      if (ty === "meteor" || ty === "rocket" || ty === "bomb") {
        const ok = spriteFx("explosion", x, y, { scale: 1, alpha: 0.9, duration: 24 });
        impactBurst(x, y, "#f8d060", 28);
        return ok;
      }
      if (shard) {
        if (color === "#d82040") {
          spriteFx("hitLight", x, y, { scale: 0.34, alpha: 0.62, duration: 7 });
          impactBurst(x, y, c, 16);
          slashImpact(x, y, c, p && p.vx);
          return true;
        }
        if (color === "#9adcee") {
          spriteFx("iceImpact", x, y, { scale: 0.42, alpha: 0.68, duration: 9 });
          impactBurst(x, y, c, 16);
          slashImpact(x, y, c, p && p.vx);
          return true;
        }
        if (color === "#7ac83a") {
          spriteFx("hitLight", x, y, { scale: 0.32, alpha: 0.6, duration: 7 });
          impactBurst(x, y, c, 15);
          return true;
        }
        if (color === "#c8a060") {
          spriteFx("dust", x, y, { scale: 0.55, alpha: 0.55, duration: 10 });
          impactBurst(x, y, c, 16);
          return true;
        }
        if (color === "#b89aff") {
          spriteFx("shadowImpact", x, y, { scale: 0.5, alpha: 0.7, duration: 10 });
          impactBurst(x, y, c, 16);
          return true;
        }
        if (color === "#f0c850") {
          spriteFx("fireImpact", x, y, { scale: 0.52, alpha: 0.76, duration: 10 });
          impactBurst(x, y, c, 16);
          return true;
        }
        const ok = spriteFx("hitLight", x, y, { scale: 0.34, alpha: 0.62, duration: 7 });
        impactBurst(x, y, c, 14);
        return ok;
      }
      return false;
    }
    const { autoHit, resolveHit } = createCombat({ S, SFX, P, blood, spriteFx, rnd, pick });
    const F = createFighter({
      S,
      FL,
      GR,
      AW,
      clamp: clamp2,
      lerp,
      rnd,
      pick,
      P,
      blood,
      spriteFx,
      SFX,
      smoke,
      resolveHit,
      autoHit
    });
    function smoke(x, y) {
      spriteFx("smoke", x, y, { scale: 0.85, alpha: 0.4 });
      for (let i = 0; i < 10; i++) P(x + rnd(-8, 8), y + rnd(-20, 10), rnd(-1, 1), rnd(-1.5, -0.2), "#889", 30, 3, -0.02);
    }
    function updProjs() {
      if (S.battle && ["finish", "fatal", "over", "ko"].includes(S.battle.phase)) {
        S.projs.length = 0;
        return;
      }
      if (S.projs.length > 60) S.projs.splice(0, S.projs.length - 60);
      for (let i = S.projs.length; i--; ) {
        const p = S.projs[i];
        p.l--;
        p.x += p.vx;
        p.y += p.vy;
        if (S.FRAME % 2 === 0) {
          if (p.ty === "fire") P(p.x, p.y, rnd(-0.4, 0.4), rnd(-0.8, -0.2), pick(["#f06020", "#f8d060"]), 16, 2, -0.01);
          else if (p.ty === "ice") P(p.x, p.y, rnd(-0.3, 0.3), rnd(-0.5, 0.2), "#c8ecff", 16, 1, -5e-3);
          else if (p.ty === "shadow") P(p.x, p.y, rnd(-0.3, 0.3), rnd(-0.6, -0.1), "#7a3aa8", 18, 2, -0.01);
          else if (p.ty === "wave") P(p.x, FL + GR - 2, rnd(-0.5, 0.5), rnd(-1.6, -0.5), p.c || "#9a9080", 14, 2, 0.06);
          else if (p.ty === "meteor" || p.ty === "rocket") {
            P(p.x + rnd(-3, 3), p.y - 5, rnd(-0.5, 0.5), rnd(-2, -0.6), pick(["#f06020", "#f8d060"]), 16, 2, -0.01);
            if (S.FRAME % 6 === 0) P(p.x + rnd(-4, 4), p.y - 10, rnd(-0.4, 0.4), rnd(-1.2, -0.2), "#6a5a44", 24, 3, -0.02);
          } else if (p.ty === "bomb") {
            P(p.x + rnd(-2, 2), p.y + 2, rnd(-0.4, 0.4), rnd(-1.2, -0.1), pick(["#6a5a44", "#f0a030"]), 20, 2, -0.01);
          } else if (p.ty === "net" && S.FRAME % 4 === 0) P(p.x, p.y, rnd(-0.6, 0.6), rnd(-0.6, 0.2), "#c8c8a0", 14, 1, 0);
          else if (p.ty === "bolt" && S.FRAME % 2 === 0) P(p.x + rnd(-9, 9), FL + GR - 2, rnd(-1, 1), rnd(-1.8, -0.3), "#f8f860", 12, 1, 0.08);
        }
        if (p.ty === "bomb" || p.ty === "meteor" || p.ty === "rocket") p.vy += 0.12;
        if (p.ty === "shard" && S.FRAME % 3 === 0) P(p.x, p.y, rnd(-0.3, 0.3), rnd(-0.4, 0.2), p.c, 14, 2, -5e-3);
        if (p.hom && p.o && p.o.foe && p.l % 2 === 0) {
          const f2 = p.o.foe;
          if (f2.state !== "down") {
            const dx2 = f2.x - p.x, dy2 = f2.y - f2.def.h * 0.5 - p.y, dd2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
            p.vx += dx2 / dd2 * 0.45;
            p.vy += dy2 / dd2 * 0.45;
            const sp2 = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (sp2 > 4.6) {
              p.vx *= 4.6 / sp2;
              p.vy *= 4.6 / sp2;
            }
          }
        }
        const f = p.o.foe;
        if (f && !f.hidden && !f.dodging && f.state !== "down" && f.state !== "victim") {
          const b = f.box;
          if (p.ty !== "meteor" && p.ty !== "rocket" && p.ty !== "bomb" && p.x > b.x - 4 && p.x < b.x + b.w + 4 && p.y > b.y - 6 && p.y < b.y + b.h + 4) {
            const wf = f.frozen > 0;
            impactFx(p.ty, p.x, p.y, p.c, p);
            resolveHit(p.o, f, p.d, p.k ? { knock: 1 } : {});
            const blk = f.state === "block";
            if (p.ty === "ice" && !wf && !blk && f.hp > 0) {
              f.frozen = 85;
              f.state = "frozen";
              f.atk = null;
              SFX.freeze();
            }
            if (p.pois && !blk && f.hp > 0) {
              f.poison = 120;
              f.poisonC = "#7ac83a";
            }
            if (p.bl && !blk && f.hp > 0) {
              f.poison = 150;
              f.poisonC = "#d82040";
            }
            if (p.ty === "net" && !blk && f.hp > 0) {
              f.netT = 95;
              f.state = "net";
              f.atk = null;
            }
            if (p.ty === "shadow" && !blk) {
              p.o.hp = Math.min(100, p.o.hp + p.d * 0.7);
              for (let j = 0; j < 6; j++) P(p.x, p.y, (p.o.x - p.x) * 0.04, rnd(-1, -0.3), "#7a3aa8", 26, 2, 0);
            }
            S.projs.splice(i, 1);
            continue;
          }
        }
        if ((p.ty === "meteor" || p.ty === "rocket" || p.ty === "bomb") && p.y >= FL + GR - 2) {
          const col = p.ty === "rocket" ? "#f0a030" : p.ty === "meteor" ? "#f06020" : "#f8d060";
          spriteFx("explosion", p.x, FL + GR - 2, { scale: 1.05, alpha: 0.9 });
          spriteFx("dust", p.x, FL + GR, { scale: 1.25, alpha: 0.5 });
          S.fx.push({ ty: "boom", x: p.x, y: FL + GR - 4, t: 0 });
          S.fx.push({ ty: "impact", x: p.x, y: FL + GR - 4, t: 0, life: 16, col, r: 30 });
          SFX.boom();
          S.shake = 6;
          for (let j = 0; j < 10; j++) P(p.x + rnd(-14, 14), FL + GR - 2, rnd(-2.4, 2.4), rnd(-3.4, -0.6), pick(["#6a5a44", "#3a3028", "#8a7a5c"]), 24, 2, 0.12);
          for (let j = 0; j < 8; j++) P(p.x + rnd(-10, 10), FL + GR - 4, rnd(-1.5, 1.5), rnd(-2.5, -0.4), pick(["#f06020", "#f8d060", "#f0a030"]), 18, 2, -0.01);
          const f2 = p.o.foe;
          if (f2 && !f2.dodging && Math.abs(f2.x - p.x) < 30 && f2.state !== "down" && f2.state !== "victim") resolveHit(p.o, f2, p.d, { still: 1 });
          S.projs.splice(i, 1);
          continue;
        }
        if (p.l <= 0 || p.x < -30 || p.x > AW + 30) S.projs.splice(i, 1);
      }
    }
    function updFx() {
      for (let i = S.fx.length; i--; ) {
        const f = S.fx[i];
        f.t++;
        if (f.ty === "boom" && f.t % 3 === 0) {
          const r = f.t * 1.6;
          P(f.x + rnd(-r, r), f.y + rnd(-r, r) * 0.4, rnd(-1, 1), rnd(-2, 0), "#f06020", 16, 2);
        }
        if (f.t > 80 || f.life && f.t > f.life || f.ty === "rock" && f.t > 26 || f.ty === "boom" && f.t > 22 || f.ty === "nova" && f.t > 26 || f.ty === "slash" && f.t > 10 || f.ty === "boltfx" && f.t > 8 || f.ty === "ring" && f.t > 14 || f.ty === "castbolt" && f.t > 9 || f.ty === "sprite" && f.t > f.dur) S.fx.splice(i, 1);
        if (S.fx.length > 200) S.fx.splice(0, S.fx.length - 200);
      }
    }
    const RANGED = [0, 2, 3, 6, 7, 8, 9, 10, 12];
    function aiUpd(f, foe, lvl) {
      const c = f.ctrl;
      c.ax = {};
      if (["down", "hit", "frozen", "net", "super", "cast", "victim", "dizzy", "fatal", "getup", "win", "grabbed"].includes(f.state)) return;
      if (f.aiDir) c.ax[f.aiDir] = true;
      if (foe.invis > 0 && Math.random() < 0.3) {
        f.aiDir = null;
        c.ax.B = true;
        return;
      }
      const dx = foe.x - f.x, ad = Math.abs(dx), react = Math.max(5, 26 - lvl * 2.4);
      if (f.state === "jump") {
        if (ad < 90 && Math.random() < 0.4) c.ax.K = true;
        return;
      }
      const agg = 0.3 + lvl * 0.055, blk = 0.16 + lvl * 0.06;
      const danger = S.projs.some((p) => p.o === foe && (p.vx && Math.abs(p.x - f.x) < 95 && Math.sign(p.vx) === Math.sign(f.x - p.x) || (p.ty === "meteor" || p.ty === "rocket" || p.ty === "bolt") && Math.abs(p.x - f.x) < 40 && p.y < FL - 20));
      if (danger && Math.random() < 0.55 + lvl * 0.04) {
        f.aiDir = null;
        if (Math.random() < 0.4 && ad > 50) c.ax.u = true;
        else c.ax.B = true;
        return;
      }
      if (f.running && Math.random() < 0.12 + lvl * 0.02 && ad < 120) {
        c.ax.B = true;
        return;
      }
      if (S.FRAME % Math.max(3, react | 0) !== 0) return;
      if (foe.state === "atk" && ad < 62) {
        if (Math.random() < blk) {
          f.aiDir = null;
          c.ax.B = true;
          return;
        }
        if (ad < 52 && Math.random() < 0.08 + lvl * 0.02) {
          f.aiDir = null;
          c.ax[dx > 0 ? "l" : "r"] = true;
          c.ax.K = true;
          return;
        }
      }
      if (foe.state === "hit" && ad < 50 && Math.random() < 0.45 + lvl * 0.04) {
        f.aiDir = null;
        c.ax.P = true;
        return;
      }
      if ((foe.state === "frozen" || foe.state === "net") && ad < 74) {
        f.aiDir = null;
        if (ad > 30) c.ax[dx > 0 ? "r" : "l"] = true;
        c.ax.P = true;
        return;
      }
      if (f.rage >= 100 && ["idle", "walk"].includes(f.state) && Math.random() < 0.5) {
        f.startSuper();
        f.aiDir = null;
        return;
      }
      if (["idle", "walk"].includes(f.state) && Math.random() < 0.13 + lvl * 0.02) {
        const far = RANGED.includes(f.def.id);
        if (far && ad > 110 || !far && ad < 70) {
          f.startSpec(foe);
          f.aiDir = null;
          return;
        }
      }
      if (["idle", "walk"].includes(f.state) && Math.random() < 0.05 + lvl * 8e-3 && (RANGED.includes(f.def.id) ? ad > 90 : ad > 60)) {
        f.startSpec2(foe);
        f.aiDir = null;
        return;
      }
      if (ad > 120) {
        f.aiDir = dx > 0 ? "r" : "l";
        if (Math.random() < 0.08) f.aiDir = null;
        return;
      }
      if (ad > 56) {
        if (Math.random() < 0.05 + lvl * 0.012) {
          c.ax.u = true;
          f.aiDir = dx > 0 ? "r" : "l";
          return;
        }
        f.aiDir = Math.random() < 0.8 ? dx > 0 ? "r" : "l" : null;
        return;
      }
      if (Math.random() < agg) {
        f.aiDir = null;
        const pk = Math.random();
        if (pk < 0.07) {
          c.ax.P = true;
          c.ax.K = true;
        } else if (pk < 0.3) c.ax.P = true;
        else if (pk < 0.58) c.ax.K = true;
        else if (pk < 0.75) {
          c.ax.d = true;
          c.ax.P = true;
        } else {
          c.ax.d = true;
          c.ax.K = true;
        }
        return;
      }
      if (Math.random() < 0.28) {
        f.aiDir = null;
        c.ax.B = true;
        return;
      }
      f.aiDir = Math.random() < 0.6 ? dx > 0 ? "r" : "l" : null;
    }
    function toLobby(gm) {
      setScreen(S, gm);
    }
    function newBattleDefs(d1, c1, d2, c2, arena) {
      S.battle = { p1: new F(d1, c1), p2: new F(d2, c2), round: 1, phase: "intro", phaseT: 0, timer: 60, arena };
      S.battle.p1.foe = S.battle.p2;
      S.battle.p2.foe = S.battle.p1;
      beginBattle(S, S.battle, { h1: 0, d1: 0, c1: 0, h2: 0, d2: 0, c2: 0 });
      startRound();
      S.GAME = "fight";
    }
    function newBattle(i1, c1, i2, c2, arena) {
      newBattleDefs(typeof i1 === "object" ? i1 : CH[i1], c1, typeof i2 === "object" ? i2 : CH[i2], c2, arena);
    }
    function arcOpponent(step2) {
      if (step2 < S.ladder.length) {
        const id = S.ladder[step2];
        return { def: CH[id], arena: CH[id].arena };
      }
      return { def: BOSS, arena: BOSS.arena };
    }
    function arcFight() {
      if (!S.ladder.length) return;
      const o = arcOpponent(S.lStep);
      newBattleDefs(CH[S.arcP1], new Ctrl(KM12), o.def, new Ctrl(KM22), o.arena);
      S.battle.mode = "arcade";
      S.battle.p2.ctrl.ai = true;
      S.battle.aiLvl = S.lStep >= S.ladder.length ? 7 : Math.min(7, S.lStep);
      S.GAME = "vs";
      S.vsT = 0;
      S.vsEscT = 0;
      saveArcRun();
      if (S.lStep >= S.ladder.length) say("Final boss");
    }
    function startRound() {
      const b = S.battle;
      resetRound(S, OPT.reduce ? 0 : 24);
      b.p1.reset(180, 1);
      b.p2.reset(AW - 180, -1);
      b.phase = "intro";
      b.phaseT = 0;
      b.timer = 60;
      b.p1.rage = Math.floor(b.p1.rage * 0.5);
      b.p2.rage = Math.floor(b.p2.rage * 0.5);
      S.announce = { txt: "\u0420\u0410\u0423\u041D\u0414 " + b.round, t: 0, col: "#e8c040" };
      say("Round " + ["one", "two", "three"][Math.min(2, b.round - 1)]);
    }
    function endBattle(w) {
      S.battle.phase = "over";
      S.battle.phaseT = 0;
      S.battle.winner = w;
      w.state = "win";
      w.st = 0;
      w.atk = null;
      if (S.battle.loser) S.battle.loser.defeated = 1;
      S.projs.length = 0;
      S.announce = { txt: w.def.name + " \u041F\u041E\u0411\u0415\u0416\u0414\u0410\u0415\u0422", t: 0, col: "#e8c040" };
      say(w.def.en + " wins");
      SFX.win();
    }
    function startFatal(w, l) {
      S.projs.length = 0;
      S.battle.phase = "fatal";
      S.battle.phaseT = 0;
      w.state = "fatal";
      w.st = 0;
      w.face = l.x < w.x ? -1 : 1;
      l.state = "victim";
      l.st = 0;
      l.vx = 0;
      l.vy = 0;
      l.defeated = 1;
      SFX.sting();
      say("Fatality");
    }
    function fatalStep(w, l) {
      const t = S.battle.phaseT, id = w.def.id;
      if (t === 50) {
        S.flashS = 8;
        S.shake = 10;
        if (id === 0) {
          SFX.fire();
          l.burnT = 1;
        } else if (id === 1) {
          SFX.tele();
          S.fx.push({ ty: "drain", x: l.x, t: 0 });
          l.soulT = 1;
        } else if (id === 2) {
          SFX.zap();
          l.shockT = 1;
          for (let i = 0; i < 14; i++) S.fx.push({ ty: "boltfx", x: l.x + rnd(-16, 16), t: -(i % 3) });
        } else if (id === 3) {
          SFX.bone();
          l.crushT = 1;
        } else if (id === 4) {
          SFX.slash();
          l.sliceT = 1;
        } else if (id === 5) {
          SFX.tele();
          l.sandT = 1;
        } else if (id === 6) {
          SFX.ice();
          l.frozen = 999;
          l.shatterT = 1;
        } else if (id === 7) {
          SFX.shoot();
          l.bombT = 1;
        } else if (id === 8) {
          SFX.sting();
          l.drainT = 1;
        } else if (id === 10) {
          SFX.sting();
          l.drainB = 1;
        } else if (id === 11) {
          SFX.slash();
          l.sliceT = 1;
          l.cutT = 1;
        } else if (id === 12) {
          SFX.cast2();
          l.floatT = 1;
          l.float0 = l.y;
        } else {
          SFX.shoot();
          l.laserT = 1;
        }
      }
      if (t > 50 && t < 160) {
        const WC = { 0: "#f06020", 1: "#8899aa", 2: "#f8f860", 3: "#8a7a5c", 4: "#7ac83a", 5: "#c8a060", 6: "#c8ecff", 7: "#c8c8a0", 8: "#7a3aa8", 9: "#f8f860", 10: "#d82040", 11: "#9adcee", 12: "#b89aff" };
        if (t % 6 === 0) P(w.x + w.face * 22, w.y - w.def.h * 0.72, rnd(-0.4, 0.4) + w.face * 0.5, rnd(-1, -0.2), WC[id], 14, 2, -0.01);
        if (l.burnT) {
          for (let i = 0; i < 3; i++) P(l.x + rnd(-8, 8), l.y - rnd(5, 60), rnd(-0.4, 0.4), rnd(-2, -0.6), "#f06020", 22, 3, -0.02);
          if (t > 110) l.charred = 1;
        }
        if (l.shockT && t % 4 === 0) {
          SFX.zap();
          for (let i = 0; i < 3; i++) P(l.x + rnd(-10, 10), l.y - rnd(20, 70), rnd(-1, 1), rnd(-1, 1), "#f8f860", 8, 2, 0);
        }
        if (l.crushT && t % 12 === 0) {
          SFX.bone();
          S.shake = 8;
          blood(l.x, l.y - 30, 10, 2);
          l.squash = Math.max(0.25, l.squash - 0.12);
        }
        if (l.sliceT && t % 6 === 0) {
          SFX.slash();
          blood(l.x + rnd(-6, 6), l.y - rnd(10, 60), 6, 1.5);
          S.fx.push({ ty: "slash", x: l.x + rnd(-10, 10), y: l.y - rnd(10, 60), t: 0 });
        }
        if (l.cutT && (t === 55 || t === 80 || t === 105 || t === 130)) {
          w.face = l.x > w.x ? 1 : -1;
          const nx = clamp2(l.x + w.face * rnd(20, 28), 20, AW - 20);
          for (let i = 0; i < 8; i++) P(w.x + (nx - w.x) * (i / 8), w.y - rnd(6, 50), (nx - w.x) / 10, rnd(-0.5, 0.5), "#9adcee", 18, 2, 0);
          w.x = nx;
          smoke(nx, w.y - 30);
          SFX.slash();
          S.fx.push({ ty: "slash", x: l.x + rnd(-12, 12), y: l.y - rnd(8, 60), t: 0 });
          blood(l.x + rnd(-6, 6), l.y - rnd(10, 55), 5, 1.4);
          S.shake = Math.max(S.shake, 3);
        }
        if (l.cutT && t === 150) {
          SFX.slash();
          S.shake = 8;
          S.fx.push({ ty: "slash", x: l.x, y: l.y - 34, t: 0 });
          blood(l.x, l.y - 34, 10, 2);
          SFX.tele();
        }
        if (l.floatT) {
          if (l.y > l.float0 - 58) l.y -= 0.55;
          if (t % 3 === 0) {
            const a = t * 0.14;
            for (let i = 0; i < 3; i++) {
              const aa = a + i * 2.09;
              P(l.x + Math.cos(aa) * 16, l.float0 - 30 + Math.sin(aa) * 11, 0, 0, "#b89aff", 16, 2, 0);
            }
          }
          if (t === 145) {
            SFX.cast2();
            S.shake = 6;
            for (let i = 0; i < 16; i++) P(l.x + rnd(-14, 14), l.y - rnd(5, 60), rnd(-2, 2), rnd(-2, 2), "#b89aff", 30, 2, 0);
          }
        }
        if (l.sandT) {
          for (let i = 0; i < 4; i++) P(l.x + rnd(-14, 14), l.y - rnd(0, 70), rnd(-1.4, 1.4), rnd(-2, -0.4), "#c8a060", 24, 2, -0.01);
          if (t > 110) l.charred = 1;
        }
        if (l.shatterT === 1 && t > 120) {
          l.shatterT = 2;
          SFX.ice();
          l.hidden = 1;
          gibs(l, "#a8d8f0");
        }
        if (l.bombT && t % 16 === 0) {
          S.fx.push({ ty: "boom", x: l.x + rnd(-16, 16), y: l.y - 30, t: 0 });
          SFX.boom();
          S.shake = 8;
        }
        if (l.bombT && t === 141) {
          l.hidden = 1;
          gibs(l, "#b01818");
          SFX.boom();
        }
        if (l.drainT) {
          l.scale = Math.max(0.1, l.scale - 0.012);
          for (let i = 0; i < 2; i++) P(l.x + rnd(-8, 8), l.y - rnd(0, 60), rnd(-0.5, 0.5), rnd(-1.5, -0.4), "#7a3aa8", 30, 2, -0.01);
          w.hp = Math.min(100, w.hp + 0.1);
        }
        if (l.drainB) {
          l.scale = Math.max(0.82, l.scale - 4e-3);
          for (let i = 0; i < 3; i++) P(l.x + rnd(-10, 10), l.y - rnd(10, 60), rnd(-0.2, 0.2), -rnd(2, 3.6), "#d82040", 34, 2, -0.01);
          if (t % 10 === 0) SFX.hit();
          if (t > 120) l.pale = 1;
        }
        if (l.laserT && t > 60) {
          for (let i = 0; i < 3; i++) P(l.x + rnd(-6, 6), l.y - rnd(10, 70), rnd(-0.5, 0.5), rnd(-2, -0.5), "#f8f860", 16, 3, -0.02);
          if (t > 100) l.charred = 1;
        }
        if (l.soulT && t > 90) {
          l.tilt = lerp(l.tilt, -1.4, 0.08);
          P(l.x, l.y - 70, rnd(-0.3, 0.3), rnd(-1.2, -0.6), "#e8f0f8", 40, 2, -0.01);
        }
      }
      if (t === 170) {
        if (id === 0 || id === 9) {
          l.hidden = 1;
          gibs(l, "#181818");
        }
        if (id === 5) {
          l.hidden = 1;
          gibs(l, "#e8e0d0");
        }
        if (id === 4) {
          l.hidden = 1;
          gibs(l, "#b01818");
          gibs(l, l.def.skin);
        }
        if (id === 2) l.charred = 1;
        if (id === 3) {
          blood(l.x, l.y - 30, 16, 2.5);
          S.shake = 10;
        }
        if (id === 1) l.tilt = -1.4;
        if (id === 8) {
          l.hidden = 1;
          gibs(l, "#7a3aa8");
        }
        if (id === 10) {
          l.hidden = 1;
          gibs(l, "#d82040");
          SFX.sting();
        }
        if (id === 11) {
          l.hidden = 1;
          gibs(l, "#b01818");
          gibs(l, "#c8d8e0");
          SFX.slash();
        }
        if (id === 12) {
          l.hidden = 1;
          gibs(l, "#b89aff");
          gibs(l, "#e8e8ff");
          SFX.fatal();
        }
        S.announce = { txt: "FATALITY", t: 0, col: "#e02020" };
        SFX.fatal();
      }
      if (t === 300) endBattle(w);
    }
    function gibs(l, col) {
      for (let i = 0; i < 22; i++) P(l.x + rnd(-8, 8), l.y - rnd(5, 60), rnd(-3.5, 3.5), rnd(-6, -1), col, rnd(40, 90), rnd(2, 5));
      blood(l.x, l.y - 30, 20, 2);
    }
    function battleUpd() {
      const b = S.battle;
      b.phaseT++;
      if (b.mode === "training") {
        b.phase = "fight";
        b.phaseT = 200;
        b.timer = 99;
        S.freeze = 0;
        updFs(1);
        for (const f of [b.p1, b.p2]) {
          f.hp = 100;
          f.hpLag = 100;
          f.rage = 100;
          f.defeated = 0;
          if (f.state === "down" && f.st > 60) {
            f.state = "idle";
            f.st = 0;
            f.y = FL + GR;
            f.vx = 0;
            f.vy = 0;
          }
        }
        S.freeze = 0;
        return;
      }
      if (b.phase === "intro") {
        if (b.phaseT === 90) {
          S.announce = { txt: "FIGHT!", t: 0, col: "#e02020" };
          say("Fight!");
        }
        if (b.phaseT > 120) b.phase = "fight";
        updFs(0);
        return;
      }
      if (b.phase === "fatal") {
        fatalStep(b.winner, b.loser);
        updFs(0);
        return;
      }
      if (b.phase === "over") {
        updFs(0);
        if (b.phaseT > 200) afterBattle();
        return;
      }
      if (S.freeze > 0) {
        S.freeze--;
        return;
      }
      if (b.p1.hp < 25 && b.p1.hp > 0 && S.FRAME % 50 === 0) SFX.heart();
      if (b.p2.hp < 25 && b.p2.hp > 0 && S.FRAME % 50 === 25) SFX.heart();
      b.timer -= 1 / 60;
      if (b.timer < 11 && b.timer > 0 && S.FRAME % 60 === 0) SFX.tick();
      if (b.timer <= 0) {
        b.timer = 0;
        b.phase = "ko";
        b.phaseT = 0;
        S.announce = { txt: "\u041D\u0418\u0427\u042C\u042F", t: 0, col: "#e8c040" };
        say("Draw");
        return;
      }
      updFs(1);
    }
    function updFs(act) {
      const b = S.battle;
      for (const f of [b.p1, b.p2]) {
        f.comboT = (f.comboT || 0) + 1;
        if (f.ctrl.ai && act && b.phase !== "finish" && b.mode !== "training") aiUpd(f, f.foe, b.aiLvl);
        if (f.state !== "fatal" && f.state !== "victim") f.update(S.FRAME, f.foe);
        else {
          f.st++;
          f.animT++;
        }
        f.updSuper();
      }
      if (b.phase === "fight" && b.mode !== "training") {
        const dead = [b.p1, b.p2].filter((f) => f.hp <= 0 && f.state !== "victim");
        if (dead.length >= 2) {
          b.phase = "ko";
          b.phaseT = 0;
          S.projs.length = 0;
          for (const f of dead) {
            f.defeated = 1;
            f.state = "down";
            f.st = 0;
            f.vx = 0;
            f.vy = 0;
            f.y = FL + GR;
          }
          S.announce = { txt: "\u041D\u0418\u0427\u042C\u042F", t: 0, col: "#e8c040" };
          say("Draw");
        } else if (dead.length === 1) roundWon(dead[0].foe);
      }
    }
    function roundWon(w) {
      const b = S.battle;
      w.wins++;
      S.projs.length = 0;
      if (w.wins >= 2) {
        b.loser = w.foe;
        b.winner = w;
        b.phase = "finish";
        b.phaseT = 0;
        w.ctrl.clear();
        w.foe.ctrl.clear();
        w.foe.hp = 0;
        w.foe.state = "dizzy";
        w.foe.st = 0;
        w.foe.vx = 0;
        w.foe.vy = 0;
        w.foe.y = FL + GR;
        w.foe.atk = null;
        w.foe.defeated = 1;
        w.foe.netT = 0;
        w.foe.frozen = 0;
        b.fatalProg = 0;
        S.announce = { txt: "FINISH HIM!", t: 0, col: "#e02020", pulse: 1 };
        say("Finish him");
        const wx = w.x, wf = w.face;
        w.reset(wx, wf);
        w.hp = 100;
        w.defeated = 0;
      } else {
        b.phase = "ko";
        b.phaseT = 0;
        const fl = (w.damageTaken || 0) === 0;
        if (fl) SFX.coin();
        S.announce = { txt: fl ? "FLAWLESS VICTORY" : "K.O.", t: 0, col: fl ? "#e8e0c0" : "#e02020" };
        w.state = "win";
        w.st = 0;
        w.atk = null;
        w.foe.state = "down";
        w.foe.st = 0;
        w.foe.hp = 0;
        w.foe.vx = 0;
        w.foe.vy = 0;
        w.foe.y = FL + GR;
        w.foe.defeated = 1;
        w.foe.netT = 0;
        w.foe.frozen = 0;
        SFX.ko();
        say(fl ? "Excellent. Flawless victory" : "K O");
      }
    }
    function fatalMapped(seq, face) {
      return seq.split("").map((k) => k === "R" ? face > 0 ? "R" : "L" : k === "L" ? face > 0 ? "L" : "R" : k);
    }
    function fatalProgress(ctrl, seq, face) {
      const mapped = fatalMapped(seq, face), b = ctrl.buf, now = b.length ? b[b.length - 1].t : 0;
      let best = 0;
      for (let start = 0; start < b.length; start++) {
        if (now - b[start].t > FATAL_INPUT) continue;
        let n = 0;
        while (n < mapped.length && start + n < b.length && b[start + n].k === mapped[n]) n++;
        if (n > best) best = n;
      }
      return best;
    }
    function finishUpd() {
      const b = S.battle;
      b.phaseT++;
      updFs(1);
      const w = b.winner, l = b.loser;
      if (l.state === "down") {
        b.phase = "over";
        b.phaseT = 0;
        endBattle(w);
        return;
      }
      if (w.ctrl.ai) {
        const c = w.ctrl;
        c.ax = {};
        const dx = l.x - w.x;
        if (b.phaseT > 40 && Math.abs(dx) > 44) c.ax[dx > 0 ? "r" : "l"] = true;
        if (Math.abs(dx) <= 44 && b.phaseT > 140 && Math.random() < 0.03) {
          startFatal(w, l);
          return;
        }
      } else {
        const prog = fatalProgress(w.ctrl, w.def.fat, w.face);
        if (prog > b.fatalProg) {
          b.fatalProg = prog;
          if (prog > 0) SFX.tick();
        } else if (prog < b.fatalProg) b.fatalProg = prog;
        if ((w.ctrl.pP || w.ctrl.pK) && (w.ctrl.matchRel(w.def.fat, w.face, FATAL_INPUT) || w.ctrl.matchRelLoose(w.def.fat, w.face, FATAL_INPUT))) {
          startFatal(w, l);
          return;
        }
      }
      if (b.phaseT >= FATAL_FRAMES) {
        l.state = "down";
        l.st = 0;
      }
    }
    function afterBattle() {
      const b = S.battle;
      if (b.mode === "arcade" && b.winner === b.p1) {
        S.lStep++;
        if (S.lStep >= arcTotal()) {
          clearArcRun();
          try {
            const rec = +(localStorage.karnageArc || 0);
            if (S.lStep > rec) localStorage.karnageArc = S.lStep;
          } catch (e) {
          }
          addTop(S.arcP1, S.lStep);
          toLobby("ending");
          return;
        }
        arcFight();
      } else if (b.mode === "arcade") {
        saveArcRun();
        toLobby("continue");
        S.contT = 600;
        say("Continue?");
        try {
          const rec = +(localStorage.karnageArc || 0);
          if (S.lStep > rec) localStorage.karnageArc = S.lStep;
          addTop(S.arcP1, S.lStep);
        } catch (e) {
        }
      } else toLobby(S.lastSel ? "rematch" : "menu");
    }
    function resumeArc() {
      SFX.coin();
      arcFight();
    }
    function resumeSavedArcade() {
      const run = loadArcRun();
      if (!run) return false;
      S.arcP1 = run.c1;
      S.ladder = run.ladder.slice();
      S.lStep = run.step;
      SFX.vsroar();
      arcFight();
      return true;
    }
    function menuItems() {
      const saved = !!loadArcRun(), items = [];
      if (saved) items.push({ id: "resume", label: "\u041F\u0420\u041E\u0414\u041E\u041B\u0416\u0418\u0422\u042C \u0410\u0420\u041A\u0410\u0414\u0423" });
      items.push({ id: "arcade", label: saved ? "\u041D\u041E\u0412\u0410\u042F \u0410\u0420\u041A\u0410\u0414\u0410" : "\u0410\u0420\u041A\u0410\u0414\u0410" }, { id: "cpu", label: "\u0411\u041E\u0419 \u041F\u0420\u041E\u0422\u0418\u0412 CPU" }, { id: "training", label: "\u0422\u0420\u0415\u041D\u0418\u0420\u041E\u0412\u041A\u0410" }, { id: "2p", label: "\u0411\u041E\u0419 \u041D\u0410 \u0414\u0412\u041E\u0418\u0425" }, { id: "settings", label: "\u041D\u0410\u0421\u0422\u0420\u041E\u0419\u041A\u0418" }, { id: "controls", label: "\u0423\u041F\u0420\u0410\u0412\u041B\u0415\u041D\u0418\u0415" }, { id: "top", label: "\u0417\u0410\u041B \u0421\u041B\u0410\u0412\u042B" });
      return items;
    }
    function pauseItems() {
      return ["\u041F\u0420\u041E\u0414\u041E\u041B\u0416\u0418\u0422\u042C", "\u0417\u0412\u0423\u041A: " + (AU.on ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0413\u041E\u041B\u041E\u0421 \u0414\u0418\u041A\u0422\u041E\u0420\u0410: " + (AU.voice ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0413\u0420\u041E\u041C\u041A\u041E\u0421\u0422\u042C: " + AU.vol + "%", "\u0412 \u041C\u0415\u041D\u042E"];
    }
    function settingsItems() {
      return ["\u0417\u0412\u0423\u041A: " + (AU.on ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0413\u041E\u041B\u041E\u0421 \u0414\u0418\u041A\u0422\u041E\u0420\u0410: " + (AU.voice ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0413\u0420\u041E\u041C\u041A\u041E\u0421\u0422\u042C: " + AU.vol + "%", "CRT-\u0424\u0418\u041B\u042C\u0422\u0420: " + (OPT.crt ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u041A\u0420\u041E\u0412\u042C: " + (OPT.blood ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0422\u0420\u042F\u0421\u041A\u0410: " + (OPT.shake ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u041C\u0415\u041D\u042C\u0428\u0415 \u0414\u0412\u0418\u0416\u0415\u041D\u0418\u042F: " + (OPT.reduce ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u041D\u0410\u0417\u0410\u0414"];
    }
    function settingsChange(i, dir) {
      if (i === 0) {
        AU.on = !AU.on;
        setVol();
        if (!AU.on) {
          try {
            speechSynthesis.cancel();
          } catch (e) {
          }
        } else SFX.menu();
        saveSet();
      } else if (i === 1) {
        AU.voice = !AU.voice;
        if (!AU.voice) {
          try {
            speechSynthesis.cancel();
          } catch (e) {
          }
        }
        saveSet();
        SFX.menu();
      } else if (i === 2) {
        AU.vol = clamp2(AU.vol + (dir < 0 ? -10 : 10), 0, 100);
        setVol();
        saveSet();
        SFX.menu();
      } else if (i === 3) {
        OPT.crt = !OPT.crt;
        applyCrt();
        saveOpts();
        SFX.menu();
      } else if (i === 4) {
        OPT.blood = !OPT.blood;
        saveOpts();
        SFX.menu();
      } else if (i === 5) {
        OPT.shake = !OPT.shake;
        saveOpts();
        SFX.menu();
      } else if (i === 6) {
        OPT.reduce = !OPT.reduce;
        if (OPT.reduce) {
          S.shake = 0;
          S.flashS = 0;
        }
        saveOpts();
        SFX.menu();
      }
    }
    function onKey(k) {
      if (k === "KeyM") {
        AU.on = !AU.on;
        setVol();
        if (!AU.on) {
          try {
            speechSynthesis.cancel();
          } catch (e) {
          }
        } else SFX.menu();
        saveSet();
        return;
      }
      if (S.GAME === "fight" && !S.paused && S.battle && (k === "KeyJ" || k === "Enter" || k === "Space")) {
        if (S.battle.phase === "fatal" && S.battle.phaseT > 30) {
          endBattle(S.battle.winner);
          return;
        }
        if (S.battle.phase === "over" && S.battle.phaseT > 30) {
          afterBattle();
          return;
        }
      }
      if (S.GAME === "fight" && !S.paused && k === "Escape") {
        S.paused = true;
        S.pauseIdx = 0;
        SFX.menu();
        return;
      }
      if (S.GAME === "fight" && !S.paused && k === "KeyR" && S.battle && S.battle.mode === "training") {
        resetTraining();
        return;
      }
      if (S.GAME === "fight" && !S.paused && k === "KeyT" && S.battle && S.battle.mode === "training") {
        toggleTrainingBlock();
        return;
      }
      if (S.GAME === "title") {
        toLobby("menu");
        SFX.sel();
        say("Karnage");
        return;
      }
      if (S.GAME === "fight" && S.paused) {
        if (k === "KeyW" || k === "ArrowUp") {
          S.pauseIdx = (S.pauseIdx + 4) % 5;
          SFX.menu();
        }
        if (k === "KeyS" || k === "ArrowDown") {
          S.pauseIdx = (S.pauseIdx + 1) % 5;
          SFX.menu();
        }
        if ((k === "KeyD" || k === "ArrowRight") && S.pauseIdx === 3) {
          AU.vol = Math.min(100, AU.vol + 10);
          setVol();
          saveSet();
          SFX.menu();
        }
        if ((k === "KeyA" || k === "ArrowLeft") && S.pauseIdx === 3) {
          AU.vol = Math.max(0, AU.vol - 10);
          setVol();
          saveSet();
          SFX.menu();
        }
        if (k === "Escape") {
          S.paused = false;
          SFX.menu();
          S.battle.p1.ctrl.clear();
          S.battle.p2.ctrl.clear();
          return;
        }
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          if (S.pauseIdx === 0) {
            S.paused = false;
            S.battle.p1.ctrl.clear();
            S.battle.p2.ctrl.clear();
          } else if (S.pauseIdx === 1) {
            AU.on = !AU.on;
            setVol();
            saveSet();
          } else if (S.pauseIdx === 2) {
            AU.voice = !AU.voice;
            if (!AU.voice) {
              try {
                speechSynthesis.cancel();
              } catch (e) {
              }
            }
            saveSet();
          } else if (S.pauseIdx === 3) {
            AU.vol = AU.vol >= 100 ? 0 : AU.vol + 25;
            setVol();
            saveSet();
          } else toLobby("menu");
        }
        return;
      }
      if (S.GAME === "menu") {
        const items = menuItems(), n = items.length;
        S.menuIdx = clamp2(S.menuIdx, 0, n - 1);
        if (k === "KeyW" || k === "ArrowUp") {
          S.menuIdx = (S.menuIdx + n - 1) % n;
          SFX.menu();
        }
        if (k === "KeyS" || k === "ArrowDown") {
          S.menuIdx = (S.menuIdx + 1) % n;
          SFX.menu();
        }
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          const item = items[S.menuIdx];
          if (item.id === "resume") {
            resumeSavedArcade();
            return;
          }
          if (item.id === "arcade") {
            S.GAME = "select";
            S.sel = createSelection("arcade");
            say("Choose your fighter");
          } else if (item.id === "cpu") {
            S.GAME = "select";
            S.sel = createSelection("cpu");
            say("Choose your fighter");
          } else if (item.id === "training") {
            S.GAME = "select";
            S.sel = createSelection("training");
            say("Choose your fighter");
          } else if (item.id === "2p") {
            S.GAME = "select";
            S.sel = createSelection("2p");
            say("Choose your fighters");
          } else if (item.id === "settings") {
            S.settingsIdx = 0;
            S.GAME = "settings";
          } else if (item.id === "controls") S.GAME = "controls";
          else S.GAME = "top";
        }
        return;
      }
      if (S.GAME === "settings") {
        const n = settingsItems().length;
        if (k === "KeyW" || k === "ArrowUp") {
          S.settingsIdx = (S.settingsIdx + n - 1) % n;
          SFX.menu();
        }
        if (k === "KeyS" || k === "ArrowDown") {
          S.settingsIdx = (S.settingsIdx + 1) % n;
          SFX.menu();
        }
        if (k === "KeyA" || k === "ArrowLeft") settingsChange(S.settingsIdx, -1);
        if (k === "KeyD" || k === "ArrowRight") settingsChange(S.settingsIdx, 1);
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          if (S.settingsIdx === n - 1) {
            toLobby("menu");
            SFX.menu();
          } else settingsChange(S.settingsIdx, 1);
        }
        if (k === "Escape") {
          toLobby("menu");
          SFX.menu();
        }
        return;
      }
      if (S.GAME === "controls") {
        if (k === "KeyJ" || k === "Enter" || k === "Escape") {
          toLobby("menu");
          SFX.menu();
        }
        return;
      }
      if (S.GAME === "select") {
        selKey(k);
        return;
      }
      if (S.GAME === "vs") {
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          S.GAME = "fight";
          SFX.sel();
          S.vsEscT = 0;
        } else if (k === "Escape") {
          if (S.battle.mode === "arcade") {
            if (S.vsEscT > 0) toLobby("menu");
            else {
              S.vsEscT = 90;
              SFX.menu();
            }
          } else toLobby("menu");
        }
        return;
      }
      if (S.GAME === "continue") {
        if (k === "KeyJ" || k === "Enter" || k === "Space") resumeArc();
        else if (k === "Escape") {
          toLobby("menu");
          SFX.menu();
        }
        return;
      }
      if (S.GAME === "rematch") {
        if (!S.lastSel) {
          toLobby("menu");
          return;
        }
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          rematchStart();
          return;
        }
        if (k === "Escape") {
          toLobby("menu");
          return;
        }
      }
      if (S.GAME === "ending" || S.GAME === "gameover") {
        if (k === "KeyJ" || k === "Enter" || k === "Escape") {
          toLobby("menu");
          SFX.sel();
        }
        return;
      }
      if (S.GAME === "top") {
        if (k === "KeyJ" || k === "Enter" || k === "Escape") {
          toLobby("menu");
          SFX.menu();
        }
        return;
      }
    }
    function startLadder(c1) {
      clearArcRun();
      S.arcP1 = c1;
      S.ladder = [];
      for (let i = 0; i < CH.length; i++) if (i !== c1 && i !== BOSS.id) S.ladder.push(i);
      for (let i = S.ladder.length - 1; i > 0; i--) {
        const j = Math.random() * (i + 1) | 0;
        [S.ladder[i], S.ladder[j]] = [S.ladder[j], S.ladder[i]];
      }
      S.ladder = S.ladder.slice(0, CH.length - 2);
      S.lStep = 0;
      SFX.vsroar();
      arcFight();
    }
    function startSel() {
      const s = S.sel;
      const training = s.mode === "training";
      newBattle(s.c1, new Ctrl(KM12), training ? DUMMY : s.c2, new Ctrl(KM22), training ? DUMMY.arena : s.ar < 0 ? CH[s.c1].arena : s.ar);
      if (training) {
        const b = S.battle;
        b.mode = "training";
        b.trainBlock = false;
        b.p2.ctrl.ai = true;
        b.p2.ctrl.ax = {};
        b.p1.x = 300;
        b.p1.face = 1;
        b.p2.x = 380;
        b.p2.face = -1;
        b.p1.rage = 100;
        b.p2.rage = 100;
        b.timer = 99;
        b.phase = "fight";
        b.phaseT = 200;
        b.p1.ctrl.clear();
        b.p2.ctrl.clear();
        S.lastSel = null;
        S.announce = { txt: "\u0422\u0420\u0415\u041D\u0418\u0420\u041E\u0412\u041A\u0410", t: 0, col: "#e8c040" };
        S.GAME = "fight";
        SFX.sel();
        return;
      }
      S.battle.mode = s.mode === "cpu" ? "cpu" : "2p";
      if (s.mode === "cpu") {
        S.battle.p2.ctrl.ai = true;
        S.battle.aiLvl = [2, 4, 6][s.diff];
      }
      SFX.vsroar();
      S.lastSel = { mode: s.mode, c1: s.c1, c2: s.c2, diff: s.diff, ar: s.ar };
      S.GAME = "vs";
      S.vsT = 0;
    }
    function resetTraining() {
      const b = S.battle;
      if (!b || b.mode !== "training") return;
      b.trainBlock = false;
      b.p1.reset(300, 1);
      b.p2.reset(380, -1);
      b.p2.ctrl.ax = {};
      b.p2.ctrl.poll(S.FRAME);
      b.p1.rage = 100;
      b.p2.rage = 100;
      b.phase = "fight";
      b.phaseT = 200;
      b.timer = 99;
      S.freeze = 0;
      S.paused = false;
      S.projs.length = 0;
      S.fx.length = 0;
      S.announce = { txt: "\u0421\u0411\u0420\u041E\u0421", t: 0, col: "#c8a040" };
    }
    function toggleTrainingBlock() {
      const b = S.battle;
      if (!b || b.mode !== "training") return;
      b.trainBlock = !b.trainBlock;
      b.p2.ctrl.ax = b.trainBlock ? { B: true } : {};
      b.p2.ctrl.poll(S.FRAME);
      if (b.trainBlock && ["idle", "walk", "crouch"].includes(b.p2.state)) {
        b.p2.state = "block";
        b.p2.st = 0;
      } else if (!b.trainBlock && b.p2.state === "block") b.p2.state = "idle";
      SFX.menu();
    }
    function rematchStart() {
      newBattle(S.lastSel.c1, new Ctrl(KM12), S.lastSel.c2, new Ctrl(KM22), S.lastSel.ar < 0 ? CH[S.lastSel.c1].arena : S.lastSel.ar);
      S.battle.mode = S.lastSel.mode === "cpu" ? "cpu" : "2p";
      if (S.lastSel.mode === "cpu") {
        S.battle.p2.ctrl.ai = true;
        S.battle.aiLvl = [2, 4, 6][S.lastSel.diff];
      }
      S.GAME = "vs";
      S.vsT = 0;
      SFX.vsroar();
    }
    function drawRematch() {
      bgFill();
      panel(102, 70, 220, 116);
      g.font = '16px "Rubik Mono One","Russo One",sans-serif';
      g.fillStyle = UI_GOLD;
      g.textAlign = "center";
      g.fillText("\u0420\u0415\u0412\u0410\u041D\u0428?", RW / 2, 100);
      g.font = '9px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.fillText(CH[S.lastSel.c1].name + "  VS  " + CH[S.lastSel.c2].name, RW / 2, 124);
      if (S.bstat) {
        g.font = '7px "Russo One"';
        g.fillStyle = "#c8a040";
        g.fillText("\u0423\u0414\u0410\u0420\u042B: " + S.bstat.h1 + " \u2014 " + S.bstat.h2 + " \xB7 \u0423\u0420\u041E\u041D: " + Math.round(S.bstat.d1) + " \u2014 " + Math.round(S.bstat.d2), RW / 2, 162);
        g.fillText("\u041C\u0410\u041A\u0421. \u041A\u041E\u041C\u0411\u041E: " + S.bstat.c1 + " \u2014 " + S.bstat.c2, RW / 2, 174);
      }
      uiHint(isTouchUI() ? "P \u2014 \u0415\u0429\u0401 \u0411\u041E\u0419 \xB7 B \u2014 \u041C\u0415\u041D\u042E" : "J \u2014 \u0415\u0429\u0401 \u0411\u041E\u0419 \xB7 ESC \u2014 \u041C\u0415\u041D\u042E", 228, 8);
    }
    function selKey(k) {
      const s = S.sel;
      if (k === "Escape") {
        if (s.mode === "cpu" && s.ph === 2) {
          s.ph = 1;
          SFX.menu();
          return;
        }
        if (s.mode === "cpu" && s.ph === 1) {
          s.ph = 0;
          SFX.menu();
          return;
        }
        toLobby("menu");
        return;
      }
      if (s.ph === 2) {
        const rows = s.mode === "cpu" ? 2 : 1;
        if ((k === "KeyW" || k === "ArrowUp") && rows > 1) s.row = 0;
        if ((k === "KeyS" || k === "ArrowDown") && rows > 1) s.row = 1;
        const dd = k === "KeyD" || k === "ArrowRight" ? 1 : k === "KeyA" || k === "ArrowLeft" ? -1 : 0;
        const idx = s.mode === "cpu" ? s.row : 1;
        if (dd) {
          if (idx === 0) s.diff = clamp2(s.diff + dd, 0, 2);
          else s.ar = dd > 0 ? s.ar >= 9 ? -1 : s.ar + 1 : s.ar <= -1 ? 9 : s.ar - 1;
          SFX.menu();
        }
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          startSel();
        }
        return;
      }
      const d1 = k === "KeyD" ? 1 : k === "KeyA" ? -1 : k === "KeyW" ? -5 : k === "KeyS" ? 5 : 0;
      const d2 = k === "ArrowRight" ? 1 : k === "ArrowLeft" ? -1 : k === "ArrowUp" ? -5 : k === "ArrowDown" ? 5 : 0;
      const move = (slot, d) => {
        if (d) {
          s[slot] = clamp2(s[slot] + d, 0, CH.length - 1);
          s.last = slot;
          SFX.menu();
        }
      };
      if (s.mode === "training") {
        move("c1", d1 || d2);
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          startSel();
        }
        return;
      }
      if (s.mode === "arcade") {
        move("c1", d1 || d2);
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          startLadder(s.c1);
        }
        return;
      }
      if (s.mode === "cpu") {
        move(s.ph === 0 ? "c1" : "c2", d1 || d2);
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          if (s.ph === 0) s.ph = 1;
          else s.ph = 2;
        }
        return;
      }
      if (!s.l1) move("c1", d1);
      if (!s.l2) move("c2", d2);
      if (k === "KeyJ" || k === "Enter" || k === "Space") {
        s.l1 = !s.l1;
        SFX.sel();
      }
      if (k === "KeyI") {
        s.l2 = !s.l2;
        SFX.sel();
      }
      if (s.l1 && s.l2 && s.ph === 0) {
        s.ph = 2;
        s.row = 1;
        SFX.sel();
      }
    }
    function uiHint(text, y = 228, size = 7, col = UI_MUTED) {
      g.font = size + 'px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = col;
      g.globalAlpha = 0.8 + 0.2 * (0.5 + 0.5 * Math.sin(S.FRAME * 0.08));
      g.fillText(text, RW / 2, y);
      g.globalAlpha = 1;
    }
    function bgFill() {
      const sky = g.createLinearGradient(0, 0, 0, RH);
      sky.addColorStop(0, "#0b0706");
      sky.addColorStop(0.58, "#090605");
      sky.addColorStop(1, "#050303");
      g.fillStyle = sky;
      g.fillRect(0, 0, RW, RH);
      const glow = g.createRadialGradient(RW / 2, 78, 6, RW / 2, 78, 190);
      glow.addColorStop(0, "rgba(118,24,16,.20)");
      glow.addColorStop(0.5, "rgba(70,14,10,.07)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, RW, RH);
      const floor = g.createLinearGradient(0, RH - 72, 0, RH);
      floor.addColorStop(0, "rgba(0,0,0,0)");
      floor.addColorStop(1, "rgba(0,0,0,.42)");
      g.fillStyle = floor;
      g.fillRect(0, RH - 72, RW, 72);
      const vg = g.createRadialGradient(RW / 2, RH * 0.5, 70, RW / 2, RH * 0.5, 255);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.72, "rgba(0,0,0,.10)");
      vg.addColorStop(1, "rgba(0,0,0,.55)");
      g.fillStyle = vg;
      g.fillRect(0, 0, RW, RH);
    }
    function drawControls() {
      bgFill();
      g.font = '16px "Russo One"';
      g.fillStyle = UI_GOLD;
      g.textAlign = "center";
      g.fillText("\u0423\u041F\u0420\u0410\u0412\u041B\u0415\u041D\u0418\u0415", RW / 2, 20);
      panel(12, 30, 196, 176);
      panel(216, 30, 196, 176);
      g.fillStyle = "rgba(200,160,64,.22)";
      g.fillRect(212, 42, 1, 158);
      g.font = '10px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u0418\u0413\u0420\u041E\u041A 1", 110, 46);
      g.fillText("\u0418\u0413\u0420\u041E\u041A 2", 314, 46);
      g.font = '7px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.textAlign = "left";
      const L1 = ["A / D \u2014 \u0445\u043E\u0434\u044C\u0431\u0430", "W \u2014 \u043F\u0440\u044B\u0436\u043E\u043A", "S \u2014 \u043F\u0440\u0438\u0441\u0435\u0434", "J \u2014 \u0443\u0434\u0430\u0440 \u0440\u0443\u043A\u043E\u0439", "K \u2014 \u0443\u0434\u0430\u0440 \u043D\u043E\u0433\u043E\u0439", "L \u2014 \u0431\u043B\u043E\u043A (\u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C)", "S + J \u2014 \u0430\u043F\u043F\u0435\u0440\u043A\u043E\u0442", "S + K \u2014 \u043F\u043E\u0434\u0441\u0435\u0447\u043A\u0430", "\u043D\u0430\u0437\u0430\u0434 + K \u2014 \u0443\u0434\u0430\u0440 \u0441 \u0440\u0430\u0437\u0432\u043E\u0440\u043E\u0442\u0430", "\u0431\u0435\u0433 + L \u2014 \u0440\u044B\u0432\u043E\u043A-\u0443\u043A\u043B\u043E\u043D", "\u0421\u041F\u0415\u04262 \u2014 \u0432\u0442\u043E\u0440\u0430\u044F \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044F"];
      const L2 = ["\u0421\u0422\u0420\u0415\u041B\u041A\u0418 \u2014 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435", "\u0421\u0422\u0420\u0415\u041B\u041A\u0410 \u0412\u0412\u0415\u0420\u0425 \u2014 \u043F\u0440\u044B\u0436\u043E\u043A", "\u0421\u0422\u0420\u0415\u041B\u041A\u0410 \u0412\u041D\u0418\u0417 \u2014 \u043F\u0440\u0438\u0441\u0435\u0434", "I \u2014 \u0443\u0434\u0430\u0440 \u0440\u0443\u043A\u043E\u0439", "O \u2014 \u0443\u0434\u0430\u0440 \u043D\u043E\u0433\u043E\u0439", "P \u2014 \u0431\u043B\u043E\u043A (\u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C)", "\u0412\u041D\u0418\u0417 + I \u2014 \u0430\u043F\u043F\u0435\u0440\u043A\u043E\u0442", "\u0412\u041D\u0418\u0417 + O \u2014 \u043F\u043E\u0434\u0441\u0435\u0447\u043A\u0430", "\u043D\u0430\u0437\u0430\u0434 + O \u2014 \u0443\u0434\u0430\u0440 \u0441 \u0440\u0430\u0437\u0432\u043E\u0440\u043E\u0442\u0430", "\u0431\u0435\u0433 + P \u2014 \u0440\u044B\u0432\u043E\u043A-\u0443\u043A\u043B\u043E\u043D", "\u0421\u041F\u0415\u04262 \u2014 \u0432\u0442\u043E\u0440\u0430\u044F \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044F"];
      L1.forEach((l, i) => g.fillText(l, 24, 62 + i * 12));
      L2.forEach((l, i) => g.fillText(l, 228, 62 + i * 12));
      g.font = '7px "Russo One"';
      g.fillStyle = UI_ACCENT;
      g.textAlign = "center";
      g.fillText("\u0411\u0420\u041E\u0421\u041E\u041A: P1 \u2014 J + K \xB7 P2 \u2014 I + O", RW / 2, 212);
      g.fillText("\u0421\u041F\u0415\u0426 \u2014 \u041D\u0410\u041F\u0420\u0410\u0412\u041B\u0415\u041D\u0418\u042F + \u041A\u041D\u041E\u041F\u041A\u0410 \xB7 \u0421\u0423\u041F\u0415\u0420 \u2014 \u0412\u041D\u0418\u0417, \u0412\u041D\u0418\u0417 + \u0423\u0414\u0410\u0420", RW / 2, 220);
      uiHint(isTouchUI() ? "\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418 \u2014 \u0412 \u041E\u041A\u041D\u0415 FINISH HIM \xB7 B \u2014 \u041D\u0410\u0417\u0410\u0414" : "\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418 \u2014 \u0412 \u041E\u041A\u041D\u0415 FINISH HIM \xB7 J / ESC \u2014 \u041D\u0410\u0417\u0410\u0414", 228);
    }
    function drawSelect() {
      const s = S.sel;
      bgFill();
      g.font = '15px "Russo One"';
      g.fillStyle = UI_GOLD;
      g.textAlign = "center";
      g.fillText("\u0412\u042B\u0411\u041E\u0420 \u0411\u041E\u0419\u0426\u0410", RW / 2, 16);
      g.font = '7px "Russo One"';
      g.fillStyle = "#807850";
      const hdr = s.mode === "training" ? "\u0412\u042B\u0411\u0415\u0420\u0418 \u0411\u041E\u0419\u0426\u0410 \u0414\u041B\u042F \u0422\u0420\u0415\u041D\u0418\u0420\u041E\u0412\u041A\u0418" : s.mode === "arcade" ? loadArcRun() ? "\u041D\u041E\u0412\u0410\u042F \u0410\u0420\u041A\u0410\u0414\u0410 \u0417\u0410\u041C\u0415\u041D\u0418\u0422 \u0421\u041E\u0425\u0420\u0410\u041D\u0401\u041D\u041D\u0423\u042E" : "\u0412\u042B\u0411\u0415\u0420\u0418 \u0411\u041E\u0419\u0426\u0410 \u2014 " + ARC_TOTAL + " \u0411\u041E\u0401\u0412 \xB7 \u0411\u041E\u0421\u0421 \u0412 \u0424\u0418\u041D\u0410\u041B\u0415" : s.ph === 2 ? "\u041F\u041E\u0414\u0413\u041E\u0422\u041E\u0412\u041A\u0410 \u041A \u0411\u041E\u042E" : s.mode === "cpu" ? s.ph === 0 ? "\u0412\u042B\u0411\u0415\u0420\u0418 \u0421\u0412\u041E\u0415\u0413\u041E \u0411\u041E\u0419\u0426\u0410" : "\u0412\u042B\u0411\u0415\u0420\u0418 \u0421\u041E\u041F\u0415\u0420\u041D\u0418\u041A\u0410" : "P1: WASD + J \xB7 P2: \u0421\u0422\u0420\u0415\u041B\u041A\u0418 + I";
      g.fillText(hdr, RW / 2, 27);
      for (let i = 0; i < CH.length; i++) {
        const x = 12 + i % 5 * 37, y = 36 + (i / 5 | 0) * 46;
        g.fillStyle = "#100d0a";
        g.fillRect(x, y, 34, 42);
        g.strokeStyle = "#3a3128";
        g.lineWidth = 1;
        g.strokeRect(x + 0.5, y + 0.5, 33, 41);
        drawPort(CH[i], x + 17, y + 24.5, 0.94);
        if (s.c1 === i) {
          g.strokeStyle = "#e02020";
          g.lineWidth = 2;
          g.strokeRect(x - 1, y - 1, 36, 44);
        }
        if ((s.mode === "2p" || s.mode === "cpu" && s.ph === 1) && s.c2 === i) {
          g.strokeStyle = "#3868c8";
          g.lineWidth = 2;
          g.strokeRect(x + 1, y + 1, 32, 40);
        }
      }
      g.fillStyle = "rgba(0,0,0,.55)";
      g.fillRect(8, 176, 184, 24);
      g.fillStyle = "rgba(200,160,64,.28)";
      g.fillRect(8, 176, 184, 1);
      g.font = '7px "Russo One"';
      g.textAlign = "left";
      const lx = isTouchUI() ? 34 : 12;
      g.fillStyle = "#e02020";
      g.fillText("P1: " + CH[s.c1].name, lx, 187);
      if (s.mode === "training") {
        g.fillStyle = UI_MUTED;
        g.fillText("\u041C\u0410\u041D\u0415\u041A\u0415\u041D: \u041F\u0410\u0421\u0421\u0418\u0412\u041D\u042B\u0419", lx, 197);
      } else if (s.mode !== "arcade") {
        g.fillStyle = UI_BLUE;
        g.fillText((s.mode === "2p" ? "P2" : "CPU") + ": " + CH[s.c2].name, lx, 197);
      }
      g.fillStyle = "rgba(200,160,64,.22)";
      g.fillRect(196, 34, 1, 150);
      const cur = s.mode === "2p" ? s.last === "c2" ? s.c2 : s.c1 : s.mode === "cpu" ? s.ph === 0 ? s.c1 : s.c2 : s.c1;
      const seqP2 = s.mode === "2p" && cur === s.c2, seqGeneric = s.mode === "cpu" && s.ph === 1;
      const d = CH[cur];
      panel(200, 34, 216, 150);
      g.fillStyle = d.acc;
      g.fillRect(202, 36, 4, 146);
      g.font = '13px "Rubik Mono One","Russo One",sans-serif';
      g.fillStyle = "#e8e0c0";
      g.textAlign = "left";
      g.fillText(d.name, 298, 52);
      g.font = '7px "Russo One"';
      g.fillStyle = d.acc;
      g.fillText(RANGED.includes(d.id) ? "\u0414\u0410\u041B\u042C\u041D\u0418\u0419 \u0411\u041E\u0419" : "\u0411\u041B\u0418\u0416\u041D\u0418\u0419 \u0411\u041E\u0419", 298, 63);
      if (s.ph !== 2) {
        drawFake(cur, 242, 176, 1.35, -1);
        g.strokeStyle = "rgba(200,160,64,.25)";
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(290.5, 74);
        g.lineTo(290.5, 174);
        g.stroke();
        const st = [[Math.round(9 * d.dmg), 9, "\u0421\u0418\u041B\u0410"], [Math.round(d.spd * 4), 9, "\u0421\u041A\u041E\u0420\u041E\u0421\u0422\u042C"], [Math.round(9 / d.bulk), 9, "\u0412\u0415\u0421"]];
        st.forEach((s2, i) => {
          const sy = 78 + i * 12;
          g.font = '7px "Russo One"';
          g.fillStyle = "#c8a040";
          g.textAlign = "left";
          g.fillText(s2[2], 298, sy);
          g.fillStyle = "#2a0808";
          g.fillRect(338, sy - 6, 70, 5);
          g.fillStyle = s2[0] >= 7 ? "#e04020" : s2[0] >= 6 ? "#e8c040" : "#7a8a4a";
          g.fillRect(338, sy - 6, Math.max(2, Math.min(70, s2[0] / s2[1] * 70)), 5);
        });
        g.font = '7px "Russo One"';
        g.fillStyle = "#e8c040";
        g.fillText("\u0421\u041F\u0415\u0426: " + d.specN, 298, 116);
        g.fillText("[" + seqTxt(d.spec, seqP2, 1, seqGeneric) + "]", 298, 125);
        g.fillStyle = "#c8a040";
        g.fillText("\u0421\u041F\u0415\u04262: " + d.spec2N, 298, 136);
        g.fillText("[" + seqTxt(d.spec2, seqP2, 1, seqGeneric) + "]", 298, 145);
        g.fillStyle = "#e8c040";
        g.fillText("\u0421\u0423\u041F\u0415\u0420: " + d.sup, 298, 157);
        g.fillStyle = "#807850";
        g.fillText("\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418: \u0421\u0415\u041A\u0420\u0415\u0422", 298, 169);
      } else {
        panel(206, 80, 204, 96);
        drawPort(d, 240, 100, 0.8);
        g.fillStyle = "rgba(200,160,64,.28)";
        g.fillRect(258, 80, 1, 96);
        g.font = '8px "Russo One"';
        g.fillStyle = "#e8c040";
        g.textAlign = "center";
        g.fillText("\u041D\u0410\u0421\u0422\u0420\u041E\u0419\u041A\u0410 \u0411\u041E\u042F", 333, 94);
        if (s.mode === "cpu") {
          if (s.row === 0) {
            g.fillStyle = "rgba(224,32,32,.10)";
            g.fillRect(264, 107, 140, 16);
          }
          g.fillStyle = s.row === 0 ? blink() ? "#fff" : "#e02020" : "#c8a040";
          g.fillText("\u0421\u041B\u041E\u0416\u041D\u041E\u0421\u0422\u042C: " + ["\u041B\u0401\u0413\u041A\u0410\u042F", "\u041D\u041E\u0420\u041C\u0410\u041B\u042C\u041D\u0410\u042F", "\u0422\u042F\u0416\u0401\u041B\u0410\u042F"][s.diff], 334, 120);
        }
        if (s.row === 1) {
          g.fillStyle = "rgba(224,32,32,.10)";
          g.fillRect(264, s.mode === "cpu" ? 125 : 115, 140, 16);
        }
        g.fillStyle = s.row === 1 ? blink() ? "#fff" : "#e02020" : "#c8a040";
        g.fillText("\u0410\u0420\u0415\u041D\u0410: " + (s.ar < 0 ? "\u0410\u0420\u0415\u041D\u0410 \u0411\u041E\u0419\u0426\u0410" : AR[s.ar].n), 334, s.mode === "cpu" ? 138 : 128);
        g.font = '7px "Russo One"';
        g.fillStyle = "#807850";
        g.fillText(isTouchUI() ? "D-PAD \u2014 \u0421\u0422\u0420\u041E\u041A\u0410/\u0417\u041D\u0410\u0427\u0415\u041D\u0418\u0415" : "W/S \u2014 \u0421\u0422\u0420\u041E\u041A\u0410 \xB7 A/D \u2014 \u0418\u0417\u041C\u0415\u041D\u0418\u0422\u042C", 333, 156);
        g.fillText(isTouchUI() ? "P \u2014 \u0421\u0422\u0410\u0420\u0422" : "J \u2014 \u0421\u0422\u0410\u0420\u0422", 333, 166);
      }
      uiHint(isTouchUI() ? "P \u2014 \u041F\u041E\u0414\u0422\u0412\u0415\u0420\u0414\u0418\u0422\u042C \xB7 B \u2014 \u041D\u0410\u0417\u0410\u0414" : "J \u2014 \u041F\u041E\u0414\u0422\u0412\u0415\u0420\u0414\u0418\u0422\u042C \xB7 ESC \u2014 \u041D\u0410\u0417\u0410\u0414", 228);
    }
    function drawVS() {
      bgFill();
      g.fillStyle = "#2a0c0c";
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(RW * 0.62, 0);
      g.lineTo(RW * 0.38, RH);
      g.lineTo(0, RH);
      g.fill();
      g.fillStyle = "#0c1626";
      g.beginPath();
      g.moveTo(RW * 0.62, 0);
      g.lineTo(RW, 0);
      g.lineTo(RW, RH);
      g.lineTo(RW * 0.38, RH);
      g.fill();
      if (S.battle.mode === "arcade") {
        const total = arcTotal(), boss = S.lStep >= S.ladder.length;
        panel(152, 10, 120, 16);
        g.font = '8px "Russo One"';
        g.textAlign = "center";
        g.fillStyle = boss ? blink() ? "#e02020" : "#e8c040" : "#e8c040";
        g.fillText(boss ? "\u0424\u0418\u041D\u0410\u041B\u042C\u041D\u042B\u0419 \u0411\u041E\u0421\u0421" : "\u0421\u0422\u0423\u041F\u0415\u041D\u042C " + (S.lStep + 1) + " \u0418\u0417 " + total, RW / 2, 21);
      }
      panel(10, 30, 150, 120);
      panel(RW - 160, 30, 150, 120);
      drawFake(S.battle.p1.def, 85, 132, 1.25, 1);
      drawFake(S.battle.p2.def, RW - 85, 132, S.battle.p2.def.boss ? 1 : 1.25, -1);
      g.fillStyle = "rgba(0,0,0,.55)";
      g.fillRect(12, 136, 146, 12);
      g.fillRect(RW - 158, 136, 146, 12);
      g.fillStyle = S.battle.p1.def.acc;
      g.fillRect(12, 136, 146, 1);
      g.fillStyle = S.battle.p2.def.acc;
      g.fillRect(RW - 158, 136, 146, 1);
      g.font = '10px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = "#e02020";
      g.fillText(S.battle.p1.def.name, 85, 145);
      g.fillStyle = UI_BLUE;
      g.fillText(S.battle.p2.def.name + (S.battle.p2.ctrl.ai ? " [CPU]" : ""), RW - 85, 145);
      if (S.battle.mode === "cpu" && S.lastSel) {
        g.font = '7px "Russo One"';
        g.fillStyle = "#c8a040";
        g.textAlign = "center";
        g.fillText("\u0421\u041B\u041E\u0416\u041D\u041E\u0421\u0422\u042C: " + ["\u041B\u0401\u0413\u041A\u0410\u042F", "\u041D\u041E\u0420\u041C\u0410\u041B\u042C\u041D\u0410\u042F", "\u0422\u042F\u0416\u0401\u041B\u0410\u042F"][S.lastSel.diff], RW / 2, 190);
      }
      g.font = '40px "Russo One"';
      g.fillStyle = "#000";
      g.fillText("VS", RW / 2 + 3, 103);
      g.fillStyle = "#e02020";
      g.fillText("VS", RW / 2, 100);
      panel(132, 158, 160, 18);
      g.font = '8px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u0410\u0420\u0415\u041D\u0410: " + AR[S.battle.arena].n, RW / 2, 170);
      if (S.vsEscT > 0) {
        uiHint(isTouchUI() ? "\u0415\u0429\u0401 \u0420\u0410\u0417 B \u2014 \u041F\u041E\u041A\u0418\u041D\u0423\u0422\u042C \u0422\u0423\u0420\u041D\u0418\u0420" : "\u0415\u0429\u0401 \u0420\u0410\u0417 ESC \u2014 \u041F\u041E\u041A\u0418\u041D\u0423\u0422\u042C \u0422\u0423\u0420\u041D\u0418\u0420", 202, 8, UI_RED);
      } else if (S.vsT > 50) {
        uiHint(isTouchUI() ? "P \u2014 \u041D\u0410\u0427\u0410\u0422\u042C \u0411\u041E\u0419" : "J \u2014 \u041D\u0410\u0427\u0410\u0422\u042C \u0411\u041E\u0419", 228, 9, UI_TEXT);
      }
    }
    function arcEnding() {
      const d = CH[S.arcP1] || CH[0];
      return { fighter: d, ending: ENDINGS[d.id] || { title: "\u0422\u0423\u0420\u041D\u0418\u0420 \u0417\u0410\u0412\u0415\u0420\u0428\u0401\u041D", lines: ["\u0410\u0440\u0435\u043D\u0430 \u043E\u043F\u0443\u0441\u0442\u0435\u043B\u0430.", "\u041F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044C \u0443\u0445\u043E\u0434\u0438\u0442 \u0432 \u0442\u0438\u0448\u0438\u043D\u0443."], col: "#e8c040" } };
    }
    function drawEnd() {
      bgFill();
      panel(102, 12, 220, 28);
      g.font = '10px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u041F\u041E\u0411\u0415\u0414\u0418\u0422\u0415\u041B\u042C \u0422\u0423\u0420\u041D\u0418\u0420\u0410", RW / 2, 30);
      const { fighter: d, ending: e } = arcEnding();
      const halo = g.createRadialGradient(RW / 2, 100, 8, RW / 2, 100, 68);
      halo.addColorStop(0, e.col);
      halo.addColorStop(0.55, e.col);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      g.save();
      g.globalAlpha = 0.12;
      g.fillStyle = halo;
      g.fillRect(RW / 2 - 72, 28, 144, 144);
      g.restore();
      drawPort(d, RW / 2, 94, 2.1);
      g.font = '16px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.fillText(d.name, RW / 2, 146);
      g.font = '9px "Russo One"';
      g.fillStyle = e.col;
      g.fillText(e.title, RW / 2, 166);
      g.font = '7px "Russo One"';
      g.fillStyle = "#c8a040";
      const lines = (e.lines || []).filter((l) => typeof l === "string" && l.trim()).slice(0, 2);
      for (let i = 0; i < lines.length; i++) g.fillText(lines[i], RW / 2, 182 + i * 12);
      g.font = '7px "Russo One"';
      g.fillStyle = "#807850";
      g.fillText("\u041A\u0410\u0419\u0417\u0415\u0420-\u041F\u0420\u0410\u0419\u041C \u041F\u041E\u0412\u0415\u0420\u0416\u0415\u041D", RW / 2, 212);
      uiHint(isTouchUI() ? "P \u2014 \u0412 \u041C\u0415\u041D\u042E" : "J \u2014 \u0412 \u041C\u0415\u041D\u042E", 228, 8);
    }
    function drawTop() {
      bgFill();
      g.font = '15px "Russo One"';
      g.fillStyle = UI_GOLD;
      g.textAlign = "center";
      g.fillText("\u0417\u0410\u041B \u0421\u041B\u0410\u0412\u042B", RW / 2, 24);
      panel(102, 40, 220, 170);
      const tp = TOP();
      if (!tp.length) {
        g.font = '8px "Russo One"';
        g.fillStyle = "#807850";
        g.fillText("\u0420\u0415\u041A\u041E\u0420\u0414\u041E\u0412 \u041F\u041E\u041A\u0410 \u041D\u0415\u0422", RW / 2, 120);
        g.fillText("\u041F\u0420\u041E\u0419\u0414\u0418 \u0410\u0420\u041A\u0410\u0414\u0423 \u2014 \u0418\u041C\u042F \u0417\u0414\u0415\u0421\u042C", RW / 2, 134);
      } else tp.forEach((e, i) => {
        const y = 66 + i * 28;
        g.textAlign = "left";
        g.font = '9px "Russo One"';
        g.fillStyle = i === 0 ? blink() ? "#e04020" : "#e8c040" : "#e8e0c0";
        g.fillText(i + 1 + ".", 128, y);
        g.fillStyle = i === 0 ? "#e8c040" : "#e8e0c0";
        g.fillText(CH[e.id].name, 152, y);
        g.textAlign = "right";
        g.fillStyle = "#c8a040";
        g.fillText(e.step + " / " + ARC_TOTAL, 300, y);
        if (e.date) {
          g.font = '7px "Russo One"';
          g.fillStyle = "#807850";
          g.fillText(e.date.slice(8, 10) + "." + e.date.slice(5, 7) + "." + e.date.slice(2, 4), 300, y + 9);
        }
      });
      uiHint(isTouchUI() ? "P / B \u2014 \u041D\u0410\u0417\u0410\u0414" : "J / ESC \u2014 \u041D\u0410\u0417\u0410\u0414", 228, 8);
    }
    function drawOver() {
      bgFill();
      g.font = '28px "Rubik Mono One","Russo One",sans-serif';
      g.textAlign = "center";
      g.fillStyle = "#000";
      g.fillText("\u0418\u0413\u0420\u0410 \u041E\u041A\u041E\u041D\u0427\u0415\u041D\u0410", RW / 2 + 2, 112);
      g.fillStyle = "#e02020";
      g.fillText("\u0418\u0413\u0420\u0410 \u041E\u041A\u041E\u041D\u0427\u0415\u041D\u0410", RW / 2, 110);
      g.font = '9px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.fillText("\u0422\u0443\u0440\u043D\u0438\u0440 \u043D\u0435 \u043F\u0440\u043E\u0449\u0430\u0435\u0442 \u0441\u043B\u0430\u0431\u043E\u0441\u0442\u0438.", RW / 2, 140);
      uiHint(isTouchUI() ? "P \u2014 \u0412 \u041C\u0415\u041D\u042E" : "J \u2014 \u0412 \u041C\u0415\u041D\u042E", 228, 8);
    }
    function drawCont() {
      bgFill();
      bigText("\u041F\u0420\u041E\u0414\u041E\u041B\u0416\u0418\u0422\u042C?", 84, "#e8c040", 1.1);
      const n = Math.max(0, Math.ceil(S.contT / 60));
      const sc = 1 + 0.15 * Math.sin(S.FRAME * 0.3);
      g.save();
      g.translate(RW / 2, 156);
      g.scale(sc, sc);
      g.font = '46px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = "#000";
      g.fillText("" + n, 3, 3);
      g.fillStyle = "#e02020";
      g.fillText("" + n, 0, 0);
      g.restore();
      uiHint(isTouchUI() ? "P \u2014 \u0414\u0410 \xB7 B \u2014 \u0412 \u041C\u0415\u041D\u042E" : "J \u2014 \u0414\u0410 \xB7 ESC \u2014 \u0412 \u041C\u0415\u041D\u042E", 228, 10, UI_TEXT);
    }
    const SK = ["....SSSSSSSS....", "..SSSSSSSSSSSS..", ".SSSSSSSSSSSSSS.", ".SSSSSSSSSSSSSS.", "SSSSSSSSSSSSSSS", "SSSSSSSSSSSSSSSS", "SSSSSSSSSSSSSSSS", "SSEESSSSSSEESSSS", "SSEESSSSSSEESSSS", "SSSSSSSSSSSSSSSS", ".SSSSSDDDSSSSSS.", "..SSDDDDDDDSS...", "...TDTDTDTDT....", "....SSSSSSSS...."];
    function drawSkull(cx, cy, px) {
      const w = SK[0].length, h = SK.length, ox = cx - w * px / 2, oy = cy - h * px / 2;
      for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) {
        const ch = SK[r][c];
        if (ch === ".") continue;
        g.fillStyle = ch === "S" ? "#d8d0c0" : ch === "D" ? "#a89c88" : "#c8c0b0";
        g.fillRect(ox + c * px, oy + r * px, px, px);
      }
      g.fillStyle = "rgba(224,32,32," + (0.45 + 0.45 * Math.sin(S.FRAME * 0.08)) + ")";
      g.fillRect(ox + 2 * px, oy + 7 * px, 2 * px, 2 * px);
      g.fillRect(ox + 10 * px, oy + 7 * px, 2 * px, 2 * px);
    }
    function drawTitle() {
      bgFill();
      const halo = g.createRadialGradient(RW / 2, 58, 6, RW / 2, 58, 68);
      halo.addColorStop(0, "rgba(200,42,28,.22)");
      halo.addColorStop(0.55, "rgba(110,16,12,.08)");
      halo.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = halo;
      g.fillRect(RW / 2 - 78, 0, 156, 132);
      g.fillStyle = "rgba(0,0,0,.38)";
      g.beginPath();
      g.ellipse(RW / 2, 112, 52, 7, 0, 0, 7);
      g.fill();
      drawSkull(RW / 2, 58 + Math.sin(S.titleT * 0.03) * 3, 4.2);
      g.font = '42px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = "#000";
      g.fillText("KARNAGE", RW / 2 + 3, 163);
      g.fillStyle = "#e02020";
      g.fillText("KARNAGE", RW / 2, 160);
      g.fillStyle = "#7a0e0e";
      g.fillRect(RW / 2 - 108, 168, 216, 3);
      g.fillStyle = "#c8a040";
      g.fillRect(RW / 2 - 108, 172, 216, 1);
      g.font = '9px "Russo One"';
      g.fillStyle = "#e8c040";
      g.fillText("\u0421 \u041C \u0415 \u0420 \u0422 \u0415 \u041B \u042C \u041D \u042B \u0419   \u0422 \u0423 \u0420 \u041D \u0418 \u0420", RW / 2, 186);
      try {
        const tp = TOP();
        if (tp.length) {
          g.font = '9px "Russo One"';
          g.fillStyle = "#c8a040";
          g.fillText("\u0420\u0415\u041A\u041E\u0420\u0414: " + CH[tp[0].id].name + " \u2014 " + tp[0].step + " / " + ARC_TOTAL, RW / 2, 200);
        }
      } catch (e) {
      }
      uiHint(isTouchUI() ? "\u041A\u041E\u0421\u041D\u0418\u0421\u042C \u042D\u041A\u0420\u0410\u041D\u0410" : "\u041D\u0410\u0416\u041C\u0418 \u041B\u042E\u0411\u0423\u042E \u041A\u041B\u0410\u0412\u0418\u0428\u0423", 228, 11, UI_TEXT);
    }
    function drawMenu() {
      bgFill();
      const pulse = 0.15 + Math.sin(S.FRAME * 0.04) * 0.05;
      const lg = g.createRadialGradient(RW / 2, 30, 4, RW / 2, 30, 104);
      lg.addColorStop(0, "rgba(224,32,32," + pulse + ")");
      lg.addColorStop(0.58, "rgba(150,18,14," + pulse * 0.35 + ")");
      lg.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = lg;
      g.fillRect(RW / 2 - 112, 0, 224, 74);
      g.font = '22px "Rubik Mono One","Russo One",sans-serif';
      g.textAlign = "center";
      g.fillStyle = "#000";
      g.fillText("KARNAGE", RW / 2 + 2, 42);
      g.fillStyle = "#e02020";
      g.fillText("KARNAGE", RW / 2, 40);
      g.fillStyle = "rgba(200,160,64,.42)";
      g.fillRect(RW / 2 - 74, 50, 148, 1);
      panel(36, 62, 196, 140);
      const items = menuItems().map((it) => it.label), gap = items.length > 7 ? 15 : items.length > 6 ? 17 : 19;
      S.menuIdx = clamp2(S.menuIdx, 0, items.length - 1);
      items.forEach((it, i) => {
        const y = 82 + i * gap, on = i === S.menuIdx;
        if (on) {
          g.fillStyle = "rgba(224,32,32,.08)";
          g.fillRect(56, y - 13, 156, 18);
          frame(56, y - 13, 156, 18, "button");
          g.fillStyle = "rgba(54,8,6,.50)";
          g.fillRect(56, y - 13, 156, 18);
        }
        g.font = on ? '12px "Russo One"' : '10px "Russo One"';
        g.fillStyle = on ? "#fff" : "#c8a040";
        g.textAlign = "center";
        g.fillText(it, 134, y);
        if (on) {
          g.fillStyle = "#e02020";
          g.beginPath();
          g.moveTo(48, y - 7);
          g.lineTo(55, y - 3);
          g.lineTo(48, y + 1);
          g.fill();
        }
      });
      panel(252, 66, 136, 116);
      const si = S.FRAME / 300 % CH.length | 0;
      drawFake(si, 320, 158, 1.15, -1);
      g.font = '8px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.textAlign = "center";
      g.fillText(CH[si].name, 320, 172);
      uiHint(isTouchUI() ? "D-PAD \u2014 \u0412\u042B\u0411\u041E\u0420 \xB7 P \u2014 \u041F\u041E\u0414\u0422\u0412\u0415\u0420\u0414\u0418\u0422\u042C" : "W/S \u2014 \u0412\u042B\u0411\u041E\u0420 \xB7 J \u2014 \u041F\u041E\u0414\u0422\u0412\u0415\u0420\u0414\u0418\u0422\u042C \xB7 M \u2014 \u0417\u0412\u0423\u041A", 228, 8);
    }
    function settingsIcon(kind, x, y, on) {
      g.save();
      g.translate(x, y);
      const c = on ? "#f0e8d0" : "#c8a040";
      g.fillStyle = c;
      g.strokeStyle = c;
      g.lineWidth = 1;
      if (kind === "sound") {
        g.fillRect(0, 3, 2, 4);
        g.beginPath();
        g.moveTo(2, 5);
        g.lineTo(5, 2);
        g.lineTo(5, 8);
        g.closePath();
        g.fill();
        g.beginPath();
        g.arc(6, 5, 2, -0.8, 0.8);
        g.stroke();
      } else if (kind === "voice") {
        g.fillRect(2, 0, 4, 5);
        g.fillRect(3, 5, 2, 2);
        g.fillRect(1, 7, 6, 1);
      } else if (kind === "volume") {
        for (let i = 0; i < 4; i++) g.fillRect(i * 2, 7 - i * 2, 1, 2 + i * 2);
      } else if (kind === "crt") {
        g.strokeRect(0, 1, 8, 6);
        g.fillRect(1, 2, 6, 1);
        g.fillRect(1, 4, 6, 1);
        g.fillRect(1, 6, 6, 1);
      } else if (kind === "blood") {
        g.beginPath();
        g.moveTo(4, 0);
        g.lineTo(7, 5);
        g.quadraticCurveTo(4, 9, 1, 5);
        g.closePath();
        g.fill();
      } else if (kind === "shake") {
        g.fillRect(0, 3, 8, 1);
        g.fillRect(0, 5, 8, 1);
        g.fillRect(0, 3, 2, 3);
        g.fillRect(6, 3, 2, 3);
      } else if (kind === "motion") {
        g.beginPath();
        g.ellipse(4, 4, 4, 2, 0, 0, 7);
        g.stroke();
        g.fillRect(3, 3, 2, 2);
      } else {
        g.fillRect(1, 3, 5, 1);
        g.beginPath();
        g.moveTo(6, 1);
        g.lineTo(8, 4);
        g.lineTo(6, 7);
        g.fill();
      }
      g.restore();
    }
    function drawSettings() {
      bgFill();
      g.font = '16px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = UI_GOLD;
      g.fillText("\u041D\u0410\u0421\u0422\u0420\u041E\u0419\u041A\u0418", RW / 2, 24);
      panel(30, 50, RW - 60, 158);
      g.fillStyle = "rgba(200,160,64,.16)";
      g.fillRect(52, 110, RW - 104, 1);
      g.fillRect(52, 174, RW - 104, 1);
      const items = settingsItems(), kinds = ["sound", "voice", "volume", "crt", "blood", "shake", "motion", "back"];
      const y0 = 70, step2 = 16;
      items.forEach((it, i) => {
        const y = y0 + i * step2, on = i === S.settingsIdx;
        if (on) {
          g.fillStyle = "rgba(224,32,32,.08)";
          g.fillRect(64, y - 12, RW - 128, 15);
          frame(64, y - 12, RW - 128, 15, "button");
          g.fillStyle = "rgba(54,8,6,.50)";
          g.fillRect(64, y - 12, RW - 128, 15);
        }
        settingsIcon(kinds[i], 69, y - 8, on);
        g.font = on ? '9px "Russo One"' : '8px "Russo One"';
        g.fillStyle = on ? "#fff" : "#c8a040";
        g.textAlign = "center";
        g.fillText((on ? "> " : "") + it, RW / 2, y);
      });
      uiHint(isTouchUI() ? "D-PAD \u2014 \u0412\u042B\u0411\u041E\u0420/\u0418\u0417\u041C\u0415\u041D\u0418\u0422\u042C \xB7 P \u2014 \u041F\u0415\u0420\u0415\u041A\u041B\u042E\u0427\u0418\u0422\u042C \xB7 B \u2014 \u041D\u0410\u0417\u0410\u0414" : "W/S \u2014 \u0412\u042B\u0411\u041E\u0420 \xB7 A/D \u2014 \u0418\u0417\u041C\u0415\u041D\u0418\u0422\u042C \xB7 J \u2014 \u041F\u0415\u0420\u0415\u041A\u041B\u042E\u0427\u0418\u0422\u042C \xB7 ESC \u2014 \u041D\u0410\u0417\u0410\u0414", 228);
    }
    function drawPause() {
      g.fillStyle = "rgba(0,0,0,.72)";
      g.fillRect(0, 0, RW, RH);
      panel(10, 44, RW - 20, 170);
      g.font = '13px "Russo One"';
      g.fillStyle = UI_GOLD;
      g.textAlign = "center";
      g.fillText("\u041F\u0410\u0423\u0417\u0410", RW / 2, 60);
      g.fillStyle = "rgba(200,160,64,.38)";
      g.fillRect(24, 68, RW - 48, 1);
      g.fillStyle = "rgba(0,0,0,.28)";
      g.fillRect(20, 74, 120, 126);
      g.fillRect(146, 74, 126, 126);
      g.fillRect(278, 74, 126, 126);
      g.fillStyle = "rgba(200,160,64,.24)";
      g.fillRect(20, 74, 120, 1);
      g.fillRect(146, 74, 126, 1);
      g.fillRect(278, 74, 126, 1);
      pauseItems().forEach((it, i) => {
        const y = 92 + i * 17, on = i === S.pauseIdx;
        if (on) {
          g.fillStyle = "rgba(224,32,32,.10)";
          g.fillRect(24, y - 11, 112, 15);
        }
        g.font = on ? '8px "Russo One"' : '7px "Russo One"';
        g.fillStyle = on ? "#fff" : "#c8a040";
        g.textAlign = "center";
        g.fillText(it, 80, y);
      });
      const ab = (f, x) => {
        const d = f.def, p2 = f === S.battle.p2;
        g.font = '8px "Russo One"';
        g.fillStyle = d.acc;
        g.textAlign = "center";
        g.fillText(d.name, x, 88);
        g.fillStyle = "rgba(200,160,64,.22)";
        g.fillRect(x - 56, 92, 112, 1);
        g.font = '7px "Russo One"';
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0421\u041F\u0415\u0426: " + d.specN, x, 104);
        g.fillStyle = "#c8a040";
        g.fillText("[" + seqTxt(d.spec, p2, f.face) + "]", x, 113);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0421\u041F\u0415\u04262: " + d.spec2N, x, 122);
        g.fillStyle = "#c8a040";
        g.fillText("[" + seqTxt(d.spec2, p2, f.face) + "]", x, 131);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0421\u0423\u041F\u0415\u0420: " + d.sup, x, 141);
        g.fillStyle = "#c8a040";
        g.fillText("[" + seqTxt("DDP", p2, f.face) + "] \u043F\u0440\u0438 \u044F\u0440\u043E\u0441\u0442\u0438 100", x, 150);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418: [" + seqTxt(d.fat, p2, f.face) + "]", x, 161);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0411\u0420\u041E\u0421\u041E\u041A: " + (d.throwN || "\u0417\u0410\u0425\u0412\u0410\u0422"), x, 172, 118);
        g.fillStyle = "#c8a040";
        g.fillText("\u041D\u0418\u0417\u041A\u0418\u0419: " + (p2 ? "[S+I+O]" : "[S+J+K]"), x, 183);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0426\u0415\u041F\u042C: " + d.target.seq.split("").join("+"), x, 194);
      };
      ab(S.battle.p1, 209);
      ab(S.battle.p2, 341);
      uiHint(isTouchUI() ? "P \u2014 \u0412\u042B\u0411\u041E\u0420/\u0413\u0420\u041E\u041C\u041A\u041E\u0421\u0422\u042C \xB7 B \u2014 \u0417\u0410\u041A\u0420\u042B\u0422\u042C" : "J \u2014 \u0412\u042B\u0411\u041E\u0420 \xB7 A/D \u2014 \u0413\u0420\u041E\u041C\u041A\u041E\u0421\u0422\u042C \xB7 ESC \u2014 \u0417\u0410\u041A\u0420\u042B\u0422\u042C", 228);
    }
    function loop(ts) {
      requestAnimationFrame(loop);
      S.acc += Math.min(50, ts - S.last);
      S.last = ts;
      while (S.acc >= 1e3 / 60) {
        S.acc -= 1e3 / 60;
        step();
      }
      render();
    }
    function step() {
      S.FRAME++;
      music();
      if (S.GAME === "fight") {
        const b = S.battle;
        if (b.phase !== "fight" || !S.paused) ambient();
        if (!S.paused) {
          if (b.phase === "intro" || b.phase === "fight") battleUpd();
          else if (b.phase === "ko") {
            b.phaseT++;
            updFs(1);
            if (b.phaseT > 140) {
              if (b.round >= 3) {
                const w = b.p1.wins > b.p2.wins ? b.p1 : b.p2.wins > b.p1.wins ? b.p2 : b.p1.hp >= b.p2.hp ? b.p1 : b.p2;
                if (w.wins < 1) w.wins = 1;
                roundWon(w);
              } else {
                b.round++;
                startRound();
              }
            }
          } else if (b.phase === "finish") finishUpd();
          else if (b.phase === "fatal") battleUpd();
          else if (b.phase === "over") battleUpd();
          if (S.battle) {
            updProjs();
            updParts();
            updFx();
            S.shake = Math.max(0, S.shake - 0.5);
            S.flashS = Math.max(0, S.flashS - 1);
            const mid = (S.battle.p1.x + S.battle.p2.x) / 2;
            S.cam = clamp2(lerp(S.cam, mid - RW / 2, 0.12), 0, AW - RW);
            S.cam = Math.round(S.cam);
          }
        } else {
          updParts();
          updFx();
        }
        if (S.battle) {
          S.battle.p1.ctrl.poll(S.FRAME);
          S.battle.p2.ctrl.poll(S.FRAME);
        }
      } else {
        updParts();
        if (["title", "menu", "continue", "gameover", "top"].includes(S.GAME) && S.FRAME % 3 === 0)
          S.parts.push({ x: rnd(0, RW), y: RH + 4, vx: rnd(-0.2, 0.2), vy: -rnd(0.6, 1.4), c: pick(["#f06020", "#c84018", "#f0a030"]), l: rnd(60, 140), s: rnd(1, 2), gv: -5e-3 });
      }
      if (S.GAME === "continue") {
        S.contT--;
        if (S.contT <= 0) {
          clearArcRun();
          toLobby("gameover");
        }
      }
      if (S.GAME === "fight") {
        if (S.announce) S.announce.t++;
        if (S.wipe > 0) S.wipe--;
      }
      if (S.GAME === "title") S.titleT++;
      if (S.GAME === "vs" || S.GAME === "select") S.vsT++;
      if (S.vsEscT > 0) S.vsEscT--;
    }
    function render() {
      g.setTransform(2, 0, 0, 2, 0, 0);
      g.fillStyle = "#000";
      g.fillRect(0, 0, RW, RH);
      if (S.GAME === "title") {
        drawTitle();
        drawParts(0);
        return;
      }
      if (S.GAME === "menu") {
        drawMenu();
        drawParts(0);
        return;
      }
      if (S.GAME === "settings") {
        drawSettings();
        return;
      }
      if (S.GAME === "controls") {
        drawControls();
        return;
      }
      if (S.GAME === "select") {
        drawSelect();
        return;
      }
      if (S.GAME === "vs") {
        drawVS();
        return;
      }
      if (S.GAME === "ending") {
        drawEnd();
        drawParts(0);
        return;
      }
      if (S.GAME === "gameover") {
        drawOver();
        drawParts(0);
        return;
      }
      if (S.GAME === "top") {
        drawTop();
        drawParts(0);
        return;
      }
      if (S.GAME === "continue") {
        drawCont();
        drawParts(0);
        return;
      }
      if (S.GAME === "rematch") {
        drawRematch();
        drawParts(0);
        return;
      }
      const b = S.battle;
      g.save();
      if (S.shake > 0 && OPT.shake && !OPT.reduce) g.translate(rnd(-S.shake, S.shake) | 0, rnd(-S.shake, S.shake) | 0);
      drawArena(b.arena, S.cam, S.FRAME);
      arenaView.foreground(b.arena, S.cam, S.FRAME);
      if (!arenaView.hasForeground(b.arena)) {
        g.fillStyle = "rgba(0,0,0,.4)";
        for (let i = 0; i < 12; i++) {
          const x = Math.round(((i * 67 - S.cam * 1.25) % (RW + 67) + RW + 67) % (RW + 67) - 33), h2 = 6 + i * 13 % 14;
          g.beginPath();
          g.moveTo(x - 9, RH);
          g.lineTo(x, RH - h2);
          g.lineTo(x + 9, RH);
          g.fill();
        }
      }
      for (const ff of [b.p1, b.p2]) if (ff.marks) for (const m of ff.marks) {
        const mx2 = m.x - S.cam;
        if (mx2 > -20 && mx2 < RW + 20) {
          g.save();
          g.translate(mx2, m.y);
          g.rotate(S.FRAME * 0.05);
          g.strokeStyle = "#b89aff";
          g.lineWidth = 1.5;
          for (let i2 = 0; i2 < 4; i2++) {
            g.rotate(Math.PI / 2);
            g.beginPath();
            g.moveTo(0, -3);
            g.lineTo(0, -9);
            g.stroke();
          }
          g.fillStyle = "#e8e8ff";
          g.fillRect(-1.5, -1.5, 3, 3);
          g.restore();
        }
      }
      drawDecals(S.cam);
      for (const f of b.p2.state === "grabbed" ? [b.p1, b.p2] : [b.p2, b.p1]) {
        drawFighterGlow(f, S.cam);
        drawF(f, S.cam);
      }
      if (b.p1.state === "super" && b.p1.def.id === 5 && b.p1.st > 14 && b.p1.st < 90) {
        g.globalAlpha = 0.5;
        drawFakeShift(b.p1, S.cam, -30);
        drawFakeShift(b.p1, S.cam, 30);
        g.globalAlpha = 1;
      }
      if (b.p2.state === "super" && b.p2.def.id === 5 && b.p2.st > 14 && b.p2.st < 90) {
        g.globalAlpha = 0.5;
        drawFakeShift(b.p2, S.cam, -30);
        drawFakeShift(b.p2, S.cam, 30);
        g.globalAlpha = 1;
      }
      drawProjs(S.cam);
      drawFx(S.cam);
      drawParts(S.cam);
      arenaView.post();
      if (b.p1.state === "super" || b.p2.state === "super" || b.phase === "fatal") {
        g.fillStyle = "rgba(10,0,0,.22)";
        g.fillRect(0, 0, RW, RH);
      }
      if (b.loser && b.loser.laserT && b.phase === "fatal" && b.phaseT > 60 && b.phaseT < 160) {
        g.fillStyle = "rgba(248,248,96,.8)";
        g.fillRect(b.loser.x - S.cam - 6, 0, 12, FL + GR);
      }
      g.restore();
      if (b.phase === "fight" && (b.p1.hp <= 25 || b.p2.hp <= 25)) {
        const da = 0.045 + 0.025 * Math.sin(S.FRAME * 0.12), dv = g.createRadialGradient(RW / 2, RH / 2, 70, RW / 2, RH / 2, 250);
        dv.addColorStop(0, "rgba(0,0,0,0)");
        dv.addColorStop(0.72, "rgba(0,0,0,0)");
        dv.addColorStop(1, "rgba(150,10,8," + da + ")");
        g.fillStyle = dv;
        g.fillRect(0, 0, RW, RH);
      }
      if (S.flashS > 0 && !OPT.reduce) {
        g.fillStyle = "rgba(255,255,255," + S.flashS / 10 + ")";
        g.fillRect(0, 0, RW, RH);
      }
      drawHUD(b);
      if (S.wipe > 0 && !OPT.reduce) {
        const wh = RH * (S.wipe / 24);
        g.fillStyle = "#000";
        g.fillRect(0, 0, RW, wh / 2);
        g.fillRect(0, RH - wh / 2, RW, wh / 2);
      }
      for (const f of [b.p1, b.p2]) if (f.combo >= 2 && f.comboT < 50) {
        const sc2 = 1 + 0.25 * Math.max(0, 1 - f.comboT / 8);
        g.save();
        g.translate(f === b.p1 ? 70 : RW - 70, 80);
        g.scale(sc2, sc2);
        g.font = '12px "Russo One"';
        g.textAlign = "center";
        g.fillStyle = f.combo >= 5 ? "#e02020" : f.combo >= 3 ? "#f08020" : "#e8c040";
        g.fillText("\u041A\u041E\u041C\u0411\u041E x" + f.combo, 0, 0);
        g.restore();
      }
      if (b.phase === "finish") drawFatalPanel(b);
      if ((b.phase === "fatal" || b.phase === "over") && b.phaseT > 30) {
        g.font = '8px "Russo One"';
        g.fillStyle = "#e8e0c0";
        g.textAlign = "center";
        g.fillText(isTouchUI() ? "P \u2014 \u041F\u0420\u041E\u041F\u0423\u0421\u0422\u0418\u0422\u042C" : "J \u2014 \u041F\u0420\u041E\u041F\u0423\u0421\u0422\u0418\u0422\u042C", RW / 2, 232);
      }
      if (b.mode === "training") {
        const ik = { L: "\u2190", R: "\u2192", U: "\u2191", D: "\u2193", P: "P", K: "K" }, recent = b.p1.ctrl.buf.slice(-8).map((e) => ik[e.k] || e.k).join(" ");
        g.font = '6px "Russo One"';
        g.textAlign = "left";
        g.fillStyle = UI_TEXT;
        g.fillText("\u0412\u0412\u041E\u0414: " + (recent || "\u2014"), 8, 230);
        g.textAlign = "right";
        g.fillStyle = b.trainBlock ? "#f08020" : UI_MUTED;
        g.fillText("\u041C\u0410\u041D\u0415\u041A\u0415\u041D: " + (b.trainBlock ? "\u0411\u041B\u041E\u041A" : "\u0421\u0422\u041E\u0418\u0422"), RW - 8, 230);
        g.textAlign = "center";
        g.fillStyle = UI_MUTED;
        g.fillText("T \u2014 \u0411\u041B\u041E\u041A \xB7 R \u2014 \u0421\u0411\u0420\u041E\u0421 \xB7 ESC \u2014 \u041F\u0420\u0418\u0401\u041C\u042B", RW / 2, 238);
      }
      if (S.announce && S.announce.t < 110) {
        const t = S.announce.t;
        const sc = t < 10 ? 3 - t * 0.2 : 1;
        let a = 1;
        if (t > 90) a = 1 - (t - 90) / 20;
        g.save();
        g.globalAlpha = clamp2(a, 0, 1);
        let col = S.announce.col;
        if (S.announce.pulse) col = blink() ? "#e02020" : "#e8c040";
        bigText(S.announce.txt, 118, col, sc);
        g.restore();
      }
      if (S.paused) drawPause();
    }
    function drawFakeShift(f, cam, off) {
      const sx = f.x;
      f.x = sx + off;
      drawF(f, cam);
      f.x = sx;
    }
    requestAnimationFrame(loop);
    if (new URLSearchParams(location.search).has("debug")) {
      window.KARNAGE = {
        get GAME() {
          return S.GAME;
        },
        get FRAME() {
          return S.FRAME;
        },
        get paused() {
          return S.paused;
        },
        get battle() {
          return S.battle;
        },
        get projs() {
          return S.projs;
        },
        get parts() {
          return S.parts;
        },
        get fx() {
          return S.fx;
        },
        get wipe() {
          return S.wipe;
        },
        get announce() {
          return S.announce;
        },
        get MU() {
          return MU;
        },
        get AU() {
          return AU;
        },
        get keys() {
          return keys;
        },
        get TOUCH() {
          return TOUCH;
        },
        get fxAssets() {
          return FX;
        },
        get arenaAssets() {
          return ARENA_IMG;
        },
        get uiAssets() {
          return UI;
        },
        get OPT() {
          return OPT;
        },
        get settingsIdx() {
          return S.settingsIdx;
        },
        get ladder() {
          return S.ladder;
        },
        get lStep() {
          return S.lStep;
        },
        get arcP1() {
          return S.arcP1;
        },
        get arcTotal() {
          return arcTotal();
        },
        arcEnding,
        BOSS,
        TOP,
        addTop,
        loadArcRun,
        saveArcRun,
        clearArcRun,
        resumeSavedArcade,
        startLadder,
        arcFight,
        autoHit,
        onKey,
        smoke,
        spriteFx,
        impactFx,
        toLobby,
        applyCrt,
        SFX,
        step,
        render,
        newBattle,
        startRound,
        startFatal,
        updFs,
        resolveHit,
        drawF,
        drawArena,
        F,
        Ctrl,
        KM1: KM12,
        KM2: KM22,
        CH,
        AR,
        ATK,
        setSeed(seed) {
          Math.random = mul(seed | 0);
        },
        setDebug(values) {
          if ("GAME" in values) S.GAME = values.GAME;
          if ("paused" in values) S.paused = values.paused;
          if ("lastSel" in values) S.lastSel = values.lastSel;
          if ("contT" in values) S.contT = values.contT;
          if ("arcP1" in values) S.arcP1 = values.arcP1;
          if ("ladder" in values) S.ladder = values.ladder;
          if ("lStep" in values) S.lStep = values.lStep;
          if ("sel" in values) S.sel = values.sel;
        },
        snapshot() {
          const f = (x) => x && {
            id: x.def.id,
            state: x.state,
            hp: x.hp,
            hpLag: x.hpLag,
            rage: x.rage,
            x: x.x,
            y: x.y,
            face: x.face,
            wins: x.wins,
            combo: x.combo || 0,
            netT: x.netT,
            frozen: x.frozen,
            poison: x.poison,
            invis: x.invis,
            hidden: !!x.hidden,
            pale: !!x.pale,
            spec2go: x.spec2go || 0
          };
          return {
            GAME: S.GAME,
            FRAME: S.FRAME,
            paused: S.paused,
            phase: S.battle && S.battle.phase,
            round: S.battle && S.battle.round,
            timer: S.battle && S.battle.timer,
            winner: S.battle && S.battle.winner && S.battle.winner.def.id,
            loser: S.battle && S.battle.loser && S.battle.loser.def.id,
            p1: S.battle && f(S.battle.p1),
            p2: S.battle && f(S.battle.p2),
            projs: S.projs.length,
            parts: S.parts.length,
            fx: S.fx.length
          };
        }
      };
    }
  }

  // src/main.js
  Promise.all([
    loadFxAssets().catch(() => ({})),
    loadArenaAssets().catch(() => ({})),
    loadUiAssets().catch(() => ({}))
  ]).then(([fxAssets, arenaAssets, uiAssets]) => startKarnage(fxAssets, arenaAssets, uiAssets)).catch(() => startKarnage({}, {}, {}));
})();
