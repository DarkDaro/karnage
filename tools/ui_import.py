#!/usr/bin/env python3
"""Build the first UI 9-slice panel from Kenney Fantasy UI Borders."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "assets" / "vendor" / "kenney-fantasy-ui-borders"
SRC_SELECTED = BASE / "selected" / "PNG" / "Default" / "Border"
SRC_EXTRACTED = BASE / "extracted" / "PNG" / "Default" / "Border"
SRC = SRC_SELECTED if SRC_SELECTED.exists() else SRC_EXTRACTED
BUTTON_BASE = ROOT / "assets" / "vendor" / "kenney-ui-rpg"
BUTTON = BUTTON_BASE / "selected" / "PNG" / "buttonLong_brown.png"
if not BUTTON.exists():
    BUTTON = BUTTON_BASE / "extracted" / "PNG" / "buttonLong_brown.png"
OUT = ROOT / "assets" / "ui"


def gold(src: Path, color: tuple[int, int, int]) -> Image.Image:
    image = Image.open(src).convert("RGBA")
    tinted = Image.new("RGBA", image.size, (*color, 255))
    tinted.putalpha(image.getchannel("A"))
    return tinted


def button(src: Path) -> Image.Image:
    image = Image.open(src).convert("RGBA")
    colored = ImageOps.colorize(ImageOps.grayscale(image), black=(28, 18, 10), white=(232, 192, 96))
    colored.putalpha(image.getchannel("A"))
    return colored


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    panel = gold(SRC / "panel-border-000.png", (200, 160, 64))
    btn = button(BUTTON)
    panel.save(OUT / "panel.png", optimize=True)
    btn.save(OUT / "button.png", optimize=True)
    print(f"ui: panel {panel.width}x{panel.height}, button {btn.width}x{btn.height}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
