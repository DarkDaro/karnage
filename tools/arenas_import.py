#!/usr/bin/env python3
"""Build arena layers from downloaded asset packs."""

from __future__ import annotations

import json
import math
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


def duotone(image: Image.Image, dark: tuple[int, int, int], light: tuple[int, int, int]) -> Image.Image:
    src = image.convert("RGBA")
    out = Image.new("RGBA", src.size, (0, 0, 0, 0))
    sp = src.load()
    op = out.load()
    for y in range(src.height):
        for x in range(src.width):
            r, g, b, a = sp[x, y]
            if not a:
                continue
            lum = (r * 0.3 + g * 0.59 + b * 0.11) / 255
            op[x, y] = (
                round(dark[0] + (light[0] - dark[0]) * lum),
                round(dark[1] + (light[1] - dark[1]) * lum),
                round(dark[2] + (light[2] - dark[2]) * lum),
                a,
            )
    return out


def tint(image: Image.Image, color: tuple[int, int, int, int]) -> Image.Image:
    out = Image.new("RGBA", image.size, color)
    out.putalpha(image.getchannel("A"))
    return out


def shade_sprite(
    image: Image.Image,
    brightness: float,
    saturation: float,
    color: tuple[int, int, int],
    alpha: int,
) -> Image.Image:
    """Darken a cut-out while keeping its own alpha and pixel detail."""
    src = ImageEnhance.Color(ImageEnhance.Brightness(image.convert("RGBA")).enhance(brightness)).enhance(saturation)
    out = Image.new("RGBA", src.size, (0, 0, 0, 0))
    sp = src.load()
    op = out.load()
    t = alpha / 255
    for y in range(src.height):
        for x in range(src.width):
            r, g, b, a = sp[x, y]
            if not a:
                continue
            op[x, y] = (
                round(r * (1 - t) + color[0] * t),
                round(g * (1 - t) + color[1] * t),
                round(b * (1 - t) + color[2] * t),
                a,
            )
    return out


def ridge(image: Image.Image, points: list[tuple[int, int]]) -> Image.Image:
    size = image.size
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).polygon(points + [(size[0], size[1]), (0, size[1])], fill=255)
    image.putalpha(Image.composite(image.getchannel("A"), Image.new("L", size, 0), mask))
    return image


def fade_top(image: Image.Image, end: int, peak: int = 255, start: int = 0) -> Image.Image:
    size = image.size
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    for y in range(size[1]):
        if y < start:
            value = 0
        elif y >= end:
            value = peak
        else:
            value = round(peak * (y - start) / max(1, end - start))
        draw.line((0, y, size[0], y), fill=value)
    image.putalpha(Image.composite(image.getchannel("A"), Image.new("L", size, 0), mask))
    return image


def wash(image: Image.Image, top: tuple[int, int, int, int], bottom: tuple[int, int, int, int]) -> Image.Image:
    size = image.size
    gradient = Image.new("RGBA", (1, size[1]))
    pixels = gradient.load()
    for y in range(size[1]):
        t = y / max(1, size[1] - 1)
        pixels[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(4))
    image.alpha_composite(gradient.resize(size, Image.Resampling.NEAREST))
    return image


def gradient(size: tuple[int, int], top: tuple[int, int, int, int], bottom: tuple[int, int, int, int]) -> Image.Image:
    lines = Image.new("RGBA", (1, size[1]))
    pixels = lines.load()
    for y in range(size[1]):
        t = y / max(1, size[1] - 1)
        pixels[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(4))
    return lines.resize(size, Image.Resampling.NEAREST)


def glow(image: Image.Image, x: int, y: int, radius: int, color: tuple[int, int, int], alpha: int) -> None:
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    steps = max(6, min(48, radius))
    for i in range(steps, 0, -1):
        r = round(radius * i / steps)
        a = round(alpha * ((steps - i) / steps) ** 1.7)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*color, a))
    image.alpha_composite(layer)


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
    fog_color: str | None = None,
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
    preview_fg = fg.copy()
    preview_fg.putalpha(preview_fg.getchannel("A").point(lambda value: round(value * 0.7)))
    preview.alpha_composite(preview_fg)
    preview.save(out / "preview.png", optimize=True)

    layers = [
        {"file": "far.png", "scroll": 0.12, "y": 0},
        {"file": "mid.png", "scroll": 0.38, "y": 0},
        {"file": "props.png", "scroll": 0.82, "y": 0},
        {"file": "fg.png", "scroll": 1.15, "y": 0, "foreground": True},
    ]
    data = {
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
    }
    if fog_color:
        data["fogColor"] = fog_color
    (out / "arena.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
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
    fd = ImageDraw.Draw(far)
    # Distant freighter on the horizon, behind the port props.
    fd.polygon([(338, 150), (346, 144), (400, 144), (408, 150)], fill=(8, 15, 24, 255))
    fd.rectangle((356, 139, 370, 144), fill=(10, 18, 28, 255))
    fd.line((394, 144, 394, 132), fill=(8, 14, 22, 255), width=1)
    fd.line((392, 136, 398, 132), fill=(8, 14, 22, 255), width=1)
    for x in range(344, 404, 14):
        fd.rectangle((x, 146, x + 3, 148), fill=(190, 160, 90, 80))

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
    fg_col = (7, 13, 19, 246)
    fd.rectangle((18, 18, 30, FL), fill=fg_col)
    fd.rectangle((18, 18, 190, 28), fill=fg_col)
    fd.line((26, 28, 160, 62), fill=fg_col, width=3)
    fd.line((160, 62, 160, 112), fill=fg_col, width=2)
    fd.rectangle((152, 112, 170, 118), fill=(12, 20, 27, 246))
    fd.line((32, 36, 26, 92), fill="#1d303c", width=2)
    fd.rectangle((8, FL - 4, 58, FL), fill=fg_col)
    fd.rectangle((WIDE - 42, 0, WIDE - 36, 120), fill=fg_col)
    fd.line((WIDE - 39, 120, WIDE - 24, 136), fill=fg_col, width=2)
    fd.ellipse((WIDE - 28, 134, WIDE - 20, 142), outline=fg_col, width=2)
    fd.line((30, 22, 30, FL - 8), fill="#203844", width=1)
    fd.line((18, 20, 190, 20), fill="#203844", width=1)
    fd.line((8, FL - 5, 58, FL - 5), fill="#263e4a", width=1)

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

    # Keep the stone texture of the source colonnade; a flat tint turned the pillars into slabs.
    columns = Image.open(columns_src).convert("RGBA")
    columns = grade(columns, 0.34, 0.45, (20, 10, 38, 96))
    columns = resize(columns, (W, H))
    columns = wide(columns)
    mid.alpha_composite(columns)
    md = ImageDraw.Draw(mid)
    # Punch the bays through to the cloudy far layer; the source sky made the colonnade look walled in.
    for left, right in [(36, 160), (226, 390), (466, 640), (706, 830)]:
        md.rectangle((left, 30, right, FL), fill=(0, 0, 0, 0))
    for x, y in [(172, 158), (196, 174), (398, 150), (430, 180), (654, 166), (684, 182)]:
        md.ellipse((x, y, x + 18, y + 5), fill=(48, 58, 42, 54))

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Faded banners hanging from beams between the pillars, below the HUD.
    for x, left, right in [(250, 232, 384), (566, 472, 634)]:
        pd.line((left, 72, right, 72), fill="#1a1024", width=3)
        pd.line((x + 2, 72, x + 2, 76), fill="#1a1024", width=1)
        pd.line((x + 28, 72, x + 28, 76), fill="#1a1024", width=1)
        pd.rectangle((x, 74, x + 30, 128), fill="#2a1838")
        pd.polygon([(x, 128), (x + 15, 144), (x + 30, 128)], fill="#2a1838")
        pd.line((x + 4, 78, x + 4, 124), fill="#4a305e", width=1)
        pd.rectangle((x + 11, 90, x + 19, 102), fill="#6a4a84")
        pd.line((x + 15, 104, x + 15, 119), fill="#4a305e", width=1)
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
        ("tree-3.png", -92, FL, 1.0),
        ("tree-1.png", 724, FL, 1.05),
    ]:
        prop = Image.open(source / "sliced-objects" / name).convert("RGBA")
        prop = prop.resize((round(prop.width * scale), round(prop.height * scale)), Image.Resampling.NEAREST)
        tinted = shade_sprite(prop, 0.28, 0.42, (10, 6, 20), 210)
        fg.alpha_composite(tinted, (x, bottom - tinted.height))
    fd = ImageDraw.Draw(fg)
    fd.rectangle((0, 0, 14, FL), fill=(13, 8, 24, 242))
    fd.rectangle((WIDE - 14, 0, WIDE, FL), fill=(13, 8, 24, 242))
    fd.line((14, 0, 14, FL), fill="#2a1838", width=1)
    fd.line((WIDE - 15, 0, WIDE - 15, FL), fill="#2a1838", width=1)

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


def cemetery_layered() -> None:
    base = ROOT / "assets" / "vendor" / "gothicvania-cemetery"
    selected = base / "selected" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    source = selected if selected.exists() else base / "extracted" / "gothicvania-cemetery-files" / "PNG" / "Environment"
    if not source.exists():
        print("skip arena 9: missing cemetery source")
        return

    far = cover(Image.open(source / "background.png"))
    far = grade(far, 0.76, 0.72, (10, 6, 28, 46))
    far = wide(far)
    fd = ImageDraw.Draw(far)
    for x, y in [(152, 34), (168, 26), (184, 38), (206, 30)]:
        fd.line((x - 4, y, x, y - 3, x + 4, y), fill=(18, 10, 26, 150), width=1)

    mid = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    mountains = resize(Image.open(source / "mountains.png"), (W, 82))
    mountains = tint(mountains, (20, 18, 34, 232))
    mountains = wide(mountains)
    mid.alpha_composite(mountains, (0, 124))

    graveyard = resize(Image.open(source / "graveyard.png"), (W, 136))
    graveyard = grade(graveyard, 0.68, 0.72, (6, 6, 16, 18))
    graveyard = wide(graveyard)
    mid.alpha_composite(graveyard, (0, 70))

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    for name, x, bottom, scale, tone in [
        ("tree-1.png", 18, FL, 1.05, (4, 4, 10, 26)),
        ("statue.png", 214, FL, 1.35, (2, 2, 8, 18)),
        ("stone-1.png", 330, FL, 1.5, (2, 2, 8, 18)),
        ("stone-3.png", 382, FL, 1.7, (2, 2, 8, 18)),
        ("bush-small.png", 470, FL, 1.25, (4, 4, 10, 26)),
        ("tree-2.png", 566, FL, 0.82, (4, 4, 10, 26)),
        ("stone-2.png", 668, FL, 1.25, (2, 2, 8, 18)),
    ]:
        prop = Image.open(source / "sliced-objects" / name).convert("RGBA")
        if scale != 1:
            prop = prop.resize((round(prop.width * scale), round(prop.height * scale)), Image.Resampling.NEAREST)
        prop = shade_sprite(prop, 0.62, 0.18, tone[:3], tone[3])
        props.alpha_composite(prop, (x, bottom - prop.height))

    pd = ImageDraw.Draw(props)
    for x, y, h in [(256, FL, 11), (274, FL, 15), (292, FL, 9), (648, FL, 12)]:
        pd.rectangle((x - 2, y - h, x + 2, y), fill="#b8a888")
        pd.rectangle((x - 3, y - 2, x + 3, y), fill="#3a3020")
        pd.ellipse((x - 2, y - h - 4, x + 2, y - h), fill="#f0b050")
        glow(props, x, y - h - 1, 7, (240, 150, 60), 26)

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    for name, x, bottom, scale, tone in [
        ("tree-3.png", -48, FL, 1.08, (7, 6, 15, 214)),
        ("tree-1.png", 746, FL, 1.16, (7, 6, 15, 214)),
        ("bush-large.png", -24, FL, 1.25, (6, 5, 13, 220)),
        ("bush-large.png", 804, FL, 1.1, (6, 5, 13, 220)),
    ]:
        prop = Image.open(source / "sliced-objects" / name).convert("RGBA")
        if scale != 1:
            prop = prop.resize((round(prop.width * scale), round(prop.height * scale)), Image.Resampling.NEAREST)
        prop = shade_sprite(prop, 0.34, 0.46, tone[:3], tone[3])
        fg.alpha_composite(prop, (x, bottom - prop.height))

    write_layered(
        9,
        "КЛАДБИЩЕ",
        far,
        mid,
        props,
        fg,
        "GothicVania Cemetery Pack: background, mountains, graveyard, statue and trees",
        [
            {"type": "fog", "every": 8},
            {"type": "motes", "every": 26, "color": "rgba(200,200,225,.16)"},
        ],
        [
            {"x": 196, "y": 48, "radius": 110, "color": "#d8b0e8", "alpha": 0.12},
            {"x": 256, "y": 188, "radius": 38, "color": "#f0a050", "alpha": 0.16},
            {"x": 292, "y": 180, "radius": 42, "color": "#f0a050", "alpha": 0.14},
            {"x": 648, "y": 186, "radius": 38, "color": "#f0a050", "alpha": 0.14},
        ],
        fog=True,
        fog_color="#a8a0c8",
    )


def dojo_layered() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    pagoda_src = superpowers / "38.png"
    bamboo_src = superpowers / "20.png"
    if not pagoda_src.exists() or not bamboo_src.exists():
        print("skip arena 4: missing pagoda/bamboo source")
        return

    far = cover(Image.open(pagoda_src))
    far = grade(far, 0.62, 0.6, (6, 14, 8, 54))
    far = wash(far, (2, 8, 6, 62), (10, 20, 10, 0))
    far = wide(far)
    fd = ImageDraw.Draw(far)
    glow(far, 676, 42, 44, (190, 215, 170), 20)
    fd.ellipse((663, 29, 689, 55), fill=(232, 236, 210, 210))
    fd.ellipse((669, 35, 683, 49), fill=(246, 248, 226, 235))

    mid = cover(Image.open(bamboo_src))
    mid = grade(mid, 0.52, 0.72, (4, 12, 5, 34))
    mid = fade_top(mid, 132, 235, start=108)
    mid = wide(mid)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Torii at the left.
    pd.rectangle((76, FL - 96, 86, FL), fill="#4a1e16")
    pd.rectangle((178, FL - 96, 188, FL), fill="#4a1e16")
    pd.rectangle((62, FL - 104, 202, FL - 94), fill="#64281c")
    pd.rectangle((58, FL - 110, 206, FL - 104), fill="#2a0e0a")
    pd.rectangle((88, FL - 84, 176, FL - 78), fill="#3a1610")
    pd.rectangle((70, FL - 72, 194, FL - 68), fill="#2a0e0a")
    for x in (80, 174):
        pd.rectangle((x, FL - 94, x + 8, FL - 6), fill="#2a0e0a")
        pd.rectangle((x + 2, FL - 92, x + 5, FL - 8), fill="#6a3020")

    # Stone lanterns.
    for x, y in [(350, FL), (648, FL)]:
        pd.rectangle((x - 12, y - 10, x + 12, y), fill="#383a30")
        pd.rectangle((x - 5, y - 34, x + 5, y - 10), fill="#4a4c3e")
        pd.rectangle((x - 12, y - 40, x + 12, y - 32), fill="#5a5c4a")
        pd.rectangle((x - 8, y - 50, x + 8, y - 40), fill="#2c2e26")
        pd.rectangle((x - 6, y - 48, x + 6, y - 42), fill="#e8c070")
        pd.polygon([(x - 16, y - 50), (x, y - 60), (x + 16, y - 50)], fill="#2c2e26")
        glow(props, x, y - 45, 24, (240, 190, 90), 30)

    # Weapon rack and training dummy.
    pd.rectangle((464, FL - 34, 470, FL), fill="#2a1c12")
    pd.rectangle((530, FL - 34, 536, FL), fill="#2a1c12")
    pd.rectangle((460, FL - 36, 540, FL - 30), fill="#3a2618")
    for x, tilt in [(478, 0), (496, 3), (514, -2)]:
        pd.line((x, FL - 38, x + tilt, FL - 8), fill="#8a8a80", width=2)
        pd.line((x - 4, FL - 12, x + 4, FL - 12), fill="#5a4a30", width=2)
        pd.line((x - 3, FL - 14, x + 3, FL - 10), fill="#5a4a30", width=2)
    pd.rectangle((578, FL - 48, 586, FL), fill="#3a2a18")
    pd.rectangle((566, FL - 44, 598, FL - 16), fill="#5a4a2e")
    pd.rectangle((570, FL - 40, 594, FL - 34), fill="#7a6a44")
    pd.line((568, FL - 28, 596, FL - 28), fill="#2a1e12", width=1)

    # Rocks and a fallen blade.
    for x, w, h, c in [(232, 26, 9, "#2e3228"), (242, 18, 6, "#3a3e30"), (690, 30, 10, "#2e3228"), (704, 20, 7, "#3a3e30")]:
        pd.polygon([(x, FL), (x + w * 0.24, FL - h), (x + w * 0.72, FL - h + 1), (x + w, FL)], fill=c)
    pd.line((418, FL - 3, 442, FL - 6), fill="#8a8a78", width=2)
    pd.line((418, FL - 3, 421, FL - 9), fill="#4a3a24", width=2)

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fdraw = ImageDraw.Draw(fg)
    fg_col = (9, 20, 10, 246)
    for x, lean in [(-8, 3), (6, -2), (830, -4), (844, 2)]:
        fdraw.rectangle((x, 0, x + 7, FL), fill=fg_col)
        fdraw.line((x + 3, 0, x + 3 + lean, 84), fill="#183018", width=2)
        for y in range(14, FL, 22):
            fdraw.line((x - 1, y, x + 8, y), fill="#1d3a1a", width=1)
        for y in range(18, 176, 26):
            side = -1 if (y // 26) % 2 else 1
            fdraw.polygon(
                [(x + 4, y), (x + 4 + side * 30, y - 12), (x + 4 + side * 16, y + 4)],
                fill=(7, 15, 7, 246),
            )
    fdraw.rectangle((0, 0, 104, 12), fill=fg_col)
    fdraw.polygon([(0, 12), (48, 26), (88, 18), (112, 28), (112, 0), (0, 0)], fill=fg_col)
    fdraw.rectangle((0, FL - 4, 30, FL), fill=fg_col)
    fdraw.rectangle((WIDE - 36, FL - 5, WIDE, FL), fill=fg_col)
    fdraw.line((0, 13, 48, 27, 88, 19, 112, 29), fill="#21401e", width=1)
    fdraw.line((0, FL - 9, 38, FL - 9), fill="#25441f", width=1)

    write_layered(
        4,
        "ДОДЗЁ КЛИНКА",
        far,
        mid,
        props,
        fg,
        "Superpowers pagoda + bamboo; custom torii, lanterns and weapon rack",
        [
            {"type": "motes", "every": 22, "color": "rgba(200,220,150,.24)"},
            {"type": "fog", "every": 10},
        ],
        [
            {"x": 350, "y": 160, "radius": 46, "color": "#f0b050", "alpha": 0.18},
            {"x": 648, "y": 160, "radius": 46, "color": "#f0b050", "alpha": 0.18},
            {"x": 676, "y": 42, "radius": 92, "color": "#d8e8b0", "alpha": 0.12},
        ],
        fog=True,
        fog_color="#a8c890",
    )



def storm_city() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "33.png"
    city_src = superpowers / "14.png"
    if not far_src.exists() or not city_src.exists():
        print("skip arena 2: missing storm city sources")
        return

    far = cover(Image.open(far_src))
    far = grade(far, 0.84, 0.86, (4, 14, 26, 44))
    far = wash(far, (2, 8, 16, 72), (10, 30, 40, 0))
    far = wide(far)

    mid = keep_bright(Image.open(city_src), 48, (12, 38, 50))
    mid = resize(mid, (W, H))
    mid = ImageEnhance.Brightness(mid).enhance(1.16)
    mid = wide(mid)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    for x, y, w, h, body, trim in [
        (42, FL - 38, 72, 38, "#14242a", "#2e4a52"),
        (150, FL - 58, 54, 58, "#182a30", "#3a5a60"),
        (438, FL - 34, 90, 34, "#101e24", "#28444a"),
        (596, FL - 48, 64, 48, "#16262c", "#345258"),
    ]:
        pd.rectangle((x, y, x + w, y + h), fill=body, outline="#04090b")
        pd.rectangle((x + 3, y + 3, x + w - 3, y + 8), fill=trim)
        for rx in range(x + 5, x + w - 4, 8):
            pd.line((rx, y + 10, rx, y + h - 3), fill="#081014", width=1)
        pd.line((x, y + h, x + w, y + h), fill="#04090b", width=1)
    for x, y, w, h in [(108, FL - 22, 22, 22), (214, FL - 18, 18, 18), (668, FL - 24, 24, 24)]:
        pd.ellipse((x, y, x + w, y + h), fill="#20343a", outline="#050a0c")
        pd.ellipse((x + 4, y + 4, x + w - 4, y + h - 4), fill="#0a1216")
        pd.line((x + w // 2, y + 4, x + w // 2, y + h - 4), fill="#34545a", width=1)
    # Antenna and beacon.
    pd.line((272, FL - 58, 272, 34), fill="#15262c", width=3)
    pd.line((272, 52, 254, 34), fill="#15262c", width=2)
    pd.line((272, 58, 292, 40), fill="#15262c", width=2)
    pd.rectangle((268, 30, 276, 36), fill="#5a2018")
    pd.rectangle((269, 31, 275, 34), fill="#e05038")
    # Billboard without text.
    pd.rectangle((500, 66, 624, 126), fill="#080e12", outline="#1e363c")
    pd.rectangle((506, 72, 618, 120), fill="#123038")
    for x, y, w in [(512, 80, 46), (564, 80, 48), (512, 98, 100)]:
        pd.rectangle((x, y, x + w, y + 5), fill="#4a9aa0")
    pd.line((516, 126, 516, FL), fill="#102024", width=3)
    pd.line((608, 126, 608, FL), fill="#102024", width=3)
    # Rooftop water tower.
    pd.line((724, FL, 724, FL - 84), fill="#16282e", width=3)
    pd.line((772, FL, 772, FL - 84), fill="#16282e", width=3)
    pd.line((718, FL - 22, 778, FL - 84), fill="#16282e", width=2)
    pd.rectangle((716, FL - 92, 782, FL - 66), fill="#1c343a", outline="#050a0c")
    pd.polygon([(712, FL - 92), (749, FL - 108), (786, FL - 92)], fill="#102024")
    pd.rectangle((726, FL - 86, 772, FL - 72), fill="#2a4a50")
    # Chain-link gate.
    pd.rectangle((360, FL - 42, 452, FL), outline="#1a3036")
    for x in range(364, 452, 12):
        pd.line((x, FL - 42, x + 12, FL), fill="#1a3036", width=1)
        pd.line((x + 12, FL - 42, x, FL), fill="#1a3036", width=1)
    for x, h in [(318, 18), (334, 22), (350, 14)]:
        barrel(pd, x, FL - h, 14, h)
    # Warning beacons.
    glow(props, 160, 88, 20, (240, 80, 50), 26)
    glow(props, 560, 98, 24, (80, 200, 210), 22)

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fg_col = (7, 13, 16, 246)
    fd.line((0, 24, 180, 42), fill=fg_col, width=2)
    fd.line((180, 42, 380, 28), fill=fg_col, width=2)
    fd.line((380, 28, 620, 50), fill=fg_col, width=2)
    fd.line((620, 50, WIDE, 30), fill=fg_col, width=2)
    fd.line((126, 30, 126, 104), fill=fg_col, width=1)
    fd.rectangle((10, 0, 16, 156), fill=fg_col)
    fd.rectangle((0, 0, 46, 12), fill=fg_col)
    fd.rectangle((WIDE - 28, 0, WIDE - 22, 170), fill=fg_col)
    fd.line((WIDE - 26, 170, WIDE - 8, 190), fill=fg_col, width=2)
    fd.rectangle((0, FL - 4, 28, FL), fill=fg_col)
    fd.rectangle((WIDE - 36, FL - 5, WIDE, FL), fill=fg_col)
    fd.line((0, 25, 180, 43), fill="#1d333a", width=1)
    fd.line((380, 29, 620, 51), fill="#1d333a", width=1)
    fd.line((16, 0, 16, 156), fill="#1d333a", width=1)

    write_layered(
        2,
        "ГРОЗОВОЙ ГОРОД",
        far,
        mid,
        props,
        fg,
        "Superpowers storm bridge + night city; custom rooftop units and cables",
        [
            {"type": "rain", "every": 1, "wind": -0.8},
            {"type": "motes", "every": 30, "color": "rgba(160,190,210,.12)"},
        ],
        [
            {"x": 160, "y": 88, "radius": 42, "color": "#f05030", "alpha": 0.2},
            {"x": 560, "y": 98, "radius": 54, "color": "#50c8d0", "alpha": 0.16},
            {"x": 120, "y": 162, "radius": 54, "color": "#e8c060", "alpha": 0.14},
        ],
        wet=True,
    )


def quarry() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "4.png"
    rock_src = superpowers / "12.png"
    if not far_src.exists() or not rock_src.exists():
        print("skip arena 3: missing quarry sources")
        return

    far = cover(Image.open(far_src))
    far = grade(far, 0.8, 0.62, (26, 18, 10, 42))
    far = wash(far, (14, 10, 6, 52), (30, 22, 12, 0))
    far = wide(far)

    mid = cover(Image.open(rock_src))
    mid = grade(mid, 0.5, 0.45, (24, 16, 10, 36))
    mid = wide(mid)
    mid = ridge(
        mid,
        [
            (0, 128), (54, 118), (106, 126), (164, 114), (220, 124), (286, 110),
            (342, 121), (402, 112), (462, 127), (526, 116), (586, 129), (646, 118),
            (706, 126), (770, 114), (820, 124), (848, 120),
        ],
    )
    md = ImageDraw.Draw(mid)
    # Processing plant and conveyor gantry on the horizon.
    for x, w, h in [(28, 8, 42), (42, 5, 30), (196, 7, 36), (208, 4, 24), (610, 9, 46), (626, 5, 28)]:
        md.rectangle((x, 168 - h, x + w, 168), fill=(44, 31, 18, 170))
    md.line((0, 168, WIDE, 168), fill=(50, 34, 20, 150), width=2)
    md.line((512, 164, 620, 128), fill=(52, 38, 22, 160), width=3)
    md.line((620, 128, 708, 132), fill=(52, 38, 22, 160), width=2)
    md.line((544, 155, 544, 118), fill=(52, 38, 22, 150), width=1)
    md.line((660, 132, 660, 98), fill=(52, 38, 22, 150), width=1)
    md.polygon([(720, 168), (740, 132), (760, 168)], fill=(38, 26, 15, 180))
    md.line((0, 170, WIDE, 170), fill=(30, 20, 12, 180), width=2)
    md.line((0, 186, WIDE, 186), fill=(20, 14, 8, 160), width=1)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Headframe over the shaft.
    pd.line((74, FL, 110, 66), fill="#24180e", width=7)
    pd.line((152, FL, 110, 66), fill="#24180e", width=7)
    pd.line((110, 66, 110, 98), fill="#3a2614", width=3)
    pd.rectangle((82, 96, 138, 102), fill="#2a1c10")
    pd.ellipse((102, 100, 118, 116), outline="#5a4024", width=2)
    pd.line((110, 112, 110, 140), fill="#4a3420", width=2)
    pd.line((86, 140, 134, 140), fill="#2a1c10", width=2)
    # Mine cart and rail.
    pd.line((204, FL - 2, 324, FL - 4), fill="#1a1410", width=2)
    pd.rectangle((226, FL - 26, 292, FL - 6), fill="#2e2418", outline="#0a0806")
    pd.rectangle((230, FL - 22, 288, FL - 18), fill="#4a3824")
    for wx in (238, 276):
        pd.ellipse((wx, FL - 8, wx + 10, FL + 2), fill="#0c0a08", outline="#4a3a26")
    for x, w, h in [(240, 12, 7), (256, 16, 9), (274, 10, 6)]:
        pd.polygon([(x, FL - 26), (x + w // 2, FL - 26 - h), (x + w, FL - 26)], fill="#5a4a34")
    # Conveyor.
    pd.polygon([(430, FL - 16), (560, FL - 54), (566, FL - 46), (438, FL - 8)], fill="#1e1812")
    for i in range(6):
        x = 444 + i * 20
        y = FL - 18 - i * 4
        pd.ellipse((x - 3, y - 3, x + 3, y + 3), fill="#4a3a26")
    pd.line((430, FL - 16, 436, FL - 8), fill="#2a2016", width=3)
    pd.line((560, FL - 54, 566, FL - 46), fill="#2a2016", width=3)
    # Crates and barrels.
    for x, s in [(596, 24), (624, 18), (650, 24)]:
        crate(pd, x, FL - s, s)
    for x, h in [(704, 20), (720, 16)]:
        barrel(pd, x, FL - h, 15, h)
    # Hazard barrier and winch.
    pd.rectangle((332, FL - 26, 390, FL - 8), fill="#2a2014", outline="#0a0806")
    for i, x in enumerate(range(334, 386, 10)):
        pd.polygon([(x, FL - 8), (x + 8, FL - 26), (x + 13, FL - 26), (x + 5, FL - 8)], fill="#a07a30" if i % 2 == 0 else "#1a1410")
    pd.rectangle((342, FL - 36, 380, FL - 26), fill="#3a2a18")
    pd.line((346, FL - 36, 346, FL - 26), fill="#20160c", width=2)
    pd.line((376, FL - 36, 376, FL - 26), fill="#20160c", width=2)
    # Floodlight.
    lamp(pd, 372, FL, 74)
    # Loose rock.
    for x, w, h in [(14, 28, 9), (26, 18, 6), (512, 22, 8), (684, 30, 10)]:
        pd.polygon([(x, FL), (x + w * 0.3, FL - h), (x + w * 0.75, FL - h + 2), (x + w, FL)], fill="#453422")

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fg_col = (20, 15, 9, 246)
    fd.line((0, 18, 96, 34), fill=fg_col, width=9)
    fd.line((0, 18, 40, 150), fill=fg_col, width=7)
    fd.line((WIDE, 26, 760, 46), fill=fg_col, width=8)
    fd.line((WIDE, 26, 826, 148), fill=fg_col, width=6)
    fd.line((152, 0, 152, 64), fill=fg_col, width=2)
    fd.line((152, 64, 138, 80), fill=fg_col, width=2)
    fd.polygon([(0, FL - 5), (22, FL - 11), (32, FL - 3), (28, FL)], fill=fg_col)
    fd.polygon([(WIDE, FL - 6), (WIDE - 22, FL - 12), (WIDE - 32, FL - 3), (WIDE - 28, FL)], fill=fg_col)
    fd.line((0, 23, 96, 39), fill="#4a3520", width=1)
    fd.line((152, 0, 152, 64), fill="#3a2a18", width=1)
    fd.line((0, 15, 24, 15), fill="#3a2a18", width=1)

    write_layered(
        3,
        "КАМЕННОЛОМНЯ",
        far,
        mid,
        props,
        fg,
        "Superpowers red cliffs + cave rock; custom headframe, cart and conveyor",
        [
            {"type": "sand", "every": 7, "color": "rgba(200,170,110,.16)"},
            {"type": "motes", "every": 20, "color": "rgba(220,190,140,.14)"},
        ],
        [
            {"x": 372, "y": 128, "radius": 70, "color": "#f0b060", "alpha": 0.2},
            {"x": 110, "y": 156, "radius": 48, "color": "#d09050", "alpha": 0.12},
        ],
        fog=True,
        fog_color="#c8a878",
    )


def desert() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "9.png"
    ruin_src = superpowers / "40.png"
    kenney = ROOT / "assets" / "vendor" / "kenney-background-elements" / "extracted" / "PNG" / "Default"
    if not far_src.exists() or not ruin_src.exists():
        print("skip arena 5: missing desert sources")
        return

    far = gradient((WIDE, H), (22, 8, 30, 255), (198, 94, 30, 255))
    glow(far, 676, 62, 84, (255, 170, 70), 58)
    fd = ImageDraw.Draw(far)
    fd.ellipse((650, 36, 694, 80), fill=(248, 196, 104, 235))
    fd.ellipse((658, 44, 686, 72), fill=(255, 226, 154, 245))
    dunes = keep_warm(Image.open(far_src), (60, 26, 8))
    dunes = duotone(dunes, (46, 18, 10), (240, 160, 80))
    dunes = resize(dunes, (W, H))
    dunes = wide(dunes)
    far.alpha_composite(dunes)
    fd = ImageDraw.Draw(far)
    for x, y in [(176, 42), (192, 34), (207, 44)]:
        fd.line((x - 4, y, x, y - 3, x + 4, y), fill=(28, 14, 8, 150), width=1)

    mid = cover(Image.open(ruin_src))
    mid = grade(mid, 0.56, 0.52, (30, 18, 8, 38))
    mid = wide(mid)
    mid = ridge(
        mid,
        [
            (0, 140), (58, 128), (108, 136), (164, 118), (232, 132), (292, 124),
            (350, 138), (412, 120), (474, 132), (540, 122), (606, 136), (664, 124),
            (728, 134), (792, 120), (848, 130),
        ],
    )
    md = ImageDraw.Draw(mid)
    md.line((0, 184, WIDE, 184), fill=(28, 16, 8, 120), width=2)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Obelisk.
    pd.polygon([(92, FL), (102, FL - 104), (132, FL - 104), (142, FL)], fill="#4a3420", outline="#120c06")
    pd.polygon([(100, FL - 104), (117, FL - 122), (134, FL - 104)], fill="#5a4228")
    pd.line((103, FL - 102, 103, FL - 2), fill="#7a5a34", width=1)
    pd.line((131, FL - 102, 131, FL - 2), fill="#1a1008", width=1)
    for y in range(FL - 88, FL - 18, 16):
        pd.rectangle((112, y, 122, y + 3), fill="#8a6a3a")
    pd.polygon([(82, FL), (100, FL - 7), (134, FL - 7), (148, FL)], fill="#2e1c0e")
    # Broken columns.
    for x, h in [(286, 52), (326, 74), (366, 40)]:
        pd.rectangle((x, FL - h, x + 22, FL), fill="#4a3824", outline="#120c06")
        pd.rectangle((x - 3, FL - h, x + 25, FL - h + 7), fill="#5c462c")
        pd.rectangle((x + 3, FL - h + 16, x + 19, FL - h + 18), fill="#2a1c10")
    # Tent.
    pd.polygon([(492, FL), (544, FL - 54), (596, FL)], fill="#3e2a18", outline="#100a05")
    pd.polygon([(544, FL - 54), (574, FL - 42), (574, FL), (508, FL)], fill="#2c1c0e")
    pd.line((544, FL - 54, 544, FL - 70), fill="#2a1c10", width=2)
    # Campfire.
    for a, b in [(-12, 2), (12, 2), (-10, -4), (10, -4)]:
        pd.line((430 - 6, FL - 2, 430 + a, FL - 10 + b), fill="#3a2412", width=3)
    pd.polygon([(424, FL - 8), (430, FL - 30), (436, FL - 8)], fill="#d06020")
    pd.polygon([(427, FL - 8), (431, FL - 22), (434, FL - 8)], fill="#f0a040")
    glow(props, 430, FL - 14, 34, (240, 140, 40), 32)
    # Bones.
    pd.ellipse((612, FL - 16, 628, FL - 2), fill="#b8a888")
    pd.rectangle((616, FL - 10, 620, FL - 7), fill="#2a2018")
    pd.rectangle((622, FL - 10, 626, FL - 7), fill="#2a2018")
    for i in range(3):
        pd.line((632 + i * 8, FL - 12 + i * 2, 646 + i * 8, FL - 4 + i * 2), fill="#b8a888", width=2)
    # Palm.
    if (kenney / "treePalm.png").exists():
        palm = Image.open(kenney / "treePalm.png").convert("RGBA").resize((94, 112), Image.Resampling.NEAREST)
        palm = shade_sprite(palm, 0.45, 0.45, (24, 14, 6), 40)
        props.alpha_composite(palm, (656, FL - palm.height))
    for x, w, h in [(22, 30, 8), (46, 18, 5), (240, 24, 7), (688, 26, 8)]:
        pd.polygon([(x, FL), (x + w * 0.3, FL - h), (x + w * 0.7, FL - h + 1), (x + w, FL)], fill="#5a3c20")

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fg_col = (34, 18, 8, 246)
    fd.polygon([(0, FL - 5), (30, FL - 11), (38, FL - 2), (34, FL), (0, FL)], fill=fg_col)
    fd.polygon([(WIDE, FL - 6), (WIDE - 30, FL - 12), (WIDE - 38, FL - 2), (WIDE - 34, FL), (WIDE, FL)], fill=fg_col)
    fd.line((820, 0, 820, 48), fill=fg_col, width=3)
    fd.line((820, 48, 790, 70), fill=fg_col, width=2)
    fd.line((0, FL - 6, 30, FL - 12), fill="#6a3a18", width=1)
    fd.line((WIDE, FL - 7, WIDE - 30, FL - 13), fill="#6a3a18", width=1)
    if (kenney / "treeDead.png").exists():
        tree = Image.open(kenney / "treeDead.png").convert("RGBA").resize((92, 132), Image.Resampling.NEAREST)
        tree = shade_sprite(tree, 0.30, 0.48, (20, 10, 5), 210)
        fg.alpha_composite(tree, (792, FL - tree.height))

    write_layered(
        5,
        "ПУСТЫНЯ",
        far,
        mid,
        props,
        fg,
        "Superpowers pyramid + desert ruins; Kenney palm and custom obelisk/tent",
        [
            {"type": "sand", "every": 6, "color": "rgba(230,190,120,.18)"},
            {"type": "motes", "every": 24, "color": "rgba(240,210,150,.14)"},
        ],
        [
            {"x": 430, "y": 188, "radius": 62, "color": "#f0a040", "alpha": 0.24},
            {"x": 666, "y": 54, "radius": 100, "color": "#f0c060", "alpha": 0.12},
            {"x": 112, "y": 120, "radius": 48, "color": "#e0a050", "alpha": 0.1},
        ],
        fog=True,
        fog_color="#d8a060",
    )


def volcano() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "27.png"
    rock_src = superpowers / "13.png"
    if not far_src.exists() or not rock_src.exists():
        print("skip arena 6: missing volcano sources")
        return

    far = cover(Image.open(far_src))
    far = grade(far, 0.9, 1.14, (30, 2, 0, 28))
    far = wash(far, (30, 4, 2, 56), (92, 22, 4, 0))
    far = wide(far)

    mid = cover(Image.open(rock_src))
    mid = grade(mid, 0.52, 0.82, (26, 2, 0, 32))
    mid = wide(mid)
    mid = ridge(
        mid,
        [
            (0, 132), (44, 118), (88, 140), (136, 112), (186, 134), (238, 106),
            (290, 128), (344, 110), (398, 136), (452, 114), (508, 131), (562, 108),
            (618, 138), (674, 116), (730, 134), (786, 110), (848, 128),
        ],
    )

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    for x, w, h, c in [
        (18, 58, 34, "#1a1210"), (60, 34, 18, "#2a1814"), (238, 44, 22, "#1c1210"),
        (292, 68, 38, "#241412"), (664, 50, 28, "#1a1010"), (714, 30, 16, "#2a1814"),
    ]:
        pd.polygon([(x, FL), (x + w * 0.22, FL - h), (x + w * 0.62, FL - h - 4), (x + w, FL)], fill=c)
        pd.line((x + w * 0.3, FL - 4, x + w * 0.55, FL - h + 4), fill="#4a2018", width=1)
    # Lava band behind the fighters' feet.
    pd.polygon(
        [(206, FL - 4), (226, FL - 14), (264, FL - 9), (298, FL - 18), (338, FL - 8),
         (386, FL - 16), (430, FL - 7), (474, FL - 15), (522, FL - 6), (548, FL - 4)],
        fill="#8a2a10",
    )
    pd.line(
        [(206, FL - 4), (226, FL - 14), (264, FL - 9), (298, FL - 18), (338, FL - 8),
         (386, FL - 16), (430, FL - 7), (474, FL - 15), (522, FL - 6), (548, FL - 4)],
        fill="#f07028", width=2,
    )
    glow(props, 378, FL - 12, 54, (240, 90, 30), 34)
    # Cracked obsidian arch with a lava fall inside it.
    pd.rectangle((430, FL - 82, 446, FL), fill="#140e0c")
    pd.rectangle((518, FL - 70, 534, FL), fill="#140e0c")
    pd.line((438, FL - 82, 482, FL - 94), fill="#140e0c", width=8)
    pd.line((482, FL - 94, 528, FL - 74), fill="#140e0c", width=6)
    pd.line((470, FL - 88, 478, FL - 60), fill="#3a1a12", width=2)
    pd.polygon([(468, 154), (480, 154), (486, FL - 4), (462, FL - 4)], fill="#7a2a10")
    pd.line([(472, 154), (468, FL - 4)], fill="#f07028", width=2)
    pd.line([(478, 154), (482, FL - 6)], fill="#f0a040", width=1)
    glow(props, 474, FL - 26, 28, (240, 90, 30), 22)
    # Ember crack on the back wall.
    pd.line((102, 146, 132, 170, 120, 198), fill="#e05020", width=2)
    glow(props, 118, 174, 26, (240, 80, 30), 26)
    pd.line((600, 118, 620, 146, 610, 176), fill="#d04820", width=2)
    # Bones.
    pd.ellipse((570, FL - 12, 584, FL - 2), fill="#8a7a68")
    pd.rectangle((574, FL - 8, 577, FL - 5), fill="#1a1210")

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fg_col = (18, 6, 5, 246)
    fd.polygon([(0, 0), (196, 0), (166, 32), (128, 24), (102, 54), (58, 32), (0, 62)], fill=fg_col)
    fd.polygon([(WIDE, 0), (676, 0), (706, 30), (748, 20), (778, 48), (826, 28), (WIDE, 58)], fill=fg_col)
    fd.polygon([(0, FL - 5), (26, FL - 12), (34, FL - 2), (30, FL), (0, FL)], fill=fg_col)
    fd.polygon([(WIDE, FL - 5), (WIDE - 26, FL - 12), (WIDE - 34, FL - 2), (WIDE - 30, FL), (WIDE, FL)], fill=fg_col)
    for x, y in [(154, 0), (174, 0), (704, 0), (726, 0)]:
        fd.line((x, y, x + 2, 74), fill=fg_col, width=2)
        fd.ellipse((x - 2, 72, x + 4, 78), outline=fg_col, width=2)
    fd.line((0, 61, 58, 31, 102, 53, 128, 23, 166, 31, 196, 0), fill="#4a1a10", width=1)
    fd.line((WIDE, 57, 826, 27, 778, 47, 748, 19, 706, 29, 676, 0), fill="#4a1a10", width=1)

    write_layered(
        6,
        "ВУЛКАН",
        far,
        mid,
        props,
        fg,
        "Superpowers lava field + lava rock; custom lava band, arch and ash",
        [
            {"type": "ember", "every": 2, "color": "rgba(240,110,40,.75)"},
            {"type": "motes", "every": 18, "color": "rgba(120,100,90,.14)"},
        ],
        [
            {"x": 378, "y": 194, "radius": 92, "color": "#f06020", "alpha": 0.26},
            {"x": 118, "y": 174, "radius": 54, "color": "#e05020", "alpha": 0.18},
            {"x": 610, "y": 150, "radius": 48, "color": "#d04820", "alpha": 0.14},
        ],
        fog=True,
        fog_color="#e07038",
    )


def glacier() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "26.png"
    ice_src = superpowers / "12.png"
    kenney = ROOT / "assets" / "vendor" / "kenney-background-elements" / "extracted" / "PNG" / "Default"
    if not far_src.exists() or not ice_src.exists():
        print("skip arena 7: missing glacier sources")
        return

    far = cover(Image.open(far_src))
    far = grade(far, 0.56, 0.08, (6, 26, 48, 108))
    far = wash(far, (2, 8, 22, 116), (18, 46, 70, 0))
    far = wide(far)
    # Slow aurora bands over the snowfield.
    aurora = Image.new("RGBA", far.size, (0, 0, 0, 0))
    ad = ImageDraw.Draw(aurora)
    for i, (base, color, width) in enumerate(
        [
            (30, (60, 200, 160, 36), 12),
            (52, (80, 140, 230, 30), 9),
            (74, (160, 100, 220, 22), 7),
        ]
    ):
        points = []
        for x in range(-20, WIDE + 20, 12):
            y = base + round(math.sin(x / 58 + i * 1.7) * 8 + math.sin(x / 19 + i) * 2)
            points.append((x, y))
        ad.line(points, fill=color, width=width, joint="curve")
    far.alpha_composite(aurora)
    fd = ImageDraw.Draw(far)
    for x, y, r in [(92, 28, 1), (148, 46, 1), (222, 20, 2), (300, 38, 1), (352, 58, 1), (744, 30, 1), (792, 52, 2)]:
        fd.rectangle((x, y, x + r, y + r), fill=(210, 230, 245, 180))
    glow(far, 676, 46, 44, (170, 210, 235), 18)
    fd.ellipse((665, 35, 687, 57), fill=(214, 232, 245, 205))

    mid = cover(Image.open(ice_src))
    mid = grade(mid, 0.64, 0.26, (8, 24, 44, 84))
    mid = wide(mid)
    mid = ridge(
        mid,
        [
            (0, 136), (54, 120), (110, 132), (166, 114), (226, 128), (288, 110),
            (350, 126), (412, 108), (474, 124), (536, 112), (598, 130), (660, 112),
            (722, 126), (784, 108), (848, 124),
        ],
    )
    md = ImageDraw.Draw(mid)
    # Jagged blue ice walls with lit crests, not flat translucent triangles.
    for x, w, h, base in [(0, 132, 84, 174), (154, 106, 62, 176), (556, 126, 78, 174), (704, 106, 58, 176)]:
        crest = [
            (x, base),
            (x + w * 0.10, base - h * 0.62),
            (x + w * 0.24, base - h),
            (x + w * 0.38, base - h * 0.74),
            (x + w * 0.55, base - h * 0.92),
            (x + w * 0.72, base - h * 0.42),
            (x + w * 0.86, base - h * 0.58),
            (x + w, base),
        ]
        md.polygon(crest, fill=(20, 46, 66, 232))
        md.line(crest[1:-1], fill=(118, 168, 198, 130), width=2)
        md.line((x + w * 0.24, base - h, x + w * 0.38, base - h * 0.74), fill=(170, 214, 236, 100), width=1)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Broken ice arch; jagged segments and icicles instead of a smooth ring.
    arch = []
    for i in range(13):
        t = i / 12
        arch.append((112 + 196 * t, FL - 132 * math.sin(math.pi * t) + (i % 3 - 1) * 4))
    for i in range(1, len(arch)):
        pd.line((arch[i - 1][0], arch[i - 1][1], arch[i][0], arch[i][1]), fill=(30, 62, 82, 232), width=8 + (i % 3) * 2)
    pd.line(arch, fill=(118, 168, 196, 135), width=2, joint="curve")
    for i in range(1, len(arch) - 1, 2):
        x, y = arch[i]
        pd.polygon([(x - 3, y + 7), (x, y + 18 + (i % 3) * 5), (x + 3, y + 7)], fill=(34, 72, 94, 226))
    pd.line((744, FL, 744, FL - 116), fill=(22, 44, 60, 230), width=3)
    pd.line((744, FL - 116, 770, FL - 94), fill=(22, 44, 60, 230), width=2)
    pd.line((724, FL - 82, 766, FL - 82), fill=(30, 58, 76, 220), width=2)
    # Ice spikes.
    for x, w, h, c in [
        (72, 34, 42, "#4a7898"), (104, 22, 26, "#5a88a8"), (266, 30, 34, "#3e6a8c"),
        (300, 20, 22, "#5a88a8"), (560, 38, 50, "#4a7898"), (598, 24, 30, "#6090b0"),
    ]:
        pd.polygon([(x, FL), (x + w // 2, FL - h), (x + w, FL)], fill=c)
        pd.line((x + w // 2, FL - h + 3, x + w // 2, FL - 6), fill="#9ac4dc", width=1)
    # Frozen columns.
    for x, h in [(396, 76), (438, 56)]:
        pd.rectangle((x, FL - h, x + 20, FL), fill="#345a74", outline="#102838")
        pd.rectangle((x - 3, FL - h, x + 23, FL - h + 6), fill="#4a7898")
        pd.polygon([(x - 4, FL - h), (x + 10, FL - h - 10), (x + 16, FL - h + 2), (x + 24, FL - h)], fill="#9ac4dc")
    if (kenney / "treePineFrozen.png").exists():
        pine = Image.open(kenney / "treePineFrozen.png").convert("RGBA").resize((54, 124), Image.Resampling.NEAREST)
        pine = shade_sprite(pine, 0.45, 0.40, (8, 18, 30), 45)
        props.alpha_composite(pine, (706, FL - pine.height))
    for x, w, h in [(18, 42, 10), (196, 28, 8), (640, 36, 9)]:
        pd.polygon([(x, FL), (x + w * 0.3, FL - h), (x + w * 0.7, FL - h + 1), (x + w, FL)], fill="#2e5268")

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fg_col = (10, 28, 42, 246)
    for x, w, h in [(18, 10, 74), (46, 7, 46), (786, 8, 58), (816, 12, 88)]:
        fd.polygon([(x, 0), (x + w, 0), (x + w // 2, h)], fill=fg_col)
        fd.line((x, 0, x + w // 2, h), fill="#2a5a74", width=1)
    fd.rectangle((0, 0, 72, 10), fill=fg_col)
    fd.rectangle((WIDE - 94, 0, WIDE, 12), fill=fg_col)
    fd.polygon([(0, FL - 5), (24, FL - 11), (32, FL - 2), (28, FL), (0, FL)], fill=fg_col)
    fd.polygon([(WIDE, FL - 5), (WIDE - 24, FL - 11), (WIDE - 32, FL - 2), (WIDE - 28, FL), (WIDE, FL)], fill=fg_col)
    fd.polygon([(744, 118), (770, 62), (790, 126)], fill=(12, 34, 50, 246))
    fd.line((744, 118, 770, 62), fill="#2a5a74", width=1)
    fd.line((0, FL - 6, 24, FL - 12), fill="#3a7590", width=1)
    fd.line((WIDE, FL - 6, WIDE - 24, FL - 12), fill="#3a7590", width=1)

    write_layered(
        7,
        "ЛЕДНИК",
        far,
        mid,
        props,
        fg,
        "Superpowers snow hills + ice cave; Kenney frozen pine and custom ice spikes",
        [
            {"type": "snow", "every": 2},
            {"type": "motes", "every": 24, "color": "rgba(200,230,255,.18)"},
        ],
        [
            {"x": 676, "y": 46, "radius": 96, "color": "#c8e0f0", "alpha": 0.12},
            {"x": 110, "y": 174, "radius": 62, "color": "#70b0d0", "alpha": 0.14},
            {"x": 580, "y": 164, "radius": 72, "color": "#70b0d0", "alpha": 0.14},
        ],
        fog=True,
        wet=True,
        fog_color="#b8d8f0",
    )


def cyber_factory() -> None:
    superpowers = ROOT / "assets" / "vendor" / "superpowers-backgrounds" / "extracted" / "backgrounds"
    far_src = superpowers / "17.png"
    core_src = superpowers / "37.png"
    if not far_src.exists() or not core_src.exists():
        print("skip arena 8: missing cyber factory sources")
        return

    far = cover(Image.open(far_src))
    far = grade(far, 0.58, 0.78, (8, 4, 16, 42))
    far = wash(far, (4, 2, 10, 86), (20, 6, 26, 0))
    far = wide(far)

    mid = cover(Image.open(core_src))
    mid = grade(mid, 0.54, 0.84, (2, 18, 12, 30))
    mid = fade_top(mid, 54, 214)
    mid = wide(mid)
    md = ImageDraw.Draw(mid)
    md.rectangle((0, 170, WIDE, 172), fill=(10, 40, 30, 150))
    md.line((0, 192, WIDE, 192), fill=(10, 40, 30, 120), width=1)

    props = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(props)
    # Console bank.
    pd.rectangle((58, FL - 46, 188, FL), fill="#161c22", outline="#05080a")
    pd.rectangle((64, FL - 40, 182, FL - 8), fill="#0c1418")
    for x, c in [(70, "#50d0a0"), (104, "#50d0a0"), (138, "#e05040")]:
        pd.rectangle((x, FL - 34, x + 26, FL - 18), fill=c)
        pd.line((x + 3, FL - 31, x + 23, FL - 31), fill="#0a1414", width=1)
    for x in range(70, 178, 12):
        pd.rectangle((x, FL - 14, x + 6, FL - 10), fill="#2a3a3a")
    # Reactor tank.
    pd.rounded_rectangle((614, FL - 92, 690, FL - 8), radius=18, fill="#16262a", outline="#050a0c")
    pd.rectangle((620, FL - 80, 684, FL - 18), fill="#1a4a3e")
    for y in (FL - 68, FL - 48, FL - 30):
        pd.ellipse((634, y, 670, y + 8), outline="#60d0a0", width=1)
    pd.rectangle((608, FL - 98, 696, FL - 90), fill="#243a3a")
    pd.rectangle((608, FL - 14, 696, FL - 6), fill="#243a3a")
    glow(props, 652, FL - 48, 62, (60, 210, 160), 24)
    # Pipes.
    pd.line((188, FL - 34, 300, FL - 34), fill="#2a3a3a", width=8)
    pd.line((300, FL - 34, 300, FL - 76), fill="#2a3a3a", width=8)
    pd.line((300, FL - 76, 520, FL - 76), fill="#2a3a3a", width=8)
    pd.line((520, FL - 76, 520, FL - 50), fill="#3a5050", width=6)
    pd.ellipse((292, FL - 42, 308, FL - 26), fill="#3a5050")
    pd.ellipse((512, FL - 84, 528, FL - 68), fill="#3a5050")
    # Conveyor.
    pd.polygon([(352, FL - 10), (454, FL - 34), (462, FL - 26), (360, FL - 2)], fill="#1a2228")
    for i in range(5):
        x = 364 + i * 20
        y = FL - 13 - i * 4
        pd.ellipse((x - 3, y - 3, x + 3, y + 3), fill="#3a5050")
    # Crates and barrels.
    for x, s in [(230, 22), (258, 16)]:
        crate(pd, x, FL - s, s)
    for x, h in [(540, 18), (558, 22)]:
        barrel(pd, x, FL - h, 14, h)
    # Warning barrier.
    pd.rectangle((470, FL - 18, 532, FL - 10), fill="#2a2a20", outline="#05080a")
    for i, x in enumerate(range(470, 528, 10)):
        pd.rectangle((x, FL - 18, x + 5, FL - 10), fill="#d0a030" if i % 2 == 0 else "#1a1a14")
    # Cables.
    pd.line((70, FL - 56, 70, FL - 120, 120, FL - 140), fill="#0a1012", width=2)
    pd.line((680, FL - 98, 730, FL - 128, 770, FL - 120), fill="#0a1012", width=2)

    fg = Image.new("RGBA", (WIDE, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fg)
    fg_col = (6, 16, 18, 246)
    fd.rectangle((0, 0, 84, 16), fill=fg_col)
    fd.line((0, 14, 180, 28), fill=fg_col, width=2)
    fd.line((180, 28, 344, 16), fill=fg_col, width=2)
    fd.rectangle((WIDE - 34, 0, WIDE, 176), fill=fg_col)
    for x in (790, 812, 834):
        fd.line((x, 0, x, FL), fill="#12302e", width=2)
    fd.line((0, 0, 18, 140), fill=fg_col, width=5)
    fd.rectangle((0, FL - 4, 28, FL), fill=fg_col)
    fd.rectangle((WIDE - 34, FL - 4, WIDE, FL), fill=fg_col)
    fd.line((0, 15, 180, 29, 344, 17), fill="#1a4a42", width=1)
    fd.line((18, 0, 18, 140), fill="#1a4a42", width=1)
    for y in (44, 88, 132, 176):
        fd.rectangle((804, y, 810, y + 3), fill="#3aa088")

    write_layered(
        8,
        "КИБЕР-ЗАВОД",
        far,
        mid,
        props,
        fg,
        "Superpowers industrial interior + reactor chamber; custom console, pipes and tank",
        [
            {"type": "ember", "every": 12, "color": "rgba(80,220,170,.55)"},
            {"type": "motes", "every": 20, "color": "rgba(160,190,190,.12)"},
        ],
        [
            {"x": 652, "y": 158, "radius": 96, "color": "#40d0a0", "alpha": 0.22},
            {"x": 120, "y": 166, "radius": 54, "color": "#e05040", "alpha": 0.14},
            {"x": 500, "y": 92, "radius": 80, "color": "#5080c0", "alpha": 0.1},
        ],
        wet=True,
    )


def main() -> int:
    cemetery_layered()
    dojo_layered()
    dock()
    temple()
    storm_city()
    quarry()
    desert()
    volcano()
    glacier()
    cyber_factory()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
