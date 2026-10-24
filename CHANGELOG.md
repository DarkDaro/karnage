# Changelog

## 0.1.0 — 2026-10-24

- Проект `karnage-game` выделен из `C:\OpenCode\Game`.
- Базовый монолит заархивирован в `archive/2026-10-24-baseline/`.
- HTML разделён на `index.html`, CSS и локальные шрифты.
- Добавлены `release/` (папка запуска), `tools/`, `tests/`, `docs/`.
- Добавлены `package.json`, ESLint, build/serve/check/audit.
- Модульный вход `src/main.js`, esbuild-сборка `release/app.js`.
- Бойцы и арены вынесены в `src/data`.
- Обновлён `DEVNOTES.md` под 13 бойцов и текущее состояние.
- E2E-тесты: экраны, все бойцы, все фаталити, release с диска.
- Корневой `index.html` запускает готовую сборку; `dev.html` — вход разработки.
- Finish/KO: жертва защищена от добивания, побеждённый не встаёт, снаряды очищаются.
- Спецприёмы и фаталити читают направления относительно взгляда.
- `autoHit` учитывает блок/рывок, даёт hitstun и статистику.
- Супер получил стартовый армор и частичный возврат ярости.
- Двойной KO и лимит трёх раундов.
- Исправлены `spec2go`, `netT`, `TOP`, громкость, речь, веер Кармин, бомбы, тень.
- Регрессионные e2e-тесты на эти сценарии.
- Добавлен `docs/ASSETS.md`: бриф по окружению, эффектам, лицензиям и пайплайну.
- Пилот CC0-эффектов: `hitLight` (CodeManu), `hitHeavy` и `dust` (Kenney).
- Добавлены `tools/assets_import.py`, `assets/fx`, `src/assets/fx.js`, `tests/e2e/fx.test.mjs`.
- Снимок: `archive/2026-10-24-fx-pilot`.
- На время разработки звук по умолчанию выключен; настройки или `?sound=1` включают его.
- Технический проход: announce/wipe, drawFx, drawTitle, rgb-цвета, jkick, blockstun, wakeup, P2-выбор, пауза при blur.
- Добавлены пропуск фаталити/победы, таймер FINISH HIM и low/high-блок.
- Добавлены настройки в главном меню: звук, голос, громкость, CRT, кровь, тряска и reduce motion; выбор сохраняется.
- Добавлен `docs/HANDOFF.md` для старта нового чата.
- Снимок: `archive/2026-10-24-handoff`, `archive/2026-10-24-final-tails`.
- GitHub Pages: https://darkdaro.github.io/karnage/ — страница запущена и проверена.
