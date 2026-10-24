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
