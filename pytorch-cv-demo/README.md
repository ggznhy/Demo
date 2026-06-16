# PyTorch Computer Vision Demo (Docker)

Hands-on demo for **image classification** with a pretrained ResNet18 and **MNIST training** with a small CNN — all inside Docker.

## What you'll learn

| Topic | Script | PyTorch concepts |
|-------|--------|------------------|
| Inference | `src/classify.py` | `torch.nn`, pretrained weights, `transforms`, `softmax` |
| Training | `src/train_mnist.py` | `DataLoader`, loss, backward, optimizer, checkpoints |
| Docker | `Dockerfile`, Compose | GPU-optional CPU image, volumes for data/models |

## Architecture

```
┌──────────────────────────────────────────────────┐
│  Docker container (python:3.12-slim + PyTorch CPU) │
│                                                  │
│  classify.py ──► ResNet18 (ImageNet weights)     │
│       │              │                           │
│       ▼              ▼                           │
│   sample.jpg    top-5 labels + probabilities     │
│                                                  │
│  train_mnist.py ──► TinyCNN ──► models/mnist.pt  │
│       │                                          │
│       ▼                                          │
│   MNIST dataset (auto-download)                  │
└──────────────────────────────────────────────────┘
```

## Prerequisites

- [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) running
- ~2 GB disk for the PyTorch image + weights

Verify:

```powershell
docker --version
docker compose version
```

## Quick start

```powershell
cd e:\MyPKU\AI\Cursor-Tutorial\pytorch-cv-demo

# Build (downloads ResNet18 weights during build; sample image at first run)
docker compose build classify

# Run classification on the bundled sample image
docker compose run --rm classify
```

Expected output (similar):

```
Device: cpu

Image: data/sample.jpg
Size:  320 x 240

Top predictions:
  1. Egyptian cat                    45.23%
  2. tabby                           32.11%
  ...
```

## Demo 1 — Image classification (inference)

Uses **torchvision** `resnet18` with ImageNet weights. Pipeline:

1. Load image with Pillow
2. Resize → center crop → normalize (ImageNet stats)
3. Forward pass → softmax → top-k classes

### Classify your own photo

Copy any JPG/PNG into `data/`:

```powershell
copy C:\Pictures\my_photo.jpg data\my_photo.jpg
docker compose run --rm classify python src/classify.py --image data/my_photo.jpg
```

The `data/` folder is mounted as a volume — no rebuild needed.

## Demo 2 — Train on MNIST

A 3-layer CNN trained from scratch on handwritten digits:

```powershell
docker compose run --rm train
```

This downloads MNIST (~11 MB) on first run and saves weights to `models/mnist_cnn.pt`.

Customize training:

```powershell
docker compose run --rm train python src/train_mnist.py --epochs 5 --batch-size 64
```

On CPU, 3 epochs typically finish in a few minutes.

## Project layout

```
pytorch-cv-demo/
├── Dockerfile              # Python slim + PyTorch CPU wheels
├── docker-compose.yml      # classify + train services
├── data/
│   └── sample.jpg          # Created on first run (download or fallback)
├── models/                 # MNIST checkpoints (created by train)
└── src/
    ├── classify.py         # ResNet18 inference
    ├── train_mnist.py      # MNIST training loop
    └── download_sample.py  # Fetches demo cat image
```

## Key PyTorch snippets

**Inference mode** (no gradients):

```python
model.eval()
with torch.no_grad():
    logits = model(tensor)
    probs = torch.nn.functional.softmax(logits, dim=1)
```

**Training step**:

```python
model.train()
optimizer.zero_grad()
loss = criterion(model(images), labels)
loss.backward()
optimizer.step()
```

## Docker notes

- **Base image**: `python:3.12-slim` + PyTorch CPU wheels from [download.pytorch.org](https://download.pytorch.org) (avoids mirror issues with `pytorch/pytorch` on some registries)
- **Build-time download**: ResNet weights cached in the image; sample image fetched on first `run`
- **Volumes**: `data/` and `models/` persist on your host between container runs

### GPU (optional)

If you have an NVIDIA GPU + [CUDA support in Docker](https://docs.docker.com/desktop/features/gpu/):

1. Change base image to `pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime`
2. Add to `docker-compose.yml` under the service:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: 1
          capabilities: [gpu]
```

Scripts auto-select `cuda` when available.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `failed to resolve` / `not found` on build | Network issue — `docker pull python:3.12-slim` then rebuild |
| Build fails downloading sample image | Run locally: `python src/download_sample.py`, then rebuild |
| MNIST download slow | Normal on first `train` run; data cached in `data/mnist/` |
| Out of memory during training | Reduce batch size: `--batch-size 32` |

## Related demos

- [`../docker-demo`](/docker-demo) — Docker basics with Flask
- [`../webgis-resume`](/webgis-resume) — Vue + MapLibre WebGIS app

## Next steps

- Load `models/mnist_cnn.pt` in a new inference script
- Swap ResNet18 for `efficientnet_b0` or `vit_b_16`
- Export to ONNX: `torch.onnx.export(model, ...)`
