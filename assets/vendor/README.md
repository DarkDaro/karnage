# Vendor assets

Исходные паки. В релиз не копируются; используются для повторной сборки атласов и арен.

| Папка | Источник | Лицензия | Использование |
|---|---|---|---|
| `codemanu-free-pixel-effects` | OpenGameArt | CC0 | FX |
| `kenney-smoke-particles` | kenney.nl | CC0 | дым, пыль, вспышки, взрывы |
| `gothicvania-cemetery` | OpenGameArt / ansimuz | CC0 | пилот арены «Кладбище» |
| `superpowers-backgrounds` | OpenGameArt / Sparklin Labs | CC0 | фоны и слои |
| `kenney-background-elements` | kenney.nl | CC0 | фоны, силуэты, пропсы |
| `kenney-background-elements-old` | kenney.nl | CC0 | дополнительный набор фонов |
| `kenney-fantasy-ui-borders` | kenney.nl | CC0 | рамки и панели UI |
| `kenney-ui-pack` | kenney.nl | CC0 | универсальный UI |
| `kenney-ui-rpg` | kenney.nl | CC0 | RPG-кнопки, панели, ползунки |
| `kenney-input-prompts` | kenney.nl | CC0 | иконки клавиш и кнопок |
| `kenney-generic-items` | kenney.nl | CC0 | предметы, реквизит |
| `kenney-pixel-platformer` | kenney.nl | CC0 | тайлы и окружение |
| `kenney-particle-pack` | kenney.nl | CC0 | частицы |
| `kenney-light-masks` | kenney.nl | CC0 | свет, ауры, свечение |
| `kenney-splat-pack` | kenney.nl | CC0 | пятна и брызги |

Каждый пак хранит `pack.zip`, `SOURCE.md` и `LICENSE.txt`. Распакованные `extracted/` не входят в git: они создаются локально из zip.

Сборка FX: `npm run assets:build`.
Сборка пилота арены: `py -3.14 -B tools/arenas_import.py`.
