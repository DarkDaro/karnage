(() => {
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
  CH.push({ id: 10, name: "\u041A\u0410\u0420\u041C\u0418\u041D", en: "CARMINE", skin: "#e8d8d0", suit: "#6a1020", acc: "#d82040", hair: "#d8d0e0", gear: "corona", dress: 1, longhair: 1, fan: 1, h: 58, bulk: 0.9, spd: 2.2, jmp: 8.6, dmg: 0.95, specN: "\u041A\u0440\u043E\u0432\u0430\u0432\u044B\u0435 \u0438\u0433\u043B\u044B", spec: "RDP", sup: "\u0410\u043B\u044B\u0439 \u043F\u0438\u043E\u043D", fat: "RLDP", arena: 9 });
  CH.push({ id: 11, name: "\u0410\u042F\u041C\u042D", en: "AYAME", skin: "#e0c8b8", suit: "#1a1f33", acc: "#7ac8d8", hair: "#0a0d1a", gear: "tail", blade: 1, h: 57, bulk: 0.85, spd: 2.7, jmp: 9.2, dmg: 1, specN: "\u041F\u043E\u043B\u0443\u043C\u0435\u0441\u044F\u0446", spec: "DRP", sup: "\u0421\u0442\u043E \u0442\u0435\u043D\u0435\u0439", fat: "LDRP", arena: 4 });
  CH.push({ id: 12, name: "\u0412\u0415\u0413\u0410", en: "VEGA", skin: "#c8a888", suit: "#241540", acc: "#b89aff", hair: "#e8e8ff", gear: "halo", bow: 1, h: 60, bulk: 0.95, spd: 2.3, jmp: 8.8, dmg: 1.05, specN: "\u0417\u0432\u0451\u0437\u0434\u043D\u0430\u044F \u043C\u0435\u0442\u043A\u0430", spec: "UDK", sup: "\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439 \u043B\u043E\u0432\u0435\u0446", fat: "UDRP", arena: 1 });
  CH[10].spec2 = "RRK";
  CH[10].spec2N = "\u041A\u0440\u043E\u0432\u0430\u0432\u044B\u0435 \u0448\u0438\u043F\u044B";
  CH[11].spec2 = "RRP";
  CH[11].spec2N = "\u0421\u043A\u0432\u043E\u0437\u044C \u0442\u0435\u043D\u044C";
  CH[12].spec2 = "RUK";
  CH[12].spec2N = "\u041F\u0440\u044B\u0436\u043E\u043A \u0441\u043A\u0432\u043E\u0437\u044C \u0437\u0432\u0451\u0437\u0434\u044B";

  // src/data/arenas.js
  var AR = [
    { n: "\u0414\u041E\u041A", sky: ["#0a0e18", "#0e1626", "#16243a", "#1e3448"], far: "#0c141e", mid: "bldg", mc: "#141d2a", gr: "#2a2620", gr2: "#38332a", moon: "#c8d0d8" },
    { n: "\u0425\u0420\u0410\u041C \u041F\u0420\u0418\u0417\u0420\u0410\u041A\u041E\u0412", sky: ["#0c0a14", "#141024", "#1c1834", "#282048"], far: "#120e1e", mid: "col", mc: "#1c1630", gr: "#2e2a38", gr2: "#3a3448", moon: "#a8b8c8" },
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

  // src/game/karnage.js
  function startKarnage() {
    "use strict";
    const RW = 424, RH = 240, FL = 206, AW = 760, GR = 8, OUT = "#0e0b08";
    const cv = document.getElementById("cv"), g = cv.getContext("2d");
    function fit() {
      let s = Math.min(innerWidth / RW, innerHeight / RH);
      s = s >= 1 ? Math.floor(s) : s;
      cv.style.width = s * RW + "px";
      cv.style.height = s * RH + "px";
    }
    addEventListener("resize", fit);
    fit();
    if (document.fonts) document.fonts.load('20px "Russo One"');
    const clamp = (v, a, b) => v < a ? a : v > b ? b : v, lerp = (a, b, t) => a + (b - a) * t, rnd = (a, b) => a + Math.random() * (b - a), pick = (a) => a[Math.random() * a.length | 0], blink = () => (FRAME >> 4) % 2 === 0;
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
    function hex(h) {
      return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    }
    function mix(a, b, t) {
      const A = hex(a), B = hex(b);
      return "rgb(" + (lerp(A[0], B[0], t) | 0) + "," + (lerp(A[1], B[1], t) | 0) + "," + (lerp(A[2], B[2], t) | 0) + ")";
    }
    const shade = (h, k) => mix(h, "#000000", 1 - k);
    const AU = { ctx: null, on: true, voice: true, vol: 100 };
    try {
      if (localStorage.karnageSnd !== void 0) AU.on = localStorage.karnageSnd === "1";
      if (localStorage.karnageVox !== void 0) AU.voice = localStorage.karnageVox === "1";
      if (localStorage.karnageVol !== void 0) {
        const v = parseFloat(localStorage.karnageVol);
        if (Number.isFinite(v)) AU.vol = clamp(v, 0, 100);
      }
    } catch (e) {
    }
    const setVol = () => {
      if (AU.master) AU.master.gain.value = 0.9 * AU.vol / 100;
    };
    const saveSet = () => {
      try {
        localStorage.karnageSnd = AU.on ? 1 : 0;
        localStorage.karnageVox = AU.voice ? 1 : 0;
        localStorage.karnageVol = AU.vol;
      } catch (e) {
      }
    };
    const TOP = () => {
      try {
        const raw = JSON.parse(localStorage.karnageTop || "[]");
        if (!Array.isArray(raw)) return [];
        return raw.filter((e) => e && Number.isInteger(e.id) && e.id >= 0 && e.id < CH.length && Number.isFinite(e.step) && e.step >= 0).slice(0, 5);
      } catch (e) {
        return [];
      }
    };
    const addTop = (id, step2) => {
      try {
        const tp = TOP();
        tp.push({ id, step: step2 });
        tp.sort((a, b) => b.step - a.step);
        localStorage.karnageTop = JSON.stringify(tp.slice(0, 5));
      } catch (e) {
      }
    };
    function initA() {
      if (AU.ctx) return;
      try {
        AU.ctx = new (window.AudioContext || window.webkitAudioContext)();
        AU.master = AU.ctx.createGain();
        AU.master.gain.value = 0.9 * AU.vol / 100;
        AU.master.connect(AU.ctx.destination);
        AU.mg = AU.ctx.createGain();
        AU.mg.gain.value = 0.3;
        AU.mg.connect(AU.master);
        MU.next = AU.ctx.currentTime + 0.1;
      } catch (e) {
      }
    }
    addEventListener("pointerdown", () => {
      initA();
      if (AU.ctx && AU.ctx.state === "suspended") AU.ctx.resume();
      if (GAME === "title") {
        toLobby("menu");
        SFX.sel();
      }
    });
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
    const MU = { s: 0, next: 0 };
    const BASS = [0, 0, 3, 0, -2, -2, 3, 5, 0, 0, 3, 0, -4, -4, -2, 2];
    const MBASS = [0, 0, -2, 0, 3, 3, 5, 3, 0, 0, -2, 0, -4, -4, 0, 3];
    const VBASS = [0, 0, 3, 5, 0, 0, 3, 2, 0, 0, 3, 5, 7, 5, 3, 2];
    const EBASS = [0, 4, 7, 12, 9, 7, 4, 0];
    function music() {
      if (!AU.ctx || !AU.on) return;
      const c = AU.ctx;
      if (MU.next < c.currentTime - 0.25) {
        MU.next = c.currentTime + 0.05;
        MU.s = 0;
      }
      const md = GAME === "fight" && battle ? paused ? "pause" : "fight" : GAME === "vs" ? "vs" : GAME === "ending" || GAME === "continue" ? "end" : "menu";
      const tr = md === "fight" ? battle.arena : 0;
      const dt = md === "pause" ? 0.28 : md === "vs" ? 0.11 : md === "fight" && battle.aiLvl >= 7 ? 0.115 : md === "end" ? 0.22 : md === "menu" ? 0.16 : 0.13;
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
    const keys = {};
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
    });
    const KM1 = { l: "KeyA", r: "KeyD", u: "KeyW", d: "KeyS", P: "KeyJ", K: "KeyK", B: "KeyL" };
    const KM2 = { l: "ArrowLeft", r: "ArrowRight", u: "ArrowUp", d: "ArrowDown", P: "KeyI", K: "KeyO", B: "KeyP" };
    class Ctrl {
      constructor(m) {
        this.m = m;
        this.ax = {};
        this.ai = false;
        this.buf = [];
        this._ = {};
      }
      poll(FR) {
        const q = (k) => this.ai ? !!this.ax[k] : !!keys[this.m[k]];
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
      clear() {
        this.buf.length = 0;
      }
    }
    ;
    ;
    function drawArena(ai, cam2, t) {
      const A = AR[ai];
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
        const x0 = Math.round(((s.x - cam2 * 0.25) % 1060 + 1060) % 1060 - 40);
        for (const x of [x0, x0 - 1060]) if (x < RW && x + s.w > 0) g.fillRect(x, 140 - s.h, s.w, s.h + 20);
      }
      g.fillStyle = A.mc;
      for (const sp of A.ms) {
        const bx0 = Math.round(((sp.x - cam2 * 0.55) % 1220 + 1220) % 1220 - 70);
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
        const x = Math.round(chx - cam2 * 0.7);
        if (x < -10 || x > RW + 10) continue;
        const sw = Math.sin(t * 0.05 + chx) * 3, cl = 40 + chx % 50;
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x + sw, cl);
        g.stroke();
        g.fillStyle = "rgba(190,190,200,.3)";
        g.fillRect(x + sw - 2, cl, 5, 4);
      }
      const px1 = Math.round(60 - cam2 * 0.85), px2 = Math.round(AW - 60 - cam2 * 0.85);
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
      const vx = RW / 2 - (cam2 - RW / 2) * 0.35;
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
        const x0 = Math.round(((i * 47 - cam2) % (RW + 47) + RW + 47) % (RW + 47) - 23);
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
        const x = Math.round(((rb.x - cam2) % (RW + 40) + RW + 40) % (RW + 40) - 20);
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
      const A = AR[battle.arena];
      if (A.rain && FRAME % 2 === 0) parts.push({ x: cam + rnd(-20, RW + 30), y: -6, vx: -0.6, vy: 7, c: "rgba(170,190,215,.28)", l: 60, s: 1, gv: 0, line: 1, kf: 1 });
      if (A.snow && FRAME % 2 === 0) parts.push({ x: cam + rnd(-10, RW + 10), y: -4, vx: rnd(-0.3, 0.3), vy: rnd(0.3, 0.6), c: "rgba(230,240,255,.7)", l: 420, s: 1, gv: 0 });
      if (A.sand && FRAME % 8 === 0) parts.push({ x: cam + RW + 10, y: rnd(60, FL), vx: rnd(-2.6, -1.6), vy: 0, c: "rgba(220,180,110,.2)", l: 120, s: 1, gv: 0, line: 1, kf: 1 });
      if (A.ember && FRAME % 3 === 0) parts.push({ x: cam + rnd(0, RW), y: FL + rnd(-4, 10), vx: rnd(-0.3, 0.3), vy: -rnd(0.4, 1), c: pick(["#f06020", "#c84018", "#f0a030"]), l: rnd(60, 120), s: rnd(1, 2), gv: -0.01 });
      if (A.rain && Math.random() < 4e-3) {
        flashS = Math.max(flashS, 3);
        SFX.thunder();
      }
    }
    let parts = [], projs = [], decals = [], fx = [];
    function P(x, y, vx, vy, c, l, s, gv) {
      parts.push({ x, y, vx, vy, c, l: l || 30, s: s || 2, gv: gv === void 0 ? 0.3 : gv });
    }
    function blood(x, y, n, pw) {
      for (let i = 0; i < n; i++) P(x, y, rnd(-2.5, 2.5) * (pw || 1), rnd(-4, 1), "#b01818", rnd(20, 50), rnd(1, 3));
    }
    function updParts() {
      for (let i = parts.length; i--; ) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gv;
        p.l--;
        if (p.kf && p.y > FL + GR) {
          parts.splice(i, 1);
          continue;
        }
        if (!p.line && p.y >= FL + GR - 1 && p.gv > 0) {
          if (p.c === "#b01818" && Math.random() < 0.5) decals.push({ x: p.x, y: FL + 2 + rnd(0, 4), s: rnd(1, 3), t: 0, l: rnd(480, 900) });
          p.y = FL + GR - 1;
          p.vy *= -0.3;
          p.vx *= 0.6;
        }
        if (p.l <= 0) parts.splice(i, 1);
      }
      for (let i = decals.length; i--; ) {
        const dd = decals[i];
        dd.t++;
        if (dd.t > dd.l) decals.splice(i, 1);
      }
      if (decals.length > 240) decals.splice(0, decals.length - 240);
      if (parts.length > 400) parts.splice(0, parts.length - 400);
    }
    function drawParts(cam2) {
      for (const p of parts) {
        g.fillStyle = p.c;
        if (p.line) g.fillRect(p.x - cam2, p.y, 1, 6);
        else g.fillRect(p.x - cam2 - p.s / 2, p.y - p.s / 2, p.s, p.s);
      }
    }
    const ATK = { punch: { d: 6, wd: 5, ac: 3, rc: 8, rng: 28, hh: 0.72 }, kick: { d: 9, wd: 7, ac: 4, rc: 11, rng: 36, hh: 0.6 }, upper: { d: 15, wd: 6, ac: 4, rc: 15, rng: 24, hh: 0.5, launch: 1 }, sweep: { d: 10, wd: 6, ac: 3, rc: 13, rng: 38, hh: 0.12, low: 1 }, jkick: { d: 10, wd: 4, ac: 8, rc: 20, rng: 34, hh: 0.4 }, rh: { d: 12, wd: 8, ac: 4, rc: 15, rng: 40, hh: 0.55, knock: 1 } };
    const ZEROC = { l: 0, r: 0, u: 0, d: 0, P: 0, K: 0, B: 0, pP: 0, pK: 0, pl: 0, pr: 0, pu: 0, pd: 0 };
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
        this.ctrl.clear();
      }
      get onGround() {
        return this.y >= FL + GR - 0.5;
      }
      get box() {
        const d = this.def, bh = this.state === "crouch" ? d.h * 0.55 : d.h;
        return { x: this.x - 9 * d.bulk, y: this.y - bh, w: 18 * d.bulk, h: bh };
      }
      startAtk(t) {
        this.state = "atk";
        this.st = 0;
        this.atk = { t, A: ATK[t], hit: 0 };
        this.invis = 0;
        this.spec2go = 0;
        SFX.swing();
      }
      // 08.09: атака пробивает невидимость
      update(FR, foe) {
        const d = this.def, c = battle && battle.phase === "intro" ? ZEROC : this.ctrl;
        this.animT++;
        this.st++;
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
        if (this.armor > 0) this.armor--;
        if (GAME === "fight" && !this.hidden) {
          if (d.id === 0 && FR % 9 === 0) P(this.x + rnd(-4, 4), this.y - d.h - 4, rnd(-0.3, 0.3), rnd(-1.2, -0.5), pick(["#f06020", "#f0a030"]), 26, 1, -0.02);
          if (d.id === 6 && FR % 12 === 0) P(this.x + rnd(-7, 7), this.y - d.h * rnd(0.3, 1), 0, rnd(0.2, 0.6), "#cfeaff", 30, 1, 0.02);
          if (d.id === 12 && FR % 13 === 0) P(this.x + rnd(-11, 11), this.y - d.h * rnd(0.1, 1.1), rnd(-0.2, 0.2), rnd(-0.7, -0.2), "#b89aff", 22, 1, -0.01);
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
          if (["idle", "walk", "jump"].includes(this.state)) {
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
          if (this.running && this.onGround && FR % 4 === 0) P(this.x - this.running * 8, FL + GR - 2, -this.running * rnd(0.2, 0.6), rnd(-1, -0.2), "#9a9080", 16, 1, 0.05);
          else if (this.state === "walk" && this.onGround && FR % Math.max(8, Math.round(3.5 / (WM[d.id] ? WM[d.id][0] : 0.22))) === 0) SFX.step();
          if (mv && this.onGround && this.state === "idle") this.state = "walk";
          if (!mv && this.state === "walk") this.state = "idle";
          if (this.onGround && c.d && ["idle", "walk"].includes(this.state)) this.state = "crouch";
          if (this.state === "crouch" && !c.d) this.state = "idle";
          if (this.onGround && c.pu && ["idle", "walk"].includes(this.state)) {
            this.vy = -d.jmp;
            this.state = "jump";
            SFX.jump();
          } else if (!this.onGround && c.pu) this.jbuf = 8;
          else if (this.jbuf > 0) this.jbuf--;
          if (this.onGround && c.B && ["idle", "walk", "crouch"].includes(this.state)) this.state = "block";
          else if (this.state === "block" && !c.B) this.state = c.d ? "crouch" : "idle";
          if (["idle", "walk", "crouch", "block"].includes(this.state) && this.onGround && (c.pP || c.pK)) {
            const btn = c.pP ? "P" : "K";
            if (this.rage >= 100 && this.ctrl.match("DDP", 60)) this.startSuper();
            else if (this.ctrl.matchRel(d.spec, this.face, 60)) this.startSpec(foe);
            else if (this.ctrl.matchRel(d.spec2, this.face, 60)) this.startSpec2(foe);
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
        this.x = clamp(this.x, 16, AW - 16);
        if ((this.state === "down" || this.state === "hit") && Math.abs(this.vx) > 3 && (this.x <= 17 || this.x >= AW - 17)) {
          this.vx *= -0.55;
          shake = Math.max(shake, 4);
          SFX.hitH();
          blood(this.x, this.y - 30, 4, 1);
        }
        const dx = this.x - foe.x;
        if (Math.abs(dx) < 16 && Math.abs(this.y - foe.y) < 40) {
          const push = (16 - Math.abs(dx)) / 2 * (dx < 0 ? -1 : 1);
          this.x += push;
          foe.x -= push;
          this.x = clamp(this.x, 16, AW - 16);
          foe.x = clamp(foe.x, 16, AW - 16);
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
            if (hb && hitR(hb, foe.box)) {
              this.atk.hit = 1;
              resolveHit(this, foe, A.d, { launch: A.launch });
            }
          }
          if (this.st === A.wd + A.ac && !this.atk.hit) SFX.whiff();
          if (this.st > A.wd + A.ac + A.rc) {
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
        const A = this.atk.A, d = this.def;
        return { x: this.x + (this.face > 0 ? 4 : -4 - A.rng * d.bulk), y: this.y - d.h * A.hh - (this.atk.t === "sweep" ? 0 : 6), w: A.rng * d.bulk + 6, h: this.atk.t === "sweep" ? 12 : this.atk.t === "upper" ? 34 : 14 };
      }
      startSpec(foe) {
        this.state = "cast";
        this.st = 0;
        this.face = foe.x < this.x ? -1 : 1;
        this.spec2go = 0;
        SFX.cast();
      }
      startSpec2(foe) {
        this.state = "cast";
        this.st = 0;
        this.face = foe.x < this.x ? -1 : 1;
        this.spec2go = 1;
        SFX.cast2();
      }
      // 08.09: второй спец — тот же каст, флаг spec2go выбирает ветку в fireSpec
      startSuper() {
        this.state = "super";
        this.st = 0;
        this.rage = 0;
        this.armor = 12;
        this.supEv = [];
        this.invis = 0;
        flashS = Math.max(flashS, 4);
        shake = Math.max(shake, 4);
        SFX.supwave();
        const me = this;
        const E = (t, fn) => this.supEv.push({ t, fn, done: 0 });
        const id = this.def.id;
        if (id === 0) {
          SFX.fire();
          for (let i = 0; i < 10; i++) E(14 + i * 7, () => {
            projs.push({ ty: "meteor", x: me.foe.x + rnd(-34, 34), y: -10, vx: 0, vy: 5.5, o: me, d: 2.6, l: 120 });
            SFX.shoot();
          });
        } else if (id === 1) {
          E(10, () => {
            me.x = clamp(me.foe.x - me.foe.face * 26, 20, AW - 20);
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
            projs.push({ ty: "bolt", x: me.foe.x + rnd(-30, 30), y: FL, vx: 0, vy: 0, o: me, d: 3.4, l: 14 });
            SFX.zap();
          });
        } else if (id === 3) {
          for (let i = 0; i < 6; i++) E(14 + i * 10, () => {
            const rx = me.foe.x + rnd(-24, 24);
            fx.push({ ty: "rock", x: rx, t: 0 });
            SFX.bone();
            shake = 6;
            if (Math.abs(me.foe.x - rx) < 26 && me.foe.onGround && me.foe.state !== "down") resolveHit(me, me.foe, 4, {});
          });
        } else if (id === 4) {
          E(10, () => {
            me.x = clamp(me.foe.x - me.foe.face * 24, 20, AW - 20);
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
            me.x = clamp(me.foe.x - me.foe.face * 30, 20, AW - 20);
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
            fx.push({ ty: "nova", x: me.x, y: me.y - 30, t: 0 });
            if (Math.abs(me.foe.x - me.x) < 95) {
              resolveHit(me, me.foe, 6, {});
              me.foe.frozen = 90;
              me.foe.state = "frozen";
              me.foe.atk = null;
              SFX.freeze();
            } else {
              projs.push({ ty: "ice", x: me.x + me.face * 16, y: me.y - me.def.h * 0.62, vx: me.face * 6.5, vy: 0, o: me, d: 6, l: 120, frz: 1 });
              SFX.ice();
            }
            for (let i = 0; i < 14; i++) P(me.x, me.y - 30, Math.cos(i / 14 * 6.28) * 3.4, Math.sin(i / 14 * 6.28) * 3.4, "#c8ecff", 30, 2, 0);
          });
        } else if (id === 7) {
          for (let i = 0; i < 8; i++) E(14 + i * 8, () => {
            SFX.shoot();
            projs.push({ ty: "bomb", x: me.x + me.face * 14, y: me.y - 56, vx: me.face * rnd(2, 4.4), vy: -4.5, o: me, d: 3, l: 130 });
          });
        } else if (id === 8) {
          SFX.sting();
          fx.push({ ty: "drain", x: me.foe.x, t: 0 });
          for (let i = 0; i < 8; i++) E(16 + i * 8, () => {
            const f = me.foe;
            if (battle.phase === "fight" && !f.defeated && f.hp > 0 && f.armor <= 0) {
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
            const fy = me.foe.y - me.foe.def.h * rnd(0.2, 0.7);
            projs.push({ ty: "shard", c: "#d82040", x: me.x + me.face * 14, y: me.y - me.def.h * 0.6 + Math.sin(i * 2.1) * 10, vx: me.face * 8, vy: (me.foe.y - me.def.h * 0.5 - (me.y - me.def.h * 0.6)) / 9, o: me, d: 2.3, l: 60, s: 4 });
            SFX.slash();
            for (let j = 0; j < 3; j++) P(me.foe.x + rnd(-12, 12), me.foe.y - rnd(10, 55), rnd(-1.5, 1.5), rnd(-2, 0), "#d82040", 26, 2, 0);
          });
          E(80, () => resolveHit(me, me.foe, 10, { launch: 1 }));
        } else if (id === 11) {
          SFX.tele();
          E(10, () => {
            me.x = clamp(me.foe.x - me.foe.face * 26, 20, AW - 20);
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
            projs.push({ ty: "shard", c: "#b89aff", x: me.x + me.face * 10, y: me.y - me.def.h - 4, vx: me.face * 3.2, vy: -2.6, o: me, d: 8, l: 130, s: 5, hom: 1 });
          });
        } else {
          for (let i = 0; i < 6; i++) E(14 + i * 8, () => {
            projs.push({ ty: "rocket", x: me.foe.x + rnd(-30, 30), y: -8, vx: 0, vy: 4.6, o: me, d: 4, l: 120 });
            SFX.shoot();
          });
        }
        this.superDur = 110;
      }
      fireSpec(foe) {
        const d = this.def;
        this.face = foe.x < this.x ? -1 : 1;
        const x = this.x + this.face * 14, y = this.y - d.h * 0.62;
        switch (d.id) {
          case 0:
            projs.push({ ty: "fire", x, y, vx: this.face * 4, vy: 0, o: this, d: 7, l: 110 });
            SFX.fire();
            break;
          // 08.09: баланс — снаряды слабее ударов в упор
          case 1:
            this.x = clamp(foe.x - foe.face * 30, 20, AW - 20);
            smoke(this.x, this.y - 30);
            SFX.tele();
            break;
          case 2:
            fx.push({ ty: "castbolt", x: this.x, y: this.y, t: 0, h: this.def.h });
            projs.push({ ty: "bolt", x: foe.x, y: FL, vx: 0, vy: 0, o: this, d: 8, l: 16 });
            SFX.zap();
            break;
          // 30.09: болт + канал из руки
          // 08.09: баланс Вольта — болт бьёт по позиции врага без промаха, 9→8
          case 3:
            projs.push({ ty: "wave", x: this.x + this.face * 18, y: FL + GR - 12, vx: this.face * 3.4, vy: 0, o: this, d: 8, l: 90 });
            SFX.boom();
            shake = 4;
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
            projs.push({ ty: "ice", x, y, vx: this.face * 3.6, vy: 0, o: this, d: 6, l: 110 });
            SFX.ice();
            break;
          // 08.09: баланс 7→6
          case 7:
            projs.push({ ty: "net", x, y, vx: this.face * 3, vy: 0, o: this, d: 4, l: 120 });
            SFX.net();
            break;
          // 08.09: баланс Ржавого — сеть даёт бесплатное комбо, урон 5→4
          case 8:
            projs.push({ ty: "shadow", x, y, vx: this.face * 3.4, vy: 0, o: this, d: 6, l: 110 });
            SFX.tele();
            break;
          // 08.09: баланс 8→6
          case 10:
            for (let i = -1; i <= 1; i++) projs.push({ ty: "shard", c: "#d82040", x, y: y + i * 6, vx: this.face * 6.2, vy: i * 0.9, o: this, d: 4, l: 90, s: 3, bl: 1 });
            SFX.slash();
            break;
          // 30.09: Кровавые иглы — быстрый веер с кровотечением
          case 11:
            projs.push({ ty: "shard", c: "#9adcee", x, y, vx: this.face * 5.5, vy: 0, o: this, d: 7, l: 75, s: 7 });
            SFX.slash();
            break;
          // 30.09: Полумесяц — серп клинка, дальность до ~410px
          case 12:
            this.marks = this.marks || [];
            if (this.marks.length >= 2) this.marks.shift();
            this.marks.push({ x: clamp(this.x + this.face * 46, 20, AW - 20), y: this.y });
            SFX.cast2();
            for (let i = 0; i < 6; i++) P(this.x + this.face * 46 + rnd(-8, 8), this.y - rnd(0, 40), 0, rnd(-0.5, -0.1), "#b89aff", 26, 2, 0);
            break;
          // 30.09: Звёздная метка — до двух на арене
          default:
            projs.push({ ty: "wave", x: this.x + this.face * 18, y: FL + GR - 12, vx: this.face * 4, vy: 0, o: this, d: 9, l: 90 });
            SFX.boom();
            shake = 5;
            break;
        }
      }
      // 08.09: то же для Кайзера; баланс 10→9
      fireSpec2(foe) {
        const d = this.def;
        this.face = foe.x < this.x ? -1 : 1;
        const x = this.x + this.face * 14, y = this.y - d.h * 0.62;
        switch (d.id) {
          case 0:
            SFX.fire();
            for (let i = -1; i <= 1; i++) projs.push({ ty: "shard", c: "#f06020", x, y, vx: this.face * 4.5, vy: i * 1.1, o: this, d: 4, l: 90, s: 4 });
            break;
          // Огненный веер
          case 1:
            this.x = clamp(foe.x - foe.face * 28, 20, AW - 20);
            this.face = foe.face;
            this.invis = 40;
            smoke(this.x, this.y - 30);
            SFX.tele();
            this.startAtk("kick");
            break;
          // Хватка тени — телепорт за спину, лицом к затылку врага
          case 2:
            fx.push({ ty: "castbolt", x: this.x, y: this.y, t: 0, h: this.def.h });
            for (const off of [-30, 0, 30]) projs.push({ ty: "bolt", x: clamp(foe.x + off, 20, AW - 20), y: FL, vx: 0, vy: 0, o: this, d: 5, l: 16 });
            SFX.zap();
            break;
          // Грозовой столб + канал из руки
          case 3:
            for (let i = 0; i < 3; i++) projs.push({ ty: "meteor", x: clamp(foe.x + rnd(-44, 44), 20, AW - 20), y: -10 - i * 30, vx: 0, vy: 5.5, o: this, d: 6, l: 120 });
            SFX.bone();
            break;
          // Камнепад
          case 4:
            for (let i = 0; i < 3; i++) projs.push({ ty: "shard", c: "#7ac83a", x, y: y + i * 8 - 8, vx: this.face * 6, vy: 0, o: this, d: 4, l: 80, s: 3 });
            SFX.slash();
            break;
          // Рой клинков
          case 5:
            projs.push({ ty: "shard", c: "#c8a060", x, y, vx: this.face * 2.6, vy: 0, o: this, d: 7, l: 110, s: 6, k: 1 });
            SFX.tele();
            break;
          // Песчаный жернов — валит с ног
          case 6:
            for (let i = 0; i < 3; i++) projs.push({ ty: "shard", c: "#c8ecff", x, y: y + i * 10 - 10, vx: this.face * 5, vy: 0, o: this, d: 3, l: 80, s: 3 });
            SFX.ice();
            break;
          // Ледяные иглы
          case 7:
            projs.push({ ty: "bomb", x, y: y - 10, vx: this.face * 3.2, vy: -5, o: this, d: 6, l: 130 });
            projs.push({ ty: "bomb", x, y: y - 10, vx: this.face * 1.8, vy: -4, o: this, d: 6, l: 130 });
            SFX.shoot();
            break;
          // Двойная граната
          case 8:
            projs.push({ ty: "shard", c: "#7a3aa8", x, y, vx: this.face * 2.8, vy: 0, o: this, d: 5, l: 110, s: 5, pois: 1 });
            SFX.sting();
            break;
          // Проклятие — отравление
          case 10:
            for (let i = 0; i < 3; i++) projs.push({ ty: "shard", c: "#d82040", x: clamp(foe.x + rnd(-32, 32), 20, AW - 20), y: FL + GR - 4, vx: 0, vy: -(4.4 + i * 0.5), o: this, d: 5, l: 60, s: 5 });
            SFX.bone();
            shake = 3;
            break;
          // 30.09: Кровавые шипы — взмывают из земли под врагом
          case 11: {
            const ox = this.x;
            this.x = clamp(foe.x + foe.face * 30, 20, AW - 20);
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
              this.x = clamp(m.x, 20, AW - 16);
              smoke(this.x, this.y - 30);
              SFX.tele();
              for (let i = 0; i < 8; i++) P(this.x + rnd(-10, 10), this.y - rnd(0, 50), rnd(-1, 1), rnd(-1.5, 0.5), "#b89aff", 24, 2, 0);
              if (Math.abs(foe.x - this.x) < 70 && foe.state !== "down" && foe.state !== "victim") {
                resolveHit(this, foe, 6, {});
                shake = Math.max(shake, 3);
                for (let i = 0; i < 10; i++) P(foe.x + rnd(-14, 14), foe.y - rnd(5, 55), rnd(-1.5, 1.5), rnd(-2, 0.5), "#b89aff", 26, 2, 0);
                SFX.cast2();
              }
            } else {
              this.x = clamp(foe.x - foe.face * 30, 20, AW - 20);
              smoke(this.x, this.y - 30);
              SFX.tele();
              if (foe.state !== "down") resolveHit(this, foe, 5, {});
            }
            break;
          }
          // без меток — прыжок за спину с ударом
          default:
            projs.push({ ty: "shard", c: "#f8d060", x, y, vx: this.face * 2.4, vy: 0, o: this, d: 10, l: 110, s: 7, k: 1 });
            SFX.shoot();
            break;
        }
      }
      // Тяжёлый снаряд — медленный, валит
      updSuper() {
        if (this.state !== "super") return;
        for (const e of this.supEv) if (!e.done && this.st >= e.t) {
          e.done = 1;
          e.fn();
        }
        if (this.st > this.superDur) this.state = "idle";
      }
    }
    function smoke(x, y) {
      for (let i = 0; i < 10; i++) P(x + rnd(-8, 8), y + rnd(-20, 10), rnd(-1, 1), rnd(-1.5, -0.2), "#889", 30, 3, -0.02);
    }
    function autoHit(a, dmg) {
      const f = a.foe;
      if (!f || f.hidden || f.dodging || f.defeated) return;
      if (!battle || battle.phase !== "fight") return;
      if (f.state === "down" || f.state === "victim") return;
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
      const d = dmg * a.def.dmg;
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
      if (f.frozen > 0) f.frozen = 0;
      a.rage = Math.min(100, a.rage + 2);
      f.rage = Math.min(100, f.rage + d * 0.9);
      a.combo = (a.comboT !== void 0 && a.comboT < 60 ? a.combo : 0) + 1;
      a.comboT = 0;
      if (bstat) {
        const k = a === battle.p1 ? "1" : "2";
        bstat["h" + k]++;
        bstat["d" + k] += d;
        bstat["c" + k] = Math.max(bstat["c" + k], a.combo || 0);
      }
      blood(f.x, f.y - f.def.h * 0.5, Math.min(10, 3 + d), 1);
      for (let i = 0; i < 4; i++) P(f.x + rnd(-10, 10), f.y - rnd(20, 50), rnd(-2, 2), rnd(-2, 0), "#fff", 10, 2, 0);
      freeze = Math.max(freeze, 3);
      if (f.hp <= 0) freeze = Math.max(freeze, 12);
      SFX.hit();
    }
    function hitR(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    function resolveHit(att, def, dmg, opts) {
      opts = opts || {};
      if (battle && ["finish", "fatal", "over", "ko"].includes(battle.phase)) return;
      if (def.defeated) return;
      if (def.armor > 0) {
        def.armor--;
        def.flash = 4;
        SFX.block();
        return;
      }
      if (def.state === "super" && def.st < 20) def.rage = Math.min(100, def.rage + 50);
      if (def.dodging) {
        for (let i = 0; i < 5; i++) P(def.x + rnd(-6, 6), def.y - rnd(8, 44), -att.face * rnd(0.6, 1.6), rnd(-1, -0.2), "#9a9080", 14, 2, 0.03);
        SFX.whiff();
        return;
      }
      if (def.state === "block") {
        def.hp = Math.max(1, def.hp - 1);
        def.damageTaken = (def.damageTaken || 0) + 1;
        SFX.block();
        att.rage = Math.min(100, att.rage + 1);
        def.rage = Math.min(100, def.rage + 1);
        def.vx = att.face * 2;
        def.hvx = 0;
        for (let i = 0; i < 4; i++) P(def.x + def.face * 8, def.y - def.def.h * 0.55, rnd(-1.5, 1.5), rnd(-2, 0), "#fff", 10, 2, 0);
        return;
      }
      let d = dmg * att.def.dmg;
      if (def.frozen > 0) {
        d *= 1.4;
        def.frozen = 0;
        for (let i = 0; i < 6; i++) P(def.x + rnd(-8, 8), def.y - rnd(10, 50), rnd(-2, 2), rnd(-3, 0), "#c8ecff", 18, 2, 0.04);
      }
      def.hp = Math.max(0, def.hp - d);
      if (def.hp <= 0) freeze = Math.max(freeze, 12);
      def.damageTaken = (def.damageTaken || 0) + d;
      def.netT = 0;
      def.spec2go = 0;
      def.atk = null;
      def.invis = 0;
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
      if (bstat) {
        const k = att === battle.p1 ? "1" : "2";
        bstat["h" + k]++;
        bstat["d" + k] += d;
        bstat["c" + k] = Math.max(bstat["c" + k], att.combo || 0);
      }
      blood(def.x, def.y - def.def.h * 0.55, Math.min(14, 3 + d), d > 10 ? 1.6 : 1);
      for (let i = 0; i < 6; i++) P(def.x - att.face * 8, def.y - def.def.h * 0.55, rnd(-2.5, 2.5), rnd(-2.5, 1), pick(["#fff", "#f8d060", "#f0a030"]), 10, rnd(1, 2), 0.05);
      freeze = def.hp <= 0 ? Math.max(freeze, 12) : Math.max(freeze, Math.min(6, 2 + d * 0.25));
      if (opts.launch) {
        def.vy = -8;
        def.vx = att.face * 3;
        def.state = "hit";
        def.st = 0;
        def.hvx = att.face * 3;
        SFX.upper();
        shake = 5;
      } else if (def.hp <= 0 && battle.phase === "fight") {
        def.state = "hit";
        def.st = 0;
        def.hvx = att.face * 4;
        SFX.hitH();
      } else if (opts.knock || d > 9 || def.hp <= 0) {
        def.state = "down";
        def.st = 0;
        def.vx = att.face * 5;
        def.vy = -5;
        def.hvx = att.face * 3;
        SFX.hitH();
        shake = 6;
        fx.push({ ty: "ring", x: def.x, y: def.y - def.def.h * 0.55, t: 0, col: "#f8d060" });
      } else {
        def.state = "hit";
        def.st = 0;
        def.hvx = opts.still ? 0 : att.face * 2.4;
        def.vy = def.onGround ? -2 : 0;
        (Math.random() < 0.4 ? SFX.hitV : SFX.hit)();
        shake = 2;
      }
    }
    function updProjs() {
      if (battle && ["finish", "fatal", "over", "ko"].includes(battle.phase)) {
        projs.length = 0;
        return;
      }
      if (projs.length > 60) projs.splice(0, projs.length - 60);
      for (let i = projs.length; i--; ) {
        const p = projs[i];
        p.l--;
        p.x += p.vx;
        p.y += p.vy;
        if (FRAME % 2 === 0) {
          if (p.ty === "fire") P(p.x, p.y, rnd(-0.4, 0.4), rnd(-0.8, -0.2), pick(["#f06020", "#f8d060"]), 16, 2, -0.01);
          else if (p.ty === "ice") P(p.x, p.y, rnd(-0.3, 0.3), rnd(-0.5, 0.2), "#c8ecff", 16, 1, -5e-3);
          else if (p.ty === "shadow") P(p.x, p.y, rnd(-0.3, 0.3), rnd(-0.6, -0.1), "#7a3aa8", 18, 2, -0.01);
          else if (p.ty === "wave") P(p.x, FL + GR - 2, rnd(-0.5, 0.5), rnd(-1.6, -0.5), "#9a9080", 14, 2, 0.06);
        }
        if (p.ty === "bomb" || p.ty === "meteor" || p.ty === "rocket") p.vy += 0.12;
        if (p.ty === "shard" && FRAME % 3 === 0) P(p.x, p.y, rnd(-0.3, 0.3), rnd(-0.4, 0.2), p.c, 14, 2, -5e-3);
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
            projs.splice(i, 1);
            continue;
          }
        }
        if ((p.ty === "meteor" || p.ty === "rocket" || p.ty === "bomb") && p.y >= FL + GR - 2) {
          fx.push({ ty: "boom", x: p.x, y: FL + GR - 4, t: 0 });
          SFX.boom();
          shake = 6;
          const f2 = p.o.foe;
          if (f2 && !f2.dodging && Math.abs(f2.x - p.x) < 30 && f2.state !== "down" && f2.state !== "victim") resolveHit(p.o, f2, p.d, { still: 1 });
          projs.splice(i, 1);
          continue;
        }
        if (p.l <= 0 || p.x < -30 || p.x > AW + 30) projs.splice(i, 1);
      }
    }
    function drawProjs(cam2) {
      for (const p of projs) {
        const x = p.x - cam2, y = p.y;
        const gl = { fire: "#f06020", ice: "#88c8f0", shadow: "#7a3aa8", bolt: "#f8f860", meteor: "#f06020", rocket: "#d84030", bomb: "#f06020" }[p.ty] || p.c;
        if (gl) {
          g.shadowColor = gl;
          g.shadowBlur = 8;
        }
        if (p.ty === "fire") {
          g.fillStyle = "#f06020";
          g.fillRect(x - 5, y - 5, 10, 10);
          g.fillStyle = "#f8d060";
          g.fillRect(x - 3, y - 3, 6, 6);
          g.fillStyle = "#a03010";
          g.fillRect(x - (p.vx > 0 ? 10 : -10), y - 2, 6, 4);
        } else if (p.ty === "ice") {
          g.fillStyle = "#88c8f0";
          g.beginPath();
          g.moveTo(x - 7, y);
          g.lineTo(x, y - 6);
          g.lineTo(x + 7, y);
          g.lineTo(x, y + 6);
          g.fill();
          g.fillStyle = "#e8f8ff";
          g.fillRect(x - 2, y - 2, 4, 4);
        } else if (p.ty === "shadow") {
          g.fillStyle = "#3a1a5a";
          g.beginPath();
          g.arc(x, y, 6, 0, 7);
          g.fill();
          g.fillStyle = "#7a3aa8";
          g.beginPath();
          g.arc(x + Math.sin(p.l) * 3, y - 2, 3, 0, 7);
          g.fill();
        } else if (p.ty === "net") {
          g.strokeStyle = "#c8c8a0";
          g.lineWidth = 1;
          const s = 8 + (120 - p.l) * 0.06;
          g.strokeRect(x - s / 2, y - s / 2, s, s);
        } else if (p.ty === "wave") {
          g.fillStyle = "#c8e0ff";
          for (let k = -1; k <= 1; k++) {
            const h = 12 - Math.abs(k) * 4;
            g.beginPath();
            g.moveTo(x + k * 9 - 5, FL + GR);
            g.lineTo(x + k * 9, FL + GR - h);
            g.lineTo(x + k * 9 + 5, FL + GR);
            g.fill();
          }
          g.fillStyle = "#6aa0d8";
          g.fillRect(x - 6, FL + GR - 3, 12, 3);
        } else if (p.ty === "bolt") drawBolt(x, y - 90, x, y);
        else if (p.ty === "meteor") {
          g.fillStyle = "#f06020";
          g.fillRect(x - 5, y - 5, 10, 10);
          g.fillStyle = "#f8d060";
          g.fillRect(x - 2, y - 2, 5, 5);
        } else if (p.ty === "rocket") {
          g.fillStyle = "#889";
          g.fillRect(x - 3, y - 8, 6, 12);
          g.fillStyle = "#d84030";
          g.fillRect(x - 2, y - 8, 4, 3);
        } else if (p.ty === "bomb") {
          const a = Math.sin(p.l * 0.4) * 2;
          g.fillStyle = "#2a2018";
          g.beginPath();
          g.arc(x, y, 5, 0, 7);
          g.fill();
          g.fillStyle = "#4a4038";
          g.fillRect(x - 3, y - 3, 6, 2);
          g.fillStyle = "#f0a030";
          g.fillRect(x + 3, y - 6 + a, 2, 2);
          g.fillStyle = "#f8d060";
          g.fillRect(x + 4, y - 5 + a, 1, 1);
        } else if (p.ty === "shard") {
          g.fillStyle = p.c;
          g.beginPath();
          g.arc(x, y, p.s || 4, 0, 7);
          g.fill();
          g.fillStyle = "#fff";
          g.fillRect(x - 1, y - 1, 2, 2);
        }
        g.shadowBlur = 0;
      }
    }
    function drawBolt(x1, y1, x2, y2) {
      g.strokeStyle = "#f8f860";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(x1, y1);
      for (let i = 1; i <= 6; i++) g.lineTo(lerp(x1, x2, i / 6) + rnd(-5, 5), lerp(y1, y2, i / 6));
      g.stroke();
      g.strokeStyle = "#fff";
      g.lineWidth = 1;
      g.stroke();
    }
    function updFx() {
      for (let i = fx.length; i--; ) {
        const f = fx[i];
        f.t++;
        if (f.t > 80 || f.ty === "rock" && f.t > 26 || f.ty === "boom" && f.t > 22 || f.ty === "nova" && f.t > 26 || f.ty === "slash" && f.t > 10 || f.ty === "boltfx" && f.t > 8 || f.ty === "ring" && f.t > 14 || f.ty === "castbolt" && f.t > 9) fx.splice(i, 1);
        if (fx.length > 200) fx.splice(0, fx.length - 200);
      }
    }
    function drawFx(cam2) {
      for (const f of fx) {
        const x = f.x - cam2;
        if (f.ty === "rock") {
          const h = Math.min(30, f.t * 4);
          g.fillStyle = "#6a5a44";
          g.fillRect(x - 10, FL + GR - h, 20, h);
          g.fillStyle = "#8a7a5c";
          g.fillRect(x - 6, FL + GR - h, 5, h);
          if (f.t < 8) {
            g.fillStyle = "#b01818";
            g.fillRect(x - 10, FL + GR - h - 4, 20, 3);
          }
        } else if (f.ty === "boom") {
          const r = f.t * 1.6;
          g.strokeStyle = f.t < 8 ? "#f8d060" : "#f06020";
          g.lineWidth = 3;
          g.beginPath();
          g.arc(x, f.y, r, 0, 7);
          g.stroke();
          if (f.t % 3 === 0) P(f.x + rnd(-r, r), f.y + rnd(-r, r) * 0.4, rnd(-1, 1), rnd(-2, 0), "#f06020", 16, 2);
        } else if (f.ty === "nova") {
          g.strokeStyle = "#c8ecff";
          g.lineWidth = 2;
          g.beginPath();
          g.arc(x, f.y, f.t * 3.4, 0, 7);
          g.stroke();
        } else if (f.ty === "drain") {
          g.strokeStyle = "#7a3aa8";
          g.lineWidth = 2;
          g.beginPath();
          g.arc(x, FL - 40 + Math.sin(f.t * 0.15) * 6, 20 + f.t * 0.2, 0, 7);
          g.stroke();
        } else if (f.ty === "slash") {
          g.strokeStyle = "#fff";
          g.lineWidth = 2;
          g.beginPath();
          g.moveTo(x - 10, f.y - 14);
          g.lineTo(x + 10, f.y + 10);
          g.stroke();
        } else if (f.ty === "ring") {
          g.strokeStyle = f.col;
          g.lineWidth = 2;
          g.beginPath();
          g.arc(x, f.y, f.t * 3.2, 0, 7);
          g.stroke();
        } else if (f.ty === "boltfx") drawBolt(x, FL, x, FL - 90);
        if (f.ty === "castbolt") {
          const by2 = f.y - (f.h || 60);
          drawBolt(x, by2 - 6, x + Math.sin(f.t) * 3, by2 - 72);
          g.fillStyle = "rgba(248,248,96,.5)";
          g.fillRect(x - 2, by2 - 8, 4, 4);
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
    const lite = (c, t) => c[0] === "#" ? mix(c, "#ffffff", t) : null;
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
    const WM = { 0: [0.24, 1, 1, 1.5, 0.02], 1: [0.15, 0.65, 0.4, 0.6, 0.1], 2: [0.27, 1.1, 1.3, 1.8, 0], 3: [0.14, 1.2, 0.8, 2.6, 0.06], 4: [0.3, 0.9, 1.4, 1, 0.12], 5: [0.2, 0.7, 0.5, 0.8, -0.03], 6: [0.2, 0.9, 0.7, 1, 0], 7: [0.22, 1.1, 0.5, 1.6, 0.04], 8: [0.13, 0.5, 0.3, 0.4, -0.05], 9: [0.21, 0.95, 1.1, 1.6, 0.03], 10: [0.19, 0.75, 0.6, 0.9, -0.04], 11: [0.28, 0.85, 1.2, 0.9, 0.1], 12: [0.17, 0.6, 0.4, 0.5, -0.02] };
    function pose(f) {
      const d = f.def, t = f.animT, s = f.state;
      let p = { hip: d.h * 0.47, lean: 0, armF: [0.7, 1.9], armB: [-0.5, 2.1], legF: [0.45, -0.15], legB: [-0.45, -0.2], head: 0 };
      const bob = Math.sin(t * 0.09) * 1.4;
      if (s === "idle") {
        p.hip += bob * 0.4;
        p.armF[0] += Math.sin(t * 0.09) * 0.08;
        if (battle && battle.phase === "intro") {
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
        const W = WM[d.id] || [0.22, 1, 1, 1.4, 0];
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
        }
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
    function drawF(f, cam2) {
      if (f.hidden) return;
      const d = f.def, sc = d.bulk * f.scale;
      g.save();
      g.lineCap = "round";
      g.translate(Math.round(f.x - cam2), Math.round(f.y));
      const shadowY = FL + GR - f.y;
      const shg = g.createRadialGradient(0, shadowY, 1, 0, shadowY, 15 * sc);
      shg.addColorStop(0, "rgba(0,0,0,.45)");
      shg.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = shg;
      g.beginPath();
      g.ellipse(0, shadowY, 15 * sc, 4.2, 0, 0, 7);
      g.fill();
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
      g.strokeStyle = OUT;
      g.lineWidth = 13;
      g.beginPath();
      g.moveTo(-1, hipY);
      g.lineTo(shX, shY + 2);
      g.stroke();
      const tg = g.createLinearGradient(-6, 0, 7, 0);
      tg.addColorStop(0, shade(suit, 0.55));
      tg.addColorStop(0.45, suit);
      tg.addColorStop(1, mix(suit, "#ffffff", 0.16));
      g.strokeStyle = tg;
      g.lineWidth = 10;
      g.beginPath();
      g.moveTo(-1, hipY);
      g.lineTo(shX, shY + 2);
      g.stroke();
      if (!f.charred) {
        g.fillStyle = shade(suit, 0.74);
        g.fillRect(shX - 4, shY + 5, 4, 2);
        g.fillRect(shX + 1, shY + 5, 4, 2);
        g.fillStyle = shade(suit, 0.82);
        g.fillRect(shX - 1, shY + 8, 2, 3);
        g.fillRect(shX - 1, shY + 11, 2, 1);
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
      g.fillStyle = shade(suit, 0.45);
      g.fillRect(-5, hipY - 3, 10, 4);
      g.fillStyle = mix(ac, "#ffffff", 0.3);
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
      g.fillStyle = ac;
      g.fillRect(-9, hipY + d.h * 0.32, 20 + shX * 0.6, 1);
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
      g.fillStyle = shade(skin, 0.82);
      g.fillRect(hx - 5, hy + 1, 11, 3);
      g.fillStyle = shade(skin, 0.7);
      g.fillRect(hx - 6, hy - 4, 2, 3);
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
      const expr = f.state === "hit" || f.state === "victim" ? 1 : f.state === "dizzy" ? 2 : 0;
      if (expr === 0) {
        g.fillStyle = "#f0e8e0";
        g.fillRect(hx + 2, hy - 5, 3, 2);
        g.fillStyle = "#141414";
        g.fillRect(hx + 3, hy - 5, 2, 2);
      } else if (expr === 1) {
        g.fillStyle = "#141414";
        g.fillRect(hx + 2, hy - 4, 3, 1);
      } else {
        g.fillStyle = "#141414";
        g.fillRect(hx + 2, hy - 5, 1, 2);
        g.fillRect(hx + 4, hy - 5, 1, 2);
      }
      g.fillStyle = shade(skin, 0.72);
      g.fillRect(hx + 2, expr === 2 ? hy - 7 : hy - 6, 4, 1);
      drawGear(f, hx, hy);
      if (f.flash > 0) {
        g.globalAlpha = 0.7;
        g.fillStyle = "#fff";
        g.fillRect(-14, -d.h - 4, 28, d.h + 6);
        g.globalAlpha = 1;
      }
      g.restore();
      if (f.frozen > 0) {
        const b = f.box;
        g.fillStyle = "rgba(120,190,240,.45)";
        g.fillRect(b.x - cam2, b.y - 2, b.w, b.h + 4);
        g.fillStyle = "rgba(225,245,255,.85)";
        for (let i = 0; i < 3; i++) {
          const sx = b.x - cam2 + 3 + i * (b.w - 6) / 2;
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
        for (let i = 0; i < 4; i++) g.strokeRect(b.x - cam2 + 2 + i * 3, b.y + i * 4, b.w - 4 - i * 6, 4);
      }
      if (f.state === "dizzy") {
        for (let i = 0; i < 3; i++) {
          const a = f.animT * 0.15 + i * 2.09;
          g.fillStyle = "#f8d060";
          g.fillRect(f.x - cam2 + Math.cos(a) * 12 - 1, f.y - d.h - 8 + Math.sin(a) * 3, 3, 3);
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
        g.fillStyle = FRAME % 40 < 20 ? "#e04020" : "#601414";
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
        g.fillStyle = FRAME % 14 < 7 ? ac : shade(ac, 0.5);
        g.fillRect(hx - 4, hy - 7, 9, 2);
        g.fillStyle = "rgba(255,255,255,.3)";
        g.fillRect(hx - 4, hy - 7 + (FRAME >> 3) % 2, 9, 1);
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
        g.fillStyle = "#141414";
        g.fillRect(hx - 1, hy - 5, 3, 2);
        g.fillStyle = shade(d.skin, 0.85);
        g.fillRect(hx - 1, hy - 3, 3, 1);
        g.fillStyle = d.hair;
        g.fillRect(hx - 6, hy - 11, 12, 5);
        g.fillStyle = mix(d.hair, "#ffffff", 0.3);
        g.fillRect(hx - 6, hy - 11, 12, 1);
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
            const fx2 = hx - 3 + i * 3, hg = 4 + Math.sin(FRAME * 0.3 + i * 2) * 2;
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
    function drawPort(d, x, y, s) {
      g.save();
      g.lineCap = "round";
      g.translate(x, y);
      g.scale(s, s);
      const bg2 = g.createLinearGradient(0, -15, 0, 15);
      bg2.addColorStop(0, shade(d.suit, 0.45));
      bg2.addColorStop(1, "#0c0a08");
      g.fillStyle = bg2;
      g.fillRect(-12, -15, 24, 30);
      g.strokeStyle = "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(-11.5, -14.5, 23, 29);
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
      g.fillStyle = OUT;
      g.fillRect(-6, -12, 12, 17);
      g.fillStyle = d.skin;
      g.fillRect(-5, -11, 10, 15);
      g.fillStyle = shade(d.skin, 0.82);
      g.fillRect(-5, -1, 10, 4);
      g.fillStyle = "#f0e8e0";
      g.fillRect(0, -7, 3, 2);
      g.fillStyle = "#141414";
      g.fillRect(1, -7, 2, 2);
      g.fillStyle = shade(d.skin, 0.72);
      g.fillRect(0, -8, 4, 1);
      drawGear({ def: d, animT: 0, charred: 0 }, 0, -3);
      g.restore();
    }
    const FAKES = CH.map((d) => ({ def: d, x: 0, y: FL + GR, face: 1, animT: 0, state: "idle", st: 0, atk: null, tilt: 0, squash: 1, scale: 1, invis: 0, frozen: 0, netT: 0, charred: 0, hidden: 0, flash: 0, hp: 100 }));
    function drawFake(i, px, py, sc, face) {
      const fk = FAKES[i];
      fk.animT = FRAME;
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
      g.strokeStyle = "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(6.5, 6.5, RW - 13, 33);
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
        if (f.rage >= 100 && blink()) {
          g.fillStyle = "#ff5030";
          g.font = '7px "Russo One"';
          g.fillText("\u0421\u0423\u041F\u0415\u0420 \u0413\u041E\u0422\u041E\u0412", dir > 0 ? x + 2 : x + w - 2, 52);
        }
      };
      bar(p1, 40, 1);
      bar(p2, RW - 190, -1);
      g.strokeStyle = p1.def.acc;
      g.lineWidth = 1;
      g.strokeRect(14.5, 7.5, 19, 31);
      g.strokeStyle = p2.def.acc;
      g.strokeRect(RW - 33.5, 7.5, 19, 31);
      drawPort(p1.def, 24, 23, 0.8);
      drawPort(p2.def, RW - 24, 23, 0.8);
      g.fillStyle = "rgba(0,0,0,.78)";
      g.fillRect(RW / 2 - 18, 7, 36, 22);
      g.strokeStyle = b.timer < 11 ? blink() ? "#ff5030" : "#801818" : "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(RW / 2 - 17.5, 7.5, 35, 21);
      g.font = '15px "Russo One"';
      g.fillStyle = b.timer < 11 && blink() ? "#ff5030" : "#f0e8d0";
      g.textAlign = "center";
      g.fillText("" + Math.ceil(b.timer), RW / 2, 23);
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
    function panel(x, y, w, h) {
      g.fillStyle = "rgba(10,8,6,.93)";
      g.fillRect(x, y, w, h);
      g.strokeStyle = "#c8a040";
      g.lineWidth = 1;
      g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      g.fillStyle = "#c8a040";
      g.fillRect(x, y, 3, 3);
      g.fillRect(x + w - 3, y, 3, 3);
      g.fillRect(x, y + h - 3, 3, 3);
      g.fillRect(x + w - 3, y + h - 3, 3, 3);
    }
    const seqTxt = (s, p2) => s.split("").map((x) => ({ D: "\u2193", U: "\u2191", L: "\u2190", R: "\u2192", P: p2 ? "I" : "J", K: p2 ? "O" : "K" })[x]).join(" ");
    const RANGED = [0, 2, 3, 6, 7, 8, 9, 10, 12];
    function aiUpd(f, foe, lvl) {
      const c = f.ctrl;
      c.ax = {};
      if (["down", "hit", "frozen", "net", "super", "cast", "victim", "dizzy", "fatal", "getup", "win"].includes(f.state)) return;
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
      const danger = projs.some((p) => p.o === foe && (p.vx && Math.abs(p.x - f.x) < 95 && Math.sign(p.vx) === Math.sign(f.x - p.x) || (p.ty === "meteor" || p.ty === "rocket" || p.ty === "bolt") && Math.abs(p.x - f.x) < 40 && p.y < FL - 20));
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
      if (FRAME % Math.max(3, react | 0) !== 0) return;
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
        if (pk < 0.3) c.ax.P = true;
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
    let GAME = "title", FRAME = 0, freeze = 0, shake = 0, cam = 0, menuIdx = 0, ladder = [], lStep = 0, paused = false, pauseIdx = 0, wipe = 0;
    let battle = null, flashS = 0, announce = null, sel = { mode: "cpu", c1: 0, c2: 1, ph: 0, l1: false, l2: false, diff: 1, ar: -1, row: 0 }, vsT = 0, titleT = 0, contT = 0, arcP1 = 0, lastSel = null, vsEscT = 0, bstat = null;
    function toLobby(gm) {
      GAME = gm;
      cam = 0;
      parts = [];
      decals = [];
      projs = [];
      fx = [];
      announce = null;
      paused = false;
      if (gm === "menu") menuIdx = 0;
    }
    function newBattle(i1, c1, i2, c2, arena) {
      battle = { p1: new F(CH[i1], c1), p2: new F(CH[i2], c2), round: 1, phase: "intro", phaseT: 0, timer: 60, arena };
      battle.p1.foe = battle.p2;
      battle.p2.foe = battle.p1;
      decals = [];
      projs = [];
      parts = [];
      fx = [];
      bstat = { h1: 0, d1: 0, c1: 0, h2: 0, d2: 0, c2: 0 };
      startRound();
      GAME = "fight";
    }
    function startRound() {
      const b = battle;
      b.p1.reset(180, 1);
      b.p2.reset(AW - 180, -1);
      b.phase = "intro";
      b.phaseT = 0;
      b.timer = 60;
      b.p1.rage = Math.floor(b.p1.rage * 0.5);
      b.p2.rage = Math.floor(b.p2.rage * 0.5);
      decals = [];
      projs = [];
      fx = [];
      wipe = 24;
      announce = { txt: "\u0420\u0410\u0423\u041D\u0414 " + b.round, t: 0, col: "#e8c040" };
      say("Round " + ["one", "two", "three"][Math.min(2, b.round - 1)]);
    }
    function endBattle(w) {
      battle.phase = "over";
      battle.phaseT = 0;
      battle.winner = w;
      w.state = "win";
      w.st = 0;
      w.atk = null;
      if (battle.loser) battle.loser.defeated = 1;
      projs.length = 0;
      announce = { txt: w.def.name + " ?????????", t: 0, col: "#e8c040" };
      say(w.def.en + " wins");
      SFX.win();
    }
    function startFatal(w, l) {
      projs.length = 0;
      battle.phase = "fatal";
      battle.phaseT = 0;
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
      const t = battle.phaseT, id = w.def.id;
      if (t === 50) {
        flashS = 8;
        shake = 10;
        if (id === 0) {
          SFX.fire();
          l.burnT = 1;
        } else if (id === 1) {
          SFX.tele();
          fx.push({ ty: "drain", x: l.x, t: 0 });
          l.soulT = 1;
        } else if (id === 2) {
          SFX.zap();
          l.shockT = 1;
          for (let i = 0; i < 14; i++) fx.push({ ty: "boltfx", x: l.x + rnd(-16, 16), t: -(i % 3) });
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
          shake = 8;
          blood(l.x, l.y - 30, 10, 2);
          l.squash = Math.max(0.25, l.squash - 0.12);
        }
        if (l.sliceT && t % 6 === 0) {
          SFX.slash();
          blood(l.x + rnd(-6, 6), l.y - rnd(10, 60), 6, 1.5);
          fx.push({ ty: "slash", x: l.x + rnd(-10, 10), y: l.y - rnd(10, 60), t: 0 });
        }
        if (l.cutT && (t === 55 || t === 80 || t === 105 || t === 130)) {
          w.face = l.x > w.x ? 1 : -1;
          const nx = clamp(l.x + w.face * rnd(20, 28), 20, AW - 20);
          for (let i = 0; i < 8; i++) P(w.x + (nx - w.x) * (i / 8), w.y - rnd(6, 50), (nx - w.x) / 10, rnd(-0.5, 0.5), "#9adcee", 18, 2, 0);
          w.x = nx;
          smoke(nx, w.y - 30);
          SFX.slash();
          fx.push({ ty: "slash", x: l.x + rnd(-12, 12), y: l.y - rnd(8, 60), t: 0 });
          blood(l.x + rnd(-6, 6), l.y - rnd(10, 55), 5, 1.4);
          shake = Math.max(shake, 3);
        }
        if (l.cutT && t === 150) {
          SFX.slash();
          shake = 8;
          fx.push({ ty: "slash", x: l.x, y: l.y - 34, t: 0 });
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
            shake = 6;
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
          fx.push({ ty: "boom", x: l.x + rnd(-16, 16), y: l.y - 30, t: 0 });
          SFX.boom();
          shake = 8;
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
          shake = 10;
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
        announce = { txt: "FATALITY", t: 0, col: "#e02020" };
        SFX.fatal();
      }
      if (t === 300) endBattle(w);
    }
    function gibs(l, col) {
      for (let i = 0; i < 22; i++) P(l.x + rnd(-8, 8), l.y - rnd(5, 60), rnd(-3.5, 3.5), rnd(-6, -1), col, rnd(40, 90), rnd(2, 5));
      blood(l.x, l.y - 30, 20, 2);
    }
    function battleUpd() {
      const b = battle;
      b.phaseT++;
      if (b.phase === "intro") {
        if (b.phaseT === 90) {
          announce = { txt: "FIGHT!", t: 0, col: "#e02020" };
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
      if (freeze > 0) {
        freeze--;
        return;
      }
      if (b.p1.hp < 25 && b.p1.hp > 0 && FRAME % 50 === 0) SFX.heart();
      if (b.p2.hp < 25 && b.p2.hp > 0 && FRAME % 50 === 25) SFX.heart();
      b.timer -= 1 / 60;
      if (b.timer < 11 && b.timer > 0 && FRAME % 60 === 0) SFX.tick();
      if (b.timer <= 0) {
        b.timer = 0;
        b.phase = "ko";
        b.phaseT = 0;
        announce = { txt: "\u041D\u0418\u0427\u042C\u042F", t: 0, col: "#e8c040" };
        say("Draw");
        return;
      }
      updFs(1);
    }
    function updFs(act) {
      const b = battle;
      for (const f of [b.p1, b.p2]) {
        f.comboT = (f.comboT || 0) + 1;
        if (f.ctrl.ai && act && b.phase !== "finish") aiUpd(f, f.foe, b.aiLvl);
        if (f.state !== "fatal" && f.state !== "victim") f.update(FRAME, f.foe);
        else {
          f.st++;
          f.animT++;
        }
        f.updSuper();
      }
      if (b.phase === "fight") {
        const dead = [b.p1, b.p2].filter((f) => f.hp <= 0 && f.state !== "victim");
        if (dead.length >= 2) {
          b.phase = "ko";
          b.phaseT = 0;
          projs.length = 0;
          for (const f of dead) {
            f.defeated = 1;
            f.state = "down";
            f.st = 0;
            f.vx = 0;
            f.vy = 0;
            f.y = FL + GR;
          }
          announce = { txt: "?????", t: 0, col: "#e8c040" };
          say("Draw");
        } else if (dead.length === 1) roundWon(dead[0].foe);
      }
    }
    function roundWon(w) {
      const b = battle;
      w.wins++;
      projs.length = 0;
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
        announce = { txt: "FINISH HIM!", t: 0, col: "#e02020", pulse: 1 };
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
        announce = { txt: fl ? "FLAWLESS VICTORY" : "K.O.", t: 0, col: fl ? "#e8e0c0" : "#e02020" };
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
    function finishUpd() {
      const b = battle;
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
      } else if ((w.ctrl.pP || w.ctrl.pK) && w.ctrl.matchRel(w.def.fat, w.face, 150)) {
        startFatal(w, l);
        return;
      }
      if (b.phaseT > 430) {
        l.state = "down";
        l.st = 0;
      }
    }
    function afterBattle() {
      const b = battle;
      if (b.mode === "arcade" && b.winner === b.p1) {
        lStep++;
        if (lStep >= ladder.length) {
          try {
            const rec = +(localStorage.karnageArc || 0);
            if (lStep > rec) localStorage.karnageArc = lStep;
          } catch (e) {
          }
          addTop(arcP1, lStep);
          toLobby("ending");
          return;
        }
        const idx = ladder[lStep];
        newBattle(b.p1.def.id, new Ctrl(KM1), idx, new Ctrl(KM2), CH[idx].arena);
        battle.mode = "arcade";
        battle.p2.ctrl.ai = true;
        battle.aiLvl = Math.min(7, lStep + (lStep === ladder.length - 1 ? 2 : 0));
        GAME = "vs";
        vsT = 0;
        if (lStep === ladder.length - 1) say("Final boss");
      } else if (b.mode === "arcade") {
        toLobby("continue");
        contT = 600;
        say("Continue?");
        try {
          const rec = +(localStorage.karnageArc || 0);
          if (lStep > rec) localStorage.karnageArc = lStep;
          addTop(arcP1, lStep);
        } catch (e) {
        }
      } else toLobby(lastSel ? "rematch" : "menu");
    }
    function resumeArc() {
      const idx = ladder[lStep];
      newBattle(arcP1, new Ctrl(KM1), idx, new Ctrl(KM2), CH[idx].arena);
      battle.mode = "arcade";
      battle.p2.ctrl.ai = true;
      battle.aiLvl = Math.min(7, lStep + (lStep === ladder.length - 1 ? 2 : 0));
      GAME = "vs";
      vsT = 0;
      SFX.coin();
    }
    function pauseItems() {
      return ["\u041F\u0420\u041E\u0414\u041E\u041B\u0416\u0418\u0422\u042C", "\u0417\u0412\u0423\u041A: " + (AU.on ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0413\u041E\u041B\u041E\u0421 \u0414\u0418\u041A\u0422\u041E\u0420\u0410: " + (AU.voice ? "\u0412\u041A\u041B" : "\u0412\u042B\u041A\u041B"), "\u0413\u0420\u041E\u041C\u041A\u041E\u0421\u0422\u042C: " + AU.vol + "%", "\u0412 \u041C\u0415\u041D\u042E"];
    }
    function onKey(k) {
      if (k === "KeyM") {
        AU.on = !AU.on;
        if (!AU.on) {
          try {
            speechSynthesis.cancel();
          } catch (e) {
          }
        } else SFX.menu();
        saveSet();
        return;
      }
      if (GAME === "fight" && !paused && k === "Escape") {
        paused = true;
        pauseIdx = 0;
        SFX.menu();
        return;
      }
      if (GAME === "title") {
        toLobby("menu");
        SFX.sel();
        say("Karnage");
        return;
      }
      if (GAME === "fight" && paused) {
        if (k === "KeyW" || k === "ArrowUp") {
          pauseIdx = (pauseIdx + 4) % 5;
          SFX.menu();
        }
        if (k === "KeyS" || k === "ArrowDown") {
          pauseIdx = (pauseIdx + 1) % 5;
          SFX.menu();
        }
        if ((k === "KeyD" || k === "ArrowRight") && pauseIdx === 3) {
          AU.vol = Math.min(100, AU.vol + 10);
          setVol();
          saveSet();
          SFX.menu();
        }
        if ((k === "KeyA" || k === "ArrowLeft") && pauseIdx === 3) {
          AU.vol = Math.max(0, AU.vol - 10);
          setVol();
          saveSet();
          SFX.menu();
        }
        if (k === "Escape") {
          paused = false;
          SFX.menu();
          battle.p1.ctrl.clear();
          battle.p2.ctrl.clear();
          return;
        }
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          if (pauseIdx === 0) {
            paused = false;
            battle.p1.ctrl.clear();
            battle.p2.ctrl.clear();
          } else if (pauseIdx === 1) {
            AU.on = !AU.on;
            saveSet();
          } else if (pauseIdx === 2) {
            AU.voice = !AU.voice;
            if (!AU.voice) {
              try {
                speechSynthesis.cancel();
              } catch (e) {
              }
            }
            saveSet();
          } else if (pauseIdx === 3) {
            AU.vol = AU.vol >= 100 ? 0 : AU.vol + 25;
            setVol();
            saveSet();
          } else toLobby("menu");
        }
        return;
      }
      if (GAME === "menu") {
        if (k === "KeyW" || k === "ArrowUp") {
          menuIdx = (menuIdx + 4) % 5;
          SFX.menu();
        }
        if (k === "KeyS" || k === "ArrowDown") {
          menuIdx = (menuIdx + 1) % 5;
          SFX.menu();
        }
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          SFX.sel();
          if (menuIdx === 0) {
            GAME = "select";
            sel = { mode: "arcade", c1: 0, c2: 1, ph: 0, l1: false, l2: false, diff: 1, ar: -1, row: 0 };
            say("Choose your fighter");
          } else if (menuIdx === 1) {
            GAME = "select";
            sel = { mode: "cpu", c1: 0, c2: 1, ph: 0, l1: false, l2: false, diff: 1, ar: -1, row: 0 };
            say("Choose your fighter");
          } else if (menuIdx === 2) {
            GAME = "select";
            sel = { mode: "2p", c1: 0, c2: 1, ph: 0, l1: false, l2: false, diff: 1, ar: -1, row: 0 };
            say("Choose your fighters");
          } else if (menuIdx === 3) GAME = "controls";
          else GAME = "top";
        }
        return;
      }
      if (GAME === "controls") {
        if (k === "KeyJ" || k === "Enter" || k === "Escape") {
          toLobby("menu");
          SFX.menu();
        }
        return;
      }
      if (GAME === "select") {
        selKey(k);
        return;
      }
      if (GAME === "vs") {
        if (k === "KeyJ" || k === "Enter" || k === "Space") {
          GAME = "fight";
          SFX.sel();
          vsEscT = 0;
        } else if (k === "Escape") {
          if (battle.mode === "arcade") {
            if (vsEscT > 0) toLobby("menu");
            else {
              vsEscT = 90;
              SFX.menu();
            }
          } else toLobby("menu");
        }
        return;
      }
      if (GAME === "continue") {
        if (k === "KeyJ" || k === "Enter" || k === "Space") resumeArc();
        return;
      }
      if (GAME === "rematch") {
        if (!lastSel) {
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
      if (GAME === "ending" || GAME === "gameover") {
        if (k === "KeyJ" || k === "Enter" || k === "Escape") {
          toLobby("menu");
          SFX.sel();
        }
        return;
      }
      if (GAME === "top") {
        if (k === "KeyJ" || k === "Enter" || k === "Escape") {
          toLobby("menu");
          SFX.menu();
        }
        return;
      }
    }
    function startLadder(c1) {
      arcP1 = c1;
      ladder = [];
      for (let i = 0; i < CH.length; i++) if (i !== c1) ladder.push(i);
      for (let i = ladder.length - 1; i > 0; i--) {
        const j = Math.random() * (i + 1) | 0;
        [ladder[i], ladder[j]] = [ladder[j], ladder[i]];
      }
      lStep = 0;
      SFX.vsroar();
      const idx = ladder[0];
      newBattle(c1, new Ctrl(KM1), idx, new Ctrl(KM2), CH[idx].arena);
      battle.mode = "arcade";
      battle.p2.ctrl.ai = true;
      battle.aiLvl = 0;
      GAME = "vs";
      vsT = 0;
    }
    function startSel() {
      const s = sel;
      newBattle(s.c1, new Ctrl(KM1), s.c2, new Ctrl(KM2), s.ar < 0 ? CH[s.c1].arena : s.ar);
      battle.mode = s.mode === "cpu" ? "cpu" : "2p";
      if (s.mode === "cpu") {
        battle.p2.ctrl.ai = true;
        battle.aiLvl = [2, 4, 6][s.diff];
      }
      SFX.vsroar();
      lastSel = { mode: s.mode, c1: s.c1, c2: s.c2, diff: s.diff, ar: s.ar };
      GAME = "vs";
      vsT = 0;
    }
    function rematchStart() {
      newBattle(lastSel.c1, new Ctrl(KM1), lastSel.c2, new Ctrl(KM2), lastSel.ar < 0 ? CH[lastSel.c1].arena : lastSel.ar);
      battle.mode = lastSel.mode === "cpu" ? "cpu" : "2p";
      if (lastSel.mode === "cpu") {
        battle.p2.ctrl.ai = true;
        battle.aiLvl = [2, 4, 6][lastSel.diff];
      }
      GAME = "vs";
      vsT = 0;
      SFX.vsroar();
    }
    function drawRematch() {
      bgFill();
      panel(102, 70, 220, 116);
      g.font = '16px "Rubik Mono One","Russo One",sans-serif';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u0420\u0415\u0412\u0410\u041D\u0428?", RW / 2, 100);
      g.font = '9px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.fillText(CH[lastSel.c1].name + "  VS  " + CH[lastSel.c2].name, RW / 2, 124);
      if (blink()) {
        g.font = '8px "Russo One"';
        g.fillStyle = "#807850";
        g.fillText("J \u2014 \u0415\u0429\u0401 \u0411\u041E\u0419 \xB7 ESC \u2014 \u041C\u0415\u041D\u042E", RW / 2, 150);
      }
      if (bstat) {
        g.font = '7px "Russo One"';
        g.fillStyle = "#c8a040";
        g.fillText("\u0423\u0414\u0410\u0420\u042B " + bstat.h1 + " \u2014 " + bstat.h2 + "   \u0423\u0420\u041E\u041D " + Math.round(bstat.d1) + " \u2014 " + Math.round(bstat.d2) + "   \u041C\u0410\u041A\u0421 \u041A\u041E\u041C\u0411\u041E " + bstat.c1 + " \u2014 " + bstat.c2, RW / 2, 172);
      }
    }
    function selKey(k) {
      const s = sel;
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
          if (idx === 0) s.diff = clamp(s.diff + dd, 0, 2);
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
          s[slot] = clamp(s[slot] + d, 0, CH.length - 1);
          SFX.menu();
        }
      };
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
    const bgFill = () => {
      g.fillStyle = "#0a0806";
      g.fillRect(0, 0, RW, RH);
    };
    function drawControls() {
      bgFill();
      g.font = '16px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u0423\u041F\u0420\u0410\u0412\u041B\u0415\u041D\u0418\u0415", RW / 2, 20);
      panel(12, 30, 196, 176);
      panel(216, 30, 196, 176);
      g.font = '10px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u0418\u0413\u0420\u041E\u041A 1", 110, 46);
      g.fillText("\u0418\u0413\u0420\u041E\u041A 2", 314, 46);
      g.font = '7px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.textAlign = "left";
      const L1 = ["A / D \u2014 \u0445\u043E\u0434\u044C\u0431\u0430", "W \u2014 \u043F\u0440\u044B\u0436\u043E\u043A", "S \u2014 \u043F\u0440\u0438\u0441\u0435\u0434", "J \u2014 \u0443\u0434\u0430\u0440 \u0440\u0443\u043A\u043E\u0439", "K \u2014 \u0443\u0434\u0430\u0440 \u043D\u043E\u0433\u043E\u0439", "L \u2014 \u0431\u043B\u043E\u043A (\u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C)", "S + J \u2014 \u0430\u043F\u043F\u0435\u0440\u043A\u043E\u0442", "S + K \u2014 \u043F\u043E\u0434\u0441\u0435\u0447\u043A\u0430", "\u043D\u0430\u0437\u0430\u0434 + K \u2014 roundhouse", "\u0431\u0435\u0433 + L \u2014 \u0440\u044B\u0432\u043E\u043A-\u0443\u043A\u043B\u043E\u043D", "\u0421\u041F\u0415\u04262 \u2014 \u0441\u0432\u043E\u044F \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044F"];
      const L2 = ["\u0421\u0422\u0420\u0415\u041B\u041A\u0418 \u2014 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435", "\u0421\u0422\u0420\u0415\u041B\u041A\u0410 \u0412\u0412\u0415\u0420\u0425 \u2014 \u043F\u0440\u044B\u0436\u043E\u043A", "\u0421\u0422\u0420\u0415\u041B\u041A\u0410 \u0412\u041D\u0418\u0417 \u2014 \u043F\u0440\u0438\u0441\u0435\u0434", "I \u2014 \u0443\u0434\u0430\u0440 \u0440\u0443\u043A\u043E\u0439", "O \u2014 \u0443\u0434\u0430\u0440 \u043D\u043E\u0433\u043E\u0439", "P \u2014 \u0431\u043B\u043E\u043A (\u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C)", "\u0412\u041D\u0418\u0417 + I \u2014 \u0430\u043F\u043F\u0435\u0440\u043A\u043E\u0442", "\u0412\u041D\u0418\u0417 + O \u2014 \u043F\u043E\u0434\u0441\u0435\u0447\u043A\u0430", "\u043D\u0430\u0437\u0430\u0434 + O \u2014 roundhouse", "\u0431\u0435\u0433 + P \u2014 \u0440\u044B\u0432\u043E\u043A-\u0443\u043A\u043B\u043E\u043D", "\u0421\u041F\u0415\u04262 \u2014 \u0441\u0432\u043E\u044F \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044F"];
      L1.forEach((l, i) => g.fillText(l, 24, 64 + i * 14));
      L2.forEach((l, i) => g.fillText(l, 228, 64 + i * 14));
      g.font = '7px "Russo One"';
      g.fillStyle = "#c8a040";
      g.textAlign = "center";
      g.fillText("\u0421\u041F\u0415\u0426 \u2014 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F + \u043A\u043D\u043E\u043F\u043A\u0430 \xB7 \u0421\u0423\u041F\u0415\u0420 \u2014 S,S+J \xB7 \u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418 \u2014 \u0432 \u043E\u043A\u043D\u0435 FINISH HIM", RW / 2, 222);
      g.fillStyle = "#807850";
      g.fillText("\u2190/\u2192 \u0432 \u0441\u043F\u0435\u0446/\u0444\u0430\u0442\u0430\u043B\u0438\u0442\u0438 \u2014 \u043D\u0430\u0437\u0430\u0434/\u0432\u043F\u0435\u0440\u0451\u0434 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432\u0437\u0433\u043B\u044F\u0434\u0430", RW / 2, 232);
      g.fillText("J / ESC \u2014 \u043D\u0430\u0437\u0430\u0434", RW / 2, 240);
    }
    function drawSelect() {
      const s = sel;
      bgFill();
      g.font = '15px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u0412\u042B\u0411\u041E\u0420 \u0411\u041E\u0419\u0426\u0410", RW / 2, 16);
      g.font = '7px "Russo One"';
      g.fillStyle = "#807850";
      const hdr = s.mode === "arcade" ? "\u0412\u042B\u0411\u0415\u0420\u0418 \u0421\u0412\u041E\u0415\u0413\u041E \u0411\u041E\u0419\u0426\u0410 \u2014 " + (CH.length - 1) + " \u041F\u0420\u041E\u0422\u0418\u0412\u041D\u0418\u041A\u041E\u0412 \u0412\u041F\u0415\u0420\u0415\u0414\u0418" : s.ph === 2 ? "\u041D\u0410\u0421\u0422\u0420\u041E\u0419\u041A\u0410 \u0411\u041E\u042F" : s.mode === "cpu" ? s.ph === 0 ? "\u0412\u042B\u0411\u0415\u0420\u0418 \u0421\u0412\u041E\u0415\u0413\u041E \u0411\u041E\u0419\u0426\u0410" : "\u0412\u042B\u0411\u0415\u0420\u0418 \u0421\u041E\u041F\u0415\u0420\u041D\u0418\u041A\u0410" : "P1: WASD + J    P2: \u0421\u0422\u0420\u0415\u041B\u041A\u0418 + I";
      g.fillText(hdr, RW / 2, 27);
      for (let i = 0; i < CH.length; i++) {
        const x = 12 + i % 5 * 37, y = 36 + (i / 5 | 0) * 46;
        g.fillStyle = "#100d0a";
        g.fillRect(x, y, 34, 42);
        g.strokeStyle = "#3a3128";
        g.lineWidth = 1;
        g.strokeRect(x + 0.5, y + 0.5, 33, 41);
        drawPort(CH[i], x + 17, y + 24, 0.95);
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
      g.font = '7px "Russo One"';
      g.textAlign = "left";
      g.fillStyle = "#e02020";
      g.fillText("P1: " + CH[s.c1].name, 12, 182);
      if (s.mode !== "arcade") {
        g.fillStyle = "#3868c8";
        g.fillText((s.mode === "2p" ? "P2" : "CPU") + ": " + CH[s.c2].name, 12, 192);
      }
      const cur = s.mode === "2p" ? s.c1 : s.mode === "cpu" ? s.ph === 0 ? s.c1 : s.c2 : s.c1;
      const d = CH[cur];
      panel(200, 34, 216, 150);
      g.fillStyle = d.acc;
      g.fillRect(202, 36, 4, 146);
      drawFake(cur, 244, 176, 1.5, -1);
      g.strokeStyle = d.acc;
      g.lineWidth = 1;
      g.strokeRect(212.5, 66.5, 64, 114);
      g.font = '13px "Rubik Mono One","Russo One",sans-serif';
      g.fillStyle = "#e8e0c0";
      g.textAlign = "left";
      g.fillText(d.name, 292, 52);
      g.font = '7px "Russo One"';
      g.fillStyle = d.acc;
      g.fillText(RANGED.includes(d.id) ? "\u0414\u0410\u041B\u042C\u041D\u0418\u0419 \u0411\u041E\u0419" : "\u0411\u041B\u0418\u0416\u041D\u0418\u0419 \u0411\u041E\u0419", 292, 62);
      const st = [[Math.round(9 * d.dmg), 9, "\u0421\u0418\u041B\u0410"], [Math.round(d.spd * 4), 9, "\u0421\u041A\u041E\u0420"], [Math.round(9 / d.bulk), 9, "\u0412\u0415\u0421"]];
      st.forEach((s2, i) => {
        const sy = 76 + i * 12;
        g.font = '7px "Russo One"';
        g.fillStyle = "#c8a040";
        g.textAlign = "left";
        g.fillText(s2[2], 292, sy);
        g.fillStyle = "#2a0808";
        g.fillRect(324, sy - 6, 88, 5);
        g.fillStyle = s2[0] >= 7 ? "#e04020" : s2[0] >= 6 ? "#e8c040" : "#7a8a4a";
        g.fillRect(324, sy - 6, Math.max(2, Math.min(88, s2[0] / s2[1] * 88)), 5);
      });
      g.font = '7px "Russo One"';
      g.fillStyle = "#e8c040";
      g.fillText("\u0421\u041F\u0415\u0426: " + d.specN, 292, 114);
      g.fillText("[" + seqTxt(d.spec) + "]", 292, 123);
      g.fillStyle = "#c8a040";
      g.fillText("\u0421\u041F\u0415\u04262: " + d.spec2N, 292, 134);
      g.fillText("[" + seqTxt(d.spec2) + "]", 292, 143);
      if (s.ph !== 2) {
        g.fillText("\u0421\u0423\u041F\u0415\u0420: " + d.sup, 292, 155);
        g.fillStyle = "#807850";
        g.fillText("\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418: \u0441\u0435\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044F", 292, 167);
      }
      if (s.ph === 2) {
        panel(102, 150, 220, 72);
        g.font = '8px "Russo One"';
        g.textAlign = "center";
        if (s.mode === "cpu") {
          g.fillStyle = s.row === 0 ? blink() ? "#fff" : "#e02020" : "#c8a040";
          g.fillText("\u0421\u041B\u041E\u0416\u041D\u041E\u0421\u0422\u042C: " + ["\u041B\u0401\u0413\u041A\u0410\u042F", "\u041D\u041E\u0420\u041C\u0410\u041B\u042C\u041D\u0410\u042F", "\u0422\u042F\u0416\u0401\u041B\u0410\u042F"][s.diff], 212, 168);
        }
        g.fillStyle = s.row === 1 ? blink() ? "#fff" : "#e02020" : "#c8a040";
        g.fillText("\u0410\u0420\u0415\u041D\u0410: " + (s.ar < 0 ? "\u0410\u0420\u0415\u041D\u0410 \u0411\u041E\u0419\u0426\u0410" : AR[s.ar].n), 212, s.mode === "cpu" ? 184 : 168);
        g.font = '7px "Russo One"';
        g.fillStyle = "#807850";
        g.fillText("A/D \u2014 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \xB7 W/S \u2014 \u0441\u0442\u0440\u043E\u043A\u0430 \xB7 J \u2014 \u0421\u0422\u0410\u0420\u0422", 212, 206);
      }
      g.font = '7px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = "#807850";
      g.fillText("J \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \xB7 ESC \u2014 \u043D\u0430\u0437\u0430\u0434", RW / 2, 230);
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
      if (battle.mode === "arcade") {
        panel(152, 10, 120, 16);
        g.font = '8px "Russo One"';
        g.textAlign = "center";
        g.fillStyle = lStep === ladder.length - 1 ? blink() ? "#e02020" : "#e8c040" : "#e8c040";
        g.fillText(lStep === ladder.length - 1 ? "\u0424\u0418\u041D\u0410\u041B\u042C\u041D\u042B\u0419 \u0411\u041E\u0421\u0421" : "\u0421\u0422\u0423\u041F\u0415\u041D\u042C " + (lStep + 1) + " \u0418\u0417 " + ladder.length, RW / 2, 21);
      }
      panel(10, 30, 150, 120);
      panel(RW - 160, 30, 150, 120);
      drawFake(battle.p1.def.id, 85, 144, 1.5, 1);
      drawFake(battle.p2.def.id, RW - 85, 144, 1.5, -1);
      g.font = '11px "Russo One"';
      g.textAlign = "center";
      g.fillStyle = "#e02020";
      g.fillText(battle.p1.def.name, 85, 142);
      g.fillStyle = "#3868c8";
      g.fillText(battle.p2.def.name + (battle.p2.ctrl.ai ? " [CPU]" : ""), RW - 85, 142);
      if (battle.mode !== "arcade" && (sel.diff > 0 || sel.ar >= 0)) {
        g.font = '7px "Russo One"';
        g.fillStyle = "#c8a040";
        g.textAlign = "center";
        g.fillText((sel.ar < 0 ? "\u0410\u0420\u0415\u041D\u0410 \u0411\u041E\u0419\u0426\u0410" : AR[sel.ar].n) + (battle.p2.ctrl.ai ? " \xB7 " + ["\u041B\u0401\u0413\u041A\u0410\u042F", "\u041D\u041E\u0420\u041C\u0410\u041B\u042C\u041D\u0410\u042F", "\u0422\u042F\u0416\u0401\u041B\u0410\u042F"][sel.diff] : ""), RW / 2, 232);
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
      g.fillText("\u0410\u0420\u0415\u041D\u0410: " + AR[battle.arena].n, RW / 2, 170);
      if (vsEscT > 0 && blink()) {
        g.font = '8px "Russo One"';
        g.fillStyle = "#e04020";
        g.fillText("\u0415\u0429\u0401 \u0420\u0410\u0417 ESC \u2014 \u041F\u041E\u041A\u0418\u041D\u0423\u0422\u042C \u0422\u0423\u0420\u041D\u0418\u0420", RW / 2, 200);
      } else if (vsT > 50 && blink()) {
        g.font = '9px "Russo One"';
        g.fillStyle = "#e8e0c0";
        g.fillText("J \u2014 \u041D\u0410\u0427\u0410\u0422\u042C \u0411\u041E\u0419", RW / 2, 214);
      }
    }
    function drawEnd() {
      bgFill();
      panel(112, 14, 200, 26);
      g.font = '10px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u041F\u041E\u0411\u0415\u0414\u0418\u0422\u0415\u041B\u042C \u0422\u0423\u0420\u041D\u0418\u0420\u0410", RW / 2, 31);
      const d = CH[arcP1];
      drawPort(d, RW / 2, 92, 2.4);
      g.font = '16px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.fillText(d.name, RW / 2, 146);
      if (blink()) {
        g.fillStyle = "#807850";
        g.font = '8px "Russo One"';
        g.fillText("J \u2014 \u0432 \u043C\u0435\u043D\u044E", RW / 2, 228);
      }
    }
    function drawTop() {
      bgFill();
      g.font = '15px "Russo One"';
      g.fillStyle = "#e8c040";
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
        g.fillText(e.step + " / " + (CH.length - 1), 300, y);
      });
      if (blink()) {
        g.font = '8px "Russo One"';
        g.fillStyle = "#807850";
        g.textAlign = "center";
        g.fillText("J / ESC \u2014 \u041D\u0410\u0417\u0410\u0414", RW / 2, 228);
      }
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
      if (blink()) {
        g.fillStyle = "#807850";
        g.fillText("J \u2014 \u0432 \u043C\u0435\u043D\u044E", RW / 2, 180);
      }
    }
    function drawCont() {
      bgFill();
      bigText("\u041F\u0420\u041E\u0414\u041E\u041B\u0416\u0418\u0422\u042C?", 84, "#e8c040", 1.1);
      const n = Math.max(0, Math.ceil(contT / 60));
      const sc = 1 + 0.15 * Math.sin(FRAME * 0.3);
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
      if (blink()) {
        g.font = '10px "Russo One"';
        g.fillStyle = "#e8e0c0";
        g.textAlign = "center";
        g.fillText("J \u2014 \u0414\u0410", RW / 2, 206);
      }
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
      g.fillStyle = "rgba(224,32,32," + (0.45 + 0.45 * Math.sin(FRAME * 0.08)) + ")";
      g.fillRect(ox + 2 * px, oy + 7 * px, 2 * px, 2 * px);
      g.fillRect(ox + 10 * px, oy + 7 * px, 2 * px, 2 * px);
    }
    function drawTitle() {
      bgFill();
      drawSkull(RW / 2, 58 + Math.sin(titleT * 0.03) * 3, 4.2);
      titleT++;
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
          g.fillText("\u0420\u0415\u041A\u041E\u0420\u0414: " + CH[tp[0].id].name + " \u2014 " + tp[0].step + " / " + (CH.length - 1), RW / 2, 200);
        }
      } catch (e) {
      }
      if (blink()) {
        g.fillStyle = "#e8e0c0";
        g.font = '11px "Russo One"';
        g.fillText("\u041D\u0410\u0416\u041C\u0418 \u041B\u042E\u0411\u0423\u042E \u041A\u041B\u0410\u0412\u0418\u0428\u0423", RW / 2, 216);
      }
    }
    function drawMenu() {
      bgFill();
      g.font = '22px "Rubik Mono One","Russo One",sans-serif';
      g.textAlign = "center";
      g.fillStyle = "#000";
      g.fillText("KARNAGE", RW / 2 + 2, 42);
      g.fillStyle = "#e02020";
      g.fillText("KARNAGE", RW / 2, 40);
      const gl2 = 0.12 + Math.sin(FRAME * 0.04) * 0.06;
      g.globalAlpha = Math.max(0, gl2);
      g.fillStyle = "#e02020";
      g.fillRect(RW / 2 - 90, 20, 180, 30);
      g.globalAlpha = 1;
      panel(36, 62, 196, 130);
      const items = ["\u0410\u0420\u041A\u0410\u0414\u0410", "\u0411\u041E\u0419 \u041F\u0420\u041E\u0422\u0418\u0412 CPU", "\u0411\u041E\u0419 \u041D\u0410 \u0414\u0412\u041E\u0418\u0425", "\u0423\u041F\u0420\u0410\u0412\u041B\u0415\u041D\u0418\u0415", "\u0417\u0410\u041B \u0421\u041B\u0410\u0412\u042B"];
      items.forEach((it, i) => {
        const y = 84 + i * 22, on = i === menuIdx;
        g.font = on ? '13px "Russo One"' : '11px "Russo One"';
        g.fillStyle = on ? blink() ? "#fff" : "#e02020" : "#c8a040";
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
      const si = FRAME / 300 % CH.length | 0;
      drawFake(si, 320, 158, 1.15, -1);
      g.font = '8px "Russo One"';
      g.fillStyle = "#e8e0c0";
      g.textAlign = "center";
      g.fillText(CH[si].name, 320, 172);
      if (blink()) {
        g.font = '8px "Russo One"';
        g.fillStyle = "#807850";
        g.textAlign = "center";
        g.fillText("W/S \u2014 \u0432\u044B\u0431\u043E\u0440 \xB7 J \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \xB7 M \u2014 \u0437\u0432\u0443\u043A", RW / 2, 212);
      }
    }
    function drawPause() {
      g.fillStyle = "rgba(0,0,0,.65)";
      g.fillRect(0, 0, RW, RH);
      panel(10, 50, RW - 20, 158);
      g.font = '13px "Russo One"';
      g.fillStyle = "#e8c040";
      g.textAlign = "center";
      g.fillText("\u041F\u0410\u0423\u0417\u0410", RW / 2, 64);
      pauseItems().forEach((it, i) => {
        const y = 84 + i * 16, on = i === pauseIdx;
        g.font = on ? '9px "Russo One"' : '8px "Russo One"';
        g.fillStyle = on ? blink() ? "#fff" : "#e02020" : "#c8a040";
        g.textAlign = "center";
        g.fillText((on ? "> " : "") + it, 100, y);
      });
      const ab = (f, x) => {
        const d = f.def, p2 = f === battle.p2;
        g.font = '8px "Russo One"';
        g.fillStyle = "#e02020";
        g.textAlign = "center";
        g.fillText(d.name, x, 84);
        g.font = '7px "Russo One"';
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0421\u041F\u0415\u0426: " + d.specN, x, 96);
        g.fillStyle = "#c8a040";
        g.fillText("[" + seqTxt(d.spec, p2) + "]", x, 106);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0421\u041F\u0415\u04262: " + d.spec2N, x, 118);
        g.fillStyle = "#c8a040";
        g.fillText("[" + seqTxt(d.spec2, p2) + "]", x, 128);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0421\u0423\u041F\u0415\u0420: " + d.sup, x, 140);
        g.fillStyle = "#c8a040";
        g.fillText("[" + seqTxt("DDP", p2) + "] \u043F\u0440\u0438 \u044F\u0440\u043E\u0441\u0442\u0438 100", x, 150);
        g.fillStyle = "#e8e0c0";
        g.fillText("\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418: [" + seqTxt(d.fat, p2) + "]", x, 162);
      };
      ab(battle.p1, 215);
      ab(battle.p2, 345);
    }
    let last = 0, acc = 0;
    function loop(ts) {
      requestAnimationFrame(loop);
      acc += Math.min(50, ts - last);
      last = ts;
      while (acc >= 1e3 / 60) {
        acc -= 1e3 / 60;
        step();
      }
      render();
    }
    function step() {
      FRAME++;
      music();
      if (GAME === "fight") {
        const b = battle;
        if (b.phase !== "fight" || !paused) ambient();
        if (!paused) {
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
          if (battle) {
            updProjs();
            updParts();
            updFx();
            shake = Math.max(0, shake - 0.5);
            flashS = Math.max(0, flashS - 1);
            const mid = (battle.p1.x + battle.p2.x) / 2;
            cam = clamp(lerp(cam, mid - RW / 2, 0.12), 0, AW - RW);
            cam = Math.round(cam);
          }
        } else {
          updParts();
          updFx();
        }
        if (battle) {
          battle.p1.ctrl.poll(FRAME);
          battle.p2.ctrl.poll(FRAME);
        }
      } else {
        updParts();
        if (["title", "menu", "continue", "gameover", "top"].includes(GAME) && FRAME % 3 === 0)
          parts.push({ x: rnd(0, RW), y: RH + 4, vx: rnd(-0.2, 0.2), vy: -rnd(0.6, 1.4), c: pick(["#f06020", "#c84018", "#f0a030"]), l: rnd(60, 140), s: rnd(1, 2), gv: -5e-3 });
      }
      if (GAME === "continue") {
        contT--;
        if (contT <= 0) toLobby("gameover");
      }
      if (announce) announce.t++;
      if (wipe > 0) wipe--;
      if (GAME === "vs" || GAME === "select") vsT++;
      if (vsEscT > 0) vsEscT--;
    }
    function render() {
      g.setTransform(2, 0, 0, 2, 0, 0);
      g.fillStyle = "#000";
      g.fillRect(0, 0, RW, RH);
      if (GAME === "title") {
        drawTitle();
        drawParts(0);
        return;
      }
      if (GAME === "menu") {
        drawMenu();
        drawParts(0);
        return;
      }
      if (GAME === "controls") {
        drawControls();
        return;
      }
      if (GAME === "select") {
        drawSelect();
        return;
      }
      if (GAME === "vs") {
        drawVS();
        return;
      }
      if (GAME === "ending") {
        drawEnd();
        drawParts(0);
        return;
      }
      if (GAME === "gameover") {
        drawOver();
        drawParts(0);
        return;
      }
      if (GAME === "top") {
        drawTop();
        drawParts(0);
        return;
      }
      if (GAME === "continue") {
        drawCont();
        drawParts(0);
        return;
      }
      if (GAME === "rematch") {
        drawRematch();
        drawParts(0);
        return;
      }
      const b = battle;
      g.save();
      if (shake > 0) g.translate(rnd(-shake, shake) | 0, rnd(-shake, shake) | 0);
      drawArena(b.arena, cam, FRAME);
      for (const ff of [b.p1, b.p2]) if (ff.marks) for (const m of ff.marks) {
        const mx2 = m.x - cam;
        if (mx2 > -20 && mx2 < RW + 20) {
          g.save();
          g.translate(mx2, m.y);
          g.rotate(FRAME * 0.05);
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
      g.fillStyle = "#b01818";
      for (const d of decals) {
        const a = d.l ? 1 - Math.max(0, (d.t - d.l * 0.6) / (d.l * 0.4)) : 1;
        g.globalAlpha = a;
        g.fillRect(d.x - cam, d.y, d.s, d.s > 2 ? 2 : 1);
      }
      g.globalAlpha = 1;
      for (const f of [b.p2, b.p1]) drawF(f, cam);
      if (b.p1.state === "super" && b.p1.def.id === 5 && b.p1.st > 14 && b.p1.st < 90) {
        g.globalAlpha = 0.5;
        drawFakeShift(b.p1, cam, -30);
        drawFakeShift(b.p1, cam, 30);
        g.globalAlpha = 1;
      }
      if (b.p2.state === "super" && b.p2.def.id === 5 && b.p2.st > 14 && b.p2.st < 90) {
        g.globalAlpha = 0.5;
        drawFakeShift(b.p2, cam, -30);
        drawFakeShift(b.p2, cam, 30);
        g.globalAlpha = 1;
      }
      drawProjs(cam);
      drawFx(cam);
      drawParts(cam);
      g.fillStyle = "rgba(0,0,0,.4)";
      for (let i = 0; i < 12; i++) {
        const x = Math.round(((i * 67 - cam * 1.25) % (RW + 67) + RW + 67) % (RW + 67) - 33), h2 = 6 + i * 13 % 14;
        g.beginPath();
        g.moveTo(x - 9, RH);
        g.lineTo(x, RH - h2);
        g.lineTo(x + 9, RH);
        g.fill();
      }
      if (b.p1.state === "super" || b.p2.state === "super" || b.phase === "fatal") {
        g.fillStyle = "rgba(10,0,0,.22)";
        g.fillRect(0, 0, RW, RH);
      }
      if (b.loser && b.loser.laserT && b.phase === "fatal" && b.phaseT > 60 && b.phaseT < 160) {
        g.fillStyle = "rgba(248,248,96,.8)";
        g.fillRect(b.loser.x - cam - 6, 0, 12, FL + GR);
      }
      g.restore();
      if (flashS > 0) {
        g.fillStyle = "rgba(255,255,255," + flashS / 10 + ")";
        g.fillRect(0, 0, RW, RH);
      }
      drawHUD(b);
      if (wipe > 0) {
        const wh = RH * (wipe / 24);
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
      if (b.phase === "finish" && !b.winner.ctrl.ai) {
        g.font = '10px "Russo One"';
        g.fillStyle = blink() ? "#e02020" : "#e8c040";
        g.textAlign = "center";
        g.fillText("\u0424\u0410\u0422\u0410\u041B\u0418\u0422\u0418: " + seqTxt(b.winner.def.fat, b.winner === b.p2), RW / 2, 232);
      }
      if (announce && announce.t < 110) {
        const t = announce.t;
        const sc = t < 10 ? 3 - t * 0.2 : 1;
        let a = 1;
        if (t > 90) a = 1 - (t - 90) / 20;
        g.save();
        g.globalAlpha = clamp(a, 0, 1);
        let col = announce.col;
        if (announce.pulse) col = blink() ? "#e02020" : "#e8c040";
        bigText(announce.txt, 118, col, sc);
        g.restore();
      }
      if (paused) drawPause();
    }
    function drawFakeShift(f, cam2, off) {
      const sx = f.x;
      f.x = sx + off;
      drawF(f, cam2);
      f.x = sx;
    }
    requestAnimationFrame(loop);
    if (new URLSearchParams(location.search).has("debug")) {
      window.KARNAGE = {
        get GAME() {
          return GAME;
        },
        get FRAME() {
          return FRAME;
        },
        get paused() {
          return paused;
        },
        get battle() {
          return battle;
        },
        get projs() {
          return projs;
        },
        get parts() {
          return parts;
        },
        get fx() {
          return fx;
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
        autoHit,
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
        KM1,
        KM2,
        CH,
        AR,
        ATK,
        setSeed(seed) {
          Math.random = mul(seed | 0);
        },
        setDebug(values) {
          if ("GAME" in values) GAME = values.GAME;
          if ("paused" in values) paused = values.paused;
          if ("lastSel" in values) lastSel = values.lastSel;
          if ("contT" in values) contT = values.contT;
          if ("arcP1" in values) arcP1 = values.arcP1;
          if ("sel" in values) sel = values.sel;
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
            GAME,
            FRAME,
            paused,
            phase: battle && battle.phase,
            round: battle && battle.round,
            timer: battle && battle.timer,
            winner: battle && battle.winner && battle.winner.def.id,
            loser: battle && battle.loser && battle.loser.def.id,
            p1: battle && f(battle.p1),
            p2: battle && f(battle.p2),
            projs: projs.length,
            parts: parts.length,
            fx: fx.length
          };
        }
      };
    }
  }

  // src/main.js
  startKarnage();
})();
