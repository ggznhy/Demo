# Cesium Resume Demo · PKU Sky Clouds

A **3D academic resume** built with **Vue 3** and **CesiumJS**. Volumetric clouds drift over **Peking University** campus while your education timeline, publications, and skills appear in an interactive sidebar — tying together atmospheric remote sensing research and geospatial visualization.

## Tech Stack

| Layer | Tool | Role |
|-------|------|------|
| Framework | **Vue 3** + Composition API | Reactive UI |
| Build | **Vite 6** + TypeScript | Fast dev & type safety |
| 3D Globe | **CesiumJS** + `CloudCollection` | Sky clouds & campus globe |
| State | **Pinia** | Resume ↔ globe sync |
| Styling | **Tailwind CSS v4** | Modern layout |
| Deploy | **Docker** + nginx | Production container |

## Features

- **Volumetric sky clouds** above PKU (Wudaokou) using Cesium `CloudCollection`
- **Animated cloud drift** with density and visibility controls
- **Time-of-day slider** for globe lighting and atmosphere
- **Campus highlight** ellipse + fly-to camera over Peking University
- **Academic resume panel** — overview, education, publications, skills
- **Optional Cesium Ion** terrain & OSM 3D buildings when token is provided

## Quick Start (local)

```bash
cd cesium-resume
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Optional: Cesium Ion token

For world terrain and 3D buildings, create a free token at [cesium.com/ion](https://cesium.com/ion/) and add:

```bash
# .env.local
VITE_CESIUM_ION_TOKEN=your_token_here
```

Without a token, the demo uses OpenStreetMap imagery and ellipsoid terrain (fully functional for clouds + resume).

## Docker

```bash
cd cesium-resume

# Build and run (port 8080)
docker compose up --build

# With Ion token
VITE_CESIUM_ION_TOKEN=your_token docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080).

## Customize

Edit `src/data/resume.ts` for profile, locations, publications, skills, and cloud field layout.

## Project Structure

```
src/
├── components/
│   ├── CesiumViewer.vue    # Cesium globe + cloud lifecycle
│   ├── CloudControls.vue   # Sky/atmosphere controls
│   └── ResumePanel.vue     # Sidebar resume UI
├── data/resume.ts          # PKU-centric demo data
├── stores/resume.ts        # Pinia store
└── utils/cesium.ts         # Viewer setup & cloud helpers
```

## Related Demo

See [`../webgis-resume/`](../webgis-resume/) for the MapLibre GL 2D version of the same resume.
