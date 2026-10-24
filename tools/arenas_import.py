#!/usr/bin/env python3
"""Build arena layers from downloaded asset packs."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
W, H = 424, 240
FL = 206
WIDE = W * 2


def resize(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return image.convert("RGBA").resize(size, Image.Resampling.NEAREST)


def cover(image: Image.Image, size: tuple[int, int] = (W, H)) -> Image.Image:
    image = image.convert("RGBA")
    scale = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.NEAREST)
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def wide(image: Image.Image) -> Image.Image:
    return image.convert("RGBA").resize((WIDE, H), Image.Resampling.NEAREST)


def grade(image: Image.Image, brightness: float, saturation: float, overlay: tuple[int, int, int, int]) -> Image.Image:
    out = ImageEnhance.Brightness(image.convert("RGBA")).enhance(brightness)
    out = ImageEnhance.Color(out).enhance(saturation)
    out.alpha_composite(Image.new("RGBA", out.size, overlay))
    return out


def keep_bright(image: Image.Image, threshold: int, tint: tuple[int, int, int]) -> Image.Image:
    src = image.convert("RGBA")
    out = Image.new("RGBA", src.size, (0, 0, 0, 0))
    sp = src.load()
    op = out.load()
    for y in range(src.height):
        for x in range(src.width):
            r, g, b, a = sp[x, y]
            if max(r, g, b) < threshold:
                continue
            lum = (r * 0.3 + g * 0.59 + b * 0.11) / 255
            op[x, y] = (
                min(255, int(tint[0] + lum * 90)),
                min(255, int(tint[1] + lum * 80)),
                min(255, int(tint[2] + lum * 105)),
                min(a, 235),
            )
    return out


def keep_warm(image: Image.Image, tint: tuple[int, int, int]) -> Image.Image:
    src = image.convert("RGBA")
    out = Image.new("RGBA", src.size, (0, 0, 0, 0))
    sp = src.load()
    op = out.load()
    for y in range(src.height):
        for x in range(src.width):
            r, g, b, a = sp[x, y]
            if not (r > g - 4 and r > b + 8):
                continue
            lum = (r * 0.3 + g * 0.59 + b * 0.11) / 255
            op[x, y] = (
                min(255, int(tint[0] + lum * 70)),
                min(255, int(tint[1] + lum * 58)),
                min(255, int(tint[2] + lum * 88)),
                a,
            )
    return out


def tint(image: Image.Image, color: tuple[int, int, int, int]) -> Image.Image:
    out = Image.new("RGBA", image.size, color)
    out.putalpha(image.getchannel("A"))
    return out


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
                "floor": FL,
                "source": source,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"arena {index}: {name} ({bg.width}x{bg.height})")


def write_layered(
    index: int,
    name: str,
    far: Image.Image,
    mid: Image.Image,
    props: Image.Image,
    fg: Image.Image,
    source: str,
    ambient: list[dict],
    lights: list[dict],
    fog: bool = False,
    wet: bool = False,
) -> None:
    out = ROOT / "assets" / "arenas" / str(index)
    out.mkdir(parents=True, exist_ok=True)
    far.convert("RGB").save(out / "far.png", optimize=True)
    mid.save(out / "mid.png", optimize=True)
    props.save(out / "props.png", optimize=True)
    fg.save(out / "fg.png", optimize=True)

    preview = far.copy()
    preview.alpha_composite(mid)
    preview.alpha_composite(props)
    preview.alpha_composite(fg)
    preview.save(out / "preview.png", optimize=True)

    layers = [
        {"file": "far.png", "scroll": 0.12, "y": 0},
        {"file": "mid.png", "scroll": 0.38, "y": 0},
        {"file": "props.png", "scroll": 0.82, "y": 0},
        {"file": "fg.png", "scroll": 1.15, "y": 0, "foreground": True},
    ]
    (out / "arena.json").write_text(
        json.dumps(
            {
                "name": name,
                "width": WIDE,
                "floor": FL,
                "bg": "far.png",
                "props": "props.png",
                "layers": layers,
                "ambient": ambient,
                "lights": lights,
                "fog": fog,
                "wet": wet,
                "source": source,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"arena {index}: {name} ({WIDE}x{H}, {len(layers)} layers)")


def cemetery() -> None:
    base = ROOT / "assets" / "vendor" / "gothicvania-cemetery"
    selected = base / "selected" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    source = selected if selected.exists() else base / "extracted" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    if not source.exists():
        raise SystemExit(f"missing cemetery source: {source}")

    background = resize(Image.open(source / "background.png"), (W, H))
    graveyard = resize(Image.open(source / "graveyard.png"), (W, 136))
    bg = background.copy()
    bg.alpha_composite(graveyard, (0, FL - graveyard.height))
    bg = ImageEnhance.Brightness(bg).enhance(0.88)

    props = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for name, x, bottom in [
        ("tree-3.png", 0, FL),
        ("tree-1.png", 258, FL),
        ("statue.png", 184, FL),
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
        ("bushAlt1.png", (72, 24), 0, FL),
        ("bush1.png", (60, 30), 364, FL),
    ]:
        prop = Image.open(props_source / name).convert("RGBA")
        prop = prop.resize(size, Image.Resampling.LANCZOS)
        tinted = Image.new("RGBA", prop.size, (34, 50, 28, 255))
        tinted.putalpha(prop.getchannel("A"))
        props.alpha_composite(tinted, (x, bottom - prop.height))
    write_arena(4, "ДОДЗЁ КЛИНКА", bg, props, "Superpowers bamboo + Kenney background elements")


def container(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, body: str, trim: str) -> None:
    draw.rectangle((x, y, x + w, y + h), fill=body, outline="#070b0e")
    draw.rectangle((x + 3, y + 3, x + w - 3, y + 7), fill=trim)
    for rx in range(x + 5, x + w - 3, 9):
        draw.line((rx, y + 9, rx, y + h - 3), fill="#0a1115", width=1)
    draw.line((x, y + h, x + w, y + h), fill="#070b0e", width=1)


def barrel(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    draw.rounded_rectangle((x, y, x + w, y + h), radius=3, fill="#2b2118", outline="#090706")
    draw.rectangle((x + 2, y + 4, x + w - 2, y + 6), fill="#6a4c2c")
    draw.rectangle((x + 2, y + h - 6, x + w - 2, y + h - 4), fill="#4a3420")
    draw.line((x + w // 2, y + 2, x + w // 2, y + h - 2), fill="#17110c")


def lamp(draw: ImageDraw.ImageDraw, x: int, y: int, h: int) -> None:
    draw.rectangle((x - 2, y - h, x + 2, y), fill="#111820")
    draw.rectangle((x - 7, y - h - 4, x + 8, y - h), fill="#26303a")
    draw.rectangle((x - 5, y - h - 2, x + 6, y - h + 1), fill="#f0c060")
    draw.ellipse((x - 14, y - h - 12, x + 15, y - h + 8), fill=(240, 170, 70, 22))


def crate(draw: ImageDraw.ImageDraw, x: int, y: int, s: int) -> None:
    draw.rectangle((x, y, x + s, y + s), fill="#3a2a19", outline="#0b0806")
    draw.line((x + 3, y + 3, x + s - 3, y + s - 3), fill="#6a4a24", width=2)
    draw.line((x + s - 3, y + 3, x + 3, y + s - 3), fill="#6a4a24", width=2)
    draw.rectangle((x + 4, y + 4, x + s - 4, y + 6), fill="#7a5a30")


def dock() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "36.png"
    city_src = superpowers / "14.png"
    if not far_src.exists() or not city_src.exists():
        print("skip arena 0: missing superpowers backgrounds")
        return

    far = cover(Image.open(far_src))
    far = grade(far, 0.86, 0.85, (4, 12, 24, 28))
    far = wide(far)
    far.alpha_composite(Image.new("RGBA", far.size, (0, 0, 0, 0)))
    # Moon halo is already in the source; add a cool horizon wash.
    wash = Image.new("RGBA", far.size, (0, 0, 0, 0))
    wd = ImageDraw.Draw(wash)
    wd.rectangle((0, 128, WIDE, FL), fill=(18, 36, 52, 42))
    far.alpha_composite(wash)

    city = keep_bright(Image.open(city_src), 78, (18, 28, 42))
    city = resize(city, (W, H))
    city = wide(city)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    for x, body, trim in [(24, "#26343a", "#4a6a70"), (76, "#3a2018", "#8a3e28"), (650, "#243a34", "#3e6a58"), (706, "#30281e", "#7a5a30")]:
        container(pd, x, FL - 38, 58, 38, body, trim)
    for x, h in [(152, 18), (180, 22), (208, 16)]:
        barrel(pd, x, FL - h, 16, h)
    for x, s in [(470, 26), (500, 20), (528, 26)]:
        crate(pd, x, FL - s, s)
    lamp(pd, 122, FL, 72)
    lamp(pd, 596, FL, 72)
    lamp(pd, 792, FL, 72)
    pd.line((248, 0, 248, 54), fill="#1a232a", width=3)
    pd.line((248, 54, 264, 104), fill="#1a232a", width=2)
    pd.arc((246, 100, 282, 124), 20, 160, fill="#6a5638", width=2)
    pd.line((264, 110, 264, 136), fill="#1a232a", width=1)
    props.alpha_composite(Image.new("RGBA", props.size, (0, 0, 0, 0)))

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fd.rectangle((18, 18, 30, FL), fill="#05080b")
    fd.rectangle((18, 18, 190, 28), fill="#05080b")
    fd.line((26, 28, 160, 62), fill="#05080b", width=3)
    fd.line((160, 62, 160, 112), fill="#05080b", width=2)
    fd.rectangle((152, 112, 170, 118), fill="#0a0e12")
    fd.line((32, 36, 26, 92), fill="#111820", width=2)
    fd.rectangle((8, FL - 16, 118, FL), fill="#05080b")
    fd.rectangle((WIDE - 42, 0, WIDE - 36, 120), fill="#05080b")
    fd.line((WIDE - 39, 120, WIDE - 24, 136), fill="#05080b", width=2)
    fd.ellipse((WIDE - 28, 134, WIDE - 20, 142), outline="#05080b", width=2)

    write_layered(
        0,
        "ДОК",
        far,
        city,
        props,
        fg,
        "Superpowers backgrounds: night sea + city; custom port props",
        [
            {"type": "rain", "every": 2, "wind": -0.6},
            {"type": "motes", "every": 22, "color": "rgba(180,200,220,.14)"},
        ],
        [
            {"x": 122, "y": 138, "radius": 62, "color": "#f0a030", "alpha": 0.20},
            {"x": 596, "y": 138, "radius": 62, "color": "#f0a030", "alpha": 0.18},
            {"x": 792, "y": 138, "radius": 62, "color": "#f0a030", "alpha": 0.16},
            {"x": 700, "y": 34, "radius": 96, "color": "#a8c8e8", "alpha": 0.10},
        ],
        wet=True,
    )


def temple() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    gothic = ROOT / "assets" / "vendor" / "gothicvania-cemetery"
    selected = gothic / "selected" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    source = selected if selected.exists() else gothic / "extracted" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    columns_src = superpowers / "16.png"
    if not source.exists() or not columns_src.exists():
        print("skip arena 1: missing temple sources")
        return

    far = cover(Image.open(source / "background.png"))
    far = grade(far, 0.58, 0.78, (18, 8, 38, 44))
    far = wide(far)

    mid = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    mountains = resize(Image.open(source / "mountains.png"), (W, 82))
    mountains = tint(mountains, (24, 18, 42, 220))
    mountains = resize(mountains, (WIDE, 82))
    mid.alpha_composite(mountains, (0, 124))

    columns = keep_warm(Image.open(columns_src), (52, 38, 76))
    columns = resize(columns, (W, H))
    columns = wide(columns)
    mid.alpha_composite(columns)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Altar and candles in front of the ghost colonnade.
    pd.rectangle((354, FL - 26, 494, FL), fill="#211a2a", outline="#09060e")
    pd.rectangle((348, FL - 30, 500, FL - 24), fill="#3a2e4a")
    pd.line((370, FL - 20, 478, FL - 20), fill="#5a4a70", width=1)
    pd.line((370, FL - 14, 478, FL - 14), fill="#5a4a70", width=1)
    for x, y, h in [(120, FL, 10), (138, FL, 14), (158, FL, 8), (650, FL, 12), (672, FL, 16), (692, FL, 9)]:
        pd.rectangle((x - 2, y - h, x + 2, y), fill="#d8c8a8")
        pd.rectangle((x - 3, y - 2, x + 3, y), fill="#4a3a2a")
        pd.ellipse((x - 2, y - h - 4, x + 2, y - h), fill="#f8c060")
        pd.ellipse((x - 7, y - h - 9, x + 7, y - h + 5), fill=(248, 150, 60, 24))
    for name, x, bottom, scale in [
        ("statue.png", 392, FL - 26, 1.2),
        ("stone-1.png", 246, FL, 1.4),
        ("stone-3.png", 566, FL, 1.5),
        ("bush-small.png", 292, FL, 1.3),
        ("bush-small.png", 540, FL, 1.1),
    ]:
        prop = Image.open(source / "sliced-objects" / name).convert("RGBA")
        if scale != 1:
            prop = prop.resize((round(prop.width * scale), round(prop.height * scale)), Image.Resampling.NEAREST)
        tinted = tint(prop, (36, 28, 48, 240))
        props.alpha_composite(tinted, (x, bottom - tinted.height))

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    for name, x, bottom, scale in [
        ("tree-3.png", -22, FL, 1.15),
        ("tree-1.png", 712, FL, 1.05),
    ]:
        prop = Image.open(source / "sliced-objects" / name).convert("RGBA")
        prop = prop.resize((round(prop.width * scale), round(prop.height * scale)), Image.Resampling.NEAREST)
        tinted = tint(prop, (8, 5, 16, 238))
        fg.alpha_composite(tinted, (x, bottom - tinted.height))
    fd = ImageDraw.Draw(fg)
    fd.rectangle((0, 0, 18, FL), fill="#07040c")
    fd.rectangle((WIDE - 18, 0, WIDE, FL), fill="#07040c")

    write_layered(
        1,
        "ХРАМ ПРИЗРАКОВ",
        far,
        mid,
        props,
        fg,
        "GothicVania cemetery background/mountains + Superpowers temple columns",
        [
            {"type": "motes", "every": 18, "color": "rgba(180,160,220,.22)"},
            {"type": "fog", "every": 8},
        ],
        [
            {"x": 120, "y": 172, "radius": 42, "color": "#f0a050", "alpha": 0.16},
            {"x": 158, "y": 168, "radius": 42, "color": "#f0a050", "alpha": 0.14},
            {"x": 650, "y": 168, "radius": 42, "color": "#f0a050", "alpha": 0.14},
            {"x": 672, "y": 164, "radius": 42, "color": "#f0a050", "alpha": 0.14},
            {"x": 650, "y": 42, "radius": 110, "color": "#ff5ab0", "alpha": 0.09},
        ],
        fog=True,
    )


def main() -> int:
    cemetery()
    dojo()
    dock()
    temple()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
