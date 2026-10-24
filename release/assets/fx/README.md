# FX atlases

Готовые атласы эффектов. Пересобираются `py -3.14 tools/assets_import.py`.

| Файл | Кадры | Размер | Источник | Примечание |
|---|---:|---|---|---|
| `hit-light.png` | 8 | 48×48 | CodeManu `10_weaponhit` | белое кольцо, additive |
| `hit-heavy.png` | 9 | 48×48 | Kenney `Flash` | жёлтая вспышка, additive |
| `dust.png` | 9 | 32×32 | Kenney `White puff` | тонировано в серо-коричневый, alpha 0.45 |

`fx.json` — те же данные для инструментов. `src/assets/fx-manifest.js` — статический манифест для рантайма, чтобы релиз работал без `fetch` по `file://`.

Источники и лицензии — в `assets/vendor/`.
