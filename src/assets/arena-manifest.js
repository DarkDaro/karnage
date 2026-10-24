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
  "4": {
    "image": "4/bg.png",
    "props": "4/props.png"
  },
  "9": {
    "image": "9/bg.png",
    "props": "9/props.png"
  }
};
