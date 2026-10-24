# FX atlases

Готовые атласы эффектов. Пересобираются `py -3.14 tools/assets_import.py`.

| Файл | Кадры | Размер | Источник | Примечание |
|---|---:|---|---|---|
| `hit-light.png` | 8 | 48×48 | CodeManu `10_weaponhit` | белое кольцо, additive |
| `hit-heavy.png` | 9 | 48×48 | Kenney `Flash` | жёлтая вспышка, additive |
| `dust.png` | 9 | 32×32 | Kenney `White puff` | тонировано в серо-коричневый, alpha 0.45 |
| `block.png` | 6 | 32×32 | Kenney `Flash` | холодная вспышка блока |
| `smoke.png` | 9 | 32×32 | Kenney `Black smoke` | дым, normal |
| `dust-run.png` | 4 | 16×16 | Kenney `White puff` | пыль от бега |
| `fire-impact.png` | 8 | 48×48 | CodeManu `16_sunburn` | огненный импакт |
| `ice-impact.png` | 8 | 48×48 | CodeManu `19_freezing` | ледяной импакт |
| `shadow-impact.png` | 8 | 48×48 | CodeManu `18_midnight` | тёмный импакт |
| `explosion.png` | 9 | 64×64 | Kenney `Explosion` | взрыв |

`fx.json` — те же данные для инструментов. `src/assets/fx-manifest.js` — статический манифест для рантайма, чтобы релиз работал без `fetch` по `file://`.

Источники и лицензии — в `assets/vendor/`.
