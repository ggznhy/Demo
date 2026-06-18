import type { CloudSpec, GeoLocation, Profile, Publication, Skill } from '@/types/resume'

export const profile: Profile = {
  name: 'Zhongguan Wen',
  title: 'Master Student · Geospatial AI & Remote Sensing',
  email: 'ryan.wen@stu.pku.edu.cn',
  summary:
    'Master student at Peking University specializing in atmospheric remote sensing and environmental health — thesis focus on cloud remote sensing, visualized here in a 3D sky over campus.',
  orcid: '0009-0003-6700-9122',
  github: 'ggznhy',
}

/** Peking University (Wudaokou) — WGS-84 [longitude, latitude] */
export const pkuCenter: [number, number] = [116.3042806, 39.9905278]

export const locations: GeoLocation[] = [
  {
    id: 'pku',
    name: 'Peking University',
    institution: 'College of Environmental Sciences and Engineering',
    type: 'education',
    coordinates: pkuCenter,
    period: '2024 – Present',
    description:
      'M.S. in Environmental Health. Thesis on remote sensing of clouds — the volumetric clouds above campus mirror this research theme.',
    tags: ['M.S.', 'Remote Sensing', 'Cloud', 'Environmental Health'],
  },
  {
    id: 'yzu',
    name: 'Yangtze University',
    institution: 'School of Geosciences · Wuhan Campus',
    type: 'education',
    coordinates: [114.0231917, 30.5316583],
    period: '2019 – 2023',
    description:
      'B.S. in Geographical Information Science. Thesis on spatial-temporal fusion of remote sensing and infrared remote sensing.',
    tags: ['B.S.', 'GIS', 'Remote Sensing'],
  },
]

export const publications: Publication[] = [
  {
    id: 'pub1',
    title:
      'Research on Agricultural and Animal Husbandry Ecological Evolution in North China Based on Computer Machine Learning and GIS Spatial Analysis',
    venue: '2024 International Conference on Power, Electrical Engineering, Electronics and Control (PEEEC)',
    year: 2024,
    citations: 0,
    doi: '10.1109/PEEEC63877.2024.00208',
  },
  {
    id: 'pub2',
    title:
      'Comparison of gap-filling methods for generating landsat-like land surface temperatures under all-weather conditions',
    venue: 'ISPRS Journal of Photogrammetry and Remote Sensing',
    year: 2025,
    citations: 5,
    doi: '10.1016/j.isprsjprs.2025.04.029',
  },
]

export const skills: Skill[] = [
  { name: 'CesiumJS / MapLibre GL / Leaflet', level: 92, category: 'gis' },
  { name: 'PostGIS & GeoServer', level: 88, category: 'gis' },
  { name: 'GDAL / Rasterio / GeoPandas', level: 92, category: 'gis' },
  { name: 'Sentinel Hub / Google Earth Engine', level: 85, category: 'remote-sensing' },
  { name: 'PyTorch / TensorFlow (GeoAI)', level: 80, category: 'remote-sensing' },
  { name: 'Vue 3 / TypeScript / Vite', level: 90, category: 'programming' },
  { name: 'Python / R / SQL', level: 93, category: 'programming' },
  { name: 'Spatial Statistics & ML', level: 87, category: 'analysis' },
]

export const typeColors: Record<GeoLocation['type'], string> = {
  education: '#0d9488',
  research: '#6366f1',
  conference: '#f59e0b',
  fieldwork: '#ef4444',
}

export const typeLabels: Record<GeoLocation['type'], string> = {
  education: 'Education',
  research: 'Research',
  conference: 'Conference',
  fieldwork: 'Fieldwork',
}

/** Volumetric cloud field scattered above PKU campus sky */
export const skyCloudSpecs: CloudSpec[] = [
  { id: 'c1', offsetLon: -0.012, offsetLat: 0.008, height: 1400, scaleX: 1400, scaleY: 420, slice: 0.32, driftSpeed: 0.000018 },
  { id: 'c2', offsetLon: 0.006, offsetLat: -0.005, height: 1650, scaleX: 1100, scaleY: 380, slice: 0.41, driftSpeed: 0.000024 },
  { id: 'c3', offsetLon: 0.018, offsetLat: 0.012, height: 1900, scaleX: 950, scaleY: 320, slice: 0.28, driftSpeed: 0.000015 },
  { id: 'c4', offsetLon: -0.022, offsetLat: -0.01, height: 2100, scaleX: 1600, scaleY: 480, slice: 0.36, driftSpeed: 0.000012 },
  { id: 'c5', offsetLon: 0.003, offsetLat: 0.016, height: 1750, scaleX: 800, scaleY: 280, slice: 0.45, driftSpeed: 0.00002 },
  { id: 'c6', offsetLon: -0.008, offsetLat: 0.002, height: 1550, scaleX: 1250, scaleY: 400, slice: 0.33, driftSpeed: 0.000017 },
  { id: 'c7', offsetLon: 0.014, offsetLat: -0.014, height: 2000, scaleX: 1050, scaleY: 350, slice: 0.39, driftSpeed: 0.000014 },
  { id: 'c8', offsetLon: -0.016, offsetLat: 0.014, height: 1800, scaleX: 900, scaleY: 300, slice: 0.31, driftSpeed: 0.000019 },
]
