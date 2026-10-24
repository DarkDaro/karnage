#!/usr/bin/env python3
"""Build the first UI 9-slice panel from Kenney Fantasy UI Borders."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "vendor" / "kenney-fantasy-ui-borders" / "extracted" / "PNG" / "Default" / "Border" / "panel-border-000.png"
OUT = ROOT / "assets" / "ui" / "panel.png"


def main() -> int:
    image = Image.open(SRC).convert("RGBA")
    alpha = image.getchannel("A")
    gold = Image.new("RGBA", image.size, (200, 160, 64, 255))
    gold.putalpha(alpha)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    gold.save(OUT, optimize=True)
    print(f"ui: {OUT} ({gold.width}x{gold.height})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
