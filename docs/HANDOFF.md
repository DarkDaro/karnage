# KARNAGE — handoff

Дата: 2026-10-24.
Проект: `C:\OpenCode\Game\karnage-game`.
Репозиторий: `https://github.com/DarkDaro/karnage.git`.
Ветка: `main`.
Последний коммит: `5cfc21b`.
В рабочем дереве есть незакоммиченные изменения текущего технического прохода.

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
- `release/index.html` — переносимая папка.
- `dev.html` — вход разработки через `npm run dev`.
- 13 бойцов, 10 арен, аркада, VS CPU, 2P, суперы, фаталити.
- Процедурные бойцы; спрайты Аямэ не подключены.
- CC0-эффекты: `hitLight`, `hitHeavy`, `dust`.
- Звук по умолчанию выключен; `?sound=1` включает.
- Тесты: 22 сценария (unit + Playwright).
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
- `?sound=1` включает звук.
- `?debug=1` даёт `window.KARNAGE`.

## Следующие задачи

Приоритет:

1. Пропуск фаталити/победного экрана и таймер окна `FINISH HIM`.
2. Портреты: рога Базальта, нимб Веги, корона Кармин.
3. Low/high-блок, damage scaling, броски, special cancel.
4. Настройки: музыка/SFX/голос, CRT, кровь, тряска, reduce motion.
5. Touch и геймпад.
6. Аркада: сохранение прогресса, дедупликация рекордов, финальный босс.
7. Stage-specific декор и кэш портретов/градиентов.
8. Разбор `src/game/karnage.js` на модули `game/render/input/audio/screens`.
9. После разборки убрать `default`-заглушки, маскирующие отсутствие ветки персонажа.

## Известные ограничения

- `src/game/karnage.js` — обёртка монолита, не финальная архитектура.
- `fx.hitHeavy` используется только при уроне > 15, чтобы не перекрывать обычный удар.
- `fx.dust` пока только при приземлении.
- `fx.block`, `fx.smoke`, `fx.super` и арены не подключены.
- `assets/vendor/*/extracted/` не в git; распаковывается из `pack.zip`.
- `release/` генерируется, вручную не править.
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
- Снимки: `archive/2026-10-24-fx-pilot`, `archive/2026-10-24-handoff`.

## Незакоммиченное

В рабочем дереве: технические правки, FX-пилот, `docs/ASSETS.md`, `docs/HANDOFF.md`, `assets/vendor`, `assets/fx`, `src/assets`, `tests/e2e/fx.test.mjs`, `tools/assets_import.py`.

Перед новым чатом:

```bash
git add -A
git commit -m "feat: fx pilot and technical cleanup"
git push
```

Если коммит уже сделан — проверить `git status`; дерево должно быть чистым.

## Быстрый контекст

Игра уже играбельна. Не начинать с инфраструктуры и не переписывать бойцов. Ближайшая ценность — пропуск катсцен, настройки, затем босс и разбор монолита. Ассеты подключать по одному эффекту/арене, не пачкой.
