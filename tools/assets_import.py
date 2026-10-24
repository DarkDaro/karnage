#!/usr/bin/env python3
"""Import CC0 effect atlases into game-sized PNG strips."""

from __future__ import annotations

import json
import zipfile
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
CODE = ROOT / "assets" / "vendor" / "codemanu-free-pixel-effects" / "extracted"
KENNEY = ROOT / "assets" / "vendor" / "kenney-smoke-particles" / "extracted" / "PNG"
OUT = ROOT / "assets" / "fx"
SRC_MANIFEST = ROOT / "src" / "assets" / "fx-manifest.js"
PREVIEW = ROOT / "test-results" / "asset-preview"


def unpack(zip_path: Path, target: Path) -> None:
    if target.exists() and any(target.iterdir()):
        return
    target.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as archive:
        archive.extractall(target)


def sheet_frames(path: Path, cols: int, rows: int) -> list[Image.Image]:
    image = Image.open(path).convert("RGBA")
    width, height = image.size
    frame_w, frame_h = width // cols, height // rows
    return [
        image.crop((col * frame_w, row * frame_h, (col + 1) * frame_w, (row + 1) * frame_h))
        for row in range(rows)
        for col in range(cols)
    ]


def kenney_frames(folder: str, prefix: str, count: int) -> list[Image.Image]:
    return [
        Image.open(KENNEY / folder / f"{prefix}{index:02d}.png").convert("RGBA")
        for index in range(count)
    ]


def tint(image: Image.Image, dark: tuple[int, int, int], light: tuple[int, int, int]) -> Image.Image:
    alpha = image.getchannel("A")
    gray = ImageOps.grayscale(image)
    colored = ImageOps.colorize(gray, black=dark, white=light)
    colored = ImageOps.posterize(colored, 3).convert("RGBA")
    colored.putalpha(alpha)
    return colored


def resize(image: Image.Image, size: int, method: Image.Resampling) -> Image.Image:
    return image.resize((size, size), method)


def pack(frames: list[Image.Image], frame_size: int) -> Image.Image:
    strip = Image.new("RGBA", (frame_size * len(frames), frame_size), (0, 0, 0, 0))
    for index, frame in enumerate(frames):
        strip.alpha_composite(frame, (index * frame_size, 0))
    return strip


def preview(name: str, frames: list[Image.Image], frame_size: int) -> None:
    PREVIEW.mkdir(parents=True, exist_ok=True)
    scale = 2
    width = frame_size * scale * len(frames)
    canvas = Image.new("RGBA", (width, frame_size * scale), (12, 14, 20, 255))
    for index, frame in enumerate(frames):
        frame = frame.resize((frame_size * scale, frame_size * scale), Image.Resampling.NEAREST)
        canvas.alpha_composite(frame, (index * frame_size * scale, 0))
    canvas.save(PREVIEW / f"{name}.png")


def main() -> int:
    unpack(ROOT / "assets" / "vendor" / "codemanu-free-pixel-effects" / "pack.zip", CODE)
    unpack(ROOT / "assets" / "vendor" / "kenney-smoke-particles" / "pack.zip", KENNEY.parent)
    OUT.mkdir(parents=True, exist_ok=True)
    (ROOT / "src" / "assets").mkdir(parents=True, exist_ok=True)

    weapon = sheet_frames(CODE / "10_weaponhit_spritesheet.png", 6, 6)
    flash = kenney_frames("Flash", "flash", 9)
    puffs = kenney_frames("White puff", "whitePuff", 9)

    hit_light_frames = [resize(weapon[index].crop((30, 30, 70, 70)), 48, Image.Resampling.NEAREST) for index in range(2, 18, 2)]
    hit_heavy_frames = [resize(flash[index], 48, Image.Resampling.LANCZOS) for index in range(0, 9)]
    dust_frames = [
        tint(resize(image, 32, Image.Resampling.LANCZOS), (42, 38, 32), (154, 144, 128))
        for image in puffs
    ]

    pack(hit_light_frames, 48).save(OUT / "hit-light.png", optimize=True)
    pack(hit_heavy_frames, 48).save(OUT / "hit-heavy.png", optimize=True)
    pack(dust_frames, 32).save(OUT / "dust.png", optimize=True)

    manifest = {
        "hitLight": {
            "image": "hit-light.png",
            "frameWidth": 48,
            "frameHeight": 48,
            "frames": len(hit_light_frames),
            "fps": 30,
            "loop": False,
            "anchor": [24, 24],
            "blend": "lighter",
            "scale": 1,
            "alpha": 0.9
        },
        "hitHeavy": {
            "image": "hit-heavy.png",
            "frameWidth": 48,
            "frameHeight": 48,
            "frames": len(hit_heavy_frames),
            "fps": 22,
            "loop": False,
            "anchor": [24, 24],
            "blend": "lighter",
            "scale": 1.25,
            "alpha": 0.75
        },
        "dust": {
            "image": "dust.png",
            "frameWidth": 32,
            "frameHeight": 32,
            "frames": len(dust_frames),
            "fps": 15,
            "loop": False,
            "anchor": [16, 30],
            "blend": "source-over",
            "scale": 0.8,
            "alpha": 0.45
        }
    }

    (OUT / "fx.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    SRC_MANIFEST.write_text(
        "// FX atlas manifest. Source: tools/assets_import.py.\nexport default "
        + json.dumps(manifest, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    preview("hit-light", hit_light_frames, 48)
    preview("hit-heavy", hit_heavy_frames, 48)
    preview("dust", dust_frames, 32)
    print(f"assets: {len(hit_light_frames)} hit-light, {len(hit_heavy_frames)} hit-heavy, {len(dust_frames)} dust")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
