#!/usr/bin/env python3
"""Build arena backgrounds from downloaded asset packs."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
W, H = 424, 240
FLOOR = 206


def resize(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return image.convert("RGBA").resize(size, Image.Resampling.NEAREST)


def write_arena(index: int, name: str, bg: Image.Image, props: Image.Image, source: str) -> None:
    out = ROOT / "assets" / "arenas" / str(index)
    out.mkdir(parents=True, exist_ok=True)
    bg.convert("RGB").save(out / "bg.png", optimize=True)
    props.save(out / "props.png", optimize=True)
    (out / "arena.json").write_text(
        json.dumps(
            {
                "name": name,
                "bg": "bg.png",
                "props": "props.png",
                "floor": FLOOR,
                "source": source,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"arena {index}: {name} ({bg.width}x{bg.height})")


def cemetery() -> None:
    base = ROOT / "assets" / "vendor" / "gothicvania-cemetery"
    selected = base / "selected" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    source = selected if selected.exists() else base / "extracted" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    if not source.exists():
        raise SystemExit(f"missing cemetery source: {source}")

    background = resize(Image.open(source / "background.png"), (W, H))
    graveyard = resize(Image.open(source / "graveyard.png"), (W, 136))
    bg = background.copy()
    bg.alpha_composite(graveyard, (0, FLOOR - graveyard.height))
    bg = ImageEnhance.Brightness(bg).enhance(0.88)

    props = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for name, x, bottom in [
        ("tree-3.png", 0, FLOOR),
        ("tree-1.png", 258, FLOOR),
        ("statue.png", 184, FLOOR),
    ]:
        prop = Image.open(source / "sliced-objects" / name).convert("RGBA")
        props.alpha_composite(prop, (x, bottom - prop.height))
    write_arena(9, "Кладбище", bg, props, "GothicVania Cemetery Pack")


def dojo() -> None:
    background = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds" / "20.png"
    props_source = ROOT / "assets" / "vendor" / "kenney-background-elements" / "extracted" / "PNG" / "Default"
    if not background.exists() or not props_source.exists():
        print("skip arena 4: missing bamboo/background source")
        return

    bg = resize(Image.open(background), (W, H))
    bg = ImageEnhance.Brightness(bg).enhance(0.6)
    bg = ImageEnhance.Color(bg).enhance(0.72)
    bg.alpha_composite(Image.new("RGBA", (W, H), (8, 12, 8, 42)))

    props = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for name, size, x, bottom in [
        ("bushAlt1.png", (72, 24), 0, FLOOR),
        ("bush1.png", (60, 30), 364, FLOOR),
    ]:
        prop = Image.open(props_source / name).convert("RGBA")
        prop = prop.resize(size, Image.Resampling.LANCZOS)
        tinted = Image.new("RGBA", prop.size, (34, 50, 28, 255))
        tinted.putalpha(prop.getchannel("A"))
        props.alpha_composite(tinted, (x, bottom - prop.height))
    write_arena(4, "ДОДЗЁ КЛИНКА", bg, props, "Superpowers bamboo + Kenney background elements")


def main() -> int:
    cemetery()
    dojo()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
