# Vendor assets

Исходные CC0-паки. В релиз не копируются; используются только для повторной сборки атласов.

| Папка | Источник | Лицензия | Использование |
|---|---|---|---|
| `codemanu-free-pixel-effects` | OpenGameArt | CC0 | `fx.hitLight` |
| `kenney-smoke-particles` | kenney.nl | CC0 | `fx.hitHeavy`, `fx.dust` |

Каждый пак хранит `pack.zip`, `SOURCE.md` и `LICENSE.txt`. Распакованные `extracted/` не входят в git: они создаются локально из zip командой `py -3.14 tools/assets_import.py`. Атласы пересобираются той же командой.
