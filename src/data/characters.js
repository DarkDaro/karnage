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
CH.push({id:10,name:'КАРМИН',en:'CARMINE',skin:'#e8d8d0',suit:'#6a1020',acc:'#d82040',hair:'#d8d0e0',gear:'corona',dress:1,longhair:1,fan:1,h:58,bulk:.9,spd:2.2,jmp:8.6,dmg:.95,specN:'Кровавые иглы',spec:'RDP',sup:'Алый пион',fat:'RLDP',arena:9});// 30.09: Кровавая графиня — магия крови, не вампир
CH.push({id:11,name:'АЯМЭ',en:'AYAME',skin:'#e0c8b8',suit:'#1a1f33',acc:'#7ac8d8',hair:'#0a0d1a',gear:'tail',blade:1,h:57,bulk:.85,spd:2.7,jmp:9.2,dmg:1,specN:'Полумесяц',spec:'DRP',sup:'Сто теней',fat:'LDRP',arena:4});// 30.09: Лунная синоби — ассасинка с катаной
CH.push({id:12,name:'ВЕГА',en:'VEGA',skin:'#c8a888',suit:'#241540',acc:'#b89aff',hair:'#e8e8ff',gear:'halo',bow:1,h:60,bulk:.95,spd:2.3,jmp:8.8,dmg:1.05,specN:'Звёздная метка',spec:'UDK',sup:'Небесный ловец',fat:'UDRP',arena:1});// 30.09: Астральная охотница — метки и самонаводящиеся звёзды; 01.10: фаталити UDRP — с ударной кнопкой (старое UDLR не срабатывало: finishUpd требует pP/pK)
CH[10].spec2='RRK';CH[10].spec2N='Кровавые шипы';// Кармин: →→+K — шипы из пролитой крови
CH[11].spec2='RRP';CH[11].spec2N='Сквозь тень';// Аямэ: →→+P — проход сквозь врага с ударом в спину
CH[12].spec2='RUK';CH[12].spec2N='Прыжок сквозь звёзды';// Вега: →↑+K — мигание к метке
