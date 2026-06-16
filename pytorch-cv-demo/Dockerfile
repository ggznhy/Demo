FROM python:3.12-slim

WORKDIR /app

# Install CPU-only PyTorch (works when pytorch/pytorch Hub image is blocked by mirrors)
RUN pip install --no-cache-dir \
    torch==2.5.1 torchvision==0.20.1 \
    --index-url https://download.pytorch.org/whl/cpu

COPY src/ ./src/
COPY data/ ./data/

# Cache ResNet18 weights in the image layer (sample image created at runtime if missing)
RUN python -c "\
from torchvision import models; \
models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1); \
print('ResNet18 weights cached')"

CMD ["sh", "-c", "python src/download_sample.py && python src/classify.py --image data/sample.jpg"]
