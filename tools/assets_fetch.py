#!/usr/bin/env python3
"""Download, inspect and selectively extract asset archives.

Keeps raw packs in assets/vendor/<name>/ and extracts only allowlisted files
into assets/vendor/<name>/selected/. Prints one compact JSON summary.
"""

from __future__ import annotations

import argparse
import fnmatch
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import urllib.request
import zipfile
from pathlib import Path, PurePosixPath

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
VENDOR = ROOT / "assets" / "vendor"
PREVIEW = ROOT / "test-results" / "asset-preview"
DEFAULT_MANIFEST = VENDOR / "packs.json"
DEFAULT_KEEP = ["*.png", "*.webp", "*.jpg", "*.jpeg", "*.json", "*.txt", "*.md"]
DEFAULT_IGNORE = [
    "__MACOSX/*",
    "__MACOSX/**",
    ".DS_Store",
    "Thumbs.db",
    "*.psd",
    "*.exe",
    "*.dll",
    "*.app",
    "*.jar",
    "*.js",
]
ARCHIVE_RE = re.compile(r"https?://[^\"' ]+\.(?:zip|tar|tar\.gz|tgz|tar\.bz2|tbz2|tar\.xz|txz|7z|rar)(?:\?[^\"' ]*)?", re.I)
LIMITS = {
    "max_archive_mb": 50,
    "max_unpacked_mb": 200,
    "max_files": 5000,
    "max_file_mb": 25,
    "max_ratio": 100,
}


class LimitError(RuntimeError):
    def __init__(self, reason: str, **details: object):
        super().__init__(reason)
        self.reason = reason
        self.details = details


def limits_for(item: dict[str, object]) -> dict[str, float]:
    merged = dict(LIMITS)
    merged.update(item.get("limits", {}))
    return merged


def find_7z() -> str | None:
    names = ["7z.exe", "7zz.exe"]
    for name in names:
        found = shutil.which(name)
        if found:
            return found
    for path in [r"C:\Program Files\7-Zip\7z.exe", r"C:\Program Files (x86)\7-Zip\7z.exe"]:
        if Path(path).exists():
            return path
    return None


SEVEN = find_7z()
try:
    import rarfile

    if SEVEN:
        rarfile.SEVENZIP_TOOL = SEVEN
except ImportError:
    pass


def tools() -> dict[str, object]:
    try:
        import py7zr

        py7zr_version = py7zr.__version__
    except ImportError:
        py7zr_version = None
    try:
        import rarfile

        rarfile_version = rarfile.__version__
    except ImportError:
        rarfile_version = None
    return {
        "zip": True,
        "tar": True,
        "7z": bool(py7zr_version),
        "rar": bool(rarfile_version and SEVEN),
        "py7zr": py7zr_version,
        "rarfile": rarfile_version,
        "sevenzip": SEVEN,
    }


def safe_rel(name: str) -> str | None:
    path = PurePosixPath(name.replace("\\", "/"))
    if path.is_absolute() or ".." in path.parts:
        return None
    return str(path)


def matches(name: str, patterns: list[str]) -> bool:
    return any(fnmatch.fnmatch(name, pattern) for pattern in patterns)


def keep_name(name: str, keep: list[str], ignore: list[str]) -> bool:
    if not name or name.endswith("/"):
        return False
    rel = safe_rel(name)
    if rel is None:
        return False
    if matches(rel, ignore):
        return False
    return matches(rel, keep)


def detect_type(path: Path) -> str:
    head = path.read_bytes()[:512]
    if head.startswith(b"PK\x03\x04"):
        return "zip"
    if head.startswith(b"7z\xbc\xaf'\x1c"):
        return "7z"
    if head.startswith(b"Rar!\x1a\x07"):
        return "rar"
    if head.startswith(b"\x1f\x8b"):
        return "tar.gz"
    if head.startswith(b"BZh"):
        return "tar.bz2"
    if head.startswith(b"\xfd7zXZ\x00"):
        return "tar.xz"
    if len(head) > 262 and head[257:262] == b"ustar":
        return "tar"
    return "unknown"


def archive_stats(archive: Path, keep: list[str], ignore: list[str]) -> tuple[int, int, int]:
    kind = detect_type(archive)
    sizes: list[int] = []
    if kind == "zip":
        with zipfile.ZipFile(archive) as handle:
            sizes = [info.file_size for info in handle.infolist() if keep_name(info.filename, keep, ignore)]
    elif kind in ("tar", "tar.gz", "tar.bz2", "tar.xz"):
        with tarfile.open(archive) as handle:
            sizes = [member.size for member in handle.getmembers() if keep_name(member.name, keep, ignore)]
    elif kind == "7z":
        import py7zr

        with py7zr.SevenZipFile(archive) as handle:
            sizes = [item.uncompressed for item in handle.list() if keep_name(item.filename, keep, ignore)]
    elif kind == "rar":
        import rarfile

        with rarfile.RarFile(archive) as handle:
            sizes = [info.file_size for info in handle.infolist() if keep_name(info.filename, keep, ignore)]
    return len(sizes), sum(sizes), max(sizes, default=0)


def check_limits(archive: Path, keep: list[str], ignore: list[str], limits: dict[str, float]) -> tuple[int, int, int]:
    files, total, largest = archive_stats(archive, keep, ignore)
    if files > limits["max_files"]:
        raise LimitError("too_many_files", files=files, limit=limits["max_files"])
    if total > limits["max_unpacked_mb"] * 1024 * 1024:
        raise LimitError("unpacked_limit", unpacked_bytes=total, limit_mb=limits["max_unpacked_mb"])
    if largest > limits["max_file_mb"] * 1024 * 1024:
        raise LimitError("file_limit", file_bytes=largest, limit_mb=limits["max_file_mb"])
    if total > 1024 * 1024 and total / max(1, archive.stat().st_size) > limits["max_ratio"]:
        raise LimitError("compression_ratio", ratio=round(total / max(1, archive.stat().st_size), 1), limit=limits["max_ratio"])
    return files, total, largest


def page_archive(url: str) -> str | None:
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        text = response.read(4_000_000).decode(charset, "replace")
    found = ARCHIVE_RE.findall(text)
    if not found:
        found = [match.group(0) for match in ARCHIVE_RE.finditer(text)]
    return found[0] if found else None


def download(url: str, target: Path, max_mb: float | None = None) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=180) as response:
        length = response.headers.get("Content-Length")
        if max_mb and length and int(length) > max_mb * 1024 * 1024:
            raise RuntimeError(f"archive exceeds {max_mb} MB")
        with target.open("wb") as output:
            shutil.copyfileobj(response, output)
    if max_mb and target.stat().st_size > max_mb * 1024 * 1024:
        raise RuntimeError(f"archive exceeds {max_mb} MB")
    return hashlib.sha256(target.read_bytes()).hexdigest()


def extract_zip(archive: Path, dest: Path, keep: list[str], ignore: list[str]) -> tuple[list[str], int]:
    selected: list[str] = []
    ignored = 0
    with zipfile.ZipFile(archive) as handle:
        for info in handle.infolist():
            mode = (info.external_attr >> 16) & 0o170000
            if keep_name(info.filename, keep, ignore) and mode != 0o120000:
                selected.append(info.filename)
            elif not info.is_dir():
                ignored += 1
        for name in selected:
            out = dest / safe_rel(name)
            out.parent.mkdir(parents=True, exist_ok=True)
            with handle.open(name) as source, out.open("wb") as output:
                shutil.copyfileobj(source, output)
    return selected, ignored


def extract_tar(archive: Path, dest: Path, keep: list[str], ignore: list[str]) -> tuple[list[str], int]:
    selected: list[str] = []
    ignored = 0
    with tarfile.open(archive) as handle:
        for member in handle.getmembers():
            if keep_name(member.name, keep, ignore) and not (member.issym() or member.islnk()):
                selected.append(member.name)
            elif not member.isdir():
                ignored += 1
        for name in selected:
            member = handle.getmember(name)
            source = handle.extractfile(member)
            if source is None:
                continue
            out = dest / safe_rel(name)
            out.parent.mkdir(parents=True, exist_ok=True)
            with source, out.open("wb") as output:
                shutil.copyfileobj(source, output)
    return selected, ignored


def extract_7z(archive: Path, dest: Path, keep: list[str], ignore: list[str]) -> tuple[list[str], int]:
    try:
        import py7zr
    except ImportError:
        raise RuntimeError("py7zr is not installed")
    selected: list[str] = []
    ignored = 0
    with py7zr.SevenZipFile(archive) as handle:
        for name in handle.getnames():
            if keep_name(name, keep, ignore):
                selected.append(name)
            else:
                ignored += 1
        handle.extract(path=dest, targets=selected)
    return selected, ignored


def extract_rar(archive: Path, dest: Path, keep: list[str], ignore: list[str]) -> tuple[list[str], int]:
    try:
        import rarfile
    except ImportError:
        raise RuntimeError("rarfile is not installed")
    if SEVEN:
        rarfile.SEVENZIP_TOOL = SEVEN
    selected: list[str] = []
    ignored = 0
    with rarfile.RarFile(archive) as handle:
        for info in handle.infolist():
            if keep_name(info.filename, keep, ignore):
                selected.append(info.filename)
            elif not info.is_dir():
                ignored += 1
        handle.extractall(path=dest, members=selected)
    return selected, ignored


def extract_single(archive: Path, dest: Path, kind: str) -> list[str]:
    import bz2
    import gzip
    import lzma

    opener = {"gz": gzip.open, "bz2": bz2.open, "xz": lzma.open}[kind]
    name = archive.stem or "asset"
    out = dest / name
    with opener(archive, "rb") as source, out.open("wb") as output:
        shutil.copyfileobj(source, output)
    return [name]


def extract_archive(archive: Path, dest: Path, keep: list[str], ignore: list[str]) -> tuple[list[str], int]:
    kind = detect_type(archive)
    if kind == "zip":
        return extract_zip(archive, dest, keep, ignore)
    if kind == "tar":
        return extract_tar(archive, dest, keep, ignore)
    if kind in ("tar.gz", "tar.bz2", "tar.xz"):
        try:
            return extract_tar(archive, dest, keep, ignore)
        except tarfile.ReadError:
            return extract_single(archive, dest, kind.split(".")[-1]), 0
    if kind == "7z":
        return extract_7z(archive, dest, keep, ignore)
    if kind == "rar":
        return extract_rar(archive, dest, keep, ignore)
    raise RuntimeError(f"unsupported archive: {kind}")


def list_archive(archive: Path, keep: list[str], ignore: list[str]) -> dict[str, object]:
    kind = detect_type(archive)
    names: list[str] = []
    if kind == "zip":
        with zipfile.ZipFile(archive) as handle:
            names = [info.filename for info in handle.infolist() if not info.is_dir()]
    elif kind in ("tar", "tar.gz", "tar.bz2", "tar.xz"):
        with tarfile.open(archive) as handle:
            names = [member.name for member in handle.getmembers() if member.isfile()]
    elif kind == "7z":
        import py7zr

        with py7zr.SevenZipFile(archive) as handle:
            names = handle.getnames()
    elif kind == "rar":
        import rarfile

        with rarfile.RarFile(archive) as handle:
            names = [info.filename for info in handle.infolist() if not info.is_dir()]
    else:
        names = []
    selected = [name for name in names if keep_name(name, keep, ignore)]
    return {"format": kind, "entries": len(names), "selected": len(selected), "sample": selected[:20]}


def preview(name: str, dest: Path) -> str | None:
    images = [path for path in sorted(dest.rglob("*")) if path.suffix.lower() in {".png", ".webp", ".jpg", ".jpeg"}]
    if not images:
        return None
    PREVIEW.mkdir(parents=True, exist_ok=True)
    thumbs: list[Image.Image] = []
    for path in images[:12]:
        image = Image.open(path).convert("RGBA")
        image.thumbnail((96, 96), Image.Resampling.NEAREST)
        thumbs.append(image)
    width = 104 * max(1, len(thumbs))
    canvas = Image.new("RGBA", (width, 104), (12, 14, 20, 255))
    for index, image in enumerate(thumbs):
        canvas.alpha_composite(image, (index * 104 + 4, 4))
    target = PREVIEW / f"{name}.png"
    canvas.save(target)
    return str(target.relative_to(ROOT).as_posix())


def check_selected(dest: Path, limits: dict[str, float]) -> None:
    files = [path for path in dest.rglob("*") if path.is_file()]
    total = sum(path.stat().st_size for path in files)
    largest = max((path.stat().st_size for path in files), default=0)
    if len(files) > limits["max_files"]:
        raise LimitError("too_many_files", files=len(files), limit=limits["max_files"])
    if total > limits["max_unpacked_mb"] * 1024 * 1024:
        raise LimitError("unpacked_limit", unpacked_bytes=total, limit_mb=limits["max_unpacked_mb"])
    if largest > limits["max_file_mb"] * 1024 * 1024:
        raise LimitError("file_limit", file_bytes=largest, limit_mb=limits["max_file_mb"])


def fetch_one(name: str, item: dict[str, object], force: bool, dry: bool, do_preview: bool) -> dict[str, object]:
    keep = [str(value) for value in item.get("keep", DEFAULT_KEEP)]
    ignore = [str(value) for value in item.get("ignore", DEFAULT_IGNORE)]
    limits = limits_for(item)
    page = item.get("page")
    url = item.get("zip") or item.get("url")
    if not url and page:
        url = page_archive(str(page))
    if not url:
        return {"pack": name, "status": "error", "error": "no archive URL"}

    vendor = VENDOR / name
    vendor.mkdir(parents=True, exist_ok=True)
    if dry:
        return {"pack": name, "status": "dry", "url": url, "keep": keep, "ignore": ignore}
    existing = [path for path in sorted(vendor.glob("pack.*")) if path.name != "pack.download"]
    if existing and not force:
        archive = existing[0]
        archive_status = "exists"
    else:
        temp = vendor / "pack.download"
        digest = download(str(url), temp, limits["max_archive_mb"])
        kind = detect_type(temp)
        if kind == "unknown":
            return {"pack": name, "status": "error", "error": "unknown archive"}
        suffix = {"zip": ".zip", "tar": ".tar", "tar.gz": ".tar.gz", "tar.bz2": ".tar.bz2", "tar.xz": ".tar.xz", "7z": ".7z", "rar": ".rar"}[kind]
        archive = temp.with_suffix(suffix)
        temp.rename(archive)
        archive_status = "downloaded"
        (vendor / "SOURCE.md").write_text(
            f"# {name}\n\nSource: {page or url}\nArchive: {url}\nLicense: {item.get('license', 'unknown')}\nDownloaded: 2026-10-24\n",
            encoding="utf-8",
            newline="\n",
        )
        (vendor / "LICENSE.txt").write_text(f"License: {item.get('license', 'unknown')}\nSource: {page or url}\n", encoding="utf-8", newline="\n")
        if digest:
            (vendor / "SHA256.txt").write_text(digest + "\n", encoding="utf-8", newline="\n")

    check_limits(archive, keep, ignore, limits)
    selected_dir = vendor / "selected"
    if selected_dir.exists():
        shutil.rmtree(selected_dir)
    selected_dir.mkdir(parents=True, exist_ok=True)
    selected, ignored = extract_archive(archive, selected_dir, keep, ignore)
    check_selected(selected_dir, limits)
    result: dict[str, object] = {
        "pack": name,
        "status": archive_status,
        "format": detect_type(archive),
        "bytes": archive.stat().st_size,
        "selected": len(selected),
        "ignored": ignored,
    }
    if selected and do_preview:
        preview_path = preview(name, selected_dir)
        if preview_path:
            result["preview"] = preview_path
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--only", default="")
    parser.add_argument("--page")
    parser.add_argument("--name")
    parser.add_argument("--url")
    parser.add_argument("--keep", action="append")
    parser.add_argument("--ignore", action="append")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--no-preview", action="store_true")
    parser.add_argument("--list", type=Path)
    parser.add_argument("--check-tools", action="store_true")
    parser.add_argument("--max-archive-mb", type=float)
    parser.add_argument("--max-unpacked-mb", type=float)
    parser.add_argument("--max-files", type=int)
    parser.add_argument("--max-file-mb", type=float)
    parser.add_argument("--max-ratio", type=float)
    args = parser.parse_args()

    if args.check_tools:
        print(json.dumps(tools(), ensure_ascii=False))
        return 0
    if args.list:
        print(json.dumps(list_archive(args.list, args.keep or DEFAULT_KEEP, args.ignore or DEFAULT_IGNORE), ensure_ascii=False))
        return 0

    if args.page or args.url:
        if not args.name:
            parser.error("--name is required with --page/--url")
        manifest = {
            args.name: {
                "page": args.page,
                "zip": args.url,
                "keep": args.keep or DEFAULT_KEEP,
                "ignore": args.ignore or DEFAULT_IGNORE,
                "license": "unknown",
            }
        }
    else:
        if not args.manifest.exists():
            parser.error(f"manifest not found: {args.manifest}")
        manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
        only = {item.strip() for item in args.only.split(",") if item.strip()}
        if only:
            manifest = {name: item for name, item in manifest.items() if name in only}

    overrides = {
        "max_archive_mb": args.max_archive_mb,
        "max_unpacked_mb": args.max_unpacked_mb,
        "max_files": args.max_files,
        "max_file_mb": args.max_file_mb,
        "max_ratio": args.max_ratio,
    }
    overrides = {key: value for key, value in overrides.items() if value is not None}
    if overrides:
        for item in manifest.values():
            item.setdefault("limits", {}).update(overrides)

    results = []
    for name, item in manifest.items():
        try:
            results.append(fetch_one(name, item, args.force, args.dry_run, not args.no_preview))
        except LimitError as error:
            results.append({"pack": name, "status": "rejected", "reason": error.reason, **error.details})
        except Exception as error:
            results.append({"pack": name, "status": "error", "error": str(error)})
    print(json.dumps(results, ensure_ascii=False))
    return 0 if all(item.get("status") != "error" for item in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
