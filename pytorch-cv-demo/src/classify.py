"""Image classification with a pretrained ResNet18 (ImageNet)."""

import argparse
from pathlib import Path

import torch
from PIL import Image
from torchvision import models, transforms

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]


def build_transform():
    return transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD),
        ]
    )


def load_model(device: torch.device):
    weights = models.ResNet18_Weights.IMAGENET1K_V1
    model = models.resnet18(weights=weights)
    model.eval()
    model.to(device)
    return model, weights.meta["categories"]


def predict(image_path: Path, top_k: int = 5):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")

    model, categories = load_model(device)
    transform = build_transform()

    image = Image.open(image_path).convert("RGB")
    tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = model(tensor)
        probabilities = torch.nn.functional.softmax(logits, dim=1)[0]

    top_probs, top_indices = torch.topk(probabilities, top_k)

    print(f"\nImage: {image_path}")
    print(f"Size:  {image.size[0]} x {image.size[1]}")
    print("\nTop predictions:")
    for rank, (prob, idx) in enumerate(zip(top_probs, top_indices), start=1):
        label = categories[idx]
        print(f"  {rank}. {label:30s}  {prob.item():.2%}")


def main():
    parser = argparse.ArgumentParser(description="Classify an image with ResNet18")
    parser.add_argument(
        "--image",
        type=Path,
        default=Path("data/sample.jpg"),
        help="Path to input image",
    )
    parser.add_argument("--top-k", type=int, default=5, help="Number of top classes")
    args = parser.parse_args()

    if not args.image.exists():
        raise FileNotFoundError(
            f"Image not found: {args.image}\n"
            "Place a JPG/PNG in data/ or pass --image path/to/photo.jpg"
        )

    predict(args.image, args.top_k)


if __name__ == "__main__":
    main()
