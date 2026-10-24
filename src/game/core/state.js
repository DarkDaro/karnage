export function createSelection(mode = 'cpu') {
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

export function createState() {
  return {
    GAME: 'title',
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
    lastSel: null, // реванш теми же бойцами
    vsEscT: 0, // подтверждение выхода из аркады
    bstat: null, // статистика боя для экрана реванша
    parts: [],
    projs: [],
    decals: [],
    fx: [],
    last: 0,
    acc: 0
  };
}

export function setScreen(state, screen) {
  state.GAME = screen;
  state.cam = 0;
  state.parts.length = 0;
  state.decals.length = 0;
  state.projs.length = 0;
  state.fx.length = 0;
  state.announce = null;
  state.paused = false;
  if (screen === 'menu') state.menuIdx = 0;
  if (screen === 'settings') state.settingsIdx = 0;
}

export function beginBattle(state, battle, bstat) {
  state.battle = battle;
  state.parts.length = 0;
  state.projs.length = 0;
  state.decals.length = 0;
  state.fx.length = 0;
  state.bstat = bstat;
}

export function resetRound(state, wipe) {
  state.freeze = 0;
  state.shake = 0;
  state.flashS = 0;
  state.wipe = wipe; // шторки раунда
  state.decals.length = 0; // кровь и снаряды не копятся между раундами
  state.projs.length = 0;
  state.fx.length = 0;
}
