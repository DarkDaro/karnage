# Аудиобаза KARNAGE

Собрано 25.10.2026. Все файлы распространяются по лицензии CC0. В игре используются WAV для SFX и MP3 для музыки.

## SFX

| Папка | Что внутри | Файлов |
|---|---|---:|
| `sfx/impact` | удары, металл, стекло, дерево, мягкие попадания | 85 |
| `sfx/footsteps` | шаги по бетону, дереву и снегу | 15 |
| `sfx/ui/interface` | клики, подтверждения, ошибки, глитчи | 40 |
| `sfx/ui/kenney` | клики, rollover, переключатели | 49 |
| `sfx/combat` | ножи, удары, металл, ткань | 14 |
| `sfx/scifi` | лазеры, взрывы, силовое поле, двигатели | 37 |
| `sfx/digital` | лазеры, zap, power-up, phase jump, тоны | 47 |

Источники: [Impact Sounds](https://kenney.nl/assets/impact-sounds), [Interface Sounds](https://kenney.nl/assets/interface-sounds), [RPG Audio](https://kenney.nl/assets/rpg-audio), [Sci-fi Sounds](https://kenney.nl/assets/sci-fi-sounds), [UI Audio](https://kenney.nl/assets/ui-audio), [Digital Audio](https://kenney.nl/assets/digital-audio). Лицензия всех паков: CC0.

## Музыка

| Файл | Назначение | Источник |
|---|---|---|
| `music/sector-0.mp3` | тёмный sci-fi луп | [Dark Sci-Fi Audio Pack](https://opengameart.org/content/dark-sci-fi-audio-pack), CC0 |
| `music/airy-0.mp3` | воздушный эмбиент-луп | [Dark Sci-Fi Audio Pack](https://opengameart.org/content/dark-sci-fi-audio-pack), CC0 |
| `music/urgent-2.mp3` | тревожный боевой луп | [Dark Sci-Fi Audio Pack](https://opengameart.org/content/dark-sci-fi-audio-pack), CC0 |
| `music/victory-5.mp3` | короткий победный стингер | [Dark Sci-Fi Audio Pack](https://opengameart.org/content/dark-sci-fi-audio-pack), CC0 |
| `music/8bit-battle-loop.mp3` | 8-битный боевой луп | [8-Bit Battle Loop](https://opengameart.org/content/8-bit-battle-loop), CC0 |
| `music/jingles/` | короткие джинглы для меню и результатов | [Music Jingles](https://kenney.nl/assets/music-jingles), CC0 |

`music/*.mp3` и `8bit-battle-loop.mp3` сведены как лупы: в игре их можно запускать с `loop = true`. `victory-5.mp3` и файлы из `music/jingles/` короткие, играть один раз.

Сырые паки и исходные файлы сохранены в `assets/vendor`; в `assets/audio` только отобранное для игры в WAV и MP3.
