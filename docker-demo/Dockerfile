# Stage 1: base image — lightweight Python on Debian
FROM python:3.12-slim

# Don't write .pyc files; log immediately to stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies first (layer caching: only re-runs when requirements change)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Document which port the app listens on (does not publish the port by itself)
EXPOSE 5000

# Run the app when the container starts
CMD ["python", "app.py"]
