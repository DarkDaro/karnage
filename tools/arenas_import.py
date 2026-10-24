#!/usr/bin/env python3
"""Build one pilot arena from the downloaded GothicVania pack."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "vendor" / "gothicvania-cemetery" / "extracted" / "gothicvania-cemetery-files" / "PNG" / "Environment"
OUT = ROOT / "assets" / "arenas" / "9"
W, H = 424, 240
FLOOR = 206


def resize(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return image.convert("RGBA").resize(size, Image.Resampling.NEAREST)


def main() -> int:
    if not SRC.exists():
        raise SystemExit(f"missing source: {SRC}")

    OUT.mkdir(parents=True, exist_ok=True)

    background = resize(Image.open(SRC / "background.png"), (W, H))
    graveyard = resize(Image.open(SRC / "graveyard.png"), (W, 136))

    bg = background.copy()
    bg.alpha_composite(graveyard, (0, FLOOR - graveyard.height))
    bg = ImageEnhance.Brightness(bg).enhance(0.88)
    bg.convert("RGB").save(OUT / "bg.png", optimize=True)

    props = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for name, x, bottom in [
        ("tree-3.png", 0, FLOOR),
        ("tree-1.png", 258, FLOOR),
        ("statue.png", 184, FLOOR),
    ]:
        prop = Image.open(SRC / "sliced-objects" / name).convert("RGBA")
        props.alpha_composite(prop, (x, bottom - prop.height))
    props.save(OUT / "props.png", optimize=True)

    (OUT / "arena.json").write_text(
        json.dumps(
            {
                "name": "Кладбище",
                "bg": "bg.png",
                "props": "props.png",
                "floor": FLOOR,
                "source": "GothicVania Cemetery Pack",
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )

    print(f"arena: {OUT} ({bg.width}x{bg.height})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
