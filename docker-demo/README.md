# Docker Demo — Hands-On Tutorial

A minimal Flask API packaged as a Docker image. Follow the steps below to learn images, containers, ports, and Docker Compose.

## What is Docker?

Docker runs applications in **containers** — isolated processes that share the host kernel but have their own filesystem and network. You define an **image** (a snapshot with your app + runtime); each `docker run` creates a **container** from that image.

```
┌─────────────────────────────────────────┐
│  Your machine (host)                    │
│  ┌─────────────┐  ┌─────────────┐       │
│  │ Container 1 │  │ Container 2 │  ...  │
│  │  (api)      │  │  (db)       │       │
│  └──────┬──────┘  └──────┬──────┘       │
│         └────────┬───────┘              │
│              Docker Engine              │
└─────────────────────────────────────────┘
```

| Concept | Analogy | Command |
|---------|---------|---------|
| Image | Recipe / template | `docker build` |
| Container | Running meal from the recipe | `docker run` |
| Registry | Library of recipes (e.g. Docker Hub) | `docker pull` |
| Dockerfile | Recipe text | edit `Dockerfile` |
| Compose | Orchestrate several containers | `docker compose up` |

## Prerequisites

1. **Install Docker Desktop** (Windows): [https://docs.docker.com/desktop/setup/install/windows-install/](https://docs.docker.com/desktop/setup/install/windows-install/)
2. Start Docker Desktop and wait until it shows **Running**.
3. Verify in PowerShell:

```powershell
docker --version
docker compose version
```

## Project layout

```
docker-demo/
├── app.py              # Flask API
├── requirements.txt    # Python dependencies
├── Dockerfile          # How to build the image
├── docker-compose.yml  # Run with one command
├── .dockerignore       # Files excluded from the image
└── README.md           # This guide
```

## Step 1 — Build an image

Open a terminal in this folder (`docker-demo`):

```powershell
cd e:\MyPKU\AI\Cursor-Tutorial\docker-demo
docker build -t docker-demo:latest .
```

- `-t docker-demo:latest` tags the image with a name and version.
- `.` is the build context (current directory).

**What happens:** Docker reads `Dockerfile` line by line, creating **layers**. Changing only `app.py` later reuses cached layers for `pip install`.

## Step 2 — Run a container

```powershell
docker run --rm -p 5000:5000 docker-demo:latest
```

| Flag | Meaning |
|------|---------|
| `--rm` | Remove container when it stops |
| `-p 5000:5000` | Map host port 5000 → container port 5000 |

Open in your browser or use curl:

- [http://localhost:5000](http://localhost:5000)
- [http://localhost:5000/health](http://localhost:5000/health)
- [http://localhost:5000/info](http://localhost:5000/info)

Stop the container with `Ctrl+C`.

## Step 3 — Useful everyday commands

```powershell
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List local images
docker images

# Run in background (detached)
docker run -d --name my-api -p 5000:5000 docker-demo:latest

# View logs
docker logs my-api

# Stop and remove
docker stop my-api
docker rm my-api

# Remove an image
docker rmi docker-demo:latest

# Shell inside a running container (debugging)
docker exec -it my-api sh
```

## Step 4 — Docker Compose (recommended)

Compose defines services in YAML and starts them together:

```powershell
docker compose up --build
```

- `--build` rebuilds the image before starting.
- Add `-d` to run in the background.

Stop everything:

```powershell
docker compose down
```

## Step 5 — Change the app and rebuild

1. Edit `app.py` (change the message in `MESSAGES`).
2. Rebuild and run:

```powershell
docker compose up --build
```

3. Refresh [http://localhost:5000](http://localhost:5000) — you should see your change.

This shows why **images are immutable**: you must rebuild after code changes (unless you use bind mounts in dev — see below).

## Dockerfile walkthrough

```dockerfile
FROM python:3.12-slim      # Base image from Docker Hub
WORKDIR /app                 # Working directory inside container
COPY requirements.txt .      # Copy deps file first (cache-friendly)
RUN pip install ...          # Install deps in a layer
COPY app.py .                # Copy app code
EXPOSE 5000                  # Document port (metadata)
CMD ["python", "app.py"]     # Default command when container starts
```

## Dev tip: live reload without rebuild

For local development you can mount your code into the container:

```powershell
docker run --rm -p 5000:5000 -v ${PWD}:/app docker-demo:latest
```

On Windows PowerShell, `${PWD}` is the current directory. Edits to `app.py` on the host appear in the container; restart the process or use a dev server with reload for instant feedback.

## Optional — Dockerize `webgis-resume`

The Vue app in `../webgis-resume` can be served with nginx after `npm run build`. Example multi-stage `Dockerfile` (not included by default):

```dockerfile
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

Build and run:

```powershell
cd ..\webgis-resume
docker build -t webgis-resume .
docker run --rm -p 8080:80 webgis-resume
```

Then open [http://localhost:8080](http://localhost:8080).

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `docker` not recognized | Install Docker Desktop and restart the terminal |
| Port 5000 already in use | Use `-p 5001:5000` or stop the other process |
| Build fails on `pip install` | Check network; retry `docker build` |
| Old code still running | Run `docker compose up --build` after changes |
| Permission errors on Linux | May need `sudo` or Docker user group setup |

## Next steps

- [Docker Docs — Get started](https://docs.docker.com/get-started/)
- Add a database service to `docker-compose.yml` (e.g. PostgreSQL)
- Push your image to [Docker Hub](https://hub.docker.com/) with `docker push`
