// Arena atlas manifest. Source: tools/arenas_import.py.
export default {
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
