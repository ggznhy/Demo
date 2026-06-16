"""Download or generate a sample image for the classification demo."""

import urllib.request
from pathlib import Path

from PIL import Image

SAMPLE_URL = "https://github.com/pytorch/hub/raw/master/images/dog.jpg"
OUTPUT = Path("data/sample.jpg")


def download_from_url(url: str, dest: Path) -> bool:
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "pytorch-cv-demo/1.0 (educational)"},
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            dest.write_bytes(response.read())
        return True
    except Exception as exc:
        print(f"Download failed ({exc}); using generated fallback image.")
        return False


def generate_fallback(dest: Path) -> None:
    """Simple orange gradient image — enough for a working inference demo offline."""
    width, height = 320, 240
    raw = bytearray()
    for y in range(height):
        for x in range(width):
            raw.extend(
                [
                    min(255, 180 + x // 4),
                    min(255, 90 + y // 3),
                    min(255, 40 + (x + y) // 6),
                ]
            )
    Image.frombytes("RGB", (width, height), bytes(raw)).save(dest, format="JPEG")


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    if OUTPUT.exists():
        print(f"Already exists: {OUTPUT}")
        return

    print(f"Creating sample image at {OUTPUT} ...")
    if not download_from_url(SAMPLE_URL, OUTPUT):
        generate_fallback(OUTPUT)
    print("Done.")


if __name__ == "__main__":
    main()
