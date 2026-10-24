# KARNAGE — handoff

Дата: 2026-10-24.
Проект: `C:\OpenCode\Game\karnage-game`.
Репозиторий: `https://github.com/DarkDaro/karnage.git`.
Ветка: `main`.
Последний коммит: `60855e7` — «Vega».
`origin/main` совпадает с локальной веткой.
После коммита в рабочем дереве: P0-боёвка, FX, арена «Кладбище», UI и touch-управление.

## С чего начать в новом чате

1. Прочитать `docs/HANDOFF.md` (этот файл).
2. Прочитать `docs/STATUS.md`.
3. Прочитать `DEVNOTES.md`.
4. При работе с ассетами — `docs/ASSETS.md`.
5. Выполнить `npm test` и `npm run check`.
6. Продолжать с раздела «Следующие задачи».

Не перечитывать историю сессии и не пересобирать уже закрытые баги.

## Что работает

- `index.html` — готовый запуск, читает `release/app.js` и `release/assets`.
- GitHub Pages: https://darkdaro.github.io/karnage/ — живая версия запущена и проверена.
- `release/index.html` — переносимая папка.
- `dev.html` — вход разработки через `npm run dev`.
- 13 бойцов, 10 арен, аркада, VS CPU, 2P, суперы, фаталити.
- Процедурные бойцы; спрайты Аямэ не подключены.
- CC0-эффекты: `hitLight`, `hitHeavy`, `dust`.
- Звук по умолчанию выключен; настройки или `?sound=1` включают, выбор сохраняется.
- Тесты: 33 сценария (unit + Playwright).
- `npm run check`: синтаксис, ESLint, UTF-8/BOM, ростер, checksums архивов.

## Текущий технический проход

Закрыто:

- finish/KO lock: жертва не добивается обычным уроном, побеждённый не встаёт;
- относительный ввод спецприёмов и фаталити;
- `spec2go` больше не протекает;
- `autoHit` учитывает блок/рывок и даёт hitstun;
- супер: стартовый армор и возврат ярости;
- `netT`, `combo`, `pale`, `defeated` очищаются;
- двойной KO и лимит трёх раундов;
- announce/wipe ждут боевой экран;
- `drawFx` не спавнит частицы в рендере;
- `drawTitle` не мутирует `titleT` в рендере;
- `shade`/`mix` понимают `rgb(...)`;
- `jkick` попадает на высоте;
- blockstun 6 кадров, wakeup-неуязвимость 8 кадров;
- настройки в главном меню: звук, голос, громкость, CRT, кровь, тряска и reduce motion;
- touch-управление, safe-area и мобильный canvas;
- damage scaling, броски `P+K` и special cancel;
- FX: block, smoke, dustRun, fireImpact, iceImpact, shadowImpact, explosion;
- арены «Кладбище» и «Додзё клинка» на ассетах с fallback;
- UI: 9-slice панель и кнопка из Kenney; HUD/таймер, строки и иконки настроек;
- Вега: женский силуэт, хвост с лентой, серьга, губы, ресницы и боевая юбка;
- low/high-блок, пропуск фаталити/победы и таймер FINISH HIM;
- P2 в выборе получает свои подписи, панель и нормальные шкалы;
- пауза при `blur` и `visibilitychange`;
- звук по умолчанию выключен на время разработки.

## Команды

```bash
npm ci
npx playwright install chromium
npm run dev
npm run build
npm test
npm run check
npm run assets:build
```

- `npm run dev` → `http://127.0.0.1:8613/dev.html`.
- `npm run build` обновляет `release/`.
- `npm test` собирает release и гоняет unit + e2e.
- `npm run assets:build` пересобирает FX из `assets/vendor`.
- `py -3.14 -B tools/assets_fetch.py --check-tools` проверяет zip/tar/7z/rar.
- `py -3.14 -B tools/assets_fetch.py --only <pack>` качает и фильтрует пак.
- `?sound=1` включает звук.
- `?debug=1` даёт `window.KARNAGE`.

## Следующие задачи

Приоритет:

1. UI-кит: иконки и экран настроек.
2. Остальные арены на ассеты.
3. Проверка мобилки на реальных iOS/Android.
4. Аркада: сохранение прогресса, дедупликация рекордов, финальный босс.
5. Портреты и кэш.
6. Разбор `src/game/karnage.js` на модули `game/render/input/audio/screens`.
7. После разборки убрать `default`-заглушки, маскирующие отсутствие ветки персонажа.

## Известные ограничения

- `src/game/karnage.js` — обёртка монолита, не финальная архитектура.
- `fx.hitHeavy` используется только при уроне > 15, чтобы не перекрывать обычный удар.
- `fx.dust` пока только при приземлении.
- `fx.whiff`, `fx.super` и остальные арены не подключены.
- Арена «Кладбище» пока без параллакса слоёв: фон собран в один `bg.png`.
- У бросков пока нет техбрейка; special cancel работает только по попаданию.
- `assets/vendor/*/extracted/` не в git; распаковывается из `pack.zip`.
- `release/` генерируется, вручную не править.
- GitHub Pages отдаёт корневой `index.html`; после правок `src/`/`assets/` нужен `npm run build` и коммит `release/`.
- Лицензия кода не выбрана (`UNLICENSED`).

## Инварианты

- Все текстовые файлы UTF-8 без BOM.
- Не удалять файлы и код без явной просьбы; архивировать.
- `index.html` — готовый запуск, `dev.html` — разработка.
- Фаталити не прерывается уроном.
- Побеждённый не встаёт до `startRound`.
- `reset()` очищает `combo`, `comboT`, `spec2go`, `pale`, `netT`, `frozen`, `defeated`, `damageTaken`, `invuln`, `blockStun`.
- Спецприёмы и фаталити читают направления относительно взгляда.
- `render()` не меняет игровое состояние.
- Комментарии `//` не ставить в конец строк с кодом.
- После правок: `npm run check`, затем `npm test`.

## Ассеты

- `assets/fx` — готовые атласы.
- `assets/vendor` — CC0 zip + `LICENSE.txt` + `SOURCE.md`.
- `assets/fx/fx.json` — человекочитаемые метаданные.
- `src/assets/fx-manifest.js` — статический манифест для `file://`.
- `src/assets/fx.js` — загрузчик.
- `tools/assets_import.py` — импорт, альфа, палитра, упаковка.
- `docs/ASSETS.md` — бриф и следующие слоты.
- Снимки: `archive/2026-10-24-fx-pilot`, `archive/2026-10-24-handoff`, `archive/2026-10-24-final-tails`.

## Состояние git

- `HEAD` = `60855e7`.
- `origin/main` = `60855e7`.
- В рабочем дереве: P0-боёвка, FX, арена, UI, touch и документы.
- Финальный снимок: `archive/2026-10-24-final-tails`.

Перед коммитом — чек-лист ниже.

## Перед коммитом

Проверить по порядку:

1. `git status --short` — нет случайных файлов, `node_modules` и `test-results` не в индексе.
2. `npm run assets:build` — если менялись `assets/vendor` или `assets/fx`.
3. `npm run build` — обновить `release/app.js` и `release/assets/fx`.
4. `npm test` — 33/33.
5. `npm run check` — ESLint и audit без ошибок.
6. Открыть `index.html` двойным кликом: титул, меню, бой, эффект удара.
7. Проверить `release/index.html` отдельно, как переносимую папку.
8. Проверить, что `archive/2026-10-24-final-tails` попал в коммит, а `SHA256SUMS.txt` сходится.
9. Убедиться, что в репозитории нет BOM, `AGENTS.md` и служебных заметок.
10. Только после этого коммитить и пушить.

Важно:

- `release/` генерируется, но коммитится как рабочая сборка.
- `assets/vendor/*/pack.zip` намеренно в git; `assets/vendor/*/extracted/` игнорируется.
- `assets/fx/fx.json` и `src/assets/fx-manifest.js` должны быть синхронны; их пересобирает `npm run assets:build`.
- Звук по умолчанию выключен; `?sound=1` включает.
- `index.html` — готовый запуск, `dev.html` — только через `npm run dev`.
- GitHub About через `gh` не обновлялся: `gh` не установлен. Описание и темы можно вставить вручную.
- Текущий `HEAD` — `ecd1b8d`; `origin/main` совпадает, в дереве только дизайн Веги.

## Быстрый контекст

Игра уже играбельна. Не начинать с инфраструктуры и не переписывать бойцов. Ближайшая ценность — пропуск катсцен, настройки, затем босс и разбор монолита. Ассеты подключать по одному эффекту/арене, не пачкой.
