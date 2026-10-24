# KARNAGE — техническая документация

Игра: `release/index.html` (Canvas 2D, локальные шрифты, папка с ассетами).
Вход: `src/main.js` → `src/game/karnage.js` (переходная обёртка монолита).
Данные: `src/data/characters.js`, `src/data/arenas.js`.
Замороженная копия исходника: `src/legacy/karnage.js`.
Концепт: `docs/karnage-concept.md`.
Текущее состояние и очередь работ: `docs/STATUS.md`.
Обновлено: 24.10.2026.

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
| 1 | GEIST | ГЕЙСТ | RRP | RRK | LLRP | 1 |
| 2 | VOLT | ВОЛЬТ | DUP | UUP | DDRP | 2 |
| 3 | BASALT | БАЗАЛЬТ | LRK | LLP | LRDP | 3 |
| 4 | FANG | ФЭНГ | DRK | RDP | RLDP | 4 |
| 5 | SAHRA | САХРА | LLK | RRP | DLLP | 5 |
| 6 | KRYO | КРИО | DLP | URK | LDDP | 7 |
| 7 | RUST | РЖАВЫЙ | RLP | RDK | RDRP | 8 |
| 8 | NOCTURNE | НОКТЮРН | DRP | ULP | DRDP | 9 |
| 9 | KAISER | КАЙЗЕР | DDK | URP | RLRP | 0 |
| 10 | CARMINE | КАРМИН | RDP | RRK | RLDP | 9 |
| 11 | AYAME | АЯМЭ | DRP | RRP | LDRP | 4 |
| 12 | VEGA | ВЕГА | UDK | RUK | UDRP | 1 |
<!-- ROSTER:END -->

Комбинации: `D` вниз, `U` вверх, `L` влево, `R` вправо, `P` рука, `K` нога.
Фаталити обязаны заканчиваться `P` или `K`.

## Архитектура текущего переходного слоя

- `src/main.js` вызывает `startKarnage()` из `src/game/karnage.js`.
- `CH` — 13 бойцов, id 0–12; данные в `src/data/characters.js`.
- `AR` — 10 арен; данные в `src/data/arenas.js`, декор создаёт `initArenas()`.
- Внутри `startKarnage()` пока остаётся основная логика монолита.
- `F` — боец: движение, состояния, удары, спецприёмы, супер, статусы.
- `Ctrl` — клавиатура/ИИ, буфер ввода на 14 записей, `match(seq, win)`.
- `ATK` — таблица нормалов: punch/kick/upper/sweep/jkick/rh.
- `resolveHit` — общий урон, блок, рывок, ярость, комбо, статистика.
- `updProjs` — снаряды, наведение, столкновения, AoE.
- `startSuper` — цепочка событий `supEv`; `fatalStep` — покадровый сценарий фаталити.
- `drawF`/`pose`/`drawGear`/`drawPort` — процедурная отрисовка бойцов.
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
- `npm run test:unit` — данные роспера.
- `npm run test:e2e` — браузерные сценарии через dev-server.
- `npm run check` — синтаксис, ESLint, аудит.
- `npm run audit` — UTF-8, BOM, скобки, ростер, доки, комментарии.
- `npm run audit:fix-bom` — удалить UTF-8 BOM из текстовых файлов.
- `npm run audit:write-roster` — обновить таблицу роспера в этом файле.

Для детерминированных тестов:
- открывать `index.html?debug=1`;
- `window.KARNAGE` даёт `step`, `render`, `newBattle`, `setSeed`, `snapshot`;
- rAF можно отключить через `page.addInitScript`, кадры гонять вручную;
- звук/речь в тестах отключать.

## Известные проблемы (на 24.10.2026)

Критичные:

- `announce` и `wipe` первого раунда тикают ещё на VS-экране: шторки и «РАУНД 1» могут не появиться.
- Фаталити/победа не пропускаются: сцена и экран `over` длятся около 8 секунд.
- `drawFx` спавнит частицы взрыва во время рендера; на паузе и при высоком FPS это лишние частицы.
- Нет автоматической паузы при скрытии вкладки.
- `shade()`/`mix()` не понимают `rgb(...)`: бледная жертва и часть задних конечностей теряют цвета.
- Портреты обрезают рога Базальта, нимб Веги и корону Кармин.
- `drawTitle` меняет `titleT` в рендере, поэтому на 144 Гц анимация титула быстрее.
- Прыжковый удар не попадает на высоте (`jkick` при `y <= 155`).
- Нет blockstun, low/high-блоков, wakeup-неуязвимости, damage scaling, бросков и special cancel.

Важные:

- в выборе P2 показываются подписи P1, панель деталей не переключается;
- шкала «ВЕС» инвертирована, скорость упирается в максимум;
- аркада не сохраняет прогресс, рекорды дублируются, отдельного босса пока нет;
- нет настроек, touch, геймпада и паузы при скрытии вкладки;
- нет stage-specific декора и кэша портретов/градиентов;
- `TOP` санирован, но не хранит имя, сложность и дату.

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
