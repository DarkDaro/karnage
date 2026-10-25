# KARNAGE — техническая документация

Игра: `release/index.html` (Canvas 2D, локальные шрифты, папка с ассетами).
Вход: `src/main.js` → `src/game/karnage.js` (переходная обёртка монолита).
Данные: `src/data/characters.js`, `src/data/arenas.js`.
Замороженная копия исходника: `src/legacy/karnage.js`.
Концепт: `docs/karnage-concept.md`.
Старт нового чата: `docs/HANDOFF.md`.
Текущее состояние и очередь работ: `docs/STATUS.md`.
Обновлено: 25.10.2026.

## Запуск

- Релиз: открыть `release/index.html` двойным кликом.
- Разработка: `npm run dev` → `http://127.0.0.1:8613/`.
- Сборка релиза: `npm run build` → `release/index.html`, `release/app.js`, `release/assets/`.
- Проверки: `npm run check` (синтаксис + ESLint + аудит), `npm test`.

## Ростер

<!-- ROSTER:START -->
| id | key | имя | spec | spec2 | fat | arena |
|---:|---|---|---|---|---|---:|
| 0 | EMBER | ЭМБЕР | DRP | DRK | RRLP | 6 |
| 1 | GEIST | ГЕЙСТ | RRP | RRK | LURP | 1 |
| 2 | VOLT | ВОЛЬТ | DUP | UUP | DDRP | 2 |
| 3 | BASALT | БАЗАЛЬТ | LRK | LLP | LRDP | 3 |
| 4 | FANG | ФЭНГ | DRK | RDP | RDLK | 4 |
| 5 | SAHRA | САХРА | LLK | RRP | DLLP | 5 |
| 6 | KRYO | КРИО | DLP | URK | LDDP | 7 |
| 7 | RUST | РЖАВЫЙ | RLP | RDK | RDRK | 8 |
| 8 | NOCTURNE | НОКТЮРН | DRP | ULP | DRDP | 9 |
| 9 | KAISER | КАЙЗЕР | DDK | URP | RLRP | 0 |
| 10 | CARMINE | КАРМИН | RDP | RRK | RLDK | 9 |
| 11 | AYAME | АЯМЭ | DRP | RRP | LDRP | 4 |
| 12 | VEGA | ВЕГА | UDK | RUK | UDRP | 1 |
<!-- ROSTER:END -->

Комбинации: `D` вниз, `U` вверх, `L` влево, `R` вправо, `P` рука, `K` нога.
Фаталити обязаны заканчиваться `P` или `K`.

## Архитектура текущего переходного слоя

- `src/main.js` загружает `src/assets/fx.js` и вызывает `startKarnage(assets)`.
- `src/game/karnage.js` получает `FX` и рисует sprite-эффекты через `fx`.
- `src/assets/fx-manifest.js` — статический манифест, чтобы release работал по `file://`.
- `CH` — 13 бойцов, id 0–12; данные в `src/data/characters.js`.
- `BOSS` — отдельный финальный босс «КАЙЗЕР-ПРАЙМ» на базе Кайзера (`id:9`), не входит в `CH` и выбор бойцов; использует уникальные приёмы.
- `AR` — 10 арен; данные в `src/data/arenas.js`, декор создаёт `initArenas()`.
- Внутри `startKarnage()` пока остаётся основная логика монолита; общее состояние собрано в `S`.
- `src/game/core/state.js` — `createState`, `createSelection`, `setScreen`, `beginBattle`, `resetRound`; состояние сессии, боя, выбора и массивы эффектов.
- `src/game/fx/particles.js` — `createParticles`; частицы, кровь, декали, лимиты `400/240` и отрисовка.
- `src/game/fighter.js` — `ATK`, `WM`, `hitR` и `createFighter`; возвращает класс `F` с движением, состояниями, ударами, спецприёмами, супером и статусами.
- `src/game/combat.js` — `createCombat`; `resolveHit`, `autoHit`, `comboScale`, урон/блок/ярость/статистика.
- `src/game/input.js` — `createInput`: `keys`, `TOUCH`, `Ctrl`, `KM1`, `KM2`; клавиатура, touch, ИИ, буфер ввода на 14 записей, `match(seq, win)`.
- `ATK` — таблица нормалов: punch/kick/upper/sweep/jkick/rh.
- `resolveHit` — общий урон, блок, рывок, ярость, комбо, статистика; вынесен в `src/game/combat.js`.
- `updProjs` — снаряды, наведение, столкновения, AoE.
- `startSuper` — цепочка событий `supEv`; `fatalStep` — покадровый сценарий фаталити.
- `drawF`/`pose`/`drawGear`/`drawPort` — процедурная отрисовка бойцов.
- `src/game/world/arena.js` — слоёный рендер арен: `far/mid/props/fg`, параллакс, свет, туман, погода; передний слой с прозрачностью 0.7, `post`-виньетка.
- `drawHUD`/`drawSelect`/`drawPause`/`drawVS` — интерфейс.
- `step` — фиксированный шаг 60 Гц; `render` — кадр; `loop` — rAF.

### Состояния бойца

`idle`, `walk`, `jump`, `crouch`, `block`, `atk`, `cast`, `super`, `dash`,
`hit`, `down`, `getup`, `frozen`, `net`, `dizzy`, `win`, `fatal`, `victim`.

### Фазы боя

`intro`, `fight`, `ko`, `finish`, `fatal`, `over`.
Матч: до 2 побед, таймер 60 секунд на раунд.

### Флаги и статусы

- `dodging` — рывок, полная неуязвимость.
- `jbuf`/`abuf` — буферы прыжка/атаки, 8 кадров.
- `poison` + `poisonC` — яд (зелёный) / кровотечение (красное).
- `frozen`, `netT`, `invis`, `pale`, `charred`.
- `spec2go` — выбор второго спецприёма в `fireSpec`.
- `marks` — звёздные метки Веги.

## Тестирование

- `npm test` — сборка release + unit + e2e (Playwright, Chromium).
- `npm run test:unit` — данные роспера, целостность текста и комбинации.
- `npm run test:e2e` — браузерные сценарии через dev-server.
- `npm run check` — синтаксис, ESLint, аудит.
- `npm run audit` — UTF-8, BOM, скобки, ростер, доки, комментарии.
- `npm run audit:fix-bom` — удалить UTF-8 BOM из текстовых файлов.
- `npm run audit:write-roster` — обновить таблицу роспера в этом файле.

Для детерминированных тестов:
- открывать `index.html?debug=1`;
- `window.KARNAGE` даёт `step`, `render`, `newBattle`, `startLadder`, `resumeSavedArcade`, `loadArcRun`, `TOP`, `setSeed`, `snapshot`;
- rAF можно отключить через `page.addInitScript`, кадры гонять вручную;
- звук/речь в тестах отключать.

## Известные проблемы (на 25.10.2026)

Осталось:

- Баланс финального босса проверен только в Chromium; 13 индивидуальных концовок подключены.
- Все десять арен на слоях; остаётся точечная доводка фонов и проверка на реальных мобильных.
- `TOP` хранит дату; старые записи без даты совместимы.
- `src/game/karnage.js` всё ещё обёртка монолита.

Уже закрыто:

- announce/wipe ждут боевой экран;
- настройки в главном меню: звук, голос, громкость, CRT, кровь, тряска и reduce motion;
- touch-управление: D-pad, P/K/блок, пауза, safe-area;
- damage scaling: спад до 55%, сброс после окна комбо;
- броски `P+K`: обход блока, нокдаун, запрет на присед/прыжок;
- special cancel: только после попадания, окно 10 кадров;
- FX: block, smoke, dustRun, fireImpact, iceImpact, shadowImpact, explosion;
- все десять арен на ассетах с fallback, четырьмя слоями, параллаксом, светом, туманом и погодой;
- `src/game/world/arena.js` вынесен из монолита;
- `src/game/fighter.js` вынесен из монолита: `F`, `ATK`, `WM`, `hitR`;
- `src/game/combat.js` вынесен из монолита: `resolveHit`, `autoHit`, `comboScale`;
- `src/game/input.js` вынесен из монолита: `keys`, `TOUCH`, `Ctrl`, `KM1`, `KM2`;
- Вега получила женский силуэт: хвост с лентой, серьга, губы, ресницы и юбка;
- портреты Базальта, Веги и Кармин: рамка с запасом под рога, нимб и корону;
- `fx.whiff` — дуга воздуха при промахе, `fx.super` — вспышка ауры и кольцо у земли при старте супера;
- пропуск фаталити/победы и таймер FINISH HIM;
- low/high-блок, blockstun и wakeup;
- `drawFx` не мутирует `parts` в рендере;
- `drawTitle` не мутирует `titleT` в рендере;
- `shade`/`mix` понимают `rgb(...)`;
- `jkick` попадает на высоте;
- P2 в выборе получает свои подписи и панель;
- шкалы силы/скорости/веса нормализованы;
- пауза при `blur`/`visibilitychange`;
- звук включён по умолчанию;
- аркада: 11 обычных противников + босс, сохранение в `localStorage.karnageArcRun`, продолжение из меню, дедупликация `TOP`, дата рекорда, уникальные приёмы босса и 13 концовок.

## Ассеты

- `tools/assets_fetch.py` — загрузка zip/tar/7z/rar, magic bytes, keep/ignore, preview.
- `tools/arenas_import.py` — сборка `far/mid/props/fg` и `arena.json` для арен.
- `src/game/world/arena.js` — отрисовка слоёв, света и погоды.
- `assets/arenas/0` — «Док»; `assets/arenas/1` — «Храм призраков»; `4` и `9` — старые однослойные.
- `assets/vendor/packs.json` — реестр паков.
- `selected/` и `extracted/` не в git.
- 7-Zip: `C:\Program Files\7-Zip\7z.exe`.
- `py7zr` и `rarfile` установлены для Python 3.14.

## Звук

- Звук включён по умолчанию; контекст создаётся после первого клика или клавиши.
- SFX загружаются из WAV, музыка — из MP3; OGG в runtime не используется.
- `M` и переключатель в настройках меняют звук; выбор сохраняется в `localStorage.karnageSnd`.
- Голос диктора и музыка зависят от `AU.on`.
- `localStorage.karnageOpts` хранит CRT, кровь, тряску и reduce motion.

## Кодировка

- Все текстовые файлы — UTF-8 без BOM.
- `npm run audit` падает на BOM, UTF-16, NUL и битом UTF-8.
- `npm run audit:fix-bom` удаляет UTF-8 BOM.
- Не писать файлы через PowerShell `Set-Content -Encoding UTF8`: PowerShell 5.1 добавляет BOM. Использовать Node, Python с `encoding="utf-8"` или `UTF8Encoding(false)`.

## Правила правок

- Не удалять файлы и код без явной просьбы; устаревшее комментировать или архивировать.
- Не оставлять комментарии `//` в конце строк с кодом: они уже съедали закрывающие скобки.
- Персонажные флаги читать из `def`, а не из экземпляра `F`.
- В `drawGear` нет локальной `skin`; использовать `d.skin`.
- Новые ветки персонажей не маскировать `default`-веткой: отсутствие ветки должно быть ошибкой.
- После правки: `npm run check`, при необходимости `npm test`.

## Архив

`archive/2026-10-24-baseline/` — исходный `karnage.html`, концепт, старый DEVNOTES и `karnage.rar`.
`archive/2026-10-24-infrastructure/` — release после выделения проекта и модульного входа.
`archive/2026-10-24-preproduction/` — release после блокеров finish/KO, ввода, суперов и статусов.
Контрольные суммы лежат в каждом снимке.
