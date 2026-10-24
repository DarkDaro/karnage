# Тестирование

## Команды

```text
npm test              сборка release + unit + e2e
npm run test:unit     только unit
npm run test:e2e      только e2e через dev-server
npm run check         node --check + ESLint + audit.py
npm run audit         UTF-8, BOM, скобки, ростер, документация
npm run audit:fix-bom удалить UTF-8 BOM из текстовых файлов
npm run assets:build  пересобрать FX-атласы из assets/vendor
```

Сейчас `npm test` — 26 сценариев: 4 unit и 22 Playwright.
Тесты FX проверяют загрузку атласов, sprite-эффекты удара и приземления.
Тесты боя проверяют low/high-блок и пропуск фаталити.
Тесты настроек проверяют вход из меню, сохранение переключателей и загрузку после reload.
`release/` тестируется отдельно с диска через `file://`.

## Детерминированный прогон

Игра открывается как `http://127.0.0.1:8613/dev.html?debug=1` после
`npm run dev`. В этом режиме доступен `window.KARNAGE`:

- `step()` / `render()` — ручной кадр;
- `newBattle(...)`, `startRound()`, `startFatal(...)`;
- `setSeed(number)` — подменить `Math.random`;
- `snapshot()` — состояние без ссылок на объекты.

Для тестов rAF отключается через `page.addInitScript`; звук по умолчанию уже
выключен. Кадры гоняются вручную, без `setInterval`. Для проверки звука
использовать `?sound=1`.

## Что проверяем

- загрузка без console errors;
- все экраны: title, menu, select, vs, fight, pause, top, ending, gameover;
- все 13 бойцов: отрисовка, спец, спец2, супер, фаталити;
- finish lock, KO lock, статусы, `spec2go`, `netT`;
- low/high-блок, пропуск фаталити;
- настройки: вход из меню, CRT/кровь/тряска/reduce motion, localStorage;
- двойной KO, лимит раундов, announce/wipe, render без мутаций;
- FX-атласы и sprite-эффекты;
- битый localStorage;
- мобильный viewport и touch (после этапа UI);
- parity: старый baseline и новая сборка дают одинаковое состояние на
  одинаковом seed и одинаковых вводах.

## Аудит

`tools/audit.py` проверяет:

- UTF-8 и отсутствие битых символов;
- баланс скобок;
- id/комбо/фаталити/арены;
- синхронизацию таблицы роспера в `DEVNOTES.md`;
- комментарии, которые могли съесть код;
- отсутствие служебных файлов и посторонних маркеров;
- существование ассетов.

`npm run audit:write-roster` обновляет таблицу между маркерами
`<!-- ROSTER:START -->` и `<!-- ROSTER:END -->`.
