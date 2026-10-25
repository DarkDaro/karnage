// Ростер: базовые бойцы и добавленные через push.
export const CH = [

{id:0,name:'ЭМБЕР',en:'EMBER',skin:'#c8845a',suit:'#8a2418',acc:'#f0a032',hair:'#3a1408',gear:'hair',h:60,bulk:1,spd:2,jmp:8.4,dmg:1,specN:'Огненный шар',spec:'DRP',sup:'Метеоритный дождь',fat:'RRLP',arena:6},
{id:1,name:'ГЕЙСТ',en:'GEIST',skin:'#a9b6bd',suit:'#3d4750',acc:'#9fb4bd',hair:'#111',gear:'mask',h:62,bulk:.95,spd:2.3,jmp:8.8,dmg:.95,specN:'Тени-скачок',spec:'RRP',sup:'Кунай-цепь',fat:'LLRP',arena:1},
{id:2,name:'ВОЛЬТ',en:'VOLT',skin:'#d8a05a',suit:'#2b4a8a',acc:'#f2d23a',hair:'#1a1a1a',gear:'helm',h:63,bulk:1.05,spd:2.1,jmp:8.5,dmg:1,specN:'Столп молний',spec:'DUP',sup:'Гроза',fat:'DDRP',arena:2},
{id:3,name:'БАЗАЛЬТ',en:'BASALT',skin:'#8a7256',suit:'#4a4038',acc:'#7a6a54',hair:'#2a241e',gear:'horn',h:74,bulk:1.45,spd:1.6,jmp:7.2,dmg:1.2,specN:'Сейсмическая волна',spec:'LRK',sup:'Кулаки недр',fat:'LRDP',arena:3},
{id:4,name:'ФЭНГ',en:'FANG',skin:'#c8965e',suit:'#8a7218',acc:'#e8e0c0',hair:'#141210',gear:'mask',claws:1,h:61,bulk:.95,spd:2.4,jmp:8.8,dmg:.9,specN:'Отравленный коготь',spec:'DRK',sup:'Сотня порезов',fat:'RLDP',arena:4},
{id:5,name:'САХРА',en:'SAHRA',skin:'#b8824e',suit:'#7a6a3a',acc:'#3aa8a0',hair:'#201408',gear:'hood',h:55,bulk:.85,spd:2.6,jmp:9.2,dmg:.9,specN:'Песчаная дымка',spec:'LLK',sup:'Зеркала пустыни',fat:'DLLP',arena:5},
{id:6,name:'КРИО',en:'KRYO',skin:'#8ab4c8',suit:'#1e4a6a',acc:'#c8ecff',hair:'#0a1420',gear:'mask',h:62,bulk:1,spd:2,jmp:8.4,dmg:1,specN:'Ледяная сфера',spec:'DLP',sup:'Абсолютный ноль',fat:'LDDP',arena:7},
{id:7,name:'РЖАВЫЙ',en:'RUST',skin:'#9aa48a',suit:'#4a5240',acc:'#d84a2a',hair:'#333',gear:'visor',h:64,bulk:1.1,spd:2,jmp:8.2,dmg:1.05,specN:'Сеть-ловушка',spec:'RLP',sup:'Ковровый залп',fat:'RDRP',arena:8},
{id:8,name:'НОКТЮРН',en:'NOCTURNE',skin:'#d8d0d8',suit:'#2a1a3a',acc:'#7a3aa8',hair:'#0a0612',gear:'hood',cape:1,h:63,bulk:1,spd:2.2,jmp:8.6,dmg:1,specN:'Сгусток тьмы',spec:'DRP',sup:'Воронка душ',fat:'DRDP',arena:9},
{id:9,name:'КАЙЗЕР',en:'KAISER',skin:'#c89868',suit:'#3a4a2a',acc:'#c8b060',hair:'#3a2a14',gear:'band',h:65,bulk:1.15,spd:1.9,jmp:8,dmg:1.1,specN:'Энерговолна',spec:'DDK',sup:'Орбитальный залп',fat:'RLRP',arena:0}
];

CH[0].spec2='DRK';CH[0].spec2N='Огненный веер';// Эмбер: ↓→+K — 3 шара веером
CH[1].spec2='RRK';CH[1].spec2N='Хватка тени';// Гейст: →→+K — телепорт за спину + удар
CH[2].spec2='UUP';CH[2].spec2N='Грозовой столб';// Вольт: ↑↑+P — 3 болта по площади
CH[3].spec2='LLP';CH[3].spec2N='Камнепад';// Базальт: ←←+P — 3 метеора на врага
CH[4].spec2='RDP';CH[4].spec2N='Рой клинков';// Фэнг: →↓+P — 3 быстрых клинка
CH[5].spec2='RRP';CH[5].spec2N='Песчаный жернов';// Сахра: →→+P — медленный, валит с ног
CH[6].spec2='URK';CH[6].spec2N='Ледяные иглы';// Крио: ↑→+K — 3 быстрых иглы
CH[7].spec2='RDK';CH[7].spec2N='Двойная граната';// Ржавый: →↓+K — две гранаты по дуге
CH[8].spec2='ULP';CH[8].spec2N='Проклятие';// Ноктюрн: ↑←+P — отравляющий снаряд
CH[9].spec2='URP';CH[9].spec2N='Тяжёлый снаряд';// Кайзер: ↑→+P — медленный, валит с ног
CH.push({id:10,name:'КАРМИН',en:'CARMINE',skin:'#e8d8d0',suit:'#6a1020',acc:'#d82040',hair:'#d8d0e0',gear:'corona',dress:1,longhair:1,fan:1,female:1,h:58,bulk:.9,spd:2.2,jmp:8.6,dmg:.95,specN:'Кровавые иглы',spec:'RDP',sup:'Алый пион',fat:'RDLP',arena:9});// 30.09: Кровавая графиня — магия крови, не вампир; 25.10: своё фаталити, не дубль Фэнга; 25.10: женский силуэт и лицо
CH.push({id:11,name:'АЯМЭ',en:'AYAME',skin:'#e0c8b8',suit:'#1a1f33',acc:'#7ac8d8',hair:'#0a0d1a',gear:'tail',blade:1,h:57,bulk:.85,spd:2.7,jmp:9.2,dmg:1,specN:'Полумесяц',spec:'DRP',sup:'Сто теней',fat:'LDRP',arena:4});// 30.09: Лунная синоби — ассасинка с катаной
CH.push({id:12,name:'ВЕГА',en:'VEGA',skin:'#c8a888',suit:'#241540',acc:'#b89aff',hair:'#e8e8ff',gear:'halo',bow:1,ponytail:1,skirt:1,female:1,h:60,bulk:.95,spd:2.3,jmp:8.8,dmg:1.05,specN:'Звёздная метка',spec:'UDK',sup:'Небесный ловец',fat:'UDRP',arena:1});// 30.09: Астральная охотница — метки и самонаводящиеся звёзды; 01.10: фаталити UDRP — с ударной кнопкой (старое UDLR не срабатывало: finishUpd требует pP/pK)
CH[10].spec2='RRK';CH[10].spec2N='Кровавые шипы';// Кармин: →→+K — шипы из пролитой крови
CH[11].spec2='RRP';CH[11].spec2N='Сквозь тень';// Аямэ: →→+P — проход сквозь врага с ударом в спину
CH[12].spec2='RUK';CH[12].spec2N='Прыжок сквозь звёзды';// Вега: →↑+K — мигание к метке

// Финальный босс аркады: усиленный Кайзер, не входит в выбор и обычный ростер.
export const BOSS = {
  ...CH[9],
  boss: true,
  name: 'КАЙЗЕР-ПРАЙМ',
  en: 'PRIME KAISER',
  specN: 'Корона-залп',
  spec2N: 'Метеоритный приговор',
  sup: 'Орбитальная корона',
  skin: '#e0b484',
  suit: '#181820',
  acc: '#f0c850',
  hair: '#e8e0c8',
  gear: 'corona',
  cape: 1,
  h: 72,
  bulk: 1.28,
  spd: 2.05,
  jmp: 8.2,
  dmg: 1.28,
  arena: 8
};

// 25.10: у каждого бойца свой захват-бросок; P+K — общий вход, дальше персонаж добивает по-своему.
const THROW_DATA = {
  0: { throwN: 'ПЕПЕЛЬНЫЙ ВЗРЫВ', throwT: 'fire', throwC: '#f06020', throwD: 10 },
  1: { throwN: 'ТЕНЕВОЙ СБРОС', throwT: 'shadow', throwC: '#9fb4bd', throwD: 9 },
  2: { throwN: 'РАЗРЯД В УПОР', throwT: 'shock', throwC: '#f8f860', throwD: 10 },
  3: { throwN: 'КАМЕННЫЙ ГРОХОТ', throwT: 'slam', throwC: '#8a7a5c', throwD: 13 },
  4: { throwN: 'ЯДОВИТЫЙ УКУС', throwT: 'claw', throwC: '#7ac83a', throwD: 9 },
  5: { throwN: 'ЗЕРКАЛЬНЫЙ ВИХРЬ', throwT: 'sand', throwC: '#c8a060', throwD: 9 },
  6: { throwN: 'ЛЕДЯНАЯ ГРОБНИЦА', throwT: 'ice', throwC: '#c8ecff', throwD: 9 },
  7: { throwN: 'РЖАВАЯ ПЕРЕГРУЗКА', throwT: 'blast', throwC: '#c8c8a0', throwD: 11 },
  8: { throwN: 'ПОХИЩЕНИЕ СНА', throwT: 'drain', throwC: '#7a3aa8', throwD: 8 },
  9: { throwN: 'КОРОЛЕВСКИЙ ПРИГОВОР', throwT: 'royal', throwC: '#f8f860', throwD: 12 },
  10: { throwN: 'АЛАЯ ЖАТВА', throwT: 'blood', throwC: '#d82040', throwD: 10 },
  11: { throwN: 'ЛУННЫЙ СНОС', throwT: 'blade', throwC: '#9adcee', throwD: 10 },
  12: { throwN: 'ЗВЁЗДНЫЙ ШВЫРОК', throwT: 'star', throwC: '#b89aff', throwD: 9 }
};
for (const c of CH) Object.assign(c, THROW_DATA[c.id]);
Object.assign(BOSS, { throwN: 'ПРИГОВОР КОРОНЫ', throwT: 'royal', throwC: '#f0c850', throwD: 14 });

// 25.10: командный бросок D+P+K — отдельное имя и чуть больше урона.
const CMD_THROW_NAMES = ['ПЕПЕЛЬНЫЙ ОБХВАТ', 'ТЕНЕВОЙ ПЕРЕЛОМ', 'КОРОТКОЕ ЗАМЫКАНИЕ', 'ГОРНЫЙ СЛОМ', 'ЯДОВИТЫЙ ЗАХВАТ', 'ПЕСЧАНЫЙ ПЛЕН', 'ЛЕДЯНОЙ КАПКАН', 'РЖАВЫЙ ЗАЖИМ', 'СОННЫЙ ПЛЕН', 'КОРОЛЕВСКИЙ ЗАХВАТ', 'АЛЫЙ ПЛЕН', 'ЛУННЫЙ ЗАХВАТ', 'ЗВЁЗДНЫЙ ЗАХВАТ'];
for (const c of CH) c.throwCmdN = CMD_THROW_NAMES[c.id];
BOSS.throwCmdN = 'КОРОНА-ЗАХВАТ';
// 25.10: два тяжёлых грэпплера получили усиленный командный бросок с коротким армором.
Object.assign(CH[3], { grappler: true, throwCmdD: 18, throwCmdT: 'slam' });
Object.assign(CH[7], { grappler: true, throwCmdD: 16, throwCmdT: 'blast' });

// 25.10: у каждого бойца свои нормалы и три командных нормала.
// 25.10: профиль задаёт старт/восстановление/вынос/размер хитбокса/отброс для всех нормалов.
const NORMAL_BASE = {
  punch: { d: 6, wd: 5, ac: 3, rc: 8, rng: 28, hw: 28, hh: .72, kb: 2, status: 'stagger' },
  kick: { d: 9, wd: 7, ac: 4, rc: 11, rng: 36, hw: 36, hh: .6, kb: 3, status: 'stagger' },
  upper: { d: 15, wd: 6, ac: 4, rc: 15, rng: 24, hw: 24, hh: .5, kb: 3, launch: 1, status: 'launch' },
  sweep: { d: 10, wd: 6, ac: 3, rc: 13, rng: 38, hw: 38, hh: .12, kb: 3, low: 1, status: 'low' },
  jkick: { d: 10, wd: 4, ac: 8, rc: 20, rng: 34, hw: 34, hh: .4, kb: 3, overhead: 1, status: 'overhead' },
  rh: { d: 12, wd: 8, ac: 4, rc: 15, rng: 40, hw: 40, hh: .55, kb: 5, knock: 1, status: 'knockdown' }
};
const NORMAL_STYLE = {
  0: { startup: .98, active: 1, recovery: .96, reach: 1.02, box: 1, kb: 1 },
  1: { startup: .88, active: 1, recovery: .9, reach: .98, box: .95, kb: .9 },
  2: { startup: 1, active: 1.05, recovery: 1, reach: 1, box: 1, kb: 1 },
  3: { startup: 1.24, active: 1.15, recovery: 1.2, reach: .92, box: 1.15, kb: 1.35 },
  4: { startup: .9, active: 1.1, recovery: .92, reach: .98, box: .95, kb: .9 },
  5: { startup: .82, active: 1, recovery: .88, reach: .96, box: .9, kb: .85 },
  6: { startup: 1, active: 1, recovery: 1, reach: 1.04, box: 1, kb: 1 },
  7: { startup: 1.08, active: 1.05, recovery: 1.05, reach: 1.08, box: 1.06, kb: 1.1 },
  8: { startup: .95, active: 1, recovery: .95, reach: 1.02, box: 1, kb: 1 },
  9: { startup: 1.12, active: 1.1, recovery: 1.08, reach: 1.1, box: 1.1, kb: 1.2 },
  10: { startup: .9, active: 1, recovery: .92, reach: .95, box: .92, kb: .9 },
  11: { startup: .78, active: 1.05, recovery: .85, reach: .96, box: .9, kb: .85 },
  12: { startup: .9, active: 1, recovery: .95, reach: 1.02, box: .95, kb: .95 }
};
const CMD_DEFAULT = {
  fP: { t: 'punch', d: 8, wd: 6, ac: 3, rc: 10, rng: 32, hh: .7 },
  fK: { t: 'kick', d: 11, wd: 8, ac: 4, rc: 14, rng: 40, hh: .55, knock: 1 },
  bP: { t: 'punch', d: 7, wd: 5, ac: 4, rc: 9, rng: 28, hh: .65 }
};
function tuneMove(id, base) {
  const p = NORMAL_STYLE[id] || NORMAL_STYLE[0];
  return {
    ...base,
    wd: Math.max(3, Math.round(base.wd * p.startup)),
    ac: Math.max(2, Math.round(base.ac * p.active)),
    rc: Math.max(5, Math.round(base.rc * p.recovery)),
    rng: Math.round(base.rng * p.reach),
    hw: Math.round((base.hw || base.rng) * p.reach),
    hh: +(base.hh * p.box).toFixed(2),
    kb: +(base.kb * p.kb).toFixed(1)
  };
}
function buildNormals(id, data) {
  const out = {};
  for (const type of Object.keys(NORMAL_BASE)) out[type] = { ...tuneMove(id, NORMAL_BASE[type]), ...(data[type] || {}) };
  return out;
}
function buildCommands(id, data) {
  const out = {};
  for (const key of Object.keys(CMD_DEFAULT)) {
    const base = tuneMove(id, { ...CMD_DEFAULT[key], hw: CMD_DEFAULT[key].rng, kb: CMD_DEFAULT[key].knock ? 5 : 2, status: CMD_DEFAULT[key].knock ? 'knockdown' : 'stagger' });
    out[key] = { ...base, ...(data[key] || {}) };
  }
  return out;
}
const NORMAL_DATA = {
  0: { norm: { punch: { d: 7 }, kick: { d: 8 }, upper: { d: 16 }, sweep: { d: 9 }, rh: { d: 13 }, jkick: { d: 10 } }, cmd: { fP: { n: 'ПЛАМЕННЫЙ ПРЯМОЙ', d: 9 }, fK: { n: 'ОГНЕННЫЙ ПИНОК', d: 12 }, bP: { n: 'ПЕПЕЛЬНЫЙ КОНТР', d: 8 } } },
  1: { norm: { punch: { d: 5, rng: 30 }, kick: { d: 8, rng: 38 }, upper: { d: 14 }, sweep: { d: 9 }, rh: { d: 11 }, jkick: { d: 11 } }, cmd: { fP: { n: 'ТЕНЕВОЙ ПРЯМОЙ', d: 7, rng: 33 }, fK: { n: 'СКОЛЬЗЯЩИЙ ПИНОК', d: 10, rng: 41 }, bP: { n: 'ОБРАТНЫЙ КОНТР', d: 6, rng: 30 } } },
  2: { norm: { punch: { d: 6, rng: 30 }, kick: { d: 8 }, upper: { d: 15 }, sweep: { d: 9 }, rh: { d: 12 }, jkick: { d: 10 } }, cmd: { fP: { n: 'РАЗРЯДНЫЙ ПРЯМОЙ', d: 8, rng: 33 }, fK: { n: 'ГРОЗОВОЙ ПИНОК', d: 11 }, bP: { n: 'ЭЛЕКТРОКОНТР', d: 7, rng: 29 } } },
  3: { norm: { punch: { d: 8, wd: 6 }, kick: { d: 11, wd: 8 }, upper: { d: 16, wd: 8 }, sweep: { d: 12, wd: 8 }, rh: { d: 14, wd: 10 }, jkick: { d: 12, wd: 6 } }, cmd: { fP: { n: 'КАМЕННЫЙ ПРЯМОЙ', d: 10, wd: 7 }, fK: { n: 'ТЯЖЁЛЫЙ ПИНОК', d: 13, wd: 9 }, bP: { n: 'ГОРНЫЙ КОНТР', d: 9, wd: 6 } } },
  4: { norm: { punch: { d: 5, rng: 29 }, kick: { d: 7, rng: 38 }, upper: { d: 13 }, sweep: { d: 8 }, rh: { d: 10 }, jkick: { d: 9 } }, cmd: { fP: { n: 'КОГТЕВОЙ ПРЯМОЙ', d: 7, rng: 32 }, fK: { n: 'ЯДОВИТЫЙ ПИНОК', d: 9, rng: 40 }, bP: { n: 'ЗАСАДНЫЙ КОНТР', d: 6, rng: 30 } } },
  5: { norm: { punch: { d: 5, rng: 30 }, kick: { d: 7, rng: 38 }, upper: { d: 12 }, sweep: { d: 9 }, rh: { d: 10 }, jkick: { d: 9 } }, cmd: { fP: { n: 'ПЕСЧАНЫЙ ПРЯМОЙ', d: 7, rng: 33 }, fK: { n: 'ВИХРЕВОЙ ПИНОК', d: 9, rng: 41 }, bP: { n: 'МИРАЖНЫЙ КОНТР', d: 6, rng: 30 } } },
  6: { norm: { punch: { d: 6, rng: 30 }, kick: { d: 8, rng: 38 }, upper: { d: 15 }, sweep: { d: 10 }, rh: { d: 12 }, jkick: { d: 10 } }, cmd: { fP: { n: 'ЛЕДЯНОЙ ПРЯМОЙ', d: 8, rng: 33 }, fK: { n: 'СТУДЁНЫЙ ПИНОК', d: 11 }, bP: { n: 'МОРОЗНЫЙ КОНТР', d: 7 } } },
  7: { norm: { punch: { d: 7 }, kick: { d: 10 }, upper: { d: 16 }, sweep: { d: 11 }, rh: { d: 13 }, jkick: { d: 11 } }, cmd: { fP: { n: 'ЖЕЛЕЗНЫЙ ПРЯМОЙ', d: 9 }, fK: { n: 'ШЛАКОВЫЙ ПИНОК', d: 13 }, bP: { n: 'РЖАВЫЙ КОНТР', d: 8 } } },
  8: { norm: { punch: { d: 6, rng: 31 }, kick: { d: 8, rng: 39 }, upper: { d: 14 }, sweep: { d: 9 }, rh: { d: 11 }, jkick: { d: 10 } }, cmd: { fP: { n: 'СУМРАЧНЫЙ ПРЯМОЙ', d: 8, rng: 34 }, fK: { n: 'ТЕНЕВОЙ ПИНОК', d: 10, rng: 42 }, bP: { n: 'КОШМАРНЫЙ КОНТР', d: 7, rng: 31 } } },
  9: { norm: { punch: { d: 7, rng: 29 }, kick: { d: 10, rng: 37 }, upper: { d: 17 }, sweep: { d: 11 }, rh: { d: 14 }, jkick: { d: 11 } }, cmd: { fP: { n: 'КОРОЛЕВСКИЙ ПРЯМОЙ', d: 9 }, fK: { n: 'СТАЛЬНОЙ ПИНОК', d: 13 }, bP: { n: 'ВЛАСТНЫЙ КОНТР', d: 8 } } },
  10: { norm: { punch: { d: 5, rng: 29 }, kick: { d: 7, rng: 37 }, upper: { d: 13 }, sweep: { d: 8 }, rh: { d: 10 }, jkick: { d: 9 } }, cmd: { fP: { n: 'КРОВАВЫЙ ПРЯМОЙ', d: 7 }, fK: { n: 'АЛЫЙ ПИНОК', d: 9 }, bP: { n: 'БАГРОВЫЙ КОНТР', d: 6 } } },
  11: { norm: { punch: { d: 5, rng: 31, wd: 4 }, kick: { d: 7, rng: 40, wd: 6 }, upper: { d: 12 }, sweep: { d: 8 }, rh: { d: 10 }, jkick: { d: 11 } }, cmd: { fP: { n: 'ЛУННЫЙ ПРЯМОЙ', d: 7, rng: 34 }, fK: { n: 'СЕРПОВЫЙ ПИНОК', d: 9, rng: 42 }, bP: { n: 'ТЕНЕВОЙ КОНТР', d: 6, rng: 31 } } },
  12: { norm: { punch: { d: 6, rng: 31 }, kick: { d: 8, rng: 40 }, upper: { d: 14 }, sweep: { d: 9 }, rh: { d: 11 }, jkick: { d: 12 } }, cmd: { fP: { n: 'ЗВЁЗДНЫЙ ПРЯМОЙ', d: 8, rng: 34 }, fK: { n: 'КОМЕТНЫЙ ПИНОК', d: 10, rng: 42 }, bP: { n: 'НЕБЕСНЫЙ КОНТР', d: 7, rng: 31 } } }
};
function applyNormalData(target, data) {
  if (!data) return;
  target.norm = buildNormals(target.id, data.norm);
  target.cmd = buildCommands(target.id, data.cmd);
}
for (const c of CH) applyNormalData(c, NORMAL_DATA[c.id]);
applyNormalData(BOSS, NORMAL_DATA[9]);

// 25.10: один именной target-combo на бойца; цепочка начинается только после попадания.
const TARGET_DATA = {
  0: { target: { seq: 'PPK', n: 'ПЕПЕЛЬНАЯ СЕРИЯ' } },
  1: { target: { seq: 'PK', n: 'ТЕНЕВОЙ РАЗРЕЗ' } },
  2: { target: { seq: 'PPK', n: 'ГРОЗОВАЯ ЦЕПЬ' } },
  3: { target: { seq: 'PPK', n: 'ГОРНЫЙ ОБВАЛ' } },
  4: { target: { seq: 'PPK', n: 'КОГТЕВАЯ СЕРИЯ' } },
  5: { target: { seq: 'PPK', n: 'ПЕСЧАНАЯ КАРУСЕЛЬ' } },
  6: { target: { seq: 'PPK', n: 'ЛЕДЯНАЯ ЦЕПЬ' } },
  7: { target: { seq: 'PPK', n: 'РЖАВАЯ СЕРИЯ' } },
  8: { target: { seq: 'PPK', n: 'СУМРАЧНАЯ ЦЕПЬ' } },
  9: { target: { seq: 'PPK', n: 'КОРОЛЕВСКАЯ СЕРИЯ' } },
  10: { target: { seq: 'PPK', n: 'АЛАЯ СЕРИЯ' } },
  11: { target: { seq: 'PK', n: 'ЛУННЫЙ РАЗРЕЗ' } },
  12: { target: { seq: 'PPK', n: 'ЗВЁЗДНАЯ ЦЕПЬ' } }
};
for (const c of CH) Object.assign(c, TARGET_DATA[c.id]);
Object.assign(BOSS, TARGET_DATA[9]);

// 25.10: роли набора: чем боец отвечает на зонинг, прыжок и давление.
const ROLE_PICKS = {
  0: { zone: 'spec', jump: 'upper', pressure: 'fP' },
  1: { zone: 'spec', jump: 'upper', pressure: 'spec2' },
  2: { zone: 'spec', jump: 'upper', pressure: 'fK' },
  3: { zone: 'spec', jump: 'upper', pressure: 'fP' },
  4: { zone: 'spec2', jump: 'upper', pressure: 'spec' },
  5: { zone: 'spec2', jump: 'upper', pressure: 'spec' },
  6: { zone: 'spec', jump: 'upper', pressure: 'fK' },
  7: { zone: 'spec', jump: 'upper', pressure: 'bP' },
  8: { zone: 'spec', jump: 'upper', pressure: 'spec' },
  9: { zone: 'spec', jump: 'upper', pressure: 'fK' },
  10: { zone: 'spec', jump: 'upper', pressure: 'spec' },
  11: { zone: 'spec', jump: 'upper', pressure: 'spec2' },
  12: { zone: 'spec', jump: 'upper', pressure: 'spec' }
};
for (const c of CH) c.roles = ROLE_PICKS[c.id];
BOSS.roles = ROLE_PICKS[9];

// 25.10: манекен для тренировки — пассивная копия тела, не входит в ростер.
export const DUMMY = {
  ...CH[3],
  id: 13,
  name: 'МАНЕКЕН',
  en: 'DUMMY',
  skin: '#b8b0a0',
  suit: '#4a4a4a',
  acc: '#c8c0a8',
  hair: '#2a2a2a',
  gear: 'visor',
  h: 64,
  bulk: 1.12,
  spd: 0,
  jmp: 0,
  dmg: 0,
  specN: '—',
  spec2N: '—',
  sup: '—',
  throwN: 'ЗАХВАТ МАНЕКЕНА',
  throwCmdN: 'ЗАХВАТ МАНЕКЕНА'
};
