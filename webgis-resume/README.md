# Academic WebGIS Resume Demo

An interactive **WebGIS academic resume** built with modern Vue tooling. Your career journey is visualized on a MapLibre GL map — click markers, toggle layers, and explore education, fieldwork, and publications in one place.

## Tech Stack

| Layer | Tool | Role |
|-------|------|------|
| Framework | **Vue 3** + Composition API | Reactive UI |
| Build | **Vite 6** + TypeScript | Fast dev & type safety |
| State | **Pinia** | Map ↔ resume sync |
| Maps | **MapLibre GL JS** | Vector WebGIS rendering |
| Styling | **Tailwind CSS v4** | Modern layout & theming |
| Utilities | **@vueuse/core** | Composables (ready to extend) |

## Features

- **Interactive map** with custom markers for education, research, conferences, and fieldwork
- **Fly-to animations** when selecting resume entries or map markers
- **Layer filters** — toggle location types on/off
- **Basemap switcher** — Light / Dark / Voyager (CARTO styles)
- **Academic resume panel** — overview, journey, publications, skills
- **Timeline** linked to geographic coordinates

## Quick Start

```bash
cd webgis-resume
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customize Your Resume

Edit `src/data/resume.ts` to update:

- `profile` — name, title, summary
- `locations` — coordinates `[lng, lat]`, periods, descriptions
- `publications` — papers and citations
- `skills` — proficiency bars by category

## Project Structure

```
src/
├── components/
│   ├── GisMap.vue          # MapLibre GL map + markers
│   ├── MapControls.vue     # Basemap & layer toggles
│   ├── ResumePanel.vue     # Sidebar layout
│   ├── ProfileHeader.vue   # Nav tabs
│   ├── EducationList.vue
│   ├── PublicationsList.vue
│   └── SkillsPanel.vue
├── data/resume.ts          # Demo academic data
├── stores/resume.ts        # Pinia store
└── types/resume.ts         # TypeScript interfaces
```

## Build for Production

```bash
npm run build
npm run preview
```

## License

MIT — demo data is fictional for illustration.
