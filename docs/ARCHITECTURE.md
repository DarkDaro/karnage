# Архитектура

## Текущее состояние

`index.html` — готовый запуск, он читает `release/app.js`. `dev.html` —
модульный вход для `npm run dev`: `src/main.js` загружает FX через
`src/assets/fx.js` и вызывает `startKarnage(assets)` из
`src/game/karnage.js`. Бойцы и арены уже вынесены в `src/data`, состояние,
частицы, боец, боевые расчёты и ввод — в `src/game/core/state.js`,
`src/game/fx/particles.js`, `src/game/fighter.js`, `src/game/combat.js` и
`src/game/input.js`, HTML/CSS/шрифты — в `assets`. Основная логика пока
остаётся в обёртке монолита;
`src/legacy/karnage.js` — замороженная копия для сравнения. `tools/build.mjs`
собирает `src/main.js` через esbuild в `release/app.js`, копирует только
`assets/fonts`, `styles`, `fx` и `arenas` (без `vendor`), релиз запускается как
папка `release/index.html`.

Аркада хранит активный забег в `localStorage.karnageArcRun`:
`{v, c1, ladder, step}`. `ladder` — 11 обычных противников, босс всегда
последний; `step` — индекс текущего боя. `newBattleDefs` принимает def-объекты,
поэтому бой с `BOSS` не требует отдельного бойца в `CH`.

## Слои, к которым идём

1. `src/core` — цикл, ввод, звук, сохранения, RNG, математика, цвета, debug.
2. `src/data` — бойцы, арены, приёмы, строки, сложность.
3. `src/assets` — загрузчик FX и статический манифест.
4. `src/game` — боец, урон, снаряды, статусы, ИИ, матч, аркада, суперы, фаталити.
5. `src/render` — арены, бойцы, гир, портреты, эффекты, HUD, слои.
6. `src/screens` — титул, меню, выбор, VS, бой, пауза, зал славы, финал.
7. `src/ui` — touch, геймпад, доступность.

Порядок разборки — от чистых функций к рендеру, чтобы не тянуть циклические
зависимости. После каждого слоя прогоняются parity-тесты.

## Контракты

- `F` — боец: `def`, `ctrl`, `x`, `y`, `state`, `st`, `hp`, `rage`, `atk`,
  статусы (`frozen`, `netT`, `poison`, `invis`), буферы (`jbuf`, `abuf`).
  Создаётся фабрикой `createFighter` из `src/game/fighter.js`.
- `drawF(f, cam)` — рисует бойца; не мутирует игровое состояние.
- `drawGear(f, hx, hy)` — только `def.*` и явно переданные поля; локальной
  `skin` нет.
- `drawPort(def, x, y, scale)` — портрет; не зависит от боевого состояния; `portraitTop(def)` добавляет запас рамки под рога, нимб и корону.
- `newBattle(...)` принимает id из `CH`; `newBattleDefs(...)` — def-объекты, включая отдельного `BOSS`.
- `drawFake(defOrId, ...)` рисует и обычного бойца, и def-объект босса.
- `drawArena(index, cam, frame)` — только чтение данных арены.
- `arenaView.foreground()` рисует передний слой с прозрачностью 0.7; `arenaView.post()` добавляет виньетку после бойцов и частиц.
- `render()` — чистый рендер; спавн частиц и таймеры — в `step()`.

## Инварианты

- Фаталити не прерывается уроном; жертва в `finish` неуязвима для обычных атак.
- Побеждённый не встаёт до `startRound`.
- `reset()` очищает `combo`, `comboT`, `spec2go`, `pale`, `netT`, `frozen`,
  `defeated`, `damageTaken`, `armor`, `invuln`, `blockStun`.
- Спецприёмы читают направления относительно взгляда.
- `autoHit` учитывает блок, рывок и hitstun; общий `applyHit` — следующий шаг.
- `render()` не меняет `parts`, `fx`, `projs`.
- `drawFx` рисует sprite-эффекты из `FX` и процедурные `whiff`/`super`; `updFx` двигает кадры, убирает их по `life` и спавнит частицы.
- Активный забег аркады сохраняется после каждого шага; при завершении и после истечения continue-таймера ключ очищается.
- `TOP` хранит не больше одной лучшей записи на бойца.
- Отсутствие ветки персонажа — ошибка, а не `default`-заглушка.

## Сборка

`tools/build.mjs` копирует `assets/fonts`, `assets/styles`, `assets/fx` и
`assets/arenas`, собирает `src/main.js` через esbuild в `release/app.js` и
подставляет его в `release/index.html`. Формат релиза — папка, а не один HTML.
`assets/vendor` остаётся в репозитории, но не попадает в релиз.
